"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TradingChartProps {
    market?: string;
    currentPrice?: number;
    change24h?: number;
    bestBid?: number;
    bestAsk?: number;
    onQuickOrder?: (side: "long" | "short", size: number) => void;
}

// Generate deterministic candle data
function generateCandleData(market: string, timeframe: string) {
    const seed = market.charCodeAt(0) + market.length;
    const candles = [];
    let basePrice = market.includes("BTC") ? 92000 : market.includes("ETH") ? 3300 : 100;

    const candleCount = timeframe === "1m" ? 100 : timeframe === "5m" ? 80 :
        timeframe === "15m" ? 60 : timeframe === "1h" ? 48 :
            timeframe === "4h" ? 36 : timeframe === "1D" ? 30 : 24;

    for (let i = 0; i < candleCount; i++) {
        const random = Math.sin(seed * i * 0.1) * 0.5 + 0.5;
        const volatility = basePrice * 0.012;
        const open = basePrice + (random - 0.5) * volatility;
        const isBullish = Math.sin(seed * i * 0.2) > -0.2;
        const bodySize = volatility * (0.2 + random * 0.6);
        const close = isBullish ? open + bodySize : open - bodySize;
        const high = Math.max(open, close) + volatility * random * 0.4;
        const low = Math.min(open, close) - volatility * random * 0.4;
        const volume = 800 + random * 4000;

        candles.push({ open, high, low, close, volume, isBullish });
        basePrice = close;
    }
    return candles;
}

const drawingTools = [
    { id: "cursor", icon: "↖", name: "Cursor" },
    { id: "crosshair", icon: "+", name: "Crosshair" },
    { id: "trendline", icon: "╲", name: "Trend Line" },
    { id: "horizontal", icon: "─", name: "Horizontal Line" },
    { id: "vertical", icon: "│", name: "Vertical Line" },
    { id: "rectangle", icon: "▭", name: "Rectangle" },
    { id: "fibonacci", icon: "F", name: "Fibonacci" },
    { id: "measure", icon: "📏", name: "Measure" },
];

const indicators = [
    { id: "ma", name: "MA", color: "#ffa726" },
    { id: "ema", name: "EMA", color: "#42a5f5" },
    { id: "boll", name: "BOLL", color: "#ab47bc" },
    { id: "rsi", name: "RSI", color: "#26a69a" },
    { id: "macd", name: "MACD", color: "#ef5350" },
    { id: "vol", name: "VOL", color: "#5c6bc0" },
];

// Tooltip component
function Tooltip({ children, text }: { children: React.ReactNode; text: string }) {
    const [show, setShow] = useState(false);
    return (
        <div
            style={{ position: "relative" }}
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            {children}
            <AnimatePresence>
                {show && (
                    <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        style={{
                            position: "absolute",
                            left: "100%",
                            top: "50%",
                            transform: "translateY(-50%)",
                            marginLeft: "8px",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            background: "#2a2a32",
                            color: "#fff",
                            fontSize: "10px",
                            whiteSpace: "nowrap",
                            zIndex: 100,
                            pointerEvents: "none",
                        }}
                    >
                        {text}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function TradingChart({
    market = "ETH-USD",
    currentPrice = 3325.60,
    change24h = 0.09,
    bestBid = 3325.40,
    bestAsk = 3325.80,
    onQuickOrder,
}: TradingChartProps) {
    const [timeframe, setTimeframe] = useState("1h");
    const [chartType, setChartType] = useState<"candle" | "line" | "area">("candle");
    const [selectedTool, setSelectedTool] = useState("cursor");
    const [showIndicators, setShowIndicators] = useState(false);
    const [enabledIndicators, setEnabledIndicators] = useState<string[]>(["ema", "vol"]);
    const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
    const [hoveredCandle, setHoveredCandle] = useState<number | null>(null);
    const chartRef = useRef<HTMLDivElement>(null);

    // Quick order overlay state
    const [quickOrderPos, setQuickOrderPos] = useState({ x: 100, y: 150 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [quickAmount, setQuickAmount] = useState("");

    const timeframes = ["1m", "5m", "15m", "1h", "4h", "1D", "1W"];
    const asset = market.split("-")[0];

    const candles = useMemo(() => generateCandleData(market, timeframe), [market, timeframe]);

    const priceRange = useMemo(() => {
        const prices = candles.flatMap(c => [c.high, c.low]);
        const padding = (Math.max(...prices) - Math.min(...prices)) * 0.15;
        return { min: Math.min(...prices) - padding, max: Math.max(...prices) + padding };
    }, [candles]);

    const isPositive = change24h >= 0;
    const lastCandle = candles[candles.length - 1];
    const displayCandle = hoveredCandle !== null ? candles[hoveredCandle] : lastCandle;

    const toggleIndicator = (id: string) => {
        setEnabledIndicators(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const priceToY = (price: number) =>
        5 + (1 - (price - priceRange.min) / (priceRange.max - priceRange.min)) * 83;

    const getCandleIndex = (clientX: number) => {
        if (!chartRef.current) return null;
        const rect = chartRef.current.getBoundingClientRect();
        const x = (clientX - rect.left) / rect.width;
        const chartWidth = 0.96;
        if (x > chartWidth) return null;
        const index = Math.floor((x / chartWidth) * candles.length);
        return Math.max(0, Math.min(candles.length - 1, index));
    };

    // Quick order handlers
    const handleQuickOrder = (side: "long" | "short") => {
        const size = parseFloat(quickAmount);
        if (size > 0) {
            onQuickOrder?.(side, size);
            console.log(`Quick ${side} order: ${size} ${asset} at market`);
            setQuickAmount("");
        }
    };

    const handleDragStart = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragOffset({
            x: e.clientX - quickOrderPos.x,
            y: e.clientY - quickOrderPos.y,
        });
    };

    const handleDragMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        const container = e.currentTarget.getBoundingClientRect();
        const newX = Math.max(0, Math.min(container.width - 320, e.clientX - container.left - dragOffset.x));
        const newY = Math.max(0, Math.min(container.height - 50, e.clientY - container.top - dragOffset.y));
        setQuickOrderPos({ x: newX, y: newY });
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    return (
        <div style={{
            height: "100%",
            background: "#0b0b0e",
            display: "flex",
            position: "relative",
        }}>
            {/* Left Drawing Tools */}
            <div style={{
                width: "38px",
                borderRight: "1px solid #1e1e24",
                display: "flex",
                flexDirection: "column",
                padding: "6px 4px",
                gap: "2px",
                background: "#101014",
            }}>
                {drawingTools.map((tool) => (
                    <Tooltip key={tool.id} text={tool.name}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedTool(tool.id)}
                            style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "6px",
                                border: "none",
                                background: selectedTool === tool.id ? "rgba(0, 211, 149, 0.15)" : "transparent",
                                color: selectedTool === tool.id ? "#00d395" : "#5c5c6b",
                                fontSize: "13px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "all 0.15s ease",
                            }}
                        >
                            {tool.icon}
                        </motion.button>
                    </Tooltip>
                ))}
                <div style={{ flex: 1 }} />
                <Tooltip text="Indicators">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowIndicators(!showIndicators)}
                        style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "6px",
                            border: showIndicators ? "1px solid #00d395" : "none",
                            background: showIndicators ? "rgba(0, 211, 149, 0.1)" : "transparent",
                            color: showIndicators ? "#00d395" : "#5c5c6b",
                            fontSize: "11px",
                            fontWeight: "600",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        fx
                    </motion.button>
                </Tooltip>
                <Tooltip text="Settings">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "6px",
                            border: "none",
                            background: "transparent",
                            color: "#5c5c6b",
                            fontSize: "13px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        ⚙
                    </motion.button>
                </Tooltip>
            </div>

            {/* Main Chart Area */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {/* Top Toolbar */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "6px 12px",
                    gap: "8px",
                    borderBottom: "1px solid #1e1e24",
                    background: "#101014",
                }}>
                    {/* Chart Types */}
                    <div style={{ display: "flex", gap: "2px", background: "#16161a", borderRadius: "6px", padding: "2px" }}>
                        {[
                            { type: "candle" as const, icon: "📊", label: "Candles" },
                            { type: "line" as const, icon: "📈", label: "Line" },
                            { type: "area" as const, icon: "📉", label: "Area" },
                        ].map(({ type, icon, label }) => (
                            <motion.button
                                key={type}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setChartType(type)}
                                title={label}
                                style={{
                                    padding: "5px 8px",
                                    borderRadius: "4px",
                                    border: "none",
                                    background: chartType === type ? "#2a2a32" : "transparent",
                                    color: chartType === type ? "#fff" : "#5c5c6b",
                                    fontSize: "12px",
                                    cursor: "pointer",
                                    transition: "all 0.15s ease",
                                }}
                            >
                                {icon}
                            </motion.button>
                        ))}
                    </div>

                    <div style={{ width: "1px", height: "18px", background: "#2a2a32" }} />

                    {/* Timeframes */}
                    <div style={{ display: "flex", gap: "2px" }}>
                        {timeframes.map((tf) => (
                            <motion.button
                                key={tf}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setTimeframe(tf)}
                                style={{
                                    padding: "5px 8px",
                                    borderRadius: "4px",
                                    border: "none",
                                    background: timeframe === tf ? "#00d395" : "transparent",
                                    color: timeframe === tf ? "#000" : "#5c5c6b",
                                    fontSize: "10px",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    transition: "all 0.15s ease",
                                }}
                            >
                                {tf}
                            </motion.button>
                        ))}
                    </div>

                    <div style={{ flex: 1 }} />

                    {/* OHLC Info - Animated */}
                    <motion.div
                        key={hoveredCandle}
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 1 }}
                        style={{ display: "flex", gap: "14px", fontSize: "10px" }}
                    >
                        {[
                            { label: "O", value: displayCandle.open.toFixed(2) },
                            { label: "H", value: displayCandle.high.toFixed(2), color: "#00d395" },
                            { label: "L", value: displayCandle.low.toFixed(2), color: "#ff5252" },
                            { label: "C", value: displayCandle.close.toFixed(2), color: displayCandle.isBullish ? "#00d395" : "#ff5252" },
                            { label: "Vol", value: displayCandle.volume.toFixed(0), color: "#5c6bc0" },
                        ].map(({ label, value, color }) => (
                            <span key={label}>
                                <span style={{ color: "#5c5c6b" }}>{label}: </span>
                                <span style={{ color: color || "#c0c0c8", fontFamily: "'SF Mono', monospace", fontWeight: "500" }}>{value}</span>
                            </span>
                        ))}
                    </motion.div>
                </div>

                {/* Indicators Panel */}
                <AnimatePresence>
                    {showIndicators && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            style={{
                                overflow: "hidden",
                                borderBottom: "1px solid #1e1e24",
                                background: "#101014",
                            }}
                        >
                            <div style={{ display: "flex", gap: "6px", padding: "8px 12px", flexWrap: "wrap" }}>
                                {indicators.map((ind) => (
                                    <motion.button
                                        key={ind.id}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => toggleIndicator(ind.id)}
                                        style={{
                                            padding: "5px 12px",
                                            borderRadius: "14px",
                                            border: enabledIndicators.includes(ind.id)
                                                ? `1px solid ${ind.color}`
                                                : "1px solid #2a2a32",
                                            background: enabledIndicators.includes(ind.id)
                                                ? `${ind.color}15`
                                                : "#16161a",
                                            color: enabledIndicators.includes(ind.id) ? ind.color : "#5c5c6b",
                                            fontSize: "10px",
                                            fontWeight: "600",
                                            cursor: "pointer",
                                            transition: "all 0.2s ease",
                                        }}
                                    >
                                        {ind.name}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Chart Canvas */}
                <div
                    ref={chartRef}
                    style={{ flex: 1, position: "relative", minHeight: 0, cursor: selectedTool === "crosshair" ? "crosshair" : "default" }}
                    onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setMousePos({
                            x: e.clientX - rect.left,
                            y: e.clientY - rect.top,
                        });
                        setHoveredCandle(getCandleIndex(e.clientX));
                    }}
                    onMouseLeave={() => {
                        setMousePos(null);
                        setHoveredCandle(null);
                    }}
                >
                    <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
                        <defs>
                            <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor={isPositive ? "#00d395" : "#ff5252"} stopOpacity="0.25" />
                                <stop offset="100%" stopColor={isPositive ? "#00d395" : "#ff5252"} stopOpacity="0.02" />
                            </linearGradient>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Grid Lines */}
                        {[0.2, 0.4, 0.6, 0.8].map((y) => (
                            <line key={y} x1="0%" y1={`${y * 100}%`} x2="96%" y2={`${y * 100}%`} stroke="#1a1a1f" strokeWidth="1" />
                        ))}

                        {/* EMA Line (if enabled) */}
                        {enabledIndicators.includes("ema") && (
                            <path
                                d={`M ${candles.map((c, i) => {
                                    const x = ((i + 0.5) / candles.length) * 96;
                                    const emaPrice = c.close * 0.98;
                                    const y = priceToY(emaPrice);
                                    return `${x},${y}`;
                                }).join(' L ')}`}
                                stroke="#42a5f5"
                                strokeWidth="1.5"
                                fill="none"
                                opacity="0.7"
                            />
                        )}

                        {/* MA Line (if enabled) */}
                        {enabledIndicators.includes("ma") && (
                            <path
                                d={`M ${candles.map((c, i) => {
                                    const x = ((i + 0.5) / candles.length) * 96;
                                    const maPrice = c.close * 1.01;
                                    const y = priceToY(maPrice);
                                    return `${x},${y}`;
                                }).join(' L ')}`}
                                stroke="#ffa726"
                                strokeWidth="1.5"
                                fill="none"
                                opacity="0.7"
                            />
                        )}

                        {/* Candles or Line/Area */}
                        {chartType === "candle" ? (
                            candles.map((candle, i) => {
                                const width = 96 / candles.length;
                                const x = i * width + width / 2;

                                const openY = priceToY(candle.open);
                                const closeY = priceToY(candle.close);
                                const highY = priceToY(candle.high);
                                const lowY = priceToY(candle.low);
                                const color = candle.isBullish ? "#00d395" : "#ff5252";
                                const isHovered = hoveredCandle === i;

                                return (
                                    <g key={i} style={{ filter: isHovered ? "url(#glow)" : "none" }}>
                                        <line
                                            x1={`${x}%`}
                                            y1={`${highY}%`}
                                            x2={`${x}%`}
                                            y2={`${lowY}%`}
                                            stroke={color}
                                            strokeWidth={isHovered ? "2" : "1"}
                                        />
                                        <rect
                                            x={`${x - width * 0.35}%`}
                                            y={`${Math.min(openY, closeY)}%`}
                                            width={`${width * 0.7}%`}
                                            height={`${Math.max(Math.abs(openY - closeY), 0.3)}%`}
                                            fill={color}
                                            opacity={isHovered ? 1 : 0.9}
                                        />
                                    </g>
                                );
                            })
                        ) : (
                            <>
                                {chartType === "area" && (
                                    <path
                                        d={`M ${candles.map((c, i) => {
                                            const x = ((i + 0.5) / candles.length) * 96;
                                            const y = priceToY(c.close);
                                            return `${x},${y}`;
                                        }).join(' L ')} L 96,88 L 0,88 Z`}
                                        fill="url(#areaGrad)"
                                    />
                                )}
                                <path
                                    d={`M ${candles.map((c, i) => {
                                        const x = ((i + 0.5) / candles.length) * 96;
                                        const y = priceToY(c.close);
                                        return `${x},${y}`;
                                    }).join(' L ')}`}
                                    stroke={isPositive ? "#00d395" : "#ff5252"}
                                    strokeWidth="2"
                                    fill="none"
                                    filter="url(#glow)"
                                />
                            </>
                        )}
                    </svg>

                    {/* Crosshair */}
                    {selectedTool === "crosshair" && mousePos && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.6 }}
                                style={{
                                    position: "absolute",
                                    left: 0,
                                    right: "4%",
                                    top: mousePos.y,
                                    height: "1px",
                                    background: "linear-gradient(to right, transparent, #5c5c6b, transparent)",
                                    pointerEvents: "none",
                                }}
                            />
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.6 }}
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    bottom: 0,
                                    left: mousePos.x,
                                    width: "1px",
                                    background: "linear-gradient(to bottom, transparent, #5c5c6b, transparent)",
                                    pointerEvents: "none",
                                }}
                            />
                            {/* Price label on crosshair */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{
                                    position: "absolute",
                                    right: "4%",
                                    top: mousePos.y,
                                    transform: "translateY(-50%)",
                                    padding: "2px 6px",
                                    borderRadius: "3px",
                                    background: "#2a2a32",
                                    color: "#fff",
                                    fontSize: "9px",
                                    fontFamily: "monospace",
                                    pointerEvents: "none",
                                }}
                            >
                                {chartRef.current && (
                                    (priceRange.max - (mousePos.y / chartRef.current.clientHeight) * (priceRange.max - priceRange.min)).toFixed(2)
                                )}
                            </motion.div>
                        </>
                    )}

                    {/* Current Price Line */}
                    <div style={{
                        position: "absolute",
                        right: "4%",
                        top: `${priceToY(currentPrice)}%`,
                        display: "flex",
                        alignItems: "center",
                        width: "96%",
                        transform: "translateY(-50%)",
                    }}>
                        <div style={{
                            flex: 1,
                            height: "1px",
                            background: `repeating-linear-gradient(to right, ${isPositive ? "#00d395" : "#ff5252"} 0, ${isPositive ? "#00d395" : "#ff5252"} 4px, transparent 4px, transparent 8px)`,
                        }} />
                    </div>

                    {/* Price Scale */}
                    <div style={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                        bottom: 0,
                        width: "4%",
                        minWidth: "55px",
                        background: "#101014",
                        borderLeft: "1px solid #1e1e24",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: "10px 4px",
                        fontSize: "9px",
                        color: "#5c5c6b",
                        fontFamily: "'SF Mono', monospace",
                    }}>
                        <span>{priceRange.max.toFixed(2)}</span>
                        <motion.div
                            animate={{
                                backgroundColor: isPositive ? "#00d395" : "#ff5252"
                            }}
                            style={{
                                padding: "3px 6px",
                                borderRadius: "3px",
                                color: "#000",
                                fontWeight: "600",
                                fontSize: "10px",
                            }}
                        >
                            {currentPrice.toFixed(2)}
                        </motion.div>
                        <span>{priceRange.min.toFixed(2)}</span>
                    </div>

                    {/* Draggable Quick Order Overlay */}
                    <motion.div
                        drag
                        dragMomentum={false}
                        dragConstraints={chartRef}
                        initial={{ x: 100, y: 150 }}
                        style={{
                            position: "absolute",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            padding: "6px 8px",
                            background: "rgba(16, 16, 20, 0.92)",
                            backdropFilter: "blur(8px)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "8px",
                            cursor: "grab",
                            userSelect: "none",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                            zIndex: 50,
                        }}
                        whileDrag={{ cursor: "grabbing", scale: 1.02 }}
                    >
                        {/* Market Buy Button */}
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleQuickOrder("long")}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: "8px 16px",
                                borderRadius: "6px",
                                border: "none",
                                background: "#00d395",
                                cursor: "pointer",
                                minWidth: "85px",
                            }}
                        >
                            <span style={{ fontSize: "9px", color: "rgba(0,0,0,0.7)", fontWeight: "500" }}>Market Buy</span>
                            <span style={{ fontSize: "12px", color: "#000", fontWeight: "700", fontFamily: "monospace" }}>
                                {bestBid.toLocaleString()}
                            </span>
                        </motion.button>

                        {/* Amount Input */}
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            background: "#16161a",
                            borderRadius: "6px",
                            padding: "4px 8px",
                        }}>
                            <span style={{ fontSize: "9px", color: "#5c5c6b", marginBottom: "2px" }}>Amount ({asset})</span>
                            <input
                                type="number"
                                value={quickAmount}
                                onChange={(e) => setQuickAmount(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                                onMouseDown={(e) => e.stopPropagation()}
                                placeholder="0.00"
                                style={{
                                    width: "80px",
                                    padding: "4px 6px",
                                    borderRadius: "4px",
                                    border: "1px solid #2a2a32",
                                    background: "#0b0b0e",
                                    color: "#fff",
                                    fontSize: "12px",
                                    fontFamily: "monospace",
                                    textAlign: "center",
                                    outline: "none",
                                }}
                            />
                        </div>

                        {/* Market Sell Button */}
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleQuickOrder("short")}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: "8px 16px",
                                borderRadius: "6px",
                                border: "none",
                                background: "#ff5252",
                                cursor: "pointer",
                                minWidth: "85px",
                            }}
                        >
                            <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.7)", fontWeight: "500" }}>Market Sell</span>
                            <span style={{ fontSize: "12px", color: "#fff", fontWeight: "700", fontFamily: "monospace" }}>
                                {bestAsk.toLocaleString()}
                            </span>
                        </motion.button>
                    </motion.div>
                </div>

                {/* Volume Section (if enabled) */}
                <AnimatePresence>
                    {enabledIndicators.includes("vol") && (
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "80px" }}
                            exit={{ height: 0 }}
                            style={{
                                overflow: "hidden",
                                borderTop: "1px solid #1e1e24",
                                position: "relative",
                            }}
                        >
                            {/* Volume SMA 9 Label */}
                            <div style={{
                                position: "absolute",
                                top: "4px",
                                left: "8px",
                                fontSize: "10px",
                                color: "#5c5c6b",
                                zIndex: 10,
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                            }}>
                                <span>Volume</span>
                                <span style={{ color: "#ffa726" }}>SMA 9</span>
                                <span style={{ color: "#00d395", fontFamily: "monospace" }}>
                                    {(candles.reduce((sum, c) => sum + c.volume, 0) / candles.length / 1000).toFixed(1)}K
                                </span>
                            </div>

                            {/* Volume Value on right */}
                            <div style={{
                                position: "absolute",
                                top: "4px",
                                right: "60px",
                                fontSize: "10px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-end",
                                gap: "2px",
                            }}>
                                <span style={{ color: "#5c5c6b" }}>{(Math.max(...candles.map(c => c.volume)) / 1000000).toFixed(1)}M</span>
                            </div>

                            {/* Volume Bars */}
                            <div style={{
                                display: "flex",
                                alignItems: "flex-end",
                                height: "calc(100% - 20px)",
                                marginTop: "18px",
                                paddingRight: "4%",
                                paddingLeft: "4px",
                                gap: "1px",
                            }}>
                                {candles.map((candle, i) => {
                                    const maxVol = Math.max(...candles.map(c => c.volume));
                                    const height = (candle.volume / maxVol) * 100;
                                    const isHovered = hoveredCandle === i;
                                    return (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0 }}
                                            animate={{ height: `${height}%` }}
                                            transition={{ delay: i * 0.003, duration: 0.3 }}
                                            style={{
                                                flex: 1,
                                                background: candle.isBullish
                                                    ? isHovered ? "#00d395" : "rgba(0, 211, 149, 0.5)"
                                                    : isHovered ? "#ff5252" : "rgba(255, 82, 82, 0.5)",
                                                borderRadius: "1px 1px 0 0",
                                                transition: "background 0.1s ease",
                                                minWidth: "2px",
                                            }}
                                        />
                                    );
                                })}
                            </div>

                            {/* Volume Scale on right */}
                            <div style={{
                                position: "absolute",
                                right: 0,
                                top: 0,
                                bottom: 0,
                                width: "4%",
                                minWidth: "55px",
                                background: "#101014",
                                borderLeft: "1px solid #1e1e24",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                padding: "20px 4px 4px",
                                fontSize: "8px",
                                color: "#5c5c6b",
                            }}>
                                <span>{(Math.max(...candles.map(c => c.volume)) / 1000000).toFixed(0)}M</span>
                                <span>0</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Timeline / Date Axis */}
                <div style={{
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingLeft: "4px",
                    paddingRight: "4%",
                    borderTop: "1px solid #1e1e24",
                    background: "#0b0b0e",
                    fontSize: "9px",
                    color: "#5c5c6b",
                }}>
                    {/* Generate date labels based on candle count */}
                    {(() => {
                        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                        const now = new Date();
                        const labels: { text: string; position: number }[] = [];
                        const labelCount = Math.min(8, candles.length);

                        for (let i = 0; i < labelCount; i++) {
                            const candleIndex = Math.floor((i / (labelCount - 1)) * (candles.length - 1));
                            const daysBack = candles.length - candleIndex;
                            const date = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);
                            const text = date.getDate() === 1 || i === 0
                                ? months[date.getMonth()]
                                : date.getDate().toString();
                            labels.push({ text, position: (candleIndex / candles.length) * 100 });
                        }

                        return labels.map((label, i) => (
                            <span
                                key={i}
                                style={{
                                    position: "absolute",
                                    left: `${label.position}%`,
                                    transform: "translateX(-50%)",
                                    fontFamily: "monospace",
                                }}
                            >
                                {label.text}
                            </span>
                        ));
                    })()}

                    {/* Spacer for right side */}
                    <div style={{ width: "4%", minWidth: "55px" }} />
                </div>
            </div>
        </div>
    );
}

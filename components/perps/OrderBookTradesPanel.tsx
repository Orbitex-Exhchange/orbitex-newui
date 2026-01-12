"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OrderBookEntry {
    price: number;
    size: number;
    total: number;
}

interface RecentTrade {
    price: number;
    size: number;
    side: "buy" | "sell";
    time: string;
}

interface OrderBookTradesPanelProps {
    currentPrice?: number;
    onPriceClick?: (price: number) => void;
    onSizeClick?: (size: number) => void;
}

const generateOrders = (basePrice: number, isAsk: boolean): OrderBookEntry[] => {
    const orders: OrderBookEntry[] = [];
    let cumTotal = 0;
    for (let i = 0; i < 14; i++) {
        const offset = (i + 1) * (isAsk ? 0.1 : -0.1) * (basePrice * 0.001);
        const price = basePrice + offset;
        const size = 0.5 + Math.random() * 15;
        cumTotal += size * price;
        orders.push({ price, size, total: cumTotal });
    }
    return orders;
};

const generateTrades = (basePrice: number): RecentTrade[] => {
    const trades: RecentTrade[] = [];
    for (let i = 0; i < 25; i++) {
        trades.push({
            price: basePrice + (Math.random() - 0.5) * 2,
            size: 0.01 + Math.random() * 3,
            side: Math.random() > 0.5 ? "buy" : "sell",
            time: `${String(14 - Math.floor(i / 4)).padStart(2, '0')}:${String(59 - (i * 3) % 60).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
        });
    }
    return trades;
};

export default function OrderBookTradesPanel({
    currentPrice = 3325.60,
    onPriceClick,
    onSizeClick: _onSizeClick,
}: OrderBookTradesPanelProps) {
    const [activeTab, setActiveTab] = useState<"book" | "trades">("book");
    const [precision, setPrecision] = useState(2);
    const [displayMode, setDisplayMode] = useState<"both" | "bids" | "asks">("both");
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);
    const [lastClickedPrice, setLastClickedPrice] = useState<number | null>(null);

    const asks = generateOrders(currentPrice, true);
    const bids = generateOrders(currentPrice, false);
    const trades = generateTrades(currentPrice);

    const maxTotal = Math.max(...asks.map(a => a.total), ...bids.map(b => b.total));
    const spread = asks[0].price - bids[0].price;
    const spreadPercent = (spread / currentPrice) * 100;

    const handlePriceClick = (price: number) => {
        setLastClickedPrice(price);
        onPriceClick?.(price);
        setTimeout(() => setLastClickedPrice(null), 300);
    };

    return (
        <div style={{
            height: "100%",
            background: "#0b0b0e",
            display: "flex",
            flexDirection: "column",
            fontSize: "11px",
        }}>
            {/* Header Tabs */}
            <div style={{
                display: "flex",
                borderBottom: "1px solid #1e1e24",
                background: "#101014",
            }}>
                {[
                    { id: "book" as const, label: "Order Book" },
                    { id: "trades" as const, label: "Trades" },
                ].map((tab) => (
                    <motion.button
                        key={tab.id}
                        whileHover={{ backgroundColor: "#16161a" }}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            flex: 1,
                            padding: "10px",
                            border: "none",
                            background: "transparent",
                            color: activeTab === tab.id ? "#fff" : "#5c5c6b",
                            fontSize: "11px",
                            fontWeight: "600",
                            cursor: "pointer",
                            borderBottom: activeTab === tab.id ? "2px solid #00d395" : "2px solid transparent",
                            transition: "all 0.15s ease",
                        }}
                    >
                        {tab.label}
                    </motion.button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {activeTab === "book" ? (
                    <motion.div
                        key="book"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}
                    >
                        {/* Controls Row */}
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "6px 8px",
                            borderBottom: "1px solid #1e1e24",
                        }}>
                            {/* Display Mode Icons */}
                            <div style={{ display: "flex", gap: "2px" }}>
                                {[
                                    { mode: "both" as const, icon: "▥" },
                                    { mode: "bids" as const, icon: "▤" },
                                    { mode: "asks" as const, icon: "▧" },
                                ].map(({ mode, icon }) => (
                                    <motion.button
                                        key={mode}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setDisplayMode(mode)}
                                        style={{
                                            width: "24px",
                                            height: "24px",
                                            borderRadius: "4px",
                                            border: "none",
                                            background: displayMode === mode ? "#2a2a32" : "transparent",
                                            color: displayMode === mode ? "#fff" : "#5c5c6b",
                                            fontSize: "12px",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        {icon}
                                    </motion.button>
                                ))}
                            </div>

                            {/* Precision */}
                            <div style={{ display: "flex", gap: "2px" }}>
                                {[0, 1, 2].map(p => (
                                    <motion.button
                                        key={p}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setPrecision(p)}
                                        style={{
                                            padding: "3px 8px",
                                            borderRadius: "4px",
                                            border: "none",
                                            background: precision === p ? "#00d395" : "#16161a",
                                            color: precision === p ? "#000" : "#5c5c6b",
                                            fontSize: "9px",
                                            fontWeight: "600",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {p === 0 ? "1" : p === 1 ? ".1" : ".01"}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Column Headers */}
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr",
                            padding: "6px 8px",
                            color: "#5c5c6b",
                            fontSize: "9px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            fontWeight: "600",
                        }}>
                            <span>Price</span>
                            <span style={{ textAlign: "right" }}>Size</span>
                            <span style={{ textAlign: "right" }}>Total</span>
                        </div>

                        {/* Asks - Red */}
                        {(displayMode === "both" || displayMode === "asks") && (
                            <div style={{
                                flex: displayMode === "asks" ? 1 : undefined,
                                height: displayMode === "both" ? "40%" : undefined,
                                overflow: "hidden",
                                display: "flex",
                                flexDirection: "column-reverse"
                            }}>
                                {asks.slice(0, displayMode === "asks" ? 20 : 10).reverse().map((order, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.02 }}
                                        onClick={() => handlePriceClick(order.price)}
                                        onMouseEnter={() => setHoveredRow(i)}
                                        onMouseLeave={() => setHoveredRow(null)}
                                        style={{
                                            position: "relative",
                                            display: "grid",
                                            gridTemplateColumns: "1fr 1fr 1fr",
                                            padding: "3px 8px",
                                            cursor: "pointer",
                                            backgroundColor: hoveredRow === i ? "rgba(255, 82, 82, 0.08)" : "transparent",
                                            transition: "background-color 0.1s ease",
                                        }}
                                    >
                                        <motion.div
                                            style={{
                                                position: "absolute",
                                                top: 0,
                                                right: 0,
                                                bottom: 0,
                                                background: "rgba(255, 82, 82, 0.12)",
                                                pointerEvents: "none",
                                            }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(order.total / maxTotal) * 100}%` }}
                                            transition={{ duration: 0.3 }}
                                        />
                                        <motion.span
                                            style={{
                                                color: lastClickedPrice === order.price ? "#fff" : "#ff5252",
                                                position: "relative",
                                                fontFamily: "'SF Mono', monospace",
                                                fontWeight: "500",
                                            }}
                                            animate={{ scale: lastClickedPrice === order.price ? [1, 1.1, 1] : 1 }}
                                        >
                                            {order.price.toFixed(2)}
                                        </motion.span>
                                        <span style={{ textAlign: "right", color: "#c0c0c8", position: "relative", fontFamily: "'SF Mono', monospace" }}>
                                            {order.size.toFixed(4)}
                                        </span>
                                        <span style={{ textAlign: "right", color: "#5c5c6b", position: "relative", fontFamily: "'SF Mono', monospace" }}>
                                            {(order.total / 1000).toFixed(1)}K
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* Spread / Current Price */}
                        {displayMode === "both" && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{
                                    padding: "10px 8px",
                                    background: "#101014",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "16px",
                                    borderTop: "1px solid #1e1e24",
                                    borderBottom: "1px solid #1e1e24",
                                }}
                            >
                                <motion.span
                                    key={currentPrice}
                                    initial={{ scale: 0.95, opacity: 0.5 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: "700",
                                        color: "#00d395",
                                        fontFamily: "'SF Mono', monospace",
                                    }}
                                >
                                    {currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </motion.span>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "2px" }}>
                                    <span style={{ fontSize: "9px", color: "#5c5c6b" }}>Spread</span>
                                    <span style={{ fontSize: "10px", color: "#a0a0a8", fontFamily: "monospace" }}>
                                        {spread.toFixed(2)} ({spreadPercent.toFixed(3)}%)
                                    </span>
                                </div>
                            </motion.div>
                        )}

                        {/* Bids - Green */}
                        {(displayMode === "both" || displayMode === "bids") && (
                            <div style={{
                                flex: displayMode === "bids" ? 1 : 1,
                                overflow: "hidden"
                            }}>
                                {bids.slice(0, displayMode === "bids" ? 20 : 10).map((order, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.02 }}
                                        onClick={() => handlePriceClick(order.price)}
                                        onMouseEnter={() => setHoveredRow(100 + i)}
                                        onMouseLeave={() => setHoveredRow(null)}
                                        style={{
                                            position: "relative",
                                            display: "grid",
                                            gridTemplateColumns: "1fr 1fr 1fr",
                                            padding: "3px 8px",
                                            cursor: "pointer",
                                            backgroundColor: hoveredRow === 100 + i ? "rgba(0, 211, 149, 0.08)" : "transparent",
                                            transition: "background-color 0.1s ease",
                                        }}
                                    >
                                        <motion.div
                                            style={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                bottom: 0,
                                                background: "rgba(0, 211, 149, 0.12)",
                                                pointerEvents: "none",
                                            }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(order.total / maxTotal) * 100}%` }}
                                            transition={{ duration: 0.3 }}
                                        />
                                        <motion.span
                                            style={{
                                                color: lastClickedPrice === order.price ? "#fff" : "#00d395",
                                                position: "relative",
                                                fontFamily: "'SF Mono', monospace",
                                                fontWeight: "500",
                                            }}
                                            animate={{ scale: lastClickedPrice === order.price ? [1, 1.1, 1] : 1 }}
                                        >
                                            {order.price.toFixed(2)}
                                        </motion.span>
                                        <span style={{ textAlign: "right", color: "#c0c0c8", position: "relative", fontFamily: "'SF Mono', monospace" }}>
                                            {order.size.toFixed(4)}
                                        </span>
                                        <span style={{ textAlign: "right", color: "#5c5c6b", position: "relative", fontFamily: "'SF Mono', monospace" }}>
                                            {(order.total / 1000).toFixed(1)}K
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        key="trades"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}
                    >
                        {/* Trades Header */}
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr",
                            padding: "8px",
                            color: "#5c5c6b",
                            fontSize: "9px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            fontWeight: "600",
                            borderBottom: "1px solid #1e1e24",
                        }}>
                            <span>Price</span>
                            <span style={{ textAlign: "right" }}>Size</span>
                            <span style={{ textAlign: "right" }}>Time</span>
                        </div>

                        {/* Trades List */}
                        <div style={{ flex: 1, overflow: "auto" }}>
                            {trades.map((trade, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.015 }}
                                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr 1fr",
                                        padding: "4px 8px",
                                        fontFamily: "'SF Mono', monospace",
                                        transition: "background-color 0.1s ease",
                                    }}
                                >
                                    <motion.span
                                        style={{ color: trade.side === "buy" ? "#00d395" : "#ff5252", fontWeight: "500" }}
                                        initial={{ x: trade.side === "buy" ? -5 : 5 }}
                                        animate={{ x: 0 }}
                                    >
                                        {trade.price.toFixed(2)}
                                    </motion.span>
                                    <span style={{ textAlign: "right", color: "#c0c0c8" }}>{trade.size.toFixed(4)}</span>
                                    <span style={{ textAlign: "right", color: "#5c5c6b" }}>{trade.time}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TradePanelProps {
    market?: string;
    currentPrice?: number;
    bestBid?: number;
    bestAsk?: number;
    onOrderSubmit?: (order: Order) => void;
}

interface Order {
    market: string;
    side: "long" | "short";
    type: string;
    price?: number;
    size: number;
    leverage: number;
    reduceOnly: boolean;
    postOnly: boolean;
    tif: string;
    tp?: number;
    sl?: number;
}

export default function TradePanel({
    market = "ETH-USD",
    currentPrice = 3325.60,
    bestBid = 3325.40,
    bestAsk = 3325.80,
    onOrderSubmit,
}: TradePanelProps) {
    // Order state
    const [side, setSide] = useState<"long" | "short">("long");
    const [orderType, setOrderType] = useState<"market" | "limit" | "stop-limit" | "stop-market">("limit");
    const [marginMode, setMarginMode] = useState<"cross" | "isolated">("cross");
    const [leverage, setLeverage] = useState(20);
    const [showLeverageModal, setShowLeverageModal] = useState(false);

    // Inputs
    const [price, setPrice] = useState(currentPrice.toString());
    const [stopPrice, setStopPrice] = useState("");
    const [size, setSize] = useState("");
    const [sizeUnit, setSizeUnit] = useState<"asset" | "usd">("asset");

    // Order options
    const [showTPSL, setShowTPSL] = useState(false);
    const [tp, setTp] = useState("");
    const [sl, setSl] = useState("");
    const [reduceOnly, setReduceOnly] = useState(false);
    const [postOnly, setPostOnly] = useState(false);
    const [tif, setTif] = useState<"gtc" | "ioc" | "fok">("gtc");

    const isLong = side === "long";
    const asset = market.split("-")[0];

    // Calculations
    const entryPrice = useMemo(() => {
        if (orderType === "market") return isLong ? bestAsk : bestBid;
        return parseFloat(price) || currentPrice;
    }, [orderType, price, currentPrice, isLong, bestAsk, bestBid]);

    const positionSize = useMemo(() => {
        const s = parseFloat(size) || 0;
        return sizeUnit === "usd" ? s / entryPrice : s;
    }, [size, sizeUnit, entryPrice]);

    const notionalValue = positionSize * entryPrice;
    const marginRequired = notionalValue / leverage;
    const fee = notionalValue * 0.0005; // 0.05% taker fee
    const liquidationPrice = useMemo(() => {
        if (positionSize === 0) return 0;
        const maintenanceMargin = 0.005; // 0.5%
        if (isLong) {
            return entryPrice * (1 - (1 / leverage) + maintenanceMargin);
        } else {
            return entryPrice * (1 + (1 / leverage) - maintenanceMargin);
        }
    }, [entryPrice, leverage, isLong, positionSize]);

    const maxSize = 10000 / entryPrice; // Mock max based on $10k margin

    const handleBBO = () => {
        setPrice((isLong ? bestAsk : bestBid).toString());
    };

    const handleSizePercent = (pct: number) => {
        setSize((maxSize * pct / 100).toFixed(4));
        setSizeUnit("asset");
    };

    const handleSubmit = () => {
        const order: Order = {
            market,
            side,
            type: orderType,
            price: orderType !== "market" ? parseFloat(price) : undefined,
            size: positionSize,
            leverage,
            reduceOnly,
            postOnly,
            tif,
            tp: showTPSL && tp ? parseFloat(tp) : undefined,
            sl: showTPSL && sl ? parseFloat(sl) : undefined,
        };
        console.log("Order submitted:", order);
        onOrderSubmit?.(order);
    };

    return (
        <div style={{
            height: "100%",
            background: "#0b0b0e",
            display: "flex",
            flexDirection: "column",
            fontSize: "11px",
            position: "relative",
        }}>
            {/* Margin Mode & Leverage */}
            <div style={{ display: "flex", padding: "8px", gap: "6px", borderBottom: "1px solid #1e1e24" }}>
                {/* Cross/Isolated Toggle */}
                <div style={{ display: "flex", background: "#16161a", borderRadius: "4px", overflow: "hidden" }}>
                    {(["cross", "isolated"] as const).map((mode) => (
                        <button
                            key={mode}
                            onClick={() => setMarginMode(mode)}
                            style={{
                                padding: "6px 10px",
                                border: "none",
                                background: marginMode === mode ? "#2a2a32" : "transparent",
                                color: marginMode === mode ? "#fff" : "#5c5c6b",
                                fontSize: "10px",
                                fontWeight: "600",
                                textTransform: "capitalize",
                                cursor: "pointer",
                            }}
                        >
                            {mode}
                        </button>
                    ))}
                </div>

                {/* Leverage Button */}
                <button
                    onClick={() => setShowLeverageModal(true)}
                    style={{
                        padding: "6px 12px",
                        borderRadius: "4px",
                        border: "1px solid #00d395",
                        background: "rgba(0, 211, 149, 0.1)",
                        color: "#00d395",
                        fontSize: "11px",
                        fontWeight: "600",
                        cursor: "pointer",
                    }}
                >
                    {leverage}x
                </button>
            </div>

            {/* Long/Short Toggle */}
            <div style={{ display: "flex", padding: "8px", gap: "4px" }}>
                <motion.button
                    onClick={() => setSide("long")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    animate={{
                        background: isLong ? "#00d395" : "#16161a",
                        boxShadow: isLong ? "0 0 20px rgba(0, 211, 149, 0.4)" : "none",
                    }}
                    style={{
                        flex: 1,
                        padding: "10px",
                        borderRadius: "6px",
                        border: "none",
                        fontWeight: "600",
                        fontSize: "12px",
                        cursor: "pointer",
                        color: isLong ? "#000" : "#5c5c6b",
                    }}
                >
                    Long
                </motion.button>
                <motion.button
                    onClick={() => setSide("short")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    animate={{
                        background: !isLong ? "#ff5252" : "#16161a",
                        boxShadow: !isLong ? "0 0 20px rgba(255, 82, 82, 0.4)" : "none",
                    }}
                    style={{
                        flex: 1,
                        padding: "10px",
                        borderRadius: "6px",
                        border: "none",
                        fontWeight: "600",
                        fontSize: "12px",
                        cursor: "pointer",
                        color: !isLong ? "#fff" : "#5c5c6b",
                    }}
                >
                    Short
                </motion.button>
            </div>

            {/* Order Type Tabs */}
            <div style={{ display: "flex", padding: "0 8px 8px", gap: "2px", flexWrap: "wrap" }}>
                {(["market", "limit", "stop-limit", "stop-market"] as const).map((type) => (
                    <button
                        key={type}
                        onClick={() => setOrderType(type)}
                        style={{
                            padding: "5px 8px",
                            borderRadius: "4px",
                            border: "none",
                            fontSize: "10px",
                            fontWeight: "500",
                            cursor: "pointer",
                            background: orderType === type ? "#2a2a32" : "transparent",
                            color: orderType === type ? "#fff" : "#5c5c6b",
                            textTransform: "capitalize",
                        }}
                    >
                        {type.replace("-", " ")}
                    </button>
                ))}
            </div>

            <div style={{ flex: 1, overflow: "auto", padding: "0 8px" }}>
                {/* Stop Price (for stop orders) */}
                {(orderType === "stop-limit" || orderType === "stop-market") && (
                    <div style={{ marginBottom: "8px" }}>
                        <label style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#5c5c6b", marginBottom: "4px" }}>
                            <span>TRIGGER PRICE</span>
                        </label>
                        <input
                            type="number"
                            value={stopPrice}
                            onChange={(e) => setStopPrice(e.target.value)}
                            placeholder="0.00"
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "6px",
                                border: "1px solid #2a2a32",
                                background: "#16161a",
                                color: "#fff",
                                fontSize: "13px",
                                fontFamily: "monospace",
                                outline: "none",
                            }}
                        />
                    </div>
                )}

                {/* Price Input */}
                {orderType !== "market" && orderType !== "stop-market" && (
                    <div style={{ marginBottom: "8px" }}>
                        <label style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#5c5c6b", marginBottom: "4px" }}>
                            <span>PRICE</span>
                            <button
                                onClick={handleBBO}
                                style={{
                                    padding: "2px 6px",
                                    borderRadius: "3px",
                                    border: "1px solid #00d395",
                                    background: "transparent",
                                    color: "#00d395",
                                    fontSize: "9px",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                }}
                            >
                                BBO
                            </button>
                        </label>
                        <div style={{ position: "relative" }}>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    paddingRight: "45px",
                                    borderRadius: "6px",
                                    border: "1px solid #2a2a32",
                                    background: "#16161a",
                                    color: "#fff",
                                    fontSize: "13px",
                                    fontFamily: "monospace",
                                    outline: "none",
                                }}
                            />
                            <span style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", color: "#5c5c6b", fontSize: "10px" }}>USD</span>
                        </div>
                    </div>
                )}

                {/* Size Input */}
                <div style={{ marginBottom: "8px" }}>
                    <label style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#5c5c6b", marginBottom: "4px" }}>
                        <span>SIZE</span>
                        <div style={{ display: "flex", gap: "2px" }}>
                            {(["asset", "usd"] as const).map((unit) => (
                                <button
                                    key={unit}
                                    onClick={() => setSizeUnit(unit)}
                                    style={{
                                        padding: "2px 6px",
                                        borderRadius: "3px",
                                        border: "none",
                                        background: sizeUnit === unit ? "#2a2a32" : "transparent",
                                        color: sizeUnit === unit ? "#fff" : "#5c5c6b",
                                        fontSize: "9px",
                                        cursor: "pointer",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    {unit === "asset" ? asset : "USD"}
                                </button>
                            ))}
                        </div>
                    </label>
                    <div style={{ position: "relative" }}>
                        <input
                            type="number"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            placeholder="0.00"
                            style={{
                                width: "100%",
                                padding: "10px",
                                paddingRight: "45px",
                                borderRadius: "6px",
                                border: "1px solid #2a2a32",
                                background: "#16161a",
                                color: "#fff",
                                fontSize: "13px",
                                fontFamily: "monospace",
                                outline: "none",
                            }}
                        />
                        <span style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", color: "#5c5c6b", fontSize: "10px" }}>
                            {sizeUnit === "asset" ? asset : "USD"}
                        </span>
                    </div>
                    {/* Size Percentage Buttons */}
                    <div style={{ display: "flex", gap: "4px", marginTop: "6px" }}>
                        {[25, 50, 75, 100].map((pct) => (
                            <button
                                key={pct}
                                onClick={() => handleSizePercent(pct)}
                                style={{
                                    flex: 1,
                                    padding: "5px",
                                    borderRadius: "4px",
                                    border: "1px solid #2a2a32",
                                    background: "transparent",
                                    color: "#5c5c6b",
                                    fontSize: "10px",
                                    cursor: "pointer",
                                }}
                            >
                                {pct === 100 ? "Max" : `${pct}%`}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Order Options Row */}
                <div style={{ display: "flex", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
                    {/* TP/SL Toggle */}
                    <label style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>
                        <input
                            type="checkbox"
                            checked={showTPSL}
                            onChange={(e) => setShowTPSL(e.target.checked)}
                            style={{ accentColor: "#00d395" }}
                        />
                        <span style={{ color: "#a0a0a8", fontSize: "10px" }}>TP/SL</span>
                    </label>

                    {/* Reduce Only */}
                    <label style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>
                        <input
                            type="checkbox"
                            checked={reduceOnly}
                            onChange={(e) => setReduceOnly(e.target.checked)}
                            style={{ accentColor: "#00d395" }}
                        />
                        <span style={{ color: "#a0a0a8", fontSize: "10px" }}>Reduce Only</span>
                    </label>

                    {/* Post Only (for limit orders) */}
                    {orderType === "limit" && (
                        <label style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>
                            <input
                                type="checkbox"
                                checked={postOnly}
                                onChange={(e) => setPostOnly(e.target.checked)}
                                style={{ accentColor: "#00d395" }}
                            />
                            <span style={{ color: "#a0a0a8", fontSize: "10px" }}>Post Only</span>
                        </label>
                    )}
                </div>

                {/* TP/SL Inputs */}
                <AnimatePresence>
                    {showTPSL && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            style={{ overflow: "hidden", marginBottom: "8px" }}
                        >
                            <div style={{ display: "flex", gap: "6px" }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: "block", fontSize: "10px", color: "#00d395", marginBottom: "4px" }}>TAKE PROFIT</label>
                                    <input
                                        type="number"
                                        value={tp}
                                        onChange={(e) => setTp(e.target.value)}
                                        placeholder="0.00"
                                        style={{
                                            width: "100%",
                                            padding: "8px",
                                            borderRadius: "4px",
                                            border: "1px solid #2a2a32",
                                            background: "#16161a",
                                            color: "#00d395",
                                            fontSize: "12px",
                                            fontFamily: "monospace",
                                            outline: "none",
                                        }}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: "block", fontSize: "10px", color: "#ff5252", marginBottom: "4px" }}>STOP LOSS</label>
                                    <input
                                        type="number"
                                        value={sl}
                                        onChange={(e) => setSl(e.target.value)}
                                        placeholder="0.00"
                                        style={{
                                            width: "100%",
                                            padding: "8px",
                                            borderRadius: "4px",
                                            border: "1px solid #2a2a32",
                                            background: "#16161a",
                                            color: "#ff5252",
                                            fontSize: "12px",
                                            fontFamily: "monospace",
                                            outline: "none",
                                        }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Time in Force */}
                <div style={{ marginBottom: "10px" }}>
                    <label style={{ display: "block", fontSize: "10px", color: "#5c5c6b", marginBottom: "4px" }}>TIME IN FORCE</label>
                    <div style={{ display: "flex", gap: "4px" }}>
                        {(["gtc", "ioc", "fok"] as const).map((t) => (
                            <button
                                key={t}
                                onClick={() => setTif(t)}
                                style={{
                                    flex: 1,
                                    padding: "6px",
                                    borderRadius: "4px",
                                    border: "none",
                                    background: tif === t ? "#2a2a32" : "#16161a",
                                    color: tif === t ? "#fff" : "#5c5c6b",
                                    fontSize: "10px",
                                    fontWeight: "500",
                                    cursor: "pointer",
                                    textTransform: "uppercase",
                                }}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div style={{
                    padding: "10px",
                    borderRadius: "6px",
                    background: "#16161a",
                    marginBottom: "8px",
                }}>
                    {[
                        { label: "Entry Price", value: `$${entryPrice.toFixed(2)}`, color: "#fff" },
                        { label: "Position Size", value: `${positionSize.toFixed(4)} ${asset}` },
                        { label: "Notional Value", value: `$${notionalValue.toFixed(2)}` },
                        { label: "Margin Required", value: `$${marginRequired.toFixed(2)}` },
                        { label: "Est. Liq. Price", value: positionSize > 0 ? `$${liquidationPrice.toFixed(2)}` : "-", color: "#ff5252" },
                        { label: "Fee (0.05%)", value: `$${fee.toFixed(2)}` },
                    ].map((row) => (
                        <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", fontSize: "10px" }}>
                            <span style={{ color: "#5c5c6b" }}>{row.label}</span>
                            <span style={{ color: row.color || "#a0a0a8", fontFamily: "monospace" }}>{row.value}</span>
                        </div>
                    ))}
                </div>

                {/* Max Size Info */}
                <div style={{ textAlign: "center", marginBottom: "8px", fontSize: "10px", color: "#5c5c6b" }}>
                    Max: <span style={{ color: "#00d395" }}>{maxSize.toFixed(4)} {asset}</span>
                </div>
            </div>

            {/* Submit Button */}
            <div style={{ padding: "8px" }}>
                <motion.button
                    onClick={handleSubmit}
                    disabled={positionSize === 0}
                    whileHover={positionSize > 0 ? { scale: 1.02 } : {}}
                    whileTap={positionSize > 0 ? { scale: 0.98 } : {}}
                    animate={{
                        background: positionSize > 0 ? (isLong ? "#00d395" : "#ff5252") : "#2a2a32",
                        boxShadow: positionSize > 0
                            ? (isLong ? "0 4px 20px rgba(0, 211, 149, 0.5)" : "0 4px 20px rgba(255, 82, 82, 0.5)")
                            : "none",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    style={{
                        width: "100%",
                        padding: "14px",
                        borderRadius: "6px",
                        border: "none",
                        fontWeight: "700",
                        fontSize: "14px",
                        cursor: positionSize > 0 ? "pointer" : "not-allowed",
                        color: positionSize > 0 ? (isLong ? "#000" : "#fff") : "#5c5c6b",
                    }}
                >
                    {isLong ? `Long ${asset}` : `Short ${asset}`}
                </motion.button>
            </div>

            {/* Leverage Modal */}
            <AnimatePresence>
                {showLeverageModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowLeverageModal(false)}
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: "rgba(0,0,0,0.8)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 100,
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                background: "#16161a",
                                border: "1px solid #2a2a32",
                                borderRadius: "12px",
                                padding: "20px",
                                width: "260px",
                            }}
                        >
                            <div style={{ fontSize: "14px", fontWeight: "600", color: "#fff", marginBottom: "16px", textAlign: "center" }}>
                                Adjust Leverage
                            </div>
                            <div style={{ fontSize: "28px", fontWeight: "700", color: "#00d395", textAlign: "center", marginBottom: "16px" }}>
                                {leverage}x
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="100"
                                value={leverage}
                                onChange={(e) => setLeverage(parseInt(e.target.value))}
                                style={{
                                    width: "100%",
                                    height: "6px",
                                    borderRadius: "3px",
                                    background: `linear-gradient(to right, #00d395 0%, #00d395 ${leverage}%, #2a2a32 ${leverage}%, #2a2a32 100%)`,
                                    appearance: "none",
                                    cursor: "pointer",
                                    marginBottom: "12px",
                                }}
                            />
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "4px", marginBottom: "16px" }}>
                                {[1, 5, 10, 25, 50, 75, 100].map((lev) => (
                                    <button
                                        key={lev}
                                        onClick={() => setLeverage(lev)}
                                        style={{
                                            padding: "8px 4px",
                                            borderRadius: "4px",
                                            border: "none",
                                            background: leverage === lev ? "#00d395" : "#0b0b0e",
                                            color: leverage === lev ? "#000" : "#5c5c6b",
                                            fontSize: "11px",
                                            fontWeight: "600",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {lev}x
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setShowLeverageModal(false)}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    borderRadius: "6px",
                                    border: "none",
                                    background: "#00d395",
                                    color: "#000",
                                    fontWeight: "600",
                                    fontSize: "12px",
                                    cursor: "pointer",
                                }}
                            >
                                Confirm
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Mock trading data
const tradingPairs = [
    { pair: "ETH/USD", price: 3325.60, change24h: 0.09, volume: "32.6B", high: 3380, low: 3290 },
    { pair: "BTC/USD", price: 92035, change24h: -0.74, volume: "51.9B", high: 93500, low: 91200 },
    { pair: "SOL/USD", price: 136.30, change24h: -1.30, volume: "4.5B", high: 142, low: 134 },
];

const orderBook = {
    asks: [
        { price: 3328.50, size: 12.5, total: 41606.25 },
        { price: 3327.80, size: 8.2, total: 27287.96 },
        { price: 3327.20, size: 15.7, total: 52237.04 },
        { price: 3326.50, size: 4.1, total: 13638.65 },
        { price: 3326.00, size: 22.3, total: 74169.80 },
    ],
    bids: [
        { price: 3325.60, size: 18.4, total: 61191.04 },
        { price: 3325.00, size: 9.6, total: 31920.00 },
        { price: 3324.50, size: 14.2, total: 47207.90 },
        { price: 3324.00, size: 7.8, total: 25927.20 },
        { price: 3323.50, size: 25.1, total: 83423.85 },
    ],
};

const recentTrades = [
    { price: 3325.60, size: 2.4, side: "buy", time: "14:32:15" },
    { price: 3325.40, size: 1.1, side: "sell", time: "14:32:12" },
    { price: 3325.60, size: 0.8, side: "buy", time: "14:32:08" },
    { price: 3325.50, size: 3.2, side: "buy", time: "14:32:05" },
    { price: 3325.30, size: 1.5, side: "sell", time: "14:32:01" },
];

function PriceChart() {
    return (
        <div style={{
            height: "280px",
            background: "#1A1A1A",
            borderRadius: "16px",
            border: "1px solid #333333",
            position: "relative",
            overflow: "hidden",
        }}>
            {/* Fake chart SVG */}
            <svg width="100%" height="100%" preserveAspectRatio="none" style={{ position: "absolute" }}>
                <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgb(249, 115, 22)" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="rgb(249, 115, 22)" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <path
                    d="M0,200 Q80,180 160,185 T320,160 T480,170 T640,140 T800,150 L800,280 L0,280 Z"
                    fill="url(#chartGradient)"
                />
                <path
                    d="M0,200 Q80,180 160,185 T320,160 T480,170 T640,140 T800,150"
                    stroke="#F97316"
                    strokeWidth="3"
                    fill="none"
                />
            </svg>

            {/* Chart overlay info */}
            <div style={{ position: "absolute", top: "20px", left: "20px", zIndex: 10 }}>
                <div style={{ fontSize: "28px", fontWeight: "bold", color: "#FFFFFF" }}>$3,325.60</div>
                <div style={{ fontSize: "14px", color: "#22C55E" }}>▲ $3.00 (0.09%)</div>
            </div>

            {/* Time labels */}
            <div style={{
                position: "absolute",
                bottom: "10px",
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "space-between",
                padding: "0 20px",
                fontSize: "12px",
                color: "#6B6B6B",
            }}>
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>24:00</span>
            </div>
        </div>
    );
}

function OrderBookRow({ order, type }: { order: typeof orderBook.asks[0]; type: "ask" | "bid" }) {
    const isBid = type === "bid";
    const maxTotal = 80000;
    const fillWidth = (order.total / maxTotal) * 100;

    return (
        <div style={{
            position: "relative",
            padding: "6px 10px",
            fontSize: "13px",
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "monospace",
        }}>
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    right: 0,
                    width: `${fillWidth}%`,
                    background: isBid ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)",
                }}
            />
            <span style={{ position: "relative", zIndex: 10, color: isBid ? "#22C55E" : "#EF4444" }}>
                {order.price.toFixed(2)}
            </span>
            <span style={{ position: "relative", zIndex: 10, color: "#A0A0A0" }}>{order.size.toFixed(2)}</span>
            <span style={{ position: "relative", zIndex: 10, color: "#6B6B6B" }}>{order.total.toFixed(2)}</span>
        </div>
    );
}

export default function TradePage() {
    const [selectedPair, setSelectedPair] = useState(tradingPairs[0]);
    const [orderType, setOrderType] = useState<"market" | "limit">("limit");
    const [side, setSide] = useState<"buy" | "sell">("buy");

    return (
        <div style={{ padding: "24px" }}>
            {/* Header with pair selector */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                <div style={{ display: "flex", gap: "10px" }}>
                    {tradingPairs.map((pair) => (
                        <button
                            key={pair.pair}
                            onClick={() => setSelectedPair(pair)}
                            style={{
                                padding: "10px 18px",
                                borderRadius: "10px",
                                fontSize: "14px",
                                fontWeight: "600",
                                border: "none",
                                cursor: "pointer",
                                background: selectedPair.pair === pair.pair ? "linear-gradient(135deg, #F97316 0%, #EA580C 100%)" : "#1A1A1A",
                                color: selectedPair.pair === pair.pair ? "white" : "#A0A0A0",
                                transition: "all 0.2s ease",
                            }}
                        >
                            {pair.pair}
                        </button>
                    ))}
                </div>

                <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "24px", fontWeight: "bold", color: "#FFFFFF" }}>
                        ${selectedPair.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </div>
                    <div style={{ fontSize: "14px", color: selectedPair.change24h >= 0 ? "#22C55E" : "#EF4444" }}>
                        {selectedPair.change24h >= 0 ? "▲" : "▼"} {Math.abs(selectedPair.change24h).toFixed(2)}%
                    </div>
                </div>
            </div>

            {/* Main trading grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "24px", marginBottom: "24px" }}>
                {/* Chart */}
                <div>
                    <PriceChart />

                    {/* Stats bar */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginTop: "16px" }}>
                        {[
                            { label: "24h Volume", value: selectedPair.volume },
                            { label: "24h High", value: `$${selectedPair.high.toLocaleString()}` },
                            { label: "24h Low", value: `$${selectedPair.low.toLocaleString()}` },
                            { label: "Funding", value: "0.0045%" },
                        ].map((stat) => (
                            <div key={stat.label} style={{
                                padding: "14px",
                                borderRadius: "10px",
                                background: "#1A1A1A",
                                border: "1px solid #333333",
                            }}>
                                <div style={{ fontSize: "12px", color: "#6B6B6B", marginBottom: "4px" }}>{stat.label}</div>
                                <div style={{ fontSize: "16px", fontWeight: "600", color: "#FFFFFF" }}>{stat.value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order form */}
                <div style={{
                    padding: "20px",
                    borderRadius: "16px",
                    background: "#1A1A1A",
                    border: "1px solid #333333",
                }}>
                    {/* Buy/Sell toggle */}
                    <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
                        <button
                            onClick={() => setSide("buy")}
                            style={{
                                flex: 1,
                                padding: "14px",
                                borderRadius: "10px",
                                border: "none",
                                fontWeight: "600",
                                fontSize: "15px",
                                cursor: "pointer",
                                background: side === "buy" ? "#22C55E" : "#262626",
                                color: side === "buy" ? "white" : "#A0A0A0",
                                transition: "all 0.2s ease",
                            }}
                        >
                            Buy
                        </button>
                        <button
                            onClick={() => setSide("sell")}
                            style={{
                                flex: 1,
                                padding: "14px",
                                borderRadius: "10px",
                                border: "none",
                                fontWeight: "600",
                                fontSize: "15px",
                                cursor: "pointer",
                                background: side === "sell" ? "#EF4444" : "#262626",
                                color: side === "sell" ? "white" : "#A0A0A0",
                                transition: "all 0.2s ease",
                            }}
                        >
                            Sell
                        </button>
                    </div>

                    {/* Order type */}
                    <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
                        {(["limit", "market"] as const).map((type) => (
                            <button
                                key={type}
                                onClick={() => setOrderType(type)}
                                style={{
                                    flex: 1,
                                    padding: "10px",
                                    borderRadius: "8px",
                                    border: "none",
                                    fontSize: "13px",
                                    cursor: "pointer",
                                    textTransform: "capitalize",
                                    background: orderType === type ? "#262626" : "transparent",
                                    color: orderType === type ? "#FFFFFF" : "#6B6B6B",
                                    transition: "all 0.2s ease",
                                }}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    {/* Price input */}
                    {orderType === "limit" && (
                        <div style={{ marginBottom: "16px" }}>
                            <label style={{ display: "block", fontSize: "13px", color: "#6B6B6B", marginBottom: "8px" }}>Price</label>
                            <div style={{ position: "relative" }}>
                                <input
                                    type="number"
                                    defaultValue={selectedPair.price}
                                    style={{
                                        width: "100%",
                                        padding: "14px",
                                        paddingRight: "50px",
                                        borderRadius: "10px",
                                        border: "1px solid #333333",
                                        background: "#262626",
                                        color: "#FFFFFF",
                                        fontSize: "15px",
                                        fontFamily: "monospace",
                                        outline: "none",
                                    }}
                                />
                                <span style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", color: "#6B6B6B", fontSize: "13px" }}>USD</span>
                            </div>
                        </div>
                    )}

                    {/* Amount input */}
                    <div style={{ marginBottom: "20px" }}>
                        <label style={{ display: "block", fontSize: "13px", color: "#6B6B6B", marginBottom: "8px" }}>Amount</label>
                        <div style={{ position: "relative" }}>
                            <input
                                type="number"
                                placeholder="0.00"
                                style={{
                                    width: "100%",
                                    padding: "14px",
                                    paddingRight: "60px",
                                    borderRadius: "10px",
                                    border: "1px solid #333333",
                                    background: "#262626",
                                    color: "#FFFFFF",
                                    fontSize: "15px",
                                    fontFamily: "monospace",
                                    outline: "none",
                                }}
                            />
                            <span style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", color: "#6B6B6B", fontSize: "13px" }}>
                                {selectedPair.pair.split("/")[0]}
                            </span>
                        </div>

                        {/* Quick amount buttons */}
                        <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                            {["25%", "50%", "75%", "100%"].map((pct) => (
                                <button
                                    key={pct}
                                    style={{
                                        flex: 1,
                                        padding: "8px",
                                        borderRadius: "6px",
                                        border: "none",
                                        background: "#262626",
                                        color: "#6B6B6B",
                                        fontSize: "12px",
                                        cursor: "pointer",
                                    }}
                                >
                                    {pct}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Submit button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            width: "100%",
                            padding: "16px",
                            borderRadius: "12px",
                            border: "none",
                            fontWeight: "600",
                            fontSize: "16px",
                            cursor: "pointer",
                            background: side === "buy" ? "#22C55E" : "#EF4444",
                            color: "white",
                            boxShadow: side === "buy" ? "0 8px 24px rgba(34, 197, 94, 0.25)" : "0 8px 24px rgba(239, 68, 68, 0.25)",
                        }}
                    >
                        {side === "buy" ? "Buy" : "Sell"} {selectedPair.pair.split("/")[0]}
                    </motion.button>
                </div>
            </div>

            {/* Order book and trades */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                {/* Order book */}
                <div style={{
                    padding: "20px",
                    borderRadius: "16px",
                    background: "#1A1A1A",
                    border: "1px solid #333333",
                }}>
                    <h3 style={{ fontWeight: "600", color: "#FFFFFF", marginBottom: "16px" }}>Order Book</h3>

                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#6B6B6B", marginBottom: "10px", padding: "0 10px" }}>
                        <span>Price (USD)</span>
                        <span>Size</span>
                        <span>Total</span>
                    </div>

                    <div style={{ marginBottom: "12px" }}>
                        {orderBook.asks.slice().reverse().map((ask, i) => (
                            <OrderBookRow key={i} order={ask} type="ask" />
                        ))}
                    </div>

                    <div style={{
                        padding: "10px",
                        background: "#262626",
                        borderRadius: "8px",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "18px",
                        color: "#FFFFFF",
                        marginBottom: "12px",
                    }}>
                        ${selectedPair.price.toFixed(2)}
                    </div>

                    <div>
                        {orderBook.bids.map((bid, i) => (
                            <OrderBookRow key={i} order={bid} type="bid" />
                        ))}
                    </div>
                </div>

                {/* Recent trades */}
                <div style={{
                    padding: "20px",
                    borderRadius: "16px",
                    background: "#1A1A1A",
                    border: "1px solid #333333",
                }}>
                    <h3 style={{ fontWeight: "600", color: "#FFFFFF", marginBottom: "16px" }}>Recent Trades</h3>

                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#6B6B6B", marginBottom: "10px", padding: "0 10px" }}>
                        <span>Price (USD)</span>
                        <span>Size</span>
                        <span>Time</span>
                    </div>

                    {recentTrades.map((trade, i) => (
                        <div key={i} style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "8px 10px",
                            fontSize: "13px",
                            fontFamily: "monospace",
                        }}>
                            <span style={{ color: trade.side === "buy" ? "#22C55E" : "#EF4444" }}>
                                {trade.price.toFixed(2)}
                            </span>
                            <span style={{ color: "#A0A0A0" }}>{trade.size.toFixed(2)}</span>
                            <span style={{ color: "#6B6B6B" }}>{trade.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

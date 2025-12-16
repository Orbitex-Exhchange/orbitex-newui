"use client";

import { useState } from "react";

interface OrderBookEntry {
    price: number;
    size: number;
    total: number;
}

interface OrderBookProps {
    asks?: OrderBookEntry[];
    bids?: OrderBookEntry[];
    currentPrice?: number;
    onPriceClick?: (price: number) => void;
}

const defaultAsks: OrderBookEntry[] = [
    { price: 3330.50, size: 12.5, total: 41631.25 },
    { price: 3329.80, size: 8.2, total: 27304.36 },
    { price: 3329.20, size: 15.7, total: 52268.44 },
    { price: 3328.50, size: 4.1, total: 13646.85 },
    { price: 3328.00, size: 22.3, total: 74214.40 },
    { price: 3327.50, size: 9.8, total: 32609.50 },
    { price: 3327.00, size: 18.6, total: 61882.20 },
    { price: 3326.50, size: 6.4, total: 21289.60 },
];

const defaultBids: OrderBookEntry[] = [
    { price: 3325.60, size: 18.4, total: 61191.04 },
    { price: 3325.00, size: 9.6, total: 31920.00 },
    { price: 3324.50, size: 14.2, total: 47207.90 },
    { price: 3324.00, size: 7.8, total: 25927.20 },
    { price: 3323.50, size: 25.1, total: 83423.85 },
    { price: 3323.00, size: 11.3, total: 37549.90 },
    { price: 3322.50, size: 8.9, total: 29570.25 },
    { price: 3322.00, size: 16.7, total: 55477.40 },
];

export default function OrderBook({
    asks = defaultAsks,
    bids = defaultBids,
    currentPrice = 3325.60,
    onPriceClick,
}: OrderBookProps) {
    const [aggregation, setAggregation] = useState(0.1);

    const maxTotal = Math.max(
        ...asks.map((a) => a.total),
        ...bids.map((b) => b.total)
    );

    const OrderRow = ({ order, type }: { order: OrderBookEntry; type: "ask" | "bid" }) => {
        const isBid = type === "bid";
        const fillWidth = (order.total / maxTotal) * 100;

        return (
            <div
                onClick={() => onPriceClick?.(order.price)}
                style={{
                    position: "relative",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    padding: "4px 12px",
                    fontSize: "12px",
                    fontFamily: "monospace",
                    cursor: "pointer",
                    transition: "background 0.1s ease",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                }}
            >
                {/* Depth Visualization */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        right: 0,
                        width: `${fillWidth}%`,
                        background: isBid ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)",
                        pointerEvents: "none",
                    }}
                />
                <span style={{ position: "relative", color: isBid ? "#22c55e" : "#ef4444" }}>
                    {order.price.toFixed(2)}
                </span>
                <span style={{ position: "relative", color: "#a0a0a0", textAlign: "right" }}>
                    {order.size.toFixed(4)}
                </span>
                <span style={{ position: "relative", color: "#6b6b6b", textAlign: "right" }}>
                    {order.total.toFixed(2)}
                </span>
            </div>
        );
    };

    return (
        <div style={{
            height: "100%",
            background: "#0d0d0d",
            borderRadius: "12px",
            border: "1px solid #1a1a1a",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
        }}>
            {/* Header */}
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                borderBottom: "1px solid #1a1a1a",
            }}>
                <span style={{ fontSize: "13px", fontWeight: "600", color: "#fff" }}>Order Book</span>

                {/* Aggregation Selector */}
                <div style={{ display: "flex", gap: "4px" }}>
                    {[0.01, 0.1, 1, 10].map((agg) => (
                        <button
                            key={agg}
                            onClick={() => setAggregation(agg)}
                            style={{
                                padding: "4px 8px",
                                borderRadius: "4px",
                                border: "none",
                                background: aggregation === agg ? "#262626" : "transparent",
                                color: aggregation === agg ? "#fff" : "#6b6b6b",
                                fontSize: "10px",
                                cursor: "pointer",
                            }}
                        >
                            {agg}
                        </button>
                    ))}
                </div>
            </div>

            {/* Column Headers */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                padding: "8px 12px",
                fontSize: "11px",
                color: "#6b6b6b",
                textTransform: "uppercase",
                borderBottom: "1px solid #1a1a1a",
            }}>
                <span>Price</span>
                <span style={{ textAlign: "right" }}>Size</span>
                <span style={{ textAlign: "right" }}>Total</span>
            </div>

            {/* Asks (reversed to show highest at top) */}
            <div style={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column-reverse" }}>
                {asks.slice().reverse().map((ask, i) => (
                    <OrderRow key={i} order={ask} type="ask" />
                ))}
            </div>

            {/* Spread / Current Price */}
            <div style={{
                padding: "10px 12px",
                background: "#141414",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                borderTop: "1px solid #1a1a1a",
                borderBottom: "1px solid #1a1a1a",
            }}>
                <span style={{ fontSize: "16px", fontWeight: "700", color: "#fff" }}>
                    ${currentPrice.toFixed(2)}
                </span>
                <span style={{
                    fontSize: "11px",
                    color: "#6b6b6b",
                    padding: "2px 6px",
                    background: "#262626",
                    borderRadius: "4px",
                }}>
                    Spread: $0.90
                </span>
            </div>

            {/* Bids */}
            <div style={{ flex: 1, overflow: "auto" }}>
                {bids.map((bid, i) => (
                    <OrderRow key={i} order={bid} type="bid" />
                ))}
            </div>
        </div>
    );
}

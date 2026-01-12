"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Position {
    id: string;
    market: string;
    side: "long" | "short";
    size: number;
    entryPrice: number;
    markPrice: number;
    leverage: number;
    margin: number;
    liquidationPrice: number;
    pnl: number;
    pnlPercent: number;
    tp?: number;
    sl?: number;
}

interface Order {
    id: string;
    market: string;
    side: "long" | "short";
    type: string;
    size: number;
    price: number;
    filled: number;
    status: string;
    time: string;
}

interface Trade {
    id: string;
    market: string;
    side: "long" | "short";
    size: number;
    price: number;
    fee: number;
    time: string;
    pnl?: number;
}

const mockPositions: Position[] = [
    {
        id: "1", market: "ETH-USD", side: "long", size: 2.5, entryPrice: 3280, markPrice: 3325.60,
        leverage: 10, margin: 820, liquidationPrice: 2952, pnl: 114, pnlPercent: 13.90, tp: 3500, sl: 3100
    },
    {
        id: "2", market: "BTC-USD", side: "short", size: 0.15, entryPrice: 93000, markPrice: 92050,
        leverage: 5, margin: 2790, liquidationPrice: 111600, pnl: 142.50, pnlPercent: 5.11
    },
];

const mockOrders: Order[] = [
    { id: "1", market: "ETH-USD", side: "long", type: "Limit", size: 1.0, price: 3250, filled: 0, status: "Open", time: "14:30:22" },
    { id: "2", market: "SOL-USD", side: "short", type: "Stop Limit", size: 50, price: 140, filled: 0, status: "Pending", time: "14:28:15" },
    { id: "3", market: "BTC-USD", side: "long", type: "Limit", size: 0.05, price: 91000, filled: 0.02, status: "Partial", time: "14:25:00" },
];

const mockTrades: Trade[] = [
    { id: "1", market: "ETH-USD", side: "long", size: 2.5, price: 3280, fee: 4.10, time: "14:20:15", pnl: 114 },
    { id: "2", market: "BTC-USD", side: "short", size: 0.15, price: 93000, fee: 6.98, time: "13:45:30" },
    { id: "3", market: "SOL-USD", side: "long", size: 25, price: 135.50, fee: 1.69, time: "12:30:00", pnl: -45.50 },
];

export default function PositionsPanel() {
    const [activeTab, setActiveTab] = useState<"positions" | "orders" | "trades" | "history">("positions");
    const [positions, setPositions] = useState(mockPositions);
    const [orders, setOrders] = useState(mockOrders);
    const [showTPSLModal, setShowTPSLModal] = useState<string | null>(null);
    const [showCloseModal, setShowCloseModal] = useState<string | null>(null);
    const [closePercent, setClosePercent] = useState(100);

    const handleClosePosition = (id: string) => {
        console.log(`Closing position ${id} at ${closePercent}%`);
        if (closePercent === 100) {
            setPositions(positions.filter(p => p.id !== id));
        }
        setShowCloseModal(null);
    };

    const handleReversePosition = (id: string) => {
        const pos = positions.find(p => p.id === id);
        if (pos) {
            console.log(`Reversing position ${id}`);
            setPositions(positions.map(p =>
                p.id === id ? { ...p, side: p.side === "long" ? "short" : "long" } : p
            ));
        }
    };

    const handleCancelOrder = (id: string) => {
        console.log(`Cancelling order ${id}`);
        setOrders(orders.filter(o => o.id !== id));
    };

    const handleCancelAllOrders = () => {
        console.log("Cancelling all orders");
        setOrders([]);
    };

    const _currentPosition = positions.find(p => p.id === showTPSLModal);
    const closingPosition = positions.find(p => p.id === showCloseModal);

    return (
        <div style={{
            height: "100%",
            background: "#0b0b0e",
            display: "flex",
            flexDirection: "column",
            fontSize: "11px",
        }}>
            {/* Tabs */}
            <div style={{
                display: "flex",
                borderBottom: "1px solid #1e1e24",
                background: "#101014",
                alignItems: "center",
            }}>
                {[
                    { id: "positions" as const, label: "Positions", count: positions.length },
                    { id: "orders" as const, label: "Open Orders", count: orders.length },
                    { id: "trades" as const, label: "Trade History" },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: "8px 14px",
                            border: "none",
                            background: "transparent",
                            color: activeTab === tab.id ? "#fff" : "#5c5c6b",
                            fontSize: "11px",
                            fontWeight: "500",
                            cursor: "pointer",
                            borderBottom: activeTab === tab.id ? "2px solid #00d395" : "2px solid transparent",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                        }}
                    >
                        {tab.label}
                        {tab.count !== undefined && tab.count > 0 && (
                            <span style={{
                                padding: "1px 6px",
                                borderRadius: "10px",
                                background: activeTab === tab.id ? "#00d395" : "#2a2a32",
                                color: activeTab === tab.id ? "#000" : "#5c5c6b",
                                fontSize: "10px",
                                fontWeight: "600",
                            }}>
                                {tab.count}
                            </span>
                        )}
                    </button>
                ))}

                <div style={{ flex: 1 }} />

                {/* Cancel All for Orders tab */}
                {activeTab === "orders" && orders.length > 0 && (
                    <button
                        onClick={handleCancelAllOrders}
                        style={{
                            marginRight: "10px",
                            padding: "4px 10px",
                            borderRadius: "4px",
                            border: "1px solid #ff5252",
                            background: "transparent",
                            color: "#ff5252",
                            fontSize: "10px",
                            cursor: "pointer",
                        }}
                    >
                        Cancel All
                    </button>
                )}
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflow: "auto" }}>
                {activeTab === "positions" && (
                    positions.length > 0 ? (
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr style={{ color: "#5c5c6b", fontSize: "10px", textTransform: "uppercase", background: "#101014" }}>
                                    <th style={{ padding: "8px", textAlign: "left", fontWeight: "500", position: "sticky", top: 0, background: "#101014" }}>Symbol</th>
                                    <th style={{ padding: "8px", textAlign: "right", fontWeight: "500", position: "sticky", top: 0, background: "#101014" }}>Size</th>
                                    <th style={{ padding: "8px", textAlign: "right", fontWeight: "500", position: "sticky", top: 0, background: "#101014" }}>Entry</th>
                                    <th style={{ padding: "8px", textAlign: "right", fontWeight: "500", position: "sticky", top: 0, background: "#101014" }}>Mark</th>
                                    <th style={{ padding: "8px", textAlign: "right", fontWeight: "500", position: "sticky", top: 0, background: "#101014" }}>Liq.</th>
                                    <th style={{ padding: "8px", textAlign: "right", fontWeight: "500", position: "sticky", top: 0, background: "#101014" }}>PnL (ROE%)</th>
                                    <th style={{ padding: "8px", textAlign: "center", fontWeight: "500", position: "sticky", top: 0, background: "#101014" }}>TP/SL</th>
                                    <th style={{ padding: "8px", textAlign: "center", fontWeight: "500", position: "sticky", top: 0, background: "#101014" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {positions.map((pos) => (
                                    <tr key={pos.id} style={{ borderBottom: "1px solid #1e1e24" }}>
                                        <td style={{ padding: "10px 8px" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                                <span style={{
                                                    padding: "2px 5px",
                                                    borderRadius: "3px",
                                                    background: pos.side === "long" ? "rgba(0,211,149,0.15)" : "rgba(255,82,82,0.15)",
                                                    color: pos.side === "long" ? "#00d395" : "#ff5252",
                                                    fontSize: "9px",
                                                    fontWeight: "700",
                                                }}>
                                                    {pos.side.toUpperCase()}
                                                </span>
                                                <span style={{ color: "#fff", fontWeight: "600" }}>{pos.market}</span>
                                                <span style={{ color: "#5c5c6b", fontSize: "10px" }}>{pos.leverage}x</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: "10px 8px", textAlign: "right", color: "#c0c0c8", fontFamily: "monospace" }}>
                                            {pos.size}
                                        </td>
                                        <td style={{ padding: "10px 8px", textAlign: "right", color: "#c0c0c8", fontFamily: "monospace" }}>
                                            ${pos.entryPrice.toLocaleString()}
                                        </td>
                                        <td style={{ padding: "10px 8px", textAlign: "right", color: "#fff", fontFamily: "monospace" }}>
                                            ${pos.markPrice.toLocaleString()}
                                        </td>
                                        <td style={{ padding: "10px 8px", textAlign: "right", color: "#ff5252", fontFamily: "monospace" }}>
                                            ${pos.liquidationPrice.toLocaleString()}
                                        </td>
                                        <td style={{ padding: "10px 8px", textAlign: "right" }}>
                                            <div style={{ color: pos.pnl >= 0 ? "#00d395" : "#ff5252", fontFamily: "monospace", fontWeight: "600" }}>
                                                {pos.pnl >= 0 ? "+" : ""}${pos.pnl.toFixed(2)}
                                            </div>
                                            <div style={{ fontSize: "10px", color: pos.pnl >= 0 ? "#00d395" : "#ff5252" }}>
                                                {pos.pnl >= 0 ? "+" : ""}{pos.pnlPercent.toFixed(2)}%
                                            </div>
                                        </td>
                                        <td style={{ padding: "10px 8px", textAlign: "center" }}>
                                            {pos.tp || pos.sl ? (
                                                <div style={{ fontSize: "10px" }}>
                                                    {pos.tp && <span style={{ color: "#00d395" }}>TP: {pos.tp}</span>}
                                                    {pos.tp && pos.sl && " / "}
                                                    {pos.sl && <span style={{ color: "#ff5252" }}>SL: {pos.sl}</span>}
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => setShowTPSLModal(pos.id)}
                                                    style={{
                                                        padding: "3px 8px",
                                                        borderRadius: "3px",
                                                        border: "1px solid #2a2a32",
                                                        background: "transparent",
                                                        color: "#5c5c6b",
                                                        fontSize: "10px",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    + Add
                                                </button>
                                            )}
                                        </td>
                                        <td style={{ padding: "10px 8px", textAlign: "center" }}>
                                            <div style={{ display: "flex", gap: "4px", justifyContent: "center" }}>
                                                <button
                                                    onClick={() => setShowCloseModal(pos.id)}
                                                    style={{
                                                        padding: "4px 10px",
                                                        borderRadius: "4px",
                                                        border: "1px solid #ff5252",
                                                        background: "transparent",
                                                        color: "#ff5252",
                                                        fontSize: "10px",
                                                        fontWeight: "500",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    Close
                                                </button>
                                                <button
                                                    onClick={() => handleReversePosition(pos.id)}
                                                    title="Reverse Position"
                                                    style={{
                                                        padding: "4px 8px",
                                                        borderRadius: "4px",
                                                        border: "1px solid #2a2a32",
                                                        background: "transparent",
                                                        color: "#5c5c6b",
                                                        fontSize: "10px",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    ⇅
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div style={{ padding: "60px 20px", textAlign: "center", color: "#5c5c6b" }}>
                            No open positions
                        </div>
                    )
                )}

                {activeTab === "orders" && (
                    orders.length > 0 ? (
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr style={{ color: "#5c5c6b", fontSize: "10px", textTransform: "uppercase", background: "#101014" }}>
                                    <th style={{ padding: "8px", textAlign: "left", fontWeight: "500" }}>Symbol</th>
                                    <th style={{ padding: "8px", textAlign: "left", fontWeight: "500" }}>Type</th>
                                    <th style={{ padding: "8px", textAlign: "right", fontWeight: "500" }}>Size</th>
                                    <th style={{ padding: "8px", textAlign: "right", fontWeight: "500" }}>Price</th>
                                    <th style={{ padding: "8px", textAlign: "right", fontWeight: "500" }}>Filled</th>
                                    <th style={{ padding: "8px", textAlign: "center", fontWeight: "500" }}>Status</th>
                                    <th style={{ padding: "8px", textAlign: "center", fontWeight: "500" }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id} style={{ borderBottom: "1px solid #1e1e24" }}>
                                        <td style={{ padding: "10px 8px" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                                <span style={{
                                                    padding: "2px 5px",
                                                    borderRadius: "3px",
                                                    background: order.side === "long" ? "rgba(0,211,149,0.15)" : "rgba(255,82,82,0.15)",
                                                    color: order.side === "long" ? "#00d395" : "#ff5252",
                                                    fontSize: "9px",
                                                    fontWeight: "700",
                                                }}>
                                                    {order.side === "long" ? "BUY" : "SELL"}
                                                </span>
                                                <span style={{ color: "#fff", fontWeight: "500" }}>{order.market}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: "10px 8px", color: "#a0a0a8" }}>{order.type}</td>
                                        <td style={{ padding: "10px 8px", textAlign: "right", color: "#c0c0c8", fontFamily: "monospace" }}>{order.size}</td>
                                        <td style={{ padding: "10px 8px", textAlign: "right", color: "#fff", fontFamily: "monospace" }}>${order.price.toLocaleString()}</td>
                                        <td style={{ padding: "10px 8px", textAlign: "right", color: "#5c5c6b", fontFamily: "monospace" }}>{order.filled}/{order.size}</td>
                                        <td style={{ padding: "10px 8px", textAlign: "center" }}>
                                            <span style={{
                                                padding: "3px 8px",
                                                borderRadius: "10px",
                                                background: order.status === "Open" ? "rgba(0,211,149,0.15)" : "rgba(255,193,7,0.15)",
                                                color: order.status === "Open" ? "#00d395" : "#ffc107",
                                                fontSize: "10px",
                                                fontWeight: "500",
                                            }}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: "10px 8px", textAlign: "center" }}>
                                            <button
                                                onClick={() => handleCancelOrder(order.id)}
                                                style={{
                                                    padding: "4px 10px",
                                                    borderRadius: "4px",
                                                    border: "1px solid #5c5c6b",
                                                    background: "transparent",
                                                    color: "#5c5c6b",
                                                    fontSize: "10px",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div style={{ padding: "60px 20px", textAlign: "center", color: "#5c5c6b" }}>
                            No open orders
                        </div>
                    )
                )}

                {activeTab === "trades" && (
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ color: "#5c5c6b", fontSize: "10px", textTransform: "uppercase", background: "#101014" }}>
                                <th style={{ padding: "8px", textAlign: "left", fontWeight: "500" }}>Symbol</th>
                                <th style={{ padding: "8px", textAlign: "right", fontWeight: "500" }}>Size</th>
                                <th style={{ padding: "8px", textAlign: "right", fontWeight: "500" }}>Price</th>
                                <th style={{ padding: "8px", textAlign: "right", fontWeight: "500" }}>Fee</th>
                                <th style={{ padding: "8px", textAlign: "right", fontWeight: "500" }}>PnL</th>
                                <th style={{ padding: "8px", textAlign: "right", fontWeight: "500" }}>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockTrades.map((trade) => (
                                <tr key={trade.id} style={{ borderBottom: "1px solid #1e1e24" }}>
                                    <td style={{ padding: "10px 8px" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                            <span style={{
                                                padding: "2px 5px",
                                                borderRadius: "3px",
                                                background: trade.side === "long" ? "rgba(0,211,149,0.15)" : "rgba(255,82,82,0.15)",
                                                color: trade.side === "long" ? "#00d395" : "#ff5252",
                                                fontSize: "9px",
                                                fontWeight: "700",
                                            }}>
                                                {trade.side === "long" ? "BUY" : "SELL"}
                                            </span>
                                            <span style={{ color: "#fff", fontWeight: "500" }}>{trade.market}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: "10px 8px", textAlign: "right", color: "#c0c0c8", fontFamily: "monospace" }}>{trade.size}</td>
                                    <td style={{ padding: "10px 8px", textAlign: "right", color: "#fff", fontFamily: "monospace" }}>${trade.price.toLocaleString()}</td>
                                    <td style={{ padding: "10px 8px", textAlign: "right", color: "#5c5c6b", fontFamily: "monospace" }}>${trade.fee.toFixed(2)}</td>
                                    <td style={{ padding: "10px 8px", textAlign: "right" }}>
                                        {trade.pnl !== undefined ? (
                                            <span style={{
                                                color: trade.pnl >= 0 ? "#00d395" : "#ff5252",
                                                fontFamily: "monospace",
                                                fontWeight: "500",
                                            }}>
                                                {trade.pnl >= 0 ? "+" : ""}${trade.pnl.toFixed(2)}
                                            </span>
                                        ) : (
                                            <span style={{ color: "#5c5c6b" }}>-</span>
                                        )}
                                    </td>
                                    <td style={{ padding: "10px 8px", textAlign: "right", color: "#5c5c6b" }}>{trade.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Close Position Modal */}
            <AnimatePresence>
                {showCloseModal && closingPosition && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowCloseModal(null)}
                        style={{
                            position: "fixed",
                            inset: 0,
                            background: "rgba(0,0,0,0.8)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 1000,
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
                                width: "320px",
                            }}
                        >
                            <div style={{ fontSize: "14px", fontWeight: "600", color: "#fff", marginBottom: "16px" }}>
                                Close Position
                            </div>
                            <div style={{ marginBottom: "16px", fontSize: "12px", color: "#a0a0a8" }}>
                                {closingPosition.market} {closingPosition.side.toUpperCase()} {closingPosition.size}
                            </div>
                            <div style={{ marginBottom: "12px" }}>
                                <label style={{ display: "block", fontSize: "10px", color: "#5c5c6b", marginBottom: "6px" }}>CLOSE PERCENTAGE</label>
                                <div style={{ display: "flex", gap: "4px" }}>
                                    {[25, 50, 75, 100].map((pct) => (
                                        <button
                                            key={pct}
                                            onClick={() => setClosePercent(pct)}
                                            style={{
                                                flex: 1,
                                                padding: "8px",
                                                borderRadius: "4px",
                                                border: "none",
                                                background: closePercent === pct ? "#ff5252" : "#0b0b0e",
                                                color: closePercent === pct ? "#fff" : "#5c5c6b",
                                                fontSize: "11px",
                                                fontWeight: "600",
                                                cursor: "pointer",
                                            }}
                                        >
                                            {pct}%
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div style={{ display: "flex", gap: "8px" }}>
                                <button
                                    onClick={() => setShowCloseModal(null)}
                                    style={{
                                        flex: 1,
                                        padding: "10px",
                                        borderRadius: "6px",
                                        border: "1px solid #2a2a32",
                                        background: "transparent",
                                        color: "#a0a0a8",
                                        fontWeight: "500",
                                        fontSize: "12px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleClosePosition(closingPosition.id)}
                                    style={{
                                        flex: 1,
                                        padding: "10px",
                                        borderRadius: "6px",
                                        border: "none",
                                        background: "#ff5252",
                                        color: "#fff",
                                        fontWeight: "600",
                                        fontSize: "12px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Close {closePercent}%
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

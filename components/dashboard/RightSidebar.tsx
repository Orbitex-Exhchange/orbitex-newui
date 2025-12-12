"use client";

import { motion } from "framer-motion";

function CratesWidget() {
    return (
        <div style={{
            padding: "20px",
            borderRadius: "16px",
            background: "#1A1A1A",
            border: "1px solid #333333",
        }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "20px" }}>📦</span>
                    <span style={{ fontWeight: "600", color: "#FFFFFF" }}>Crates</span>
                </div>
                <svg width="16" height="16" fill="none" stroke="#6B6B6B" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>

            {/* Progress circle */}
            <div style={{ position: "relative", width: "120px", height: "120px", margin: "0 auto 16px" }}>
                <svg width="120" height="120" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="60" cy="60" r="50" stroke="#262626" strokeWidth="10" fill="none" />
                    <circle
                        cx="60" cy="60" r="50"
                        stroke="#F97316"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray="314"
                        strokeDashoffset="314"
                        strokeLinecap="round"
                    />
                </svg>
                <div style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <span style={{ fontSize: "28px", fontWeight: "bold", color: "#FFFFFF" }}>0</span>
                    <span style={{ fontSize: "12px", color: "#6B6B6B" }}>%</span>
                </div>
            </div>

            <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: "12px", color: "#6B6B6B", marginBottom: "8px" }}>to next crate</p>
                <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 16px",
                    borderRadius: "50px",
                    background: "rgba(249, 115, 22, 0.2)",
                    color: "#F97316",
                    fontSize: "13px",
                    fontWeight: "500",
                }}>
                    <span>0</span>
                    <span>to open</span>
                </span>
            </div>
        </div>
    );
}

function DrawsWidget() {
    return (
        <div style={{
            borderRadius: "16px",
            background: "#1A1A1A",
            border: "1px solid #333333",
            overflow: "hidden",
        }}>
            {/* Toggle tabs */}
            <div style={{ display: "flex", borderBottom: "1px solid #333333" }}>
                <button style={{
                    flex: 1,
                    padding: "14px",
                    background: "#262626",
                    border: "none",
                    color: "#FFFFFF",
                    fontSize: "13px",
                    fontWeight: "600",
                    cursor: "pointer",
                }}>
                    Weekly draws
                </button>
                <button style={{
                    flex: 1,
                    padding: "14px",
                    background: "transparent",
                    border: "none",
                    color: "#6B6B6B",
                    fontSize: "13px",
                    fontWeight: "500",
                    cursor: "pointer",
                }}>
                    Milestone draw
                </button>
            </div>

            {/* Patron Draw */}
            <div style={{ padding: "16px", borderBottom: "1px solid #333333" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0.1) 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "24px",
                    }}>
                        🎭
                    </div>
                    <div>
                        <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#FFFFFF", marginBottom: "4px" }}>Patron Draw</h4>
                        <p style={{ fontSize: "12px", color: "#6B6B6B", marginBottom: "2px" }}>1 Patron to 10 winners</p>
                        <p style={{ fontSize: "12px", color: "#F97316" }}>You have 0 tickets</p>
                    </div>
                </div>
            </div>

            {/* Cash Draw */}
            <div style={{ padding: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(34, 197, 94, 0.1) 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "24px",
                    }}>
                        💵
                    </div>
                    <div>
                        <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#FFFFFF", marginBottom: "4px" }}>Cash Draw</h4>
                        <p style={{ fontSize: "12px", color: "#6B6B6B", marginBottom: "2px" }}>$50k USDC to 1 winner</p>
                        <p style={{ fontSize: "12px", color: "#F97316" }}>You have 0 tickets</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PatronageWidget() {
    return (
        <div style={{
            padding: "16px",
            borderRadius: "16px",
            background: "#1A1A1A",
            border: "1px solid #333333",
        }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontWeight: "600", color: "#FFFFFF" }}>Patronage</span>
                <svg width="16" height="16" fill="none" stroke="#6B6B6B" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
            <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "20px" }}>🎭</span>
                <span style={{ fontSize: "13px", color: "#A0A0A0" }}>Learn about Patrons</span>
            </div>
        </div>
    );
}

export default function RightSidebar() {
    return (
        <aside style={{
            width: "320px",
            height: "100vh",
            background: "#0D0D0D",
            borderLeft: "1px solid #333333",
            padding: "20px",
            overflowY: "auto",
            position: "sticky",
            top: 0,
        }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <CratesWidget />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <DrawsWidget />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <PatronageWidget />
                </motion.div>
            </div>
        </aside>
    );
}

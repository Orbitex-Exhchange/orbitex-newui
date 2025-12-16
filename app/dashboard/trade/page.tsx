"use client";

import Link from "next/link";
import { motion } from "framer-motion";

// Featured markets for the landing page
const featuredMarkets = [
    { symbol: "ETH-USD", name: "Ethereum", price: 3325.60, change24h: 0.09, volume: "32.6B", iconColor: "#627EEA", icon: "Ξ" },
    { symbol: "BTC-USD", name: "Bitcoin", price: 92035, change24h: -0.74, volume: "51.9B", iconColor: "#F7931A", icon: "₿" },
    { symbol: "SOL-USD", name: "Solana", price: 136.30, change24h: -1.30, volume: "4.5B", iconColor: "#14F195", icon: "◎" },
    { symbol: "ARB-USD", name: "Arbitrum", price: 1.42, change24h: 2.15, volume: "890M", iconColor: "#28A0F0", icon: "A" },
    { symbol: "OP-USD", name: "Optimism", price: 2.18, change24h: 1.85, volume: "540M", iconColor: "#FF0420", icon: "O" },
    { symbol: "AVAX-USD", name: "Avalanche", price: 38.50, change24h: -0.45, volume: "1.2B", iconColor: "#E84142", icon: "A" },
];

const stats = [
    { label: "24h Volume", value: "$156.2B" },
    { label: "Open Interest", value: "$48.3B" },
    { label: "Total Traders", value: "125,847" },
    { label: "Markets", value: "42" },
];

export default function PerpsLandingPage() {
    return (
        <div style={{
            minHeight: "100vh",
            background: "#0a0a0a",
            color: "#fff",
        }}>
            {/* Header */}
            <header style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 40px",
                borderBottom: "1px solid #1a1a1a",
            }}>
                <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
                    <motion.div
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.4 }}
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "10px",
                            background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 6px 20px rgba(249, 115, 22, 0.35)",
                        }}
                    >
                        <span style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}>O</span>
                    </motion.div>
                    <span style={{ fontSize: "22px", fontWeight: "700", color: "#fff" }}>Orbitex Perps</span>
                </Link>

                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <Link href="/dashboard" style={{ color: "#a0a0a0", textDecoration: "none", fontSize: "14px" }}>
                        ← Back to Dashboard
                    </Link>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            padding: "10px 20px",
                            borderRadius: "10px",
                            border: "none",
                            background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
                            color: "white",
                            fontWeight: "600",
                            fontSize: "14px",
                            cursor: "pointer",
                            boxShadow: "0 4px 16px rgba(249, 115, 22, 0.3)",
                        }}
                    >
                        Connect Wallet
                    </motion.button>
                </div>
            </header>

            {/* Hero Section */}
            <section style={{
                padding: "80px 40px",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
            }}>
                {/* Background Gradient */}
                <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "800px",
                    height: "800px",
                    background: "radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)",
                    pointerEvents: "none",
                }} />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 style={{
                        fontSize: "56px",
                        fontWeight: "800",
                        marginBottom: "20px",
                        background: "linear-gradient(135deg, #fff 0%, #a0a0a0 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}>
                        Trade Perpetuals
                    </h1>
                    <p style={{
                        fontSize: "20px",
                        color: "#6b6b6b",
                        maxWidth: "600px",
                        margin: "0 auto 40px",
                        lineHeight: 1.5,
                    }}>
                        Up to 100x leverage on crypto perpetual futures with deep liquidity and low fees
                    </p>

                    {/* Quick Stats */}
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "40px",
                        marginBottom: "60px",
                    }}>
                        {stats.map((stat) => (
                            <div key={stat.label}>
                                <div style={{ fontSize: "28px", fontWeight: "700", color: "#fff" }}>{stat.value}</div>
                                <div style={{ fontSize: "13px", color: "#6b6b6b" }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Markets Grid */}
            <section style={{ padding: "0 40px 80px" }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "24px",
                }}>
                    <h2 style={{ fontSize: "24px", fontWeight: "600" }}>Featured Markets</h2>
                    <span style={{ color: "#6b6b6b", fontSize: "14px" }}>42 markets available</span>
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                    gap: "16px",
                }}>
                    {featuredMarkets.map((market, i) => (
                        <motion.div
                            key={market.symbol}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link
                                href={`/dashboard/trade/${market.symbol}`}
                                style={{ textDecoration: "none" }}
                            >
                                <div
                                    style={{
                                        padding: "24px",
                                        borderRadius: "16px",
                                        background: "#0d0d0d",
                                        border: "1px solid #1a1a1a",
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = "#F97316";
                                        e.currentTarget.style.transform = "translateY(-2px)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = "#1a1a1a";
                                        e.currentTarget.style.transform = "translateY(0)";
                                    }}
                                >
                                    <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
                                        <div style={{
                                            width: "44px",
                                            height: "44px",
                                            borderRadius: "50%",
                                            background: market.iconColor,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "20px",
                                            color: "#fff",
                                            fontWeight: "bold",
                                        }}>
                                            {market.icon}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: "18px", fontWeight: "600", color: "#fff" }}>{market.symbol}</div>
                                            <div style={{ fontSize: "13px", color: "#6b6b6b" }}>{market.name}</div>
                                        </div>
                                    </div>

                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                                        <div>
                                            <div style={{ fontSize: "24px", fontWeight: "700", color: "#fff", fontFamily: "monospace" }}>
                                                ${market.price.toLocaleString()}
                                            </div>
                                            <div style={{
                                                fontSize: "14px",
                                                color: market.change24h >= 0 ? "#22c55e" : "#ef4444",
                                            }}>
                                                {market.change24h >= 0 ? "+" : ""}{market.change24h.toFixed(2)}%
                                            </div>
                                        </div>
                                        <div style={{ textAlign: "right" }}>
                                            <div style={{ fontSize: "12px", color: "#6b6b6b" }}>24h Volume</div>
                                            <div style={{ fontSize: "14px", color: "#a0a0a0" }}>${market.volume}</div>
                                        </div>
                                    </div>

                                    {/* Trade Button */}
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        style={{
                                            marginTop: "16px",
                                            padding: "12px",
                                            borderRadius: "10px",
                                            background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
                                            textAlign: "center",
                                            fontWeight: "600",
                                            fontSize: "14px",
                                            color: "white",
                                        }}
                                    >
                                        Trade {market.symbol.split("-")[0]}
                                    </motion.div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section style={{
                padding: "60px 40px",
                borderTop: "1px solid #1a1a1a",
            }}>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "40px",
                    maxWidth: "1200px",
                    margin: "0 auto",
                }}>
                    {[
                        { icon: "⚡", title: "Instant Execution", desc: "Sub-second trade execution with guaranteed price" },
                        { icon: "🔒", title: "Non-Custodial", desc: "Trade directly from your wallet with full control" },
                        { icon: "💧", title: "Deep Liquidity", desc: "Minimal slippage even for large positions" },
                    ].map((feature) => (
                        <div key={feature.title} style={{ textAlign: "center" }}>
                            <div style={{ fontSize: "40px", marginBottom: "16px" }}>{feature.icon}</div>
                            <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>{feature.title}</h3>
                            <p style={{ fontSize: "14px", color: "#6b6b6b", lineHeight: 1.5 }}>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

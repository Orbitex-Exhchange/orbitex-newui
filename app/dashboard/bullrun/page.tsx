"use client";

import { motion } from "framer-motion";

const markets = [
    { name: "Supercycle Ends 2026", chance: "75%", volume: "$12.5M", type: "Yes/No", color: "#22C55E" },
    { name: "BTC > $150k by Q4", chance: "42%", volume: "$45.2M", type: "Yes/No", color: "#F97316" },
    { name: "ETH Flippening 2025", chance: "18%", volume: "$8.1M", type: "Yes/No", color: "#EF4444" },
    { name: "Solana ATH in March", chance: "60%", volume: "$22.4M", type: "Yes/No", color: "#3B82F6" },
];

function MarketCard({ market }: { market: typeof markets[0] }) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            style={{
                padding: "24px",
                borderRadius: "16px",
                background: "#1A1A1A",
                border: "1px solid #333333",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div style={{ marginBottom: "20px" }}>
                <div style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    borderRadius: "50px",
                    background: "#262626",
                    color: "#A0A0A0",
                    fontSize: "12px",
                    marginBottom: "12px"
                }}>
                    {market.type}
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#FFFFFF", marginBottom: "8px" }}>
                    {market.name}
                </h3>
                <p style={{ color: "#6B6B6B", fontSize: "14px" }}>
                    Vol: {market.volume}
                </p>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
                <button style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: "10px",
                    border: "none",
                    background: "rgba(34, 197, 94, 0.15)",
                    color: "#22C55E",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                }}>
                    <span>Yes</span>
                    <span>{market.chance}</span>
                </button>
                <button style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: "10px",
                    border: "none",
                    background: "rgba(239, 68, 68, 0.15)",
                    color: "#EF4444",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                }}>
                    <span>No</span>
                    <span>{100 - parseInt(market.chance)}%</span>
                </button>
            </div>
        </motion.div>
    );
}

export default function BullrunPage() {
    return (
        <div style={{ padding: "24px" }}>
            {/* Header */}
            <div style={{
                marginBottom: "40px",
                padding: "60px",
                borderRadius: "24px",
                background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
            }}>
                {/* Background Pattern */}
                <div style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0.1,
                    backgroundImage: "radial-gradient(#FFF 2px, transparent 2px)",
                    backgroundSize: "30px 30px",
                }} />

                <div style={{ position: "relative", zIndex: 10 }}>
                    <h1 style={{ fontSize: "48px", fontWeight: "bold", color: "#FFFFFF", marginBottom: "16px" }}>
                        Bullrun Markets 🐂
                    </h1>
                    <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "20px", maxWidth: "600px", margin: "0 auto 32px" }}>
                        Predict the outcome of the wildest crypto events. Trade on information. Not financial advice.
                    </p>
                    <button style={{
                        padding: "16px 32px",
                        borderRadius: "12px",
                        background: "#FFFFFF",
                        color: "#F97316",
                        border: "none",
                        fontSize: "18px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                    }}>
                        Start Betting
                    </button>
                </div>
            </div>

            {/* Markets Grid */}
            <div style={{ marginBottom: "40px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#FFFFFF" }}>Trending Markets</h2>
                    <button style={{ background: "transparent", border: "none", color: "#F97316", cursor: "pointer" }}>
                        View all →
                    </button>
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "24px",
                }}>
                    {markets.map((market) => (
                        <MarketCard key={market.name} market={market} />
                    ))}
                </div>
            </div>
        </div>
    );
}

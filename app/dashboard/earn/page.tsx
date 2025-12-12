"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const vaults = [
    { name: "ETH Staking", token: "ETH", icon: "⬡", apy: 4.2, tvl: 125000000, type: "Staking", risk: "Low", color: "#627EEA" },
    { name: "SOL Staking", token: "SOL", icon: "◎", apy: 7.5, tvl: 45000000, type: "Staking", risk: "Low", color: "#9945FF" },
    { name: "USDC Vault", token: "USDC", icon: "💵", apy: 8.2, tvl: 320000000, type: "Lending", risk: "Low", color: "#2775CA" },
    { name: "BTC Vault", token: "WBTC", icon: "₿", apy: 3.1, tvl: 89000000, type: "Yield", risk: "Medium", color: "#F7931A" },
    { name: "ETH-USDC LP", token: "LP", icon: "🔄", apy: 15.4, tvl: 28000000, type: "LP", risk: "Medium", color: "#22C55E" },
    { name: "Arbitrum Yield", token: "ARB", icon: "⬢", apy: 12.8, tvl: 15000000, type: "Yield", risk: "Medium", color: "#28A0F0" },
];

const riskColors: Record<string, { bg: string; text: string }> = {
    Low: { bg: "rgba(34, 197, 94, 0.15)", text: "#22C55E" },
    Medium: { bg: "rgba(245, 158, 11, 0.15)", text: "#F59E0B" },
    High: { bg: "rgba(239, 68, 68, 0.15)", text: "#EF4444" },
};

function VaultCard({ vault }: { vault: typeof vaults[0] }) {
    const [isHovered, setIsHovered] = useState(false);
    const risk = riskColors[vault.risk];

    return (
        <motion.div
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ scale: 1.02, y: -5 }}
            style={{
                padding: "24px",
                borderRadius: "16px",
                background: `linear-gradient(135deg, ${vault.color}15 0%, ${vault.color}05 100%)`,
                border: "1px solid #333333",
                cursor: "pointer",
                transition: "border-color 0.3s ease",
                borderColor: isHovered ? `${vault.color}50` : "#333333",
            }}
        >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <motion.div
                        animate={{ rotate: isHovered ? 360 : 0 }}
                        transition={{ duration: 0.6 }}
                        style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "14px",
                            background: "#262626",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "26px",
                        }}
                    >
                        {vault.icon}
                    </motion.div>
                    <div>
                        <h3 style={{ fontWeight: "600", color: "#FFFFFF", fontSize: "16px", marginBottom: "4px" }}>{vault.name}</h3>
                        <p style={{ fontSize: "13px", color: "#6B6B6B" }}>{vault.token}</p>
                    </div>
                </div>

                <span style={{
                    padding: "6px 12px",
                    borderRadius: "50px",
                    fontSize: "12px",
                    fontWeight: "500",
                    background: risk.bg,
                    color: risk.text,
                }}>
                    {vault.risk} risk
                </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                <div>
                    <div style={{ fontSize: "13px", color: "#6B6B6B", marginBottom: "4px" }}>APY</div>
                    <div style={{ fontSize: "28px", fontWeight: "bold", color: "#22C55E" }}>{vault.apy}%</div>
                </div>
                <div>
                    <div style={{ fontSize: "13px", color: "#6B6B6B", marginBottom: "4px" }}>TVL</div>
                    <div style={{ fontSize: "20px", fontWeight: "600", color: "#FFFFFF" }}>
                        ${(vault.tvl / 1000000).toFixed(1)}M
                    </div>
                </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "16px", borderTop: "1px solid #333333" }}>
                <div>
                    <div style={{ fontSize: "12px", color: "#6B6B6B" }}>Your deposit</div>
                    <div style={{ fontSize: "15px", fontWeight: "500", color: "#FFFFFF" }}>—</div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        padding: "10px 20px",
                        borderRadius: "10px",
                        border: "none",
                        background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
                        color: "white",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer",
                        boxShadow: "0 4px 16px rgba(249, 115, 22, 0.25)",
                    }}
                >
                    Deposit
                </motion.button>
            </div>
        </motion.div>
    );
}

export default function EarnPage() {
    const [filter, setFilter] = useState("all");
    const [sortBy, setSortBy] = useState("apy");

    const filteredVaults = vaults
        .filter((v) => filter === "all" || v.type.toLowerCase() === filter)
        .sort((a, b) => {
            if (sortBy === "apy") return b.apy - a.apy;
            if (sortBy === "tvl") return b.tvl - a.tvl;
            return 0;
        });

    return (
        <div style={{ padding: "24px" }}>
            {/* Header */}
            <div style={{ marginBottom: "24px" }}>
                <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#FFFFFF", marginBottom: "4px" }}>Earn</h1>
                <p style={{ color: "#6B6B6B", fontSize: "14px" }}>Earn passive yield on your crypto assets</p>
            </div>

            {/* Stats overview */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "32px" }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        padding: "24px",
                        borderRadius: "16px",
                        background: "linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(26, 26, 26, 0.9) 100%)",
                        border: "1px solid rgba(249, 115, 22, 0.2)",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#A0A0A0", marginBottom: "8px" }}>
                        <span>💰</span>
                        Total Deposited
                    </div>
                    <div style={{ fontSize: "32px", fontWeight: "bold", color: "#FFFFFF" }}>$0.00</div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{
                        padding: "24px",
                        borderRadius: "16px",
                        background: "#1A1A1A",
                        border: "1px solid #333333",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#A0A0A0", marginBottom: "8px" }}>
                        <span>📈</span>
                        Earnings (30d)
                    </div>
                    <div style={{ fontSize: "32px", fontWeight: "bold", color: "#22C55E" }}>$0.00</div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{
                        padding: "24px",
                        borderRadius: "16px",
                        background: "#1A1A1A",
                        border: "1px solid #333333",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#A0A0A0", marginBottom: "8px" }}>
                        <span>⚡</span>
                        Avg. APY
                    </div>
                    <div style={{ fontSize: "32px", fontWeight: "bold", color: "#FFFFFF" }}>—</div>
                </motion.div>
            </div>

            {/* Filters and sort */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
                <div style={{ display: "flex", gap: "8px" }}>
                    {["all", "staking", "lending", "yield", "lp"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                padding: "10px 18px",
                                borderRadius: "10px",
                                border: "none",
                                fontSize: "14px",
                                fontWeight: "500",
                                cursor: "pointer",
                                textTransform: "capitalize",
                                background: filter === f ? "linear-gradient(135deg, #F97316 0%, #EA580C 100%)" : "#1A1A1A",
                                color: filter === f ? "white" : "#A0A0A0",
                                transition: "all 0.2s ease",
                            }}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "14px", color: "#6B6B6B" }}>Sort by:</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        style={{
                            padding: "10px 16px",
                            borderRadius: "10px",
                            border: "1px solid #333333",
                            background: "#1A1A1A",
                            color: "#FFFFFF",
                            fontSize: "14px",
                            cursor: "pointer",
                            outline: "none",
                        }}
                    >
                        <option value="apy">Highest APY</option>
                        <option value="tvl">Highest TVL</option>
                    </select>
                </div>
            </div>

            {/* Vault grid */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                gap: "20px",
                marginBottom: "40px",
            }}>
                {filteredVaults.map((vault, index) => (
                    <motion.div
                        key={vault.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <VaultCard vault={vault} />
                    </motion.div>
                ))}
            </div>

            {/* How it works section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                    padding: "40px",
                    borderRadius: "20px",
                    background: "#1A1A1A",
                    border: "1px solid #333333",
                }}
            >
                <h3 style={{ fontSize: "22px", fontWeight: "bold", color: "#FFFFFF", marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px" }}>
                    <span>💡</span>
                    How Orbitex Earn Works
                </h3>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
                    {[
                        { step: 1, title: "Choose a Vault", desc: "Select from our curated vaults across staking, lending, and LP strategies." },
                        { step: 2, title: "Deposit Assets", desc: "Deposit your crypto and start earning yield immediately." },
                        { step: 3, title: "Earn Rewards", desc: "Your rewards auto-compound for maximum returns. Withdraw anytime." },
                    ].map((item) => (
                        <div key={item.step}>
                            <div style={{
                                width: "44px",
                                height: "44px",
                                borderRadius: "12px",
                                background: "rgba(249, 115, 22, 0.2)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#F97316",
                                fontWeight: "bold",
                                fontSize: "18px",
                                marginBottom: "16px",
                            }}>
                                {item.step}
                            </div>
                            <h4 style={{ fontWeight: "600", color: "#FFFFFF", marginBottom: "8px" }}>{item.title}</h4>
                            <p style={{ fontSize: "14px", color: "#6B6B6B", lineHeight: 1.5 }}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

"use client";

import { motion } from "framer-motion";

// Mock data
const starredAssets = [
    { symbol: "ETH", name: "Ethereum", icon: "⬡", price: 3325.60, change24h: 0.09, sparkline: [55, 60, 58, 65, 62, 68, 70, 68, 72, 75, 73, 78] },
    { symbol: "SOL", name: "Solana", icon: "◎", price: 136.30, change24h: -1.30, sparkline: [78, 75, 72, 70, 68, 65, 63, 60, 58, 55, 52, 50] },
    { symbol: "BTC", name: "Bitcoin", icon: "₿", price: 92035.00, change24h: -0.74, sparkline: [70, 72, 68, 70, 65, 62, 60, 58, 55, 52, 50, 48] },
];

const trendingTokens = [
    { symbol: "PEPE", name: "Pepe", swidges: 1247, buyPct: 78 },
    { symbol: "WIF", name: "dogwifhat", swidges: 892, buyPct: 65 },
    { symbol: "BONK", name: "Bonk", swidges: 654, buyPct: 42 },
];

const networks = [
    { name: "Ethereum", icon: "⬡", color: "#627EEA" },
    { name: "Solana", icon: "◎", color: "#9945FF" },
    { name: "Base", icon: "🔵", color: "#0052FF" },
    { name: "Arbitrum", icon: "⬢", color: "#28A0F0" },
    { name: "Optimism", icon: "🔴", color: "#FF0420" },
    { name: "Polygon", icon: "◈", color: "#8247E5" },
    { name: "BNB Chain", icon: "🔶", color: "#F0B90B" },
    { name: "Avalanche", icon: "🔺", color: "#E84142" },
];

function PortfolioCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                padding: "32px",
                borderRadius: "20px",
                background: "linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(26, 26, 26, 0.9) 50%, rgba(139, 92, 246, 0.1) 100%)",
                border: "1px solid rgba(249, 115, 22, 0.2)",
                marginBottom: "24px",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <span style={{ fontSize: "20px" }}>💰</span>
                <span style={{ color: "#A0A0A0", fontSize: "14px" }}>Portfolio Balance</span>
            </div>
            <h2 style={{ fontSize: "42px", fontWeight: "bold", color: "#FFFFFF", marginBottom: "16px" }}>
                $0.00
            </h2>
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 24px",
                    background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
                    border: "none",
                    borderRadius: "10px",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    boxShadow: "0 8px 24px rgba(249, 115, 22, 0.35)",
                }}
            >
                <span>💳</span>
                Deposit
            </motion.button>
        </motion.div>
    );
}

function Sparkline({ data, isPositive }: { data: number[]; isPositive: boolean }) {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const width = 100;
    const height = 32;

    const points = data.map((value, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((value - min) / range) * height;
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg width={width} height={height} style={{ display: "block" }}>
            <polyline
                points={points}
                fill="none"
                stroke={isPositive ? "#22C55E" : "#EF4444"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function AssetCard({ asset }: { asset: typeof starredAssets[0] }) {
    const isPositive = asset.change24h >= 0;

    return (
        <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            style={{
                padding: "20px",
                borderRadius: "16px",
                background: "#1A1A1A",
                border: "1px solid #333333",
                cursor: "pointer",
                transition: "border-color 0.2s ease",
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = "#F97316"}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = "#333333"}
        >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "12px",
                        background: "#262626",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                    }}>
                        {asset.icon}
                    </div>
                    <div>
                        <div style={{ fontWeight: "600", color: "#FFFFFF" }}>{asset.symbol}</div>
                        <div style={{ fontSize: "13px", color: "#6B6B6B" }}>{asset.name}</div>
                    </div>
                </div>
                <button style={{
                    background: "transparent",
                    border: "none",
                    fontSize: "18px",
                    cursor: "pointer",
                    color: "#F97316",
                }}>
                    ⭐
                </button>
            </div>

            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                <div>
                    <div style={{ fontSize: "18px", fontWeight: "bold", color: "#FFFFFF" }}>
                        ${asset.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </div>
                    <div style={{ fontSize: "13px", color: isPositive ? "#22C55E" : "#EF4444" }}>
                        {isPositive ? "▲" : "▼"} {Math.abs(asset.change24h).toFixed(2)}%
                    </div>
                </div>
                <Sparkline data={asset.sparkline} isPositive={isPositive} />
            </div>
        </motion.div>
    );
}

function TrendingSection() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
                padding: "24px",
                borderRadius: "16px",
                background: "#1A1A1A",
                border: "1px solid #333333",
                marginBottom: "24px",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "18px" }}>🔥</span>
                    <span style={{ fontWeight: "600", color: "#FFFFFF" }}>Trending</span>
                </div>
                <span style={{ fontSize: "13px", color: "#6B6B6B" }}>Past 24h</span>
            </div>

            {trendingTokens.map((token, i) => (
                <div
                    key={token.symbol}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "12px 0",
                        borderBottom: i < trendingTokens.length - 1 ? "1px solid #262626" : "none",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{ fontWeight: "600", color: "#FFFFFF" }}>{token.symbol}</span>
                        <span style={{ fontSize: "13px", color: "#6B6B6B" }}>{token.swidges} swidges</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "60px", height: "6px", borderRadius: "3px", background: "#262626", overflow: "hidden" }}>
                            <div style={{
                                width: `${token.buyPct}%`,
                                height: "100%",
                                background: token.buyPct > 50 ? "#22C55E" : "#EF4444",
                                borderRadius: "3px",
                            }} />
                        </div>
                        <span style={{ fontSize: "13px", color: token.buyPct > 50 ? "#22C55E" : "#EF4444" }}>
                            {token.buyPct}%
                        </span>
                    </div>
                </div>
            ))}
        </motion.div>
    );
}

function NetworkGrid() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <span style={{ fontSize: "18px" }}>🌐</span>
                <span style={{ fontWeight: "600", color: "#FFFFFF" }}>Explore networks</span>
            </div>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "12px",
            }}>
                {networks.map((network) => (
                    <motion.div
                        key={network.name}
                        whileHover={{ scale: 1.05 }}
                        style={{
                            padding: "16px",
                            borderRadius: "12px",
                            background: `linear-gradient(135deg, ${network.color}15 0%, ${network.color}05 100%)`,
                            border: "1px solid #333333",
                            textAlign: "center",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = `${network.color}50`}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = "#333333"}
                    >
                        <div style={{ fontSize: "24px", marginBottom: "8px" }}>{network.icon}</div>
                        <div style={{ fontSize: "12px", color: "#A0A0A0" }}>{network.name}</div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

export default function DashboardPage() {
    return (
        <div style={{ padding: "24px" }}>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ marginBottom: "24px" }}
            >
                <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#FFFFFF", marginBottom: "4px" }}>
                    Welcome back 👋
                </h1>
                <p style={{ color: "#6B6B6B", fontSize: "14px" }}>
                    Here&apos;s what&apos;s happening with your portfolio today.
                </p>
            </motion.div>

            {/* Portfolio Card */}
            <PortfolioCard />

            {/* Starred Assets */}
            <div style={{ marginBottom: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ fontSize: "18px" }}>⭐</span>
                        <span style={{ fontWeight: "600", color: "#FFFFFF" }}>Starred</span>
                    </div>
                    <button style={{
                        background: "transparent",
                        border: "none",
                        color: "#F97316",
                        fontSize: "13px",
                        cursor: "pointer",
                    }}>
                        + Add token
                    </button>
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "16px",
                }}>
                    {starredAssets.map((asset, i) => (
                        <motion.div
                            key={asset.symbol}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <AssetCard asset={asset} />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Trending Section */}
            <TrendingSection />

            {/* Network Grid */}
            <NetworkGrid />
        </div>
    );
}

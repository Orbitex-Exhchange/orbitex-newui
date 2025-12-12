"use client";

import { motion } from "framer-motion";

// Mock portfolio data
const portfolioAssets = [
    { symbol: "ETH", name: "Ethereum", icon: "⬡", balance: 2.5, value: 8312.50, change24h: 0.09 },
    { symbol: "BTC", name: "Bitcoin", icon: "₿", balance: 0.15, value: 13805.25, change24h: -0.74 },
    { symbol: "SOL", name: "Solana", icon: "◎", balance: 45, value: 6133.50, change24h: -1.30 },
    { symbol: "USDC", name: "USD Coin", icon: "💵", balance: 5000, value: 5000.00, change24h: 0.01 },
    { symbol: "ARB", name: "Arbitrum", icon: "⬢", balance: 1250, value: 1125.00, change24h: 2.15 },
];

const networks = [
    { name: "Ethereum", icon: "⬡", balance: 14117.75, color: "#627EEA" },
    { name: "Solana", icon: "◎", balance: 6133.50, color: "#9945FF" },
    { name: "Arbitrum", icon: "⬢", balance: 1125.00, color: "#28A0F0" },
    { name: "Base", icon: "▣", balance: 0, color: "#0052FF" },
];

function AssetRow({ asset, index }: { asset: typeof portfolioAssets[0]; index: number }) {
    const isPositive = asset.change24h >= 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px",
                borderRadius: "12px",
                background: "#1A1A1A",
                border: "1px solid #333333",
                marginBottom: "8px",
                cursor: "pointer",
                transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.background = "#262626";
                e.currentTarget.style.borderColor = "#F97316";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = "#1A1A1A";
                e.currentTarget.style.borderColor = "#333333";
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "#262626",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "22px",
                }}>
                    {asset.icon}
                </div>
                <div>
                    <div style={{ fontWeight: "600", color: "#FFFFFF", fontSize: "16px" }}>{asset.symbol}</div>
                    <div style={{ fontSize: "13px", color: "#6B6B6B" }}>{asset.name}</div>
                </div>
            </div>

            <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: "600", color: "#FFFFFF", fontSize: "16px" }}>
                    ${asset.value.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </div>
                <div style={{ fontSize: "13px", color: "#6B6B6B" }}>
                    {asset.balance} {asset.symbol}
                </div>
            </div>

            <div style={{
                color: isPositive ? "#22C55E" : "#EF4444",
                fontSize: "14px",
                fontWeight: "500",
            }}>
                {isPositive ? "▲" : "▼"} {Math.abs(asset.change24h).toFixed(2)}%
            </div>
        </motion.div>
    );
}

function NetworkCard({ network }: { network: typeof networks[0] }) {
    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            style={{
                padding: "20px",
                borderRadius: "14px",
                background: `linear-gradient(135deg, ${network.color}20 0%, ${network.color}05 100%)`,
                border: "1px solid #333333",
                cursor: "pointer",
                transition: "border-color 0.2s ease",
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = `${network.color}60`}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = "#333333"}
        >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                <span style={{ fontSize: "24px" }}>{network.icon}</span>
                <span style={{ fontWeight: "500", color: "#FFFFFF" }}>{network.name}</span>
            </div>
            <div style={{ fontSize: "20px", fontWeight: "bold", color: "#FFFFFF" }}>
                ${network.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
        </motion.div>
    );
}

export default function PortfolioPage() {
    const totalValue = portfolioAssets.reduce((sum, asset) => sum + asset.value, 0);

    return (
        <div style={{ padding: "24px" }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                <div>
                    <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#FFFFFF", marginBottom: "4px" }}>Portfolio</h1>
                    <p style={{ color: "#6B6B6B", fontSize: "14px" }}>Your assets across all chains</p>
                </div>

                <div style={{ display: "flex", gap: "12px" }}>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "12px 20px",
                            borderRadius: "10px",
                            background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
                            border: "none",
                            color: "white",
                            fontWeight: "600",
                            fontSize: "14px",
                            cursor: "pointer",
                            boxShadow: "0 6px 20px rgba(249, 115, 22, 0.3)",
                        }}
                    >
                        <span>💳</span>
                        Deposit
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "12px 20px",
                            borderRadius: "10px",
                            background: "#1A1A1A",
                            border: "1px solid #333333",
                            color: "#FFFFFF",
                            fontWeight: "500",
                            fontSize: "14px",
                            cursor: "pointer",
                        }}
                    >
                        <span>📤</span>
                        Send
                    </motion.button>
                </div>
            </div>

            {/* Total Balance Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    padding: "40px",
                    borderRadius: "20px",
                    background: "linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(26, 26, 26, 0.9) 50%, rgba(139, 92, 246, 0.1) 100%)",
                    border: "1px solid rgba(249, 115, 22, 0.2)",
                    marginBottom: "32px",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                    <span style={{ fontSize: "24px" }}>💰</span>
                    <span style={{ color: "#A0A0A0" }}>Total Balance</span>
                </div>
                <h2 style={{ fontSize: "48px", fontWeight: "bold", color: "#FFFFFF", marginBottom: "16px" }}>
                    ${totalValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </h2>

                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <span style={{ color: "#22C55E", fontSize: "18px", fontWeight: "600" }}>▲ $1,234.56 (3.8%)</span>
                    <span style={{ color: "#6B6B6B", fontSize: "14px" }}>Past 24 hours</span>
                </div>
            </motion.div>

            {/* Network breakdown */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{ marginBottom: "32px" }}
            >
                <h3 style={{ display: "flex", alignItems: "center", gap: "10px", fontWeight: "600", color: "#FFFFFF", marginBottom: "16px" }}>
                    <span>🌐</span>
                    Networks
                </h3>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "16px",
                }}>
                    {networks.map((network) => (
                        <NetworkCard key={network.name} network={network} />
                    ))}
                </div>
            </motion.section>

            {/* Assets List */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{ marginBottom: "32px" }}
            >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                    <h3 style={{ display: "flex", alignItems: "center", gap: "10px", fontWeight: "600", color: "#FFFFFF" }}>
                        <span>📊</span>
                        Assets
                    </h3>
                    <button style={{
                        background: "transparent",
                        border: "none",
                        color: "#F97316",
                        fontSize: "14px",
                        cursor: "pointer",
                    }}>
                        View all
                    </button>
                </div>

                <div>
                    {portfolioAssets.map((asset, index) => (
                        <AssetRow key={asset.symbol} asset={asset} index={index} />
                    ))}
                </div>
            </motion.section>

            {/* Activity Section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                    <h3 style={{ display: "flex", alignItems: "center", gap: "10px", fontWeight: "600", color: "#FFFFFF" }}>
                        <span>📜</span>
                        Recent Activity
                    </h3>
                    <button style={{
                        background: "transparent",
                        border: "none",
                        color: "#F97316",
                        fontSize: "14px",
                        cursor: "pointer",
                    }}>
                        View all
                    </button>
                </div>

                <div style={{
                    padding: "40px",
                    borderRadius: "16px",
                    background: "#1A1A1A",
                    border: "1px solid #333333",
                    textAlign: "center",
                }}>
                    <p style={{ color: "#6B6B6B", marginBottom: "16px" }}>No recent transactions</p>
                    <button style={{
                        background: "transparent",
                        border: "none",
                        color: "#F97316",
                        fontSize: "14px",
                        cursor: "pointer",
                    }}>
                        Make your first trade →
                    </button>
                </div>
            </motion.section>
        </div>
    );
}

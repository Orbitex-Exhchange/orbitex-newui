"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const chains = [
    { id: "eth", name: "Ethereum", icon: "⬡" },
    { id: "sol", name: "Solana", icon: "◎" },
    { id: "arb", name: "Arbitrum", icon: "⬢" },
    { id: "base", name: "Base", icon: "🔵" },
];

const tokens = [
    { symbol: "ETH", name: "Ether", balance: 2.5, price: 3325.60, icon: "⬡" },
    { symbol: "USDC", name: "USD Coin", balance: 5000, price: 1.00, icon: "💵" },
    { symbol: "SOL", name: "Solana", balance: 145, price: 136.30, icon: "◎" },
    { symbol: "WBTC", name: "Wrapped BTC", balance: 0.15, price: 92035.00, icon: "₿" },
];

export default function SwidgePage() {
    const [fromChain, setFromChain] = useState(chains[0]);
    const [toChain, setToChain] = useState(chains[1]);
    const [fromToken, setFromToken] = useState(tokens[0]);
    const [toToken, setToToken] = useState(tokens[2]);
    const [amount, setAmount] = useState("");
    const [isRotated, setIsRotated] = useState(false);

    const handleSwap = () => {
        setIsRotated(!isRotated);
        setFromChain(toChain);
        setToChain(fromChain);
        setFromToken(toToken);
        setToToken(fromToken);
    };

    return (
        <div style={{ padding: "24px", maxWidth: "600px", margin: "0 auto" }}>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
                <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#FFFFFF", marginBottom: "8px" }}>
                    Swidge
                </h1>
                <p style={{ color: "#6B6B6B", fontSize: "16px" }}>
                    Swap and bridge assets across chains in one click.
                </p>
            </div>

            {/* Swap Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    padding: "8px",
                    background: "#1A1A1A",
                    border: "1px solid #333333",
                    borderRadius: "24px",
                    position: "relative",
                }}
            >
                {/* Settings Icon */}
                <button style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    background: "transparent",
                    border: "none",
                    color: "#A0A0A0",
                    cursor: "pointer",
                    zIndex: 10,
                }}>
                    ⚙️
                </button>

                {/* From Section */}
                <div style={{
                    padding: "20px",
                    background: "#262626",
                    borderRadius: "20px",
                    marginBottom: "4px",
                }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                        <span style={{ color: "#A0A0A0", fontSize: "14px" }}>From</span>
                        <span style={{ color: "#A0A0A0", fontSize: "14px" }}>
                            Balance: {fromToken.balance}
                        </span>
                    </div>

                    <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.0"
                            style={{
                                flex: 1,
                                background: "transparent",
                                border: "none",
                                fontSize: "32px",
                                fontWeight: "bold",
                                color: "#FFFFFF",
                                outline: "none",
                                width: "100%",
                            }}
                        />
                        <button style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            background: "#333333",
                            border: "1px solid #404040",
                            borderRadius: "50px",
                            padding: "8px 16px",
                            color: "#FFFFFF",
                            fontWeight: "600",
                            cursor: "pointer",
                        }}>
                            <span style={{ fontSize: "20px" }}>{fromToken.icon || "💎"}</span>
                            {fromToken.symbol}
                            <span style={{ fontSize: "10px" }}>▼</span>
                        </button>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            background: "rgba(0,0,0,0.2)",
                            padding: "4px 10px",
                            borderRadius: "8px"
                        }}>
                            <span style={{ fontSize: "12px", color: "#A0A0A0" }}> on </span>
                            <span style={{ fontSize: "16px" }}>{fromChain.icon}</span>
                            <span style={{ fontSize: "12px", color: "#FFFFFF", fontWeight: "500" }}>{fromChain.name}</span>
                        </div>
                        <span style={{ color: "#6B6B6B", fontSize: "14px" }}>
                            ${(Number(amount) * fromToken.price).toFixed(2)}
                        </span>
                    </div>
                </div>

                {/* Swap Direction Button */}
                <div style={{ position: "relative", height: "0", zIndex: 10 }}>
                    <motion.button
                        onClick={handleSwap}
                        animate={{ rotate: isRotated ? 180 : 0 }}
                        style={{
                            position: "absolute",
                            left: "50%",
                            top: "-20px",
                            transform: "translateX(-50%)",
                            width: "40px",
                            height: "40px",
                            borderRadius: "12px",
                            background: "#1A1A1A",
                            border: "4px solid #0D0D0D",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            color: "#F97316",
                        }}
                    >
                        ↓
                    </motion.button>
                </div>

                {/* To Section */}
                <div style={{
                    padding: "20px",
                    background: "#262626",
                    borderRadius: "20px",
                }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                        <span style={{ color: "#A0A0A0", fontSize: "14px" }}>To</span>
                        <span style={{ color: "#A0A0A0", fontSize: "14px" }}>
                            Balance: {toToken.balance}
                        </span>
                    </div>

                    <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
                        <input
                            type="text"
                            readOnly
                            value={amount ? (Number(amount) * (fromToken.price / toToken.price)).toFixed(4) : "0.0"}
                            style={{
                                flex: 1,
                                background: "transparent",
                                border: "none",
                                fontSize: "32px",
                                fontWeight: "bold",
                                color: "#FFFFFF",
                                outline: "none",
                                width: "100%",
                            }}
                        />
                        <button style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            background: "#333333",
                            border: "1px solid #404040",
                            borderRadius: "50px",
                            padding: "8px 16px",
                            color: "#FFFFFF",
                            fontWeight: "600",
                            cursor: "pointer",
                        }}>
                            <span style={{ fontSize: "20px" }}>{toToken.icon || "💎"}</span>
                            {toToken.symbol}
                            <span style={{ fontSize: "10px" }}>▼</span>
                        </button>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            background: "rgba(0,0,0,0.2)",
                            padding: "4px 10px",
                            borderRadius: "8px"
                        }}>
                            <span style={{ fontSize: "12px", color: "#A0A0A0" }}> on </span>
                            <span style={{ fontSize: "16px" }}>{toChain.icon}</span>
                            <span style={{ fontSize: "12px", color: "#FFFFFF", fontWeight: "500" }}>{toChain.name}</span>
                        </div>
                        <span style={{ color: "#6B6B6B", fontSize: "14px" }}>
                            ~${amount ? (Number(amount) * fromToken.price).toFixed(2) : "0.00"} (-0.1%)
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Info Accordion */}
            <div style={{
                marginTop: "16px",
                padding: "16px",
                borderRadius: "16px",
                border: "1px solid #333333",
                background: "#1A1A1A",
            }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "8px" }}>
                    <span style={{ color: "#A0A0A0" }}>Rate</span>
                    <span style={{ color: "#FFFFFF" }}>1 {fromToken.symbol} = {(fromToken.price / toToken.price).toFixed(4)} {toToken.symbol}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "8px" }}>
                    <span style={{ color: "#A0A0A0" }}>Network Cost</span>
                    <span style={{ color: "#A0A0A0" }}>~$0.45</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                    <span style={{ color: "#A0A0A0" }}>Route</span>
                    <span style={{ color: "#A0A0A0" }}>{fromChain.name} → {toChain.name}</span>
                </div>
            </div>

            {/* Submit Button */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                    width: "100%",
                    marginTop: "24px",
                    padding: "18px",
                    borderRadius: "16px",
                    border: "none",
                    background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
                    color: "white",
                    fontSize: "18px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    boxShadow: "0 8px 30px rgba(249, 115, 22, 0.3)",
                }}
            >
                Swidge
            </motion.button>
        </div>
    );
}

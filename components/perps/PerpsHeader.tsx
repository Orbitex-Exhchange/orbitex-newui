"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface PerpsHeaderProps {
    currentMarket?: string;
    price?: number;
    change24h?: number;
    volume24h?: string;
    high24h?: number;
    low24h?: number;
    fundingRate?: string;
    openInterest?: string;
}

const markets = [
    { symbol: "ETH-USD", name: "Ethereum", price: 3325.60, change24h: 0.09, iconColor: "#627EEA" },
    { symbol: "BTC-USD", name: "Bitcoin", price: 92035, change24h: -0.74, iconColor: "#F7931A" },
    { symbol: "SOL-USD", name: "Solana", price: 136.30, change24h: -1.30, iconColor: "#14F195" },
    { symbol: "ARB-USD", name: "Arbitrum", price: 1.42, change24h: 2.15, iconColor: "#28A0F0" },
    { symbol: "OP-USD", name: "Optimism", price: 2.18, change24h: 1.85, iconColor: "#FF0420" },
    { symbol: "AVAX-USD", name: "Avalanche", price: 38.50, change24h: -0.45, iconColor: "#E84142" },
    { symbol: "DOGE-USD", name: "Dogecoin", price: 0.082, change24h: 3.25, iconColor: "#C2A633" },
    { symbol: "LINK-USD", name: "Chainlink", price: 14.85, change24h: 1.12, iconColor: "#2A5ADA" },
];

export default function PerpsHeader({
    currentMarket = "ETH-USD",
    price = 3325.60,
    change24h = 0.09,
    volume24h = "32.6B",
    high24h = 3380,
    low24h = 3290,
    fundingRate = "0.0045%",
    openInterest = "1.2B",
}: PerpsHeaderProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [priceFlash, setPriceFlash] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const isPositive = change24h >= 0;
    const currentMarketData = markets.find(m => m.symbol === currentMarket) || markets[0];

    const filteredMarkets = markets.filter(m =>
        m.symbol.toLowerCase().includes(search.toLowerCase()) ||
        m.name.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    // Flash price on change
    useEffect(() => {
        setPriceFlash(true);
        const timer = setTimeout(() => setPriceFlash(false), 200);
        return () => clearTimeout(timer);
    }, [price]);

    return (
        <motion.header
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                height: "48px",
                background: "linear-gradient(to right, #101014, #0f0f12)",
                borderBottom: "1px solid #1e1e24",
                display: "flex",
                alignItems: "center",
                padding: "0 16px",
                gap: "16px",
                flexShrink: 0,
            }}
        >
            {/* Logo */}
            <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/dashboard")}
                style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, #00d395 0%, #00a877 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(0, 211, 149, 0.3)",
                }}
            >
                <span style={{ color: "#000", fontWeight: "bold", fontSize: "14px" }}>O</span>
            </motion.div>

            {/* Market Selector */}
            <div ref={dropdownRef} style={{ position: "relative" }}>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "8px 14px",
                        background: isOpen ? "#1e1e24" : "#16161a",
                        border: "1px solid #2a2a32",
                        borderRadius: "8px",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                    }}
                >
                    <motion.div
                        animate={{ rotate: isOpen ? 360 : 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            background: `linear-gradient(135deg, ${currentMarketData.iconColor}, ${currentMarketData.iconColor}99)`,
                            boxShadow: `0 0 10px ${currentMarketData.iconColor}40`,
                        }}
                    />
                    <span style={{ color: "#fff", fontWeight: "700", fontSize: "14px" }}>{currentMarket}</span>
                    <motion.svg
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                    >
                        <path d="M3 4.5L6 7.5L9 4.5" stroke="#5c5c6b" strokeWidth="1.5" strokeLinecap="round" />
                    </motion.svg>
                </motion.button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            style={{
                                position: "absolute",
                                top: "calc(100% + 8px)",
                                left: 0,
                                width: "320px",
                                background: "#16161a",
                                border: "1px solid #2a2a32",
                                borderRadius: "12px",
                                overflow: "hidden",
                                zIndex: 1000,
                                boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
                            }}
                        >
                            <div style={{ padding: "12px", borderBottom: "1px solid #2a2a32" }}>
                                <div style={{ position: "relative" }}>
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search markets..."
                                        autoFocus
                                        style={{
                                            width: "100%",
                                            padding: "10px 12px",
                                            paddingLeft: "36px",
                                            borderRadius: "8px",
                                            border: "1px solid #2a2a32",
                                            background: "#0b0b0e",
                                            color: "#fff",
                                            fontSize: "13px",
                                            outline: "none",
                                        }}
                                    />
                                    <span style={{
                                        position: "absolute",
                                        left: "12px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        color: "#5c5c6b",
                                        fontSize: "14px",
                                    }}>
                                        🔍
                                    </span>
                                </div>
                            </div>
                            <div style={{ maxHeight: "280px", overflow: "auto" }}>
                                {filteredMarkets.map((m, i) => (
                                    <motion.div
                                        key={m.symbol}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.03 }}
                                        onClick={() => {
                                            setIsOpen(false);
                                            setSearch("");
                                            router.push(`/dashboard/trade/${m.symbol}`);
                                        }}
                                        whileHover={{ backgroundColor: "#2a2a32" }}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            padding: "12px 14px",
                                            gap: "12px",
                                            cursor: "pointer",
                                            background: currentMarket === m.symbol ? "#1e1e24" : "transparent",
                                            borderLeft: currentMarket === m.symbol ? "2px solid #00d395" : "2px solid transparent",
                                            transition: "all 0.15s ease",
                                        }}
                                    >
                                        <div style={{
                                            width: "28px",
                                            height: "28px",
                                            borderRadius: "50%",
                                            background: `linear-gradient(135deg, ${m.iconColor}, ${m.iconColor}99)`,
                                            boxShadow: `0 0 8px ${m.iconColor}30`,
                                        }} />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ color: "#fff", fontSize: "13px", fontWeight: "600" }}>{m.symbol}</div>
                                            <div style={{ color: "#5c5c6b", fontSize: "11px" }}>{m.name}</div>
                                        </div>
                                        <div style={{ textAlign: "right" }}>
                                            <div style={{ color: "#fff", fontSize: "12px", fontFamily: "'SF Mono', monospace", fontWeight: "500" }}>
                                                ${m.price.toLocaleString()}
                                            </div>
                                            <div style={{
                                                color: m.change24h >= 0 ? "#00d395" : "#ff5252",
                                                fontSize: "11px",
                                                fontWeight: "500",
                                            }}>
                                                {m.change24h >= 0 ? "+" : ""}{m.change24h.toFixed(2)}%
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Price with animation */}
            <motion.div
                animate={{
                    backgroundColor: priceFlash ? (isPositive ? "rgba(0,211,149,0.2)" : "rgba(255,82,82,0.2)") : "transparent",
                }}
                style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "8px",
                    padding: "4px 8px",
                    borderRadius: "6px",
                }}
            >
                <motion.span
                    key={price}
                    initial={{ y: isPositive ? 10 : -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    style={{ fontSize: "18px", fontWeight: "700", color: "#fff", fontFamily: "'SF Mono', monospace" }}
                >
                    ${price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </motion.span>
                <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        color: isPositive ? "#00d395" : "#ff5252",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        background: isPositive ? "rgba(0,211,149,0.1)" : "rgba(255,82,82,0.1)",
                    }}
                >
                    {isPositive ? "↑" : "↓"} {isPositive ? "+" : ""}{change24h.toFixed(2)}%
                </motion.span>
            </motion.div>

            <div style={{ width: "1px", height: "24px", background: "#2a2a32" }} />

            {/* Stats */}
            <div style={{ display: "flex", gap: "24px" }}>
                {[
                    { label: "24h High", value: `$${high24h.toLocaleString()}`, color: "#00d395" },
                    { label: "24h Low", value: `$${low24h.toLocaleString()}`, color: "#ff5252" },
                    { label: "24h Vol", value: volume24h },
                    { label: "Open Int", value: openInterest },
                    { label: "Funding", value: fundingRate, highlight: true },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        style={{ display: "flex", flexDirection: "column", gap: "2px", cursor: "default" }}
                    >
                        <span style={{ fontSize: "9px", color: "#5c5c6b", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: "500" }}>
                            {stat.label}
                        </span>
                        <span style={{
                            fontSize: "12px",
                            fontWeight: "600",
                            color: stat.color || "#c0c0c8",
                            fontFamily: "'SF Mono', monospace",
                            padding: stat.highlight ? "1px 4px" : undefined,
                            borderRadius: stat.highlight ? "3px" : undefined,
                            background: stat.highlight ? "rgba(0,211,149,0.1)" : undefined,
                        }}>
                            {stat.value}
                        </span>
                    </motion.div>
                ))}
            </div>

            <div style={{ flex: 1 }} />

            {/* Network Badge */}
            <motion.div
                whileHover={{ scale: 1.02 }}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "5px 10px",
                    borderRadius: "20px",
                    background: "rgba(0, 211, 149, 0.1)",
                    border: "1px solid rgba(0, 211, 149, 0.2)",
                }}
            >
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#00d395",
                        boxShadow: "0 0 6px #00d395",
                    }}
                />
                <span style={{ fontSize: "10px", color: "#00d395", fontWeight: "600" }}>Base</span>
            </motion.div>

            {/* Connect Wallet */}
            <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 4px 20px rgba(0, 211, 149, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                style={{
                    padding: "8px 18px",
                    borderRadius: "8px",
                    border: "none",
                    background: "linear-gradient(135deg, #00d395 0%, #00a877 100%)",
                    color: "#000",
                    fontWeight: "700",
                    fontSize: "12px",
                    cursor: "pointer",
                    boxShadow: "0 2px 12px rgba(0, 211, 149, 0.3)",
                }}
            >
                Connect
            </motion.button>
        </motion.header>
    );
}

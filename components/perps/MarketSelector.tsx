"use client";

import { useState } from "react";
import Link from "next/link";

interface Market {
    symbol: string;
    name: string;
    price: number;
    change24h: number;
    volume24h: string;
    iconColor: string;
}

interface MarketSelectorProps {
    currentMarket?: string;
    onSelect?: (symbol: string) => void;
    isModal?: boolean;
}

const markets: Market[] = [
    { symbol: "ETH-USD", name: "Ethereum", price: 3325.60, change24h: 0.09, volume24h: "32.6B", iconColor: "#627EEA" },
    { symbol: "BTC-USD", name: "Bitcoin", price: 92035, change24h: -0.74, volume24h: "51.9B", iconColor: "#F7931A" },
    { symbol: "SOL-USD", name: "Solana", price: 136.30, change24h: -1.30, volume24h: "4.5B", iconColor: "#14F195" },
    { symbol: "ARB-USD", name: "Arbitrum", price: 1.42, change24h: 2.15, volume24h: "890M", iconColor: "#28A0F0" },
    { symbol: "OP-USD", name: "Optimism", price: 2.18, change24h: 1.85, volume24h: "540M", iconColor: "#FF0420" },
    { symbol: "AVAX-USD", name: "Avalanche", price: 38.50, change24h: -0.45, volume24h: "1.2B", iconColor: "#E84142" },
    { symbol: "DOGE-USD", name: "Dogecoin", price: 0.082, change24h: 3.25, volume24h: "2.1B", iconColor: "#C2A633" },
    { symbol: "LINK-USD", name: "Chainlink", price: 14.85, change24h: 1.12, volume24h: "680M", iconColor: "#2A5ADA" },
    { symbol: "MATIC-USD", name: "Polygon", price: 0.92, change24h: -0.65, volume24h: "420M", iconColor: "#8247E5" },
    { symbol: "UNI-USD", name: "Uniswap", price: 6.45, change24h: 0.82, volume24h: "310M", iconColor: "#FF007A" },
];

export default function MarketSelector({ currentMarket = "ETH-USD", onSelect, isModal = false }: MarketSelectorProps) {
    const [search, setSearch] = useState("");
    const [favorites, setFavorites] = useState<string[]>(["ETH-USD", "BTC-USD"]);

    const filteredMarkets = markets.filter(
        (m) =>
            m.symbol.toLowerCase().includes(search.toLowerCase()) ||
            m.name.toLowerCase().includes(search.toLowerCase())
    );

    const toggleFavorite = (symbol: string) => {
        setFavorites((prev) =>
            prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]
        );
    };

    return (
        <div style={{
            background: "#0d0d0d",
            borderRadius: isModal ? "16px" : "12px",
            border: "1px solid #1a1a1a",
            overflow: "hidden",
            width: isModal ? "400px" : "100%",
            maxHeight: isModal ? "500px" : "100%",
        }}>
            {/* Header */}
            <div style={{ padding: "16px", borderBottom: "1px solid #1a1a1a" }}>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search markets..."
                    style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        border: "1px solid #262626",
                        background: "#141414",
                        color: "#fff",
                        fontSize: "13px",
                        outline: "none",
                    }}
                />
            </div>

            {/* Favorites Section */}
            {favorites.length > 0 && !search && (
                <div style={{ padding: "12px 16px", borderBottom: "1px solid #1a1a1a" }}>
                    <div style={{ fontSize: "11px", color: "#6b6b6b", marginBottom: "8px", textTransform: "uppercase" }}>
                        Favorites
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {favorites.map((fav) => {
                            const market = markets.find((m) => m.symbol === fav);
                            if (!market) return null;
                            return (
                                <Link
                                    key={fav}
                                    href={`/dashboard/trade/${fav}`}
                                    onClick={() => onSelect?.(fav)}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        padding: "6px 10px",
                                        borderRadius: "6px",
                                        background: currentMarket === fav ? "#262626" : "#141414",
                                        border: "1px solid #262626",
                                        textDecoration: "none",
                                        cursor: "pointer",
                                    }}
                                >
                                    <div style={{
                                        width: "16px",
                                        height: "16px",
                                        borderRadius: "50%",
                                        background: market.iconColor,
                                    }} />
                                    <span style={{ fontSize: "12px", color: "#fff", fontWeight: "500" }}>{fav}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Markets List */}
            <div style={{ maxHeight: "300px", overflow: "auto" }}>
                {filteredMarkets.map((market) => (
                    <Link
                        key={market.symbol}
                        href={`/dashboard/trade/${market.symbol}`}
                        onClick={() => onSelect?.(market.symbol)}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "12px 16px",
                            gap: "12px",
                            textDecoration: "none",
                            background: currentMarket === market.symbol ? "#141414" : "transparent",
                            cursor: "pointer",
                            transition: "background 0.1s ease",
                        }}
                        onMouseEnter={(e) => {
                            if (currentMarket !== market.symbol) {
                                e.currentTarget.style.background = "#0f0f0f";
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (currentMarket !== market.symbol) {
                                e.currentTarget.style.background = "transparent";
                            }
                        }}
                    >
                        {/* Favorite Star */}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleFavorite(market.symbol);
                            }}
                            style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: 0,
                                fontSize: "14px",
                                color: favorites.includes(market.symbol) ? "#F97316" : "#3a3a3a",
                            }}
                        >
                            ★
                        </button>

                        {/* Icon */}
                        <div style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            background: market.iconColor,
                        }} />

                        {/* Name & Symbol */}
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: "13px", fontWeight: "500", color: "#fff" }}>{market.symbol}</div>
                            <div style={{ fontSize: "11px", color: "#6b6b6b" }}>{market.name}</div>
                        </div>

                        {/* Price & Change */}
                        <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: "13px", fontWeight: "500", color: "#fff", fontFamily: "monospace" }}>
                                ${market.price.toLocaleString()}
                            </div>
                            <div style={{
                                fontSize: "11px",
                                color: market.change24h >= 0 ? "#22c55e" : "#ef4444",
                            }}>
                                {market.change24h >= 0 ? "+" : ""}{market.change24h.toFixed(2)}%
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

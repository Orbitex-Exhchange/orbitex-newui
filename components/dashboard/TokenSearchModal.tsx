"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { modalOverlay, modalContent, staggerContainer, staggerItem } from "@/lib/animations";
import { cn, formatCurrency, formatPercentage, getPriceChangeClass, generateSparklineData } from "@/lib/utils";

interface Token {
    symbol: string;
    name: string;
    icon: string;
    price: number;
    change24h: number;
    marketCap?: number;
    volume24h?: number;
    networks?: string[];
}

const mockTokens: Token[] = [
    { symbol: "ETH", name: "Ethereum", icon: "⬡", price: 3323.42, change24h: 0.02, marketCap: 401400000000, volume24h: 32600000000, networks: ["ethereum", "arbitrum", "optimism", "base"] },
    { symbol: "BNB", name: "BNB", icon: "◆", price: 894.39, change24h: -0.23, marketCap: 130000000000, volume24h: 2100000000, networks: ["bnb"] },
    { symbol: "SOL", name: "Solana", icon: "◎", price: 136.27, change24h: -1.32, marketCap: 63000000000, volume24h: 4500000000, networks: ["solana"] },
    { symbol: "XRP", name: "XRP", icon: "✕", price: 2.05, change24h: -2.86, marketCap: 118000000000, volume24h: 8000000000, networks: ["ethereum"] },
    { symbol: "AVAX", name: "Avax", icon: "▲", price: 14.06, change24h: 3.82, marketCap: 5700000000, volume24h: 340000000, networks: ["avalanche"] },
    { symbol: "HYPE", name: "HYPE", icon: "⚡", price: 28.83, change24h: 3.08, marketCap: 9600000000, volume24h: 410000000, networks: ["ethereum"] },
    { symbol: "BTC", name: "Bitcoin", icon: "₿", price: 92024.00, change24h: -0.75, marketCap: 1800000000000, volume24h: 51900000000, networks: ["ethereum"] },
    { symbol: "USDC", name: "USDC", icon: "💵", price: 1.00, change24h: -0.10, marketCap: 45000000000, volume24h: 8000000000, networks: ["ethereum", "solana", "base", "arbitrum"] },
];

const filterTabs = [
    { id: "popular", label: "Popular", icon: "🔥" },
    { id: "top", label: "Top", icon: "📊" },
    { id: "new", label: "New", icon: "✨" },
    { id: "gainers", label: "Top gainers", icon: "📈" },
    { id: "losers", label: "Top losers", icon: "📉" },
    { id: "my-tokens", label: "My tokens", icon: "💼" },
    { id: "starred", label: "Starred", icon: "⭐" },
];

// Sparkline component
function DetailChart({ data }: { data: number[] }) {
    const width = 280;
    const height = 100;
    const padding = 4;

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    const points = data.map((value, index) => {
        const x = padding + (index / (data.length - 1)) * (width - padding * 2);
        const y = height - padding - ((value - min) / range) * (height - padding * 2);
        return `${x},${y}`;
    }).join(" ");

    return (
        <svg width={width} height={height} className="w-full">
            <polyline
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2"
                points={points}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

interface TokenSearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function TokenSearchModal({ isOpen, onClose }: TokenSearchModalProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("popular");
    const [selectedToken, setSelectedToken] = useState<Token | null>(mockTokens[0]);

    const filteredTokens = useMemo(() => {
        if (!searchQuery) return mockTokens;
        return mockTokens.filter(
            (token) =>
                token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                token.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    const chartData = useMemo(() => generateSparklineData(50, selectedToken?.change24h ? (selectedToken.change24h > 0 ? "up" : "down") : "neutral"), [selectedToken]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={modalOverlay}
                className="modal-overlay"
                onClick={onClose}
            >
                <motion.div
                    variants={modalContent}
                    className="w-full max-w-4xl bg-surface rounded-2xl border border-border overflow-hidden shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Search header */}
                    <div className="p-4 border-b border-border">
                        <div className="relative">
                            <svg
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            <input
                                type="text"
                                placeholder="Enter token name or contract address..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-surface-light border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent"
                            />
                        </div>
                    </div>

                    {/* Filter tabs */}
                    <div className="px-4 py-3 border-b border-border flex items-center gap-2 overflow-x-auto">
                        {filterTabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                                    activeTab === tab.id
                                        ? "bg-accent text-white"
                                        : "bg-surface-light text-text-secondary hover:text-text-primary"
                                )}
                            >
                                <span>{tab.icon}</span>
                                <span>{tab.label}</span>
                            </button>
                        ))}

                        <div className="ml-auto">
                            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-surface-light text-text-secondary">
                                All networks
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="flex h-[400px]">
                        {/* Token list */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                            className="w-1/2 border-r border-border overflow-y-auto"
                        >
                            {filteredTokens.map((token) => (
                                <motion.button
                                    key={token.symbol}
                                    variants={staggerItem}
                                    onClick={() => setSelectedToken(token)}
                                    className={cn(
                                        "w-full px-4 py-3 flex items-center justify-between hover:bg-surface-light transition-colors",
                                        selectedToken?.symbol === token.symbol && "bg-surface-light"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-surface-light flex items-center justify-center text-xl">
                                            {token.icon}
                                        </div>
                                        <div className="text-left">
                                            <div className="font-semibold text-text-primary">{token.name}</div>
                                            <div className="text-sm text-text-muted">{token.symbol}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium text-text-primary">{formatCurrency(token.price)}</div>
                                        <div className={cn("text-sm", getPriceChangeClass(token.change24h))}>
                                            {token.change24h >= 0 ? "▲" : "▼"} {formatPercentage(Math.abs(token.change24h))}
                                        </div>
                                    </div>
                                </motion.button>
                            ))}
                        </motion.div>

                        {/* Token detail */}
                        {selectedToken && (
                            <div className="w-1/2 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-surface-light flex items-center justify-center text-2xl">
                                            {selectedToken.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-text-primary">{selectedToken.name}</h3>
                                            <p className="text-sm text-text-muted">{selectedToken.symbol} #1</p>
                                        </div>
                                    </div>
                                    <button className="text-2xl text-text-muted hover:text-yellow-400">
                                        ☆
                                    </button>
                                </div>

                                {/* Price chart */}
                                <div className="mb-4">
                                    <DetailChart data={chartData} />
                                    <p className="text-xs text-text-muted text-right mt-1">Last 24h</p>
                                </div>

                                {/* Stats */}
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-text-muted">Price</span>
                                        <span className="text-text-primary font-medium">{formatCurrency(selectedToken.price)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-text-muted">24h %</span>
                                        <span className={cn("font-medium", getPriceChangeClass(selectedToken.change24h))}>
                                            {selectedToken.change24h >= 0 ? "▲" : "▼"} {formatPercentage(Math.abs(selectedToken.change24h))}
                                        </span>
                                    </div>
                                    {selectedToken.marketCap && (
                                        <div className="flex justify-between">
                                            <span className="text-text-muted">Market cap</span>
                                            <span className="text-text-primary font-medium">${(selectedToken.marketCap / 1e9).toFixed(1)}B</span>
                                        </div>
                                    )}
                                    {selectedToken.volume24h && (
                                        <div className="flex justify-between">
                                            <span className="text-text-muted">Volume 24h</span>
                                            <span className="text-text-primary font-medium">${(selectedToken.volume24h / 1e9).toFixed(1)}B</span>
                                        </div>
                                    )}
                                    {selectedToken.networks && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-text-muted">Supported networks</span>
                                            <div className="flex gap-1">
                                                {selectedToken.networks.slice(0, 5).map((network) => (
                                                    <div
                                                        key={network}
                                                        className="w-6 h-6 rounded-full bg-surface-light flex items-center justify-center text-xs"
                                                    >
                                                        {network.charAt(0).toUpperCase()}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Action buttons */}
                                <div className="flex gap-3 mt-6">
                                    <button className="flex-1 py-3 rounded-xl bg-surface-light border border-border text-text-primary font-medium hover:bg-surface-hover transition-colors flex items-center justify-center gap-2">
                                        <span>🔄</span>
                                        Swidge
                                    </button>
                                    <button className="flex-1 py-3 rounded-xl bg-surface-light border border-border text-text-primary font-medium hover:bg-surface-hover transition-colors flex items-center justify-center gap-2">
                                        <span>→</span>
                                        More details
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

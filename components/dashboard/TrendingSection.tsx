"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { formatCompact } from "@/lib/utils";

interface TrendingToken {
    symbol: string;
    icon: string;
    swiges: number;
    buyPercent: number;
    sellPercent: number;
}

const trendingTokens: TrendingToken[] = [
    { symbol: "SOL", icon: "◎", swiges: 144154, buyPercent: 11, sellPercent: 89 },
    { symbol: "FARTCOIN", icon: "💨", swiges: 18778, buyPercent: 100, sellPercent: 0 },
    { symbol: "TRUMP", icon: "🎺", swiges: 6584, buyPercent: 100, sellPercent: 0 },
    { symbol: "ETH", icon: "⬡", swiges: 1835, buyPercent: 63, sellPercent: 37 },
];

export default function TrendingSection() {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
        >
            <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">🔥</span>
                <h3 className="font-semibold text-text-primary">Trending on swidge</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {trendingTokens.map((token) => (
                    <motion.div
                        key={token.symbol}
                        variants={staggerItem}
                        className="p-4 rounded-xl bg-surface border border-border hover:border-border-light transition-all cursor-pointer"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-xl">{token.icon}</span>
                            <span className="font-bold text-text-primary">{token.symbol}</span>
                        </div>

                        <div className="mb-3">
                            <span className="text-2xl font-bold text-text-primary">
                                {formatCompact(token.swiges)}
                            </span>
                            <span className="text-sm text-text-muted ml-1">Swidges</span>
                        </div>

                        {/* Progress bar */}
                        <div className="flex gap-0.5 h-1.5 rounded-full overflow-hidden mb-2">
                            <div
                                className="bg-success rounded-l-full"
                                style={{ width: `${token.buyPercent}%` }}
                            />
                            <div
                                className="bg-danger rounded-r-full"
                                style={{ width: `${token.sellPercent}%` }}
                            />
                        </div>

                        <div className="flex justify-between text-xs text-text-muted">
                            <span>{token.buyPercent}% buys</span>
                            <span>{token.sellPercent}% sells</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}

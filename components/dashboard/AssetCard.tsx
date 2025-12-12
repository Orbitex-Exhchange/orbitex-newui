"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { cardHover } from "@/lib/animations";
import { cn, formatCurrency, formatPercentage, generateSparklineData, getPriceChangeClass } from "@/lib/utils";

interface AssetCardProps {
    symbol: string;
    name: string;
    price: number;
    change24h: number;
    icon?: string;
    isStarred?: boolean;
    onToggleStar?: () => void;
}

// Simple SVG sparkline component
function Sparkline({ data, isPositive }: { data: number[]; isPositive: boolean }) {
    const width = 120;
    const height = 40;
    const padding = 2;

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    const points = data.map((value, index) => {
        const x = padding + (index / (data.length - 1)) * (width - padding * 2);
        const y = height - padding - ((value - min) / range) * (height - padding * 2);
        return `${x},${y}`;
    }).join(" ");

    return (
        <svg width={width} height={height} className="flex-shrink-0">
            <polyline
                fill="none"
                stroke={isPositive ? "#22C55E" : "#EF4444"}
                strokeWidth="1.5"
                points={points}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function AssetCard({
    symbol,
    name: _name,
    price,
    change24h,
    icon,
    isStarred = false,
    onToggleStar,
}: AssetCardProps) {
    const isPositive = change24h >= 0;
    const sparklineData = useMemo(() =>
        generateSparklineData(20, isPositive ? "up" : "down"),
        [isPositive]
    );

    return (
        <motion.div
            initial="rest"
            whileHover="hover"
            variants={cardHover}
            className="p-4 rounded-xl bg-surface border border-border hover:border-border-light transition-all cursor-pointer"
        >
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-surface-light flex items-center justify-center text-lg">
                        {icon || symbol.charAt(0)}
                    </div>
                    <span className="font-semibold text-text-primary">{symbol}</span>
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleStar?.();
                    }}
                    className={cn(
                        "text-lg transition-colors",
                        isStarred ? "text-yellow-400" : "text-text-muted hover:text-text-secondary"
                    )}
                >
                    {isStarred ? "★" : "☆"}
                </button>
            </div>

            <Sparkline data={sparklineData} isPositive={isPositive} />

            <div className="flex items-center justify-between mt-3">
                <span className={cn("text-sm font-medium", getPriceChangeClass(change24h))}>
                    {change24h >= 0 ? "▲" : "▼"}{formatPercentage(Math.abs(change24h))}
                </span>
                <span className="text-sm text-text-primary font-medium">
                    {formatCurrency(price)}
                </span>
            </div>
        </motion.div>
    );
}

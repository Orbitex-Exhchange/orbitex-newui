"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem, cardHover } from "@/lib/animations";
import { cn } from "@/lib/utils";

const networks = [
    { name: "Ethereum", icon: "⬡", color: "ethereum", shortName: "ETH" },
    { name: "Solana", icon: "◎", color: "solana", shortName: "SOL" },
    { name: "Base", icon: "▣", color: "base", shortName: "BASE" },
    { name: "Monad", icon: "◉", color: "ethereum", shortName: "MONAD" },
    { name: "Arbitrum", icon: "⬢", color: "arbitrum", shortName: "ARB" },
    { name: "Optimism", icon: "◯", color: "optimism", shortName: "OP" },
    { name: "BNB Chain", icon: "◆", color: "bnb", shortName: "BNB" },
    { name: "Polygon", icon: "⬠", color: "polygon", shortName: "MATIC" },
    { name: "Unichain", icon: "🦄", color: "polygon", shortName: "UNI" },
    { name: "Avalanche", icon: "▲", color: "avalanche", shortName: "AVAX" },
    { name: "HyperEVM", icon: "⚡", color: "ethereum", shortName: "HYPE" },
    { name: "NEAR", icon: "◈", color: "ethereum", shortName: "NEAR" },
    { name: "Ink Chain", icon: "✒️", color: "ethereum", shortName: "INK" },
    { name: "Sonic", icon: "🔵", color: "base", shortName: "SONIC" },
    { name: "Berachain", icon: "🐻", color: "bnb", shortName: "BERA" },
    { name: "Blast", icon: "💥", color: "bnb", shortName: "BLAST" },
];

export default function NetworkGrid() {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
        >
            <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">🌐</span>
                <h3 className="font-semibold text-text-primary">Explore supported networks</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {networks.map((network) => (
                    <motion.div
                        key={network.name}
                        variants={staggerItem}
                        whileHover="hover"
                        initial="rest"
                    >
                        <motion.button
                            variants={cardHover}
                            className={cn(
                                "w-full p-4 rounded-xl border border-border hover:border-border-light transition-all",
                                `network-${network.color}`
                            )}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-xl">{network.icon}</span>
                                <span className="text-sm text-text-primary font-medium truncate">
                                    {network.name}
                                </span>
                            </div>
                        </motion.button>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}

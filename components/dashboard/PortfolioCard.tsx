"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

interface PortfolioCardProps {
    balance: number;
}

export default function PortfolioCard({ balance = 0 }: PortfolioCardProps) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="p-6 rounded-2xl bg-gradient-to-br from-accent/10 via-surface to-surface border border-accent/20"
        >
            <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🦊</span>
                <span className="text-accent font-medium">Portfolio</span>
            </div>

            <h2 className="text-4xl font-bold text-text-primary mb-3">
                ${balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h2>

            <p className="text-text-secondary">
                Your portfolio is empty. You can{" "}
                <Link href="/dashboard/deposit" className="text-accent hover:underline font-medium">
                    Deposit
                </Link>{" "}
                crypto.
            </p>
        </motion.div>
    );
}

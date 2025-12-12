"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const showcaseItems = [
    {
        id: "swap",
        title: "Swap & Bridge",
        description: "Swap any token, any chain, no gas required",
        badge: "25+ direct integrations",
        icon: "🔄",
        gradient: "linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)",
        bgGradient: "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(6, 182, 212, 0.05) 100%)",
        features: ["Cross-chain swaps", "Best rates", "No bridging fees"],
    },
    {
        id: "perps",
        title: "Perpetual Futures",
        description: "Trade perps in-app with up to 40x leverage",
        badge: "Powered by leading protocols",
        icon: "📈",
        gradient: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
        bgGradient: "linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(236, 72, 153, 0.05) 100%)",
        features: ["40x leverage", "Low fees", "Deep liquidity"],
    },
    {
        id: "earn",
        title: "Earn & Yield",
        description: "Earn passive yield on your assets",
        badge: "Yield on ETH, SOL, and stables",
        icon: "💰",
        gradient: "linear-gradient(135deg, #22C55E 0%, #10B981 100%)",
        bgGradient: "linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(16, 185, 129, 0.05) 100%)",
        features: ["Auto-compound", "Multiple vaults", "Flexible terms"],
    },
    {
        id: "extension",
        title: "Wallet Extension",
        description: "Connect to all your favorite dapps",
        badge: "Download for your browser",
        icon: "🧩",
        gradient: "linear-gradient(135deg, #F97316 0%, #EAB308 100%)",
        bgGradient: "linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(234, 179, 8, 0.05) 100%)",
        features: ["Chrome & Firefox", "One-click connect", "Transaction preview"],
    },
];

export default function Features() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            id="trade"
            ref={ref}
            style={{
                padding: "100px 20px",
                background: "#0D0D0D",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Background decoration */}
            <motion.div
                style={{
                    position: "absolute",
                    top: "50%",
                    right: "-200px",
                    width: "600px",
                    height: "600px",
                    background: "radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, transparent 70%)",
                    transform: "translateY(-50%)",
                }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 8, repeat: Infinity }}
            />

            <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 10 }}>
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: "center", marginBottom: "64px" }}
                >
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        style={{
                            display: "inline-block",
                            color: "#F97316",
                            fontSize: "14px",
                            fontWeight: "600",
                            textTransform: "uppercase",
                            letterSpacing: "3px",
                            marginBottom: "16px",
                        }}
                    >
                        One super app
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1 }}
                        style={{
                            fontSize: "clamp(36px, 6vw, 60px)",
                            fontWeight: "bold",
                            color: "#FFFFFF",
                        }}
                    >
                        Trade, swap, earn.
                        <motion.span
                            style={{
                                display: "block",
                                background: "linear-gradient(90deg, #F97316, #EAB308, #F97316)",
                                backgroundSize: "200% auto",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                            animate={{ backgroundPosition: ["0% center", "200% center"] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                            All in one.
                        </motion.span>
                    </motion.h2>
                </motion.div>

                {/* Feature cards grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "24px",
                }}>
                    {showcaseItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.15 * index }}
                            whileHover={{ scale: 1.02, y: -8 }}
                            style={{
                                padding: "32px",
                                borderRadius: "24px",
                                background: item.bgGradient,
                                border: "1px solid rgba(51, 51, 51, 0.5)",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                position: "relative",
                                overflow: "hidden",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = "rgba(249, 115, 22, 0.4)";
                                e.currentTarget.style.boxShadow = "0 20px 60px rgba(0, 0, 0, 0.3)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "rgba(51, 51, 51, 0.5)";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                        >
                            {/* Header */}
                            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px" }}>
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                    style={{
                                        width: "64px",
                                        height: "64px",
                                        borderRadius: "16px",
                                        background: item.gradient,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "32px",
                                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
                                    }}
                                >
                                    {item.icon}
                                </motion.div>

                                <span style={{
                                    fontSize: "12px",
                                    color: "#6B6B6B",
                                    background: "rgba(26, 26, 26, 0.8)",
                                    padding: "8px 14px",
                                    borderRadius: "50px",
                                    border: "1px solid rgba(51, 51, 51, 0.5)",
                                }}>
                                    {item.badge}
                                </span>
                            </div>

                            {/* Title and description */}
                            <h3 style={{
                                fontSize: "24px",
                                fontWeight: "bold",
                                color: "#FFFFFF",
                                marginBottom: "12px",
                            }}>
                                {item.title}
                            </h3>

                            <p style={{
                                fontSize: "16px",
                                color: "#A0A0A0",
                                marginBottom: "20px",
                                lineHeight: 1.5,
                            }}>
                                {item.description}
                            </p>

                            {/* Feature tags */}
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
                                {item.features.map((feature) => (
                                    <span
                                        key={feature}
                                        style={{
                                            padding: "6px 14px",
                                            fontSize: "13px",
                                            background: "rgba(38, 38, 38, 0.6)",
                                            border: "1px solid rgba(51, 51, 51, 0.5)",
                                            borderRadius: "50px",
                                            color: "#A0A0A0",
                                        }}
                                    >
                                        {feature}
                                    </span>
                                ))}
                            </div>

                            {/* CTA */}
                            <motion.div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    color: "#6B6B6B",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                }}
                                whileHover={{ color: "#F97316", x: 5 }}
                            >
                                <span>Learn more</span>
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

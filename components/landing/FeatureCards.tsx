"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const features = [
    {
        icon: "🔐",
        title: "Crypto wallet",
        description: "A non-custodial, gas abstracted, multi-chain wallet with support for 20+ chains.",
        gradient: "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.05) 100%)",
        iconBg: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
    },
    {
        icon: "🔄",
        title: "In-app integrations",
        description: "Trade, swap, buy, earn, and more, all in one unified application.",
        gradient: "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(139, 92, 246, 0.05) 100%)",
        iconBg: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
    },
    {
        icon: "💼",
        title: "Wallet management",
        description: "Import your existing wallets and consolidate your portfolio in one place.",
        gradient: "linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.05) 100%)",
        iconBg: "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",
    },
    {
        icon: "🧩",
        title: "Browser extension",
        description: "Use Orbitex as a universal wallet. Connect securely to any dapp.",
        gradient: "linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(249, 115, 22, 0.05) 100%)",
        iconBg: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
    },
    {
        icon: "🔑",
        title: "Passkeys",
        description: "Access your portfolio on any device without passwords or seed phrases.",
        gradient: "linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(236, 72, 153, 0.05) 100%)",
        iconBg: "linear-gradient(135deg, #EC4899 0%, #DB2777 100%)",
    },
    {
        icon: "🎁",
        title: "Rewards & cashback",
        description: "Switch to Orbitex and earn rewards and cashback on every trade.",
        gradient: "linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(6, 182, 212, 0.05) 100%)",
        iconBg: "linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)",
    },
];

const stats = [
    { value: "20+", label: "Chains supported" },
    { value: "100K+", label: "Active users" },
    { value: "$1B+", label: "Volume traded" },
    { value: "25+", label: "Integrations" },
];

export default function FeatureCards() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            id="features"
            ref={ref}
            style={{
                padding: "100px 20px",
                background: "linear-gradient(180deg, #0D0D0D 0%, #1A1A1A 50%, #0D0D0D 100%)",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Background glow */}
            <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "800px",
                height: "800px",
                background: "radial-gradient(circle, rgba(249, 115, 22, 0.08) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />

            <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 10 }}>
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: "center", marginBottom: "64px" }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.1 }}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "10px 20px",
                            borderRadius: "50px",
                            background: "rgba(26, 26, 26, 0.8)",
                            border: "1px solid #333333",
                            fontSize: "14px",
                            color: "#A0A0A0",
                            marginBottom: "24px",
                        }}
                    >
                        <span>✨</span>
                        <span>Everything you need</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                        style={{
                            fontSize: "clamp(36px, 6vw, 60px)",
                            fontWeight: "bold",
                            marginBottom: "20px",
                            color: "#FFFFFF",
                        }}
                    >
                        Built for the modern
                        <motion.span
                            style={{
                                display: "block",
                                background: "linear-gradient(90deg, #F97316, #FB923C, #F97316)",
                                backgroundSize: "200% auto",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                            animate={{ backgroundPosition: ["0% center", "200% center"] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                            crypto user
                        </motion.span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3 }}
                        style={{
                            fontSize: "18px",
                            color: "#A0A0A0",
                            maxWidth: "600px",
                            margin: "0 auto",
                        }}
                    >
                        Powerful features wrapped in a simple, intuitive interface that just works.
                    </motion.p>
                </motion.div>

                {/* Feature cards grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    gap: "24px",
                    marginBottom: "64px",
                }}>
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.1 * index }}
                            whileHover={{ scale: 1.03, y: -8 }}
                            style={{
                                padding: "32px",
                                borderRadius: "20px",
                                background: feature.gradient,
                                border: "1px solid rgba(51, 51, 51, 0.5)",
                                cursor: "pointer",
                                transition: "border-color 0.3s ease",
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(249, 115, 22, 0.3)"}
                            onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(51, 51, 51, 0.5)"}
                        >
                            {/* Icon */}
                            <motion.div
                                whileHover={{ rotate: [0, -10, 10, 0] }}
                                transition={{ duration: 0.5 }}
                                style={{
                                    width: "56px",
                                    height: "56px",
                                    borderRadius: "14px",
                                    background: feature.iconBg,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "28px",
                                    marginBottom: "20px",
                                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
                                }}
                            >
                                {feature.icon}
                            </motion.div>

                            <h3 style={{
                                fontSize: "20px",
                                fontWeight: "600",
                                color: "#FFFFFF",
                                marginBottom: "12px",
                            }}>
                                {feature.title}
                            </h3>

                            <p style={{
                                fontSize: "15px",
                                color: "#A0A0A0",
                                lineHeight: 1.6,
                            }}>
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Stats bar */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 }}
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                        gap: "20px",
                    }}
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.7 + i * 0.1 }}
                            style={{
                                textAlign: "center",
                                padding: "24px",
                                borderRadius: "16px",
                                background: "rgba(26, 26, 26, 0.6)",
                                border: "1px solid rgba(51, 51, 51, 0.5)",
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            <div style={{
                                fontSize: "32px",
                                fontWeight: "bold",
                                color: "#F97316",
                                marginBottom: "8px",
                            }}>
                                {stat.value}
                            </div>
                            <div style={{ fontSize: "14px", color: "#6B6B6B" }}>
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

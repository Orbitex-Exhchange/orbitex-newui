"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const securityFeatures = [
    { icon: "🔒", title: "Self custody", description: "Your keys, your crypto. Always in your control.", color: "#3B82F6" },
    { icon: "🔑", title: "Passkeys", description: "Phishing resistant security with biometrics.", color: "#8B5CF6" },
    { icon: "🔄", title: "Recovery", description: "Simple recovery when you need it most.", color: "#22C55E" },
    { icon: "✍️", title: "Clear signing", description: "See exactly what you're approving.", color: "#F59E0B" },
    { icon: "🏦", title: "Vaults", description: "Onchain vaults for maximum control.", color: "#EC4899" },
    { icon: "🛡️", title: "2FA", description: "Extra layer of protection for your assets.", color: "#06B6D4" },
];

export default function Security() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            id="security"
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
                top: "0",
                left: "50%",
                transform: "translateX(-50%)",
                width: "1000px",
                height: "500px",
                background: "radial-gradient(ellipse, rgba(34, 197, 94, 0.1) 0%, transparent 70%)",
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
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "10px 20px",
                            borderRadius: "50px",
                            background: "rgba(26, 26, 26, 0.8)",
                            border: "1px solid #333333",
                            fontSize: "14px",
                            color: "#A0A0A0",
                            marginBottom: "24px",
                        }}
                    >
                        <span style={{
                            position: "relative",
                            display: "flex",
                            width: "10px",
                            height: "10px",
                        }}>
                            <span style={{
                                position: "absolute",
                                display: "inline-flex",
                                width: "100%",
                                height: "100%",
                                borderRadius: "50%",
                                backgroundColor: "#22C55E",
                                opacity: 0.75,
                                animation: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
                            }} />
                            <span style={{
                                position: "relative",
                                display: "inline-flex",
                                borderRadius: "50%",
                                width: "10px",
                                height: "10px",
                                backgroundColor: "#22C55E",
                            }} />
                        </span>
                        Security first
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1 }}
                        style={{
                            fontSize: "clamp(36px, 6vw, 60px)",
                            fontWeight: "bold",
                            marginBottom: "20px",
                            color: "#FFFFFF",
                        }}
                    >
                        The security
                        <motion.span
                            style={{
                                display: "block",
                                background: "linear-gradient(90deg, #22C55E, #10B981, #22C55E)",
                                backgroundSize: "200% auto",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                            animate={{ backgroundPosition: ["0% center", "200% center"] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                            detail
                        </motion.span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                        style={{
                            fontSize: "18px",
                            color: "#A0A0A0",
                            maxWidth: "600px",
                            margin: "0 auto",
                        }}
                    >
                        Built with best-in-class security practices. Your assets are protected at every layer.
                    </motion.p>
                </motion.div>

                {/* Security feature grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                    gap: "16px",
                    marginBottom: "64px",
                }}>
                    {securityFeatures.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.1 * index }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            style={{
                                padding: "24px",
                                borderRadius: "16px",
                                background: `linear-gradient(135deg, ${feature.color}20 0%, ${feature.color}05 100%)`,
                                border: "1px solid rgba(51, 51, 51, 0.5)",
                                textAlign: "center",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.borderColor = `${feature.color}50`}
                            onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(51, 51, 51, 0.5)"}
                        >
                            <motion.div
                                style={{ fontSize: "36px", marginBottom: "12px" }}
                                whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                                transition={{ duration: 0.4 }}
                            >
                                {feature.icon}
                            </motion.div>

                            <h3 style={{
                                fontSize: "16px",
                                fontWeight: "600",
                                color: "#FFFFFF",
                                marginBottom: "8px",
                            }}>
                                {feature.title}
                            </h3>

                            <p style={{
                                fontSize: "13px",
                                color: "#6B6B6B",
                                lineHeight: 1.5,
                            }}>
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Large CTA Card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 }}
                    style={{
                        position: "relative",
                        padding: "60px 40px",
                        borderRadius: "32px",
                        background: "linear-gradient(135deg, rgba(26, 26, 26, 0.9) 0%, rgba(26, 26, 26, 0.7) 100%)",
                        border: "1px solid rgba(51, 51, 51, 0.5)",
                        textAlign: "center",
                        overflow: "hidden",
                    }}
                >
                    {/* Background orbs */}
                    <div style={{
                        position: "absolute",
                        top: "-100px",
                        right: "-100px",
                        width: "400px",
                        height: "400px",
                        background: "radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, transparent 70%)",
                        pointerEvents: "none",
                    }} />
                    <div style={{
                        position: "absolute",
                        bottom: "-100px",
                        left: "-100px",
                        width: "300px",
                        height: "300px",
                        background: "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
                        pointerEvents: "none",
                    }} />

                    {/* Content */}
                    <div style={{ position: "relative", zIndex: 10 }}>
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.5 }}
                            style={{
                                fontSize: "clamp(28px, 5vw, 48px)",
                                fontWeight: "bold",
                                color: "#FFFFFF",
                                marginBottom: "20px",
                            }}
                        >
                            Ready to get started?
                        </motion.h3>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.6 }}
                            style={{
                                fontSize: "18px",
                                color: "#A0A0A0",
                                marginBottom: "36px",
                                maxWidth: "500px",
                                margin: "0 auto 36px",
                            }}
                        >
                            Join thousands of traders who trust Orbitex for their DeFi needs.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.7 }}
                            style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "16px" }}
                        >
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    href="/dashboard"
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        padding: "18px 36px",
                                        background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
                                        color: "white",
                                        textDecoration: "none",
                                        borderRadius: "14px",
                                        fontSize: "18px",
                                        fontWeight: "600",
                                        boxShadow: "0 12px 40px rgba(249, 115, 22, 0.4)",
                                    }}
                                >
                                    Launch App
                                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </motion.div>

                            <Link
                                href="#features"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    padding: "18px 36px",
                                    color: "#A0A0A0",
                                    textDecoration: "none",
                                    fontSize: "18px",
                                    fontWeight: "500",
                                }}
                            >
                                Learn more
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* CSS for ping animation */}
            <style jsx global>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
        </section>
    );
}

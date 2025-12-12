"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const featurePills = [
    "No gas or seed phrases",
    "Every asset, all chains",
    "Trade perps & spot",
    "Portfolio tracking",
    "Swap any token",
    "Yield farming",
    "Self custody",
    "Passkey security",
    "Desktop & mobile",
    "NFT marketplace",
    "Prediction markets",
    "Browser extension",
];

// Floating orb component
function FloatingOrb({
    style,
    delay = 0,
}: {
    style: React.CSSProperties;
    delay?: number;
}) {
    return (
        <motion.div
            style={{
                position: "absolute",
                borderRadius: "50%",
                filter: "blur(80px)",
                ...style,
            }}
            animate={{
                y: [0, -40, 0],
                x: [0, 20, 0],
                scale: [1, 1.15, 1],
            }}
            transition={{
                duration: 10,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        />
    );
}

export default function Hero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

    const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });

    return (
        <section
            ref={containerRef}
            style={{
                position: "relative",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "80px",
                paddingBottom: "80px",
                overflow: "hidden",
                background: "linear-gradient(180deg, #0D0D0D 0%, #1A1A1A 50%, #0D0D0D 100%)",
            }}
        >
            {/* Animated background orbs */}
            <FloatingOrb
                style={{
                    width: "500px",
                    height: "500px",
                    background: "rgba(249, 115, 22, 0.15)",
                    top: "10%",
                    left: "15%",
                }}
                delay={0}
            />
            <FloatingOrb
                style={{
                    width: "400px",
                    height: "400px",
                    background: "rgba(139, 92, 246, 0.12)",
                    bottom: "20%",
                    right: "15%",
                }}
                delay={2}
            />
            <FloatingOrb
                style={{
                    width: "300px",
                    height: "300px",
                    background: "rgba(59, 130, 246, 0.10)",
                    top: "40%",
                    right: "25%",
                }}
                delay={4}
            />

            {/* Grid overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0.03,
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            <motion.div
                style={{ y: springY1, opacity, scale, position: "relative", zIndex: 10, maxWidth: "1000px", margin: "0 auto", padding: "0 20px", textAlign: "center" }}
            >
                {/* Live badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{ marginBottom: "32px" }}
                >
                    <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "10px 20px",
                        borderRadius: "50px",
                        background: "rgba(26, 26, 26, 0.8)",
                        border: "1px solid #333333",
                        fontSize: "14px",
                        color: "#A0A0A0",
                        backdropFilter: "blur(10px)",
                    }}>
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
                        Now live on mainnet
                    </span>
                </motion.div>

                {/* Main headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    style={{
                        fontSize: "clamp(48px, 10vw, 96px)",
                        fontWeight: "bold",
                        marginBottom: "24px",
                        lineHeight: 1.1,
                    }}
                >
                    <span style={{ color: "#FFFFFF", display: "block" }}>Meet Orbitex.</span>
                    <motion.span
                        style={{
                            background: "linear-gradient(90deg, #F97316, #FB923C, #F97316)",
                            backgroundSize: "200% auto",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            display: "block",
                        }}
                        animate={{ backgroundPosition: ["0% center", "200% center"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                        A new kind of crypto app.
                    </motion.span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    style={{
                        fontSize: "clamp(18px, 3vw, 24px)",
                        color: "#A0A0A0",
                        maxWidth: "700px",
                        margin: "0 auto 48px",
                        lineHeight: 1.6,
                    }}
                >
                    The next generation decentralized exchange. Trade, swap, and earn across multiple chains with unmatched simplicity and security.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "64px" }}
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
                                transition: "all 0.3s ease",
                            }}
                        >
                            Get started
                            <motion.svg
                                width="20"
                                height="20"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </motion.svg>
                        </Link>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                            href="#features"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                padding: "18px 36px",
                                background: "rgba(26, 26, 26, 0.8)",
                                color: "white",
                                textDecoration: "none",
                                borderRadius: "14px",
                                fontSize: "18px",
                                fontWeight: "600",
                                border: "1px solid #333333",
                                backdropFilter: "blur(10px)",
                                transition: "all 0.3s ease",
                            }}
                        >
                            Learn more
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Feature pills */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    style={{ position: "relative", overflow: "hidden", padding: "20px 0" }}
                >
                    {/* Gradient masks */}
                    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "100px", background: "linear-gradient(to right, #0D0D0D, transparent)", zIndex: 10 }} />
                    <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "100px", background: "linear-gradient(to left, #0D0D0D, transparent)", zIndex: 10 }} />

                    <motion.div
                        style={{ display: "flex", gap: "16px" }}
                        animate={{ x: [0, -1400] }}
                        transition={{
                            x: { repeat: Infinity, repeatType: "loop", duration: 35, ease: "linear" },
                        }}
                    >
                        {[...featurePills, ...featurePills].map((pill, i) => (
                            <span
                                key={i}
                                style={{
                                    flexShrink: 0,
                                    padding: "12px 24px",
                                    background: "rgba(38, 38, 38, 0.6)",
                                    border: "1px solid rgba(51, 51, 51, 0.5)",
                                    borderRadius: "50px",
                                    fontSize: "14px",
                                    color: "#A0A0A0",
                                    whiteSpace: "nowrap",
                                    backdropFilter: "blur(10px)",
                                }}
                            >
                                {pill}
                            </span>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", zIndex: 10 }}
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", color: "#6B6B6B" }}
                >
                    <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px" }}>Scroll to explore</span>
                    <div style={{
                        width: "24px",
                        height: "40px",
                        borderRadius: "12px",
                        border: "2px solid #333333",
                        display: "flex",
                        justifyContent: "center",
                        paddingTop: "8px",
                    }}>
                        <motion.div
                            animate={{ y: [0, 14, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            style={{
                                width: "6px",
                                height: "12px",
                                borderRadius: "3px",
                                background: "#F97316",
                            }}
                        />
                    </div>
                </motion.div>
            </motion.div>

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

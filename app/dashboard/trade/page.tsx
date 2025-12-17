"use client";

import Link from "next/link";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Animated Counter Component
function AnimatedCounter({ value, suffix = "", prefix = "", duration = 2 }: {
    value: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
}) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => {
        if (value >= 1000000) return `${(latest / 1000000000).toFixed(2)}B`;
        if (value >= 1000) return `${(latest / 1000000).toFixed(1)}M`;
        return Math.round(latest).toLocaleString();
    });
    const [displayValue, setDisplayValue] = useState("0");

    useEffect(() => {
        const controls = animate(count, value, {
            duration,
            ease: "easeOut",
        });
        const unsubscribe = count.on("change", (latest) => {
            if (value >= 1000000000) setDisplayValue(`${(latest / 1000000000).toFixed(2)}B`);
            else if (value >= 1000000) setDisplayValue(`${(latest / 1000000).toFixed(1)}M`);
            else setDisplayValue(Math.round(latest).toLocaleString());
        });
        return () => {
            controls.stop();
            unsubscribe();
        };
    }, [value, duration, count]);

    return <span>{prefix}{displayValue}{suffix}</span>;
}

// Typewriter Effect Component
function TypewriterText({ words, className }: { words: string[]; className?: string }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const word = words[currentIndex];
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (displayText.length < word.length) {
                    setDisplayText(word.slice(0, displayText.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                if (displayText.length > 0) {
                    setDisplayText(displayText.slice(0, -1));
                } else {
                    setIsDeleting(false);
                    setCurrentIndex((prev) => (prev + 1) % words.length);
                }
            }
        }, isDeleting ? 50 : 100);
        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentIndex, words]);

    return (
        <span className={className} style={{ color: "#F97316" }}>
            {displayText}
            <span style={{
                borderRight: "3px solid #F97316",
                marginLeft: "2px",
                animation: "blink 1s infinite",
            }} />
        </span>
    );
}

// Featured markets for the landing page
const featuredMarkets = [
    { symbol: "ETH-USD", name: "Ethereum", price: 3325.60, change24h: 0.09, volume: "32.6B", iconColor: "#627EEA", icon: "Ξ" },
    { symbol: "BTC-USD", name: "Bitcoin", price: 92035, change24h: -0.74, volume: "51.9B", iconColor: "#F7931A", icon: "₿" },
    { symbol: "SOL-USD", name: "Solana", price: 136.30, change24h: -1.30, volume: "4.5B", iconColor: "#14F195", icon: "◎" },
    { symbol: "ARB-USD", name: "Arbitrum", price: 1.42, change24h: 2.15, volume: "890M", iconColor: "#28A0F0", icon: "A" },
    { symbol: "OP-USD", name: "Optimism", price: 2.18, change24h: 1.85, volume: "540M", iconColor: "#FF0420", icon: "O" },
    { symbol: "AVAX-USD", name: "Avalanche", price: 38.50, change24h: -0.45, volume: "1.2B", iconColor: "#E84142", icon: "A" },
    { symbol: "DOGE-USD", name: "Dogecoin", price: 0.082, change24h: 3.45, volume: "2.1B", iconColor: "#C2A633", icon: "Ð" },
    { symbol: "LINK-USD", name: "Chainlink", price: 14.20, change24h: 1.25, volume: "680M", iconColor: "#2A5ADA", icon: "⬡" },
];

const stats = [
    { label: "Total Trading Volume", value: 156200000000, prefix: "$", suffix: "" },
    { label: "Users", value: 1890000, prefix: "", suffix: "" },
    { label: "Open Interest", value: 630000000, prefix: "$", suffix: "" },
    { label: "TVL", value: 310000000, prefix: "$", suffix: "" },
    { label: "Symbols", value: 45, prefix: "", suffix: "" },
];

const partners = [
    { name: "Ethereum", icon: "Ξ", color: "#627EEA" },
    { name: "Arbitrum", icon: "◇", color: "#28A0F0" },
    { name: "Optimism", icon: "⊕", color: "#FF0420" },
    { name: "Base", icon: "▣", color: "#0052FF" },
    { name: "Polygon", icon: "⬡", color: "#8247E5" },
    { name: "Avalanche", icon: "△", color: "#E84142" },
    { name: "BNB Chain", icon: "◈", color: "#F3BA2F" },
    { name: "Solana", icon: "◎", color: "#14F195" },
];

export default function PerpsLandingPage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div style={{
            minHeight: "100vh",
            background: "#0a0a0a",
            color: "#fff",
            overflow: "hidden",
        }}>
            <style jsx global>{`
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 0.8; }
                }
            `}</style>

            {/* Header */}
            <header style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 40px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                position: "sticky",
                top: 0,
                zIndex: 100,
                background: "rgba(10,10,10,0.8)",
            }}>
                <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
                    <motion.div
                        whileHover={{ rotate: 180, scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                        style={{
                            width: "44px",
                            height: "44px",
                            borderRadius: "12px",
                            background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 8px 32px rgba(249, 115, 22, 0.4)",
                        }}
                    >
                        <span style={{ color: "white", fontWeight: "bold", fontSize: "22px" }}>O</span>
                    </motion.div>
                    <span style={{ fontSize: "24px", fontWeight: "700", color: "#fff" }}>Orbitex</span>
                </Link>

                <nav style={{ display: "flex", gap: "32px" }}>
                    {["Perpetuals", "Spot", "Portfolio", "Referral"].map((item) => (
                        <Link
                            key={item}
                            href={item === "Perpetuals" ? "/dashboard/trade/ETH-USD" : "/dashboard"}
                            style={{
                                color: item === "Perpetuals" ? "#F97316" : "#a0a0a0",
                                textDecoration: "none",
                                fontSize: "14px",
                                fontWeight: "500",
                            }}
                        >
                            {item}
                        </Link>
                    ))}
                </nav>

                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            padding: "12px 28px",
                            borderRadius: "12px",
                            border: "none",
                            background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
                            color: "white",
                            fontWeight: "600",
                            fontSize: "14px",
                            cursor: "pointer",
                            boxShadow: "0 4px 20px rgba(249, 115, 22, 0.4)",
                        }}
                    >
                        Launch App
                    </motion.button>
                </div>
            </header>

            {/* Hero Section */}
            <section style={{
                padding: "100px 40px 60px",
                textAlign: "center",
                position: "relative",
                minHeight: "70vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}>
                {/* Animated Background Elements */}
                <div style={{
                    position: "absolute",
                    inset: 0,
                    overflow: "hidden",
                    pointerEvents: "none",
                }}>
                    {/* Orange Gradient Orb */}
                    <motion.div
                        animate={{
                            x: [0, 50, 0],
                            y: [0, -30, 0],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        style={{
                            position: "absolute",
                            top: "20%",
                            left: "20%",
                            width: "400px",
                            height: "400px",
                            background: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)",
                            filter: "blur(40px)",
                        }}
                    />
                    {/* Purple Orb */}
                    <motion.div
                        animate={{
                            x: [0, -40, 0],
                            y: [0, 40, 0],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        style={{
                            position: "absolute",
                            top: "40%",
                            right: "15%",
                            width: "300px",
                            height: "300px",
                            background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
                            filter: "blur(40px)",
                        }}
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ position: "relative", zIndex: 1 }}
                >
                    <h1 style={{
                        fontSize: "clamp(40px, 6vw, 72px)",
                        fontWeight: "800",
                        marginBottom: "16px",
                        lineHeight: 1.1,
                    }}>
                        <span style={{ color: "#fff" }}>Decentralized</span>
                        <br />
                        <TypewriterText words={["Perpetuals", "Futures", "Leverage", "Trading"]} />
                    </h1>
                    <p style={{
                        fontSize: "18px",
                        color: "#6b6b6b",
                        maxWidth: "600px",
                        margin: "0 auto 24px",
                        lineHeight: 1.6,
                    }}>
                        Multi-chain, liquid, secure. Non-custodial trading built for all — whether you&apos;re new to crypto or a seasoned pro.
                    </p>

                    <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "32px" }}>
                        <Link href="/dashboard/trade/ETH-USD">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 8px 40px rgba(249, 115, 22, 0.5)" }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    padding: "16px 40px",
                                    borderRadius: "14px",
                                    border: "none",
                                    background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
                                    color: "white",
                                    fontWeight: "600",
                                    fontSize: "16px",
                                    cursor: "pointer",
                                    boxShadow: "0 6px 30px rgba(249, 115, 22, 0.4)",
                                }}
                            >
                                Launch App
                            </motion.button>
                        </Link>
                        <motion.button
                            whileHover={{ scale: 1.05, borderColor: "#F97316" }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                padding: "16px 40px",
                                borderRadius: "14px",
                                border: "1px solid #333",
                                background: "transparent",
                                color: "#fff",
                                fontWeight: "600",
                                fontSize: "16px",
                                cursor: "pointer",
                            }}
                        >
                            Learn More
                        </motion.button>
                    </div>
                </motion.div>
            </section>

            {/* Stats Section */}
            <section style={{
                padding: "60px 40px",
                background: "linear-gradient(180deg, transparent 0%, rgba(249,115,22,0.03) 100%)",
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        gap: "60px",
                        maxWidth: "1200px",
                        margin: "0 auto",
                    }}
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.1 * i }}
                            style={{ textAlign: "center" }}
                        >
                            <div style={{
                                fontSize: "clamp(28px, 4vw, 42px)",
                                fontWeight: "700",
                                color: "#fff",
                                fontFamily: "monospace",
                                marginBottom: "8px",
                            }}>
                                {isVisible && (
                                    <AnimatedCounter
                                        value={stat.value}
                                        prefix={stat.prefix}
                                        suffix={stat.suffix}
                                        duration={2}
                                    />
                                )}
                            </div>
                            <div style={{
                                fontSize: "13px",
                                color: "#5c5c6b",
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                            }}>
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Trade Now Button */}
                <div style={{ textAlign: "center", marginTop: "40px" }}>
                    <Link href="/dashboard/trade/BTC-USD">
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                padding: "14px 32px",
                                borderRadius: "10px",
                                border: "1px solid #333",
                                background: "rgba(255,255,255,0.05)",
                                color: "#fff",
                                fontWeight: "500",
                                fontSize: "14px",
                                cursor: "pointer",
                            }}
                        >
                            Trade now →
                        </motion.button>
                    </Link>
                </div>
            </section>

            {/* Markets Carousel */}
            <section style={{ padding: "80px 40px" }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "32px",
                    maxWidth: "1200px",
                    margin: "0 auto 32px",
                }}>
                    <h2 style={{ fontSize: "28px", fontWeight: "700" }}>Top Markets</h2>
                    <Link href="/dashboard/trade" style={{ color: "#F97316", textDecoration: "none", fontSize: "14px" }}>
                        View all →
                    </Link>
                </div>

                <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
                    <Swiper
                        modules={[Autoplay, Navigation, Pagination]}
                        spaceBetween={20}
                        slidesPerView={1}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                            1280: { slidesPerView: 4 },
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        pagination={{ clickable: true }}
                        loop={true}
                        style={{ paddingBottom: "50px" }}
                    >
                        {featuredMarkets.map((market) => (
                            <SwiperSlide key={market.symbol}>
                                <Link href={`/dashboard/trade/${market.symbol}`} style={{ textDecoration: "none" }}>
                                    <motion.div
                                        whileHover={{ scale: 1.02, borderColor: "#F97316" }}
                                        style={{
                                            padding: "28px",
                                            borderRadius: "20px",
                                            background: "linear-gradient(145deg, #0d0d0d 0%, #111111 100%)",
                                            border: "1px solid #1a1a1a",
                                            cursor: "pointer",
                                            transition: "all 0.3s ease",
                                        }}
                                    >
                                        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
                                            <div style={{
                                                width: "48px",
                                                height: "48px",
                                                borderRadius: "50%",
                                                background: `linear-gradient(135deg, ${market.iconColor} 0%, ${market.iconColor}88 100%)`,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: "22px",
                                                color: "#fff",
                                                fontWeight: "bold",
                                                boxShadow: `0 4px 20px ${market.iconColor}40`,
                                            }}>
                                                {market.icon}
                                            </div>
                                            <div>
                                                <div style={{ fontSize: "18px", fontWeight: "600", color: "#fff" }}>{market.symbol}</div>
                                                <div style={{ fontSize: "13px", color: "#6b6b6b" }}>{market.name}</div>
                                            </div>
                                        </div>

                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                                            <div>
                                                <div style={{ fontSize: "26px", fontWeight: "700", color: "#fff", fontFamily: "monospace" }}>
                                                    ${market.price.toLocaleString()}
                                                </div>
                                                <div style={{
                                                    fontSize: "14px",
                                                    fontWeight: "600",
                                                    color: market.change24h >= 0 ? "#22c55e" : "#ef4444",
                                                }}>
                                                    {market.change24h >= 0 ? "+" : ""}{market.change24h.toFixed(2)}%
                                                </div>
                                            </div>
                                            <div style={{ textAlign: "right" }}>
                                                <div style={{ fontSize: "11px", color: "#6b6b6b" }}>24h Volume</div>
                                                <div style={{ fontSize: "14px", color: "#a0a0a0" }}>${market.volume}</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            {/* Partners Section */}
            <section style={{
                padding: "80px 40px",
                borderTop: "1px solid #1a1a1a",
            }}>
                <h2 style={{
                    textAlign: "center",
                    fontSize: "24px",
                    fontWeight: "600",
                    marginBottom: "48px",
                    color: "#6b6b6b",
                }}>
                    Supported Networks
                </h2>

                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: "32px",
                    maxWidth: "1000px",
                    margin: "0 auto",
                }}>
                    {partners.map((partner, i) => (
                        <motion.div
                            key={partner.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.1 }}
                            style={{
                                width: "100px",
                                height: "100px",
                                borderRadius: "20px",
                                background: "#111",
                                border: "1px solid #222",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                            }}
                        >
                            <span style={{ fontSize: "28px", color: partner.color }}>{partner.icon}</span>
                            <span style={{ fontSize: "11px", color: "#6b6b6b" }}>{partner.name}</span>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section style={{
                padding: "100px 40px",
                background: "linear-gradient(180deg, transparent 0%, rgba(249,115,22,0.02) 100%)",
            }}>
                <h2 style={{
                    textAlign: "center",
                    fontSize: "32px",
                    fontWeight: "700",
                    marginBottom: "60px",
                }}>
                    Why Trade on Orbitex?
                </h2>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "32px",
                    maxWidth: "1200px",
                    margin: "0 auto",
                }}>
                    {[
                        { icon: "⚡", title: "Instant Execution", desc: "Sub-second trade execution with guaranteed price and minimal slippage" },
                        { icon: "🔒", title: "Non-Custodial", desc: "Trade directly from your wallet. Your keys, your coins, always" },
                        { icon: "💧", title: "Deep Liquidity", desc: "Access deep liquidity pools for seamless large position trading" },
                        { icon: "📊", title: "Up to 100x Leverage", desc: "Maximize your positions with up to 100x leverage on all markets" },
                        { icon: "🌐", title: "Multi-Chain", desc: "Trade across multiple chains including Ethereum, Arbitrum, and Base" },
                        { icon: "💰", title: "Low Fees", desc: "Competitive trading fees as low as 0.02% for makers" },
                    ].map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.02, borderColor: "#333" }}
                            style={{
                                padding: "32px",
                                borderRadius: "20px",
                                background: "#0d0d0d",
                                border: "1px solid #1a1a1a",
                                transition: "all 0.3s ease",
                            }}
                        >
                            <div style={{
                                fontSize: "40px",
                                marginBottom: "20px",
                                filter: "grayscale(0%)",
                            }}>
                                {feature.icon}
                            </div>
                            <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "12px" }}>
                                {feature.title}
                            </h3>
                            <p style={{ fontSize: "14px", color: "#6b6b6b", lineHeight: 1.6 }}>
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer style={{
                padding: "60px 40px",
                borderTop: "1px solid #1a1a1a",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "24px",
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <span style={{ color: "white", fontWeight: "bold", fontSize: "18px" }}>O</span>
                    </div>
                    <span style={{ fontSize: "18px", fontWeight: "600" }}>Orbitex</span>
                </div>

                <div style={{ display: "flex", gap: "32px" }}>
                    {["Docs", "Discord", "Twitter", "GitHub"].map((link) => (
                        <a
                            key={link}
                            href="#"
                            style={{ color: "#6b6b6b", textDecoration: "none", fontSize: "14px" }}
                        >
                            {link}
                        </a>
                    ))}
                </div>

                <div style={{ color: "#4a4a4a", fontSize: "13px" }}>
                    © 2024 Orbitex. All rights reserved.
                </div>
            </footer>
        </div>
    );
}

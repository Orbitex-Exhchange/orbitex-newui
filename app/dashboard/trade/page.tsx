"use client";

import Link from "next/link";
import { motion, useMotionValue, animate, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Particle Canvas Component - Creates animated starfield/particles
function ParticleCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Array<{
        x: number;
        y: number;
        vx: number;
        vy: number;
        size: number;
        opacity: number;
        color: string;
    }>>([]);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Initialize particles
        const particleCount = 80;
        const colors = ["#F97316", "#EA580C", "#8B5CF6", "#06B6D4", "#22C55E"];

        for (let i = 0; i < particleCount; i++) {
            particlesRef.current.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: colors[Math.floor(Math.random() * colors.length)],
            });
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener("mousemove", handleMouseMove);

        let animationId: number;
        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((particle, i) => {
                // Move particle
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Mouse interaction - particles move away from cursor
                const dx = mouseRef.current.x - particle.x;
                const dy = mouseRef.current.y - particle.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    const force = (150 - dist) / 150;
                    particle.vx -= (dx / dist) * force * 0.02;
                    particle.vy -= (dy / dist) * force * 0.02;
                }

                // Bounce off edges
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                // Apply friction
                particle.vx *= 0.99;
                particle.vy *= 0.99;

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.globalAlpha = particle.opacity;
                ctx.fill();

                // Draw connections
                particlesRef.current.slice(i + 1).forEach((other) => {
                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = particle.color;
                        ctx.globalAlpha = (1 - dist / 120) * 0.15;
                        ctx.stroke();
                    }
                });
            });

            ctx.globalAlpha = 1;
            animationId = requestAnimationFrame(animateParticles);
        };

        animateParticles();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
            }}
        />
    );
}

// Mouse Follower Orbs - Smooth following elements
function MouseFollowerOrbs() {
    const [_mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const springConfig = { damping: 25, stiffness: 150 };
    const x1 = useSpring(0, springConfig);
    const y1 = useSpring(0, springConfig);
    const x2 = useSpring(0, { damping: 30, stiffness: 100 });
    const y2 = useSpring(0, { damping: 30, stiffness: 100 });
    const x3 = useSpring(0, { damping: 35, stiffness: 80 });
    const y3 = useSpring(0, { damping: 35, stiffness: 80 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
            x1.set(e.clientX);
            y1.set(e.clientY);
            x2.set(e.clientX);
            y2.set(e.clientY);
            x3.set(e.clientX);
            y3.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [x1, y1, x2, y2, x3, y3]);

    return (
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
            <motion.div
                style={{
                    position: "absolute",
                    x: x3,
                    y: y3,
                    width: "300px",
                    height: "300px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
                    transform: "translate(-50%, -50%)",
                    filter: "blur(40px)",
                }}
            />
            <motion.div
                style={{
                    position: "absolute",
                    x: x2,
                    y: y2,
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)",
                    transform: "translate(-50%, -50%)",
                    filter: "blur(30px)",
                }}
            />
            <motion.div
                style={{
                    position: "absolute",
                    x: x1,
                    y: y1,
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)",
                    transform: "translate(-50%, -50%)",
                    filter: "blur(20px)",
                }}
            />
        </div>
    );
}

// Animated Trading Chart Component
function AnimatedTradingChart() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const candlesRef = useRef<Array<{
        open: number;
        close: number;
        high: number;
        low: number;
        isBullish: boolean;
    }>>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const width = 400;
        const height = 200;
        canvas.width = width;
        canvas.height = height;

        // Generate initial candle data
        let basePrice = 3300;
        for (let i = 0; i < 30; i++) {
            const volatility = 50;
            const change = (Math.random() - 0.5) * volatility;
            const open = basePrice;
            const close = basePrice + change;
            const high = Math.max(open, close) + Math.random() * 20;
            const low = Math.min(open, close) - Math.random() * 20;
            candlesRef.current.push({
                open,
                close,
                high,
                low,
                isBullish: close > open,
            });
            basePrice = close;
        }

        let offset = 0;
        const animateChart = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw gradient background
            const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
            bgGrad.addColorStop(0, "rgba(249,115,22,0.05)");
            bgGrad.addColorStop(1, "transparent");
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, width, height);

            // Find price range
            const allPrices = candlesRef.current.flatMap(c => [c.high, c.low]);
            const minPrice = Math.min(...allPrices) - 20;
            const maxPrice = Math.max(...allPrices) + 20;
            const priceRange = maxPrice - minPrice;

            const priceToY = (price: number) => height - ((price - minPrice) / priceRange) * height;

            // Draw grid lines
            ctx.strokeStyle = "rgba(255,255,255,0.05)";
            ctx.lineWidth = 1;
            for (let i = 0; i < 5; i++) {
                const y = (i / 4) * height;
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }

            // Draw candles
            const candleWidth = width / 30;
            candlesRef.current.forEach((candle, i) => {
                const x = i * candleWidth + candleWidth / 2;
                const color = candle.isBullish ? "#00d395" : "#ff5252";

                // Wick
                ctx.strokeStyle = color;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(x, priceToY(candle.high));
                ctx.lineTo(x, priceToY(candle.low));
                ctx.stroke();

                // Body
                ctx.fillStyle = color;
                const bodyTop = priceToY(Math.max(candle.open, candle.close));
                const bodyHeight = Math.max(Math.abs(priceToY(candle.open) - priceToY(candle.close)), 2);
                ctx.fillRect(x - candleWidth * 0.35, bodyTop, candleWidth * 0.7, bodyHeight);
            });

            // Draw moving price line
            const lineY = priceToY(candlesRef.current[candlesRef.current.length - 1].close);
            ctx.strokeStyle = "#F97316";
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(0, lineY);
            ctx.lineTo(width, lineY);
            ctx.stroke();
            ctx.setLineDash([]);

            // Update last candle (simulate live trading)
            offset += 0.02;
            const lastCandle = candlesRef.current[candlesRef.current.length - 1];
            const priceChange = Math.sin(offset) * 10 + Math.sin(offset * 2.5) * 5;
            lastCandle.close = lastCandle.open + priceChange;
            lastCandle.high = Math.max(lastCandle.high, lastCandle.close);
            lastCandle.low = Math.min(lastCandle.low, lastCandle.close);
            lastCandle.isBullish = lastCandle.close > lastCandle.open;

            // Occasionally create new candle
            if (Math.random() < 0.002) {
                candlesRef.current.shift();
                const prev = candlesRef.current[candlesRef.current.length - 1];
                const newOpen = prev.close;
                const change = (Math.random() - 0.5) * 40;
                const newClose = newOpen + change;
                candlesRef.current.push({
                    open: newOpen,
                    close: newClose,
                    high: Math.max(newOpen, newClose) + Math.random() * 15,
                    low: Math.min(newOpen, newClose) - Math.random() * 15,
                    isBullish: newClose > newOpen,
                });
            }

            requestAnimationFrame(animateChart);
        };

        const animId = requestAnimationFrame(animateChart);
        return () => cancelAnimationFrame(animId);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
                position: "absolute",
                right: "5%",
                top: "50%",
                transform: "translateY(-50%)",
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                background: "rgba(10,10,10,0.8)",
                backdropFilter: "blur(10px)",
            }}
        >
            <div style={{
                padding: "12px 16px",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
            }}>
                <span style={{ fontSize: "12px", color: "#6b6b6b" }}>ETH-USD</span>
                <span style={{ fontSize: "14px", fontWeight: "600", color: "#00d395" }}>$3,325.60</span>
                <span style={{ fontSize: "11px", color: "#00d395" }}>+0.09%</span>
            </div>
            <canvas ref={canvasRef} style={{ display: "block" }} />
        </motion.div>
    );
}

// Animated Counter Component
function AnimatedCounter({ value, suffix = "", prefix = "", duration = 2 }: {
    value: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
}) {
    const count = useMotionValue(0);
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
function TypewriterText({ words }: { words: string[] }) {
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
        <span style={{ color: "#F97316" }}>
            {displayText}
            <span style={{
                borderRight: "3px solid #F97316",
                marginLeft: "2px",
                animation: "blink 1s infinite",
            }} />
        </span>
    );
}

// Floating 3D Coins Component
function FloatingCoins() {
    const coins = [
        { icon: "₿", color: "#F7931A", x: "10%", y: "20%", delay: 0 },
        { icon: "Ξ", color: "#627EEA", x: "85%", y: "30%", delay: 0.5 },
        { icon: "◎", color: "#14F195", x: "15%", y: "70%", delay: 1 },
        { icon: "△", color: "#E84142", x: "80%", y: "75%", delay: 1.5 },
    ];

    return (
        <>
            {coins.map((coin, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.1, 1],
                        y: [0, -20, 0],
                        rotateY: [0, 180, 360],
                    }}
                    transition={{
                        duration: 6,
                        delay: coin.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    style={{
                        position: "absolute",
                        left: coin.x,
                        top: coin.y,
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${coin.color} 0%, ${coin.color}88 100%)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "24px",
                        color: "#fff",
                        boxShadow: `0 10px 40px ${coin.color}40`,
                        pointerEvents: "none",
                    }}
                >
                    {coin.icon}
                </motion.div>
            ))}
        </>
    );
}

// Featured markets
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
    { label: "Total Trading Volume", value: 156200000000, prefix: "$" },
    { label: "Users", value: 1890000, prefix: "" },
    { label: "Open Interest", value: 630000000, prefix: "$" },
    { label: "TVL", value: 310000000, prefix: "$" },
    { label: "Symbols", value: 45, prefix: "" },
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
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
            `}</style>

            {/* Mouse Follower Orbs */}
            <MouseFollowerOrbs />

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
                        whileHover={{ scale: 1.05, boxShadow: "0 8px 32px rgba(249, 115, 22, 0.5)" }}
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

            {/* Hero Section - Full viewport with centered content and integrated stats */}
            <section style={{
                position: "relative",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "60px 40px",
            }}>
                {/* Particle Canvas Background */}
                <ParticleCanvas />

                {/* Floating Coins */}
                <FloatingCoins />

                {/* Large Gradient Background Orbs */}
                <div style={{
                    position: "absolute",
                    inset: 0,
                    overflow: "hidden",
                    pointerEvents: "none",
                }}>
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                            position: "absolute",
                            top: "10%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "800px",
                            height: "800px",
                            background: "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 60%)",
                            filter: "blur(60px)",
                        }}
                    />
                    <motion.div
                        animate={{
                            x: [-50, 50, -50],
                            y: [0, -30, 0],
                        }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                            position: "absolute",
                            top: "50%",
                            right: "10%",
                            width: "500px",
                            height: "500px",
                            background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 60%)",
                            filter: "blur(50px)",
                        }}
                    />
                    <motion.div
                        animate={{
                            x: [30, -30, 30],
                            y: [0, 40, 0],
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                            position: "absolute",
                            bottom: "20%",
                            left: "5%",
                            width: "400px",
                            height: "400px",
                            background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 60%)",
                            filter: "blur(40px)",
                        }}
                    />
                </div>

                {/* Animated Trading Chart - Positioned on right */}
                <motion.div
                    initial={{ opacity: 0, x: 100, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    style={{
                        position: "absolute",
                        right: "3%",
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 5,
                    }}
                >
                    <AnimatedTradingChart />
                </motion.div>

                {/* Hero Content - Centered */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{
                        position: "relative",
                        zIndex: 10,
                        textAlign: "center",
                        maxWidth: "900px",
                    }}
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "10px 20px",
                            borderRadius: "30px",
                            background: "rgba(249,115,22,0.08)",
                            border: "1px solid rgba(249,115,22,0.25)",
                            marginBottom: "28px",
                        }}
                    >
                        <span style={{ fontSize: "16px" }}>🚀</span>
                        <span style={{
                            color: "#F97316",
                            fontSize: "14px",
                            fontWeight: "500",
                            letterSpacing: "0.5px",
                        }}>
                            The Next-Gen Perp DEX
                        </span>
                    </motion.div>

                    {/* Main Heading - Much larger */}
                    <h1 style={{
                        fontSize: "clamp(48px, 7vw, 88px)",
                        fontWeight: "800",
                        marginBottom: "24px",
                        lineHeight: 1.1,
                        letterSpacing: "-2px",
                    }}>
                        <span style={{
                            background: "linear-gradient(135deg, #fff 0%, #ccc 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}>
                            Decentralized
                        </span>
                        <br />
                        <TypewriterText words={["Perpetuals", "Futures", "Leverage", "Trading"]} />
                    </h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        style={{
                            fontSize: "20px",
                            color: "#8b8b8b",
                            marginBottom: "40px",
                            lineHeight: 1.7,
                            maxWidth: "650px",
                            margin: "0 auto 40px",
                        }}
                    >
                        Multi-chain, liquid, secure. Non-custodial trading built for all —
                        whether you&apos;re new to crypto or a seasoned pro.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        style={{ display: "flex", gap: "16px", justifyContent: "center", marginBottom: "80px" }}
                    >
                        <Link href="/dashboard/trade/ETH-USD">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 16px 50px rgba(249, 115, 22, 0.5)" }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    padding: "18px 44px",
                                    borderRadius: "16px",
                                    border: "none",
                                    background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
                                    color: "white",
                                    fontWeight: "600",
                                    fontSize: "17px",
                                    cursor: "pointer",
                                    boxShadow: "0 8px 40px rgba(249, 115, 22, 0.4)",
                                }}
                            >
                                Launch App
                            </motion.button>
                        </Link>
                        <motion.button
                            whileHover={{ scale: 1.05, borderColor: "#F97316", background: "rgba(249,115,22,0.08)" }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                padding: "18px 44px",
                                borderRadius: "16px",
                                border: "1px solid #333",
                                background: "rgba(255,255,255,0.02)",
                                color: "#fff",
                                fontWeight: "600",
                                fontSize: "17px",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                            }}
                        >
                            Download App
                        </motion.button>
                    </motion.div>

                    {/* Stats - Integrated into Hero */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            gap: "48px",
                        }}
                    >
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 + i * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                style={{ textAlign: "center", cursor: "default" }}
                            >
                                <div style={{
                                    fontSize: "clamp(24px, 3vw, 36px)",
                                    fontWeight: "700",
                                    fontFamily: "monospace",
                                    marginBottom: "4px",
                                    background: "linear-gradient(135deg, #fff 0%, #F97316 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}>
                                    {isVisible && (
                                        <AnimatedCounter
                                            value={stat.value}
                                            prefix={stat.prefix}
                                            duration={2}
                                        />
                                    )}
                                </div>
                                <div style={{
                                    fontSize: "12px",
                                    color: "#6b6b6b",
                                    textTransform: "uppercase",
                                    letterSpacing: "1px",
                                }}>
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Trade Now - Bottom of Hero */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    style={{
                        position: "absolute",
                        bottom: "40px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 10,
                    }}
                >
                    <Link href="/dashboard/trade/BTC-USD">
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{
                                padding: "12px 28px",
                                borderRadius: "24px",
                                border: "1px solid rgba(255,255,255,0.15)",
                                background: "rgba(0,0,0,0.4)",
                                backdropFilter: "blur(10px)",
                                color: "#fff",
                                fontWeight: "500",
                                fontSize: "14px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                            }}
                        >
                            <span>Trade now</span>
                            <span style={{ fontSize: "18px" }}>↓</span>
                        </motion.button>
                    </Link>
                </motion.div>
            </section>


            {/* Removed duplicate stats section - now integrated into Hero */}

            {/* Markets Carousel */}
            <section style={{ padding: "80px 40px" }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "40px",
                        maxWidth: "1200px",
                        margin: "0 auto 40px",
                    }}
                >
                    <h2 style={{ fontSize: "28px", fontWeight: "700" }}>Top Markets</h2>
                    <Link href="/dashboard/trade" style={{ color: "#F97316", textDecoration: "none", fontSize: "14px" }}>
                        View all →
                    </Link>
                </motion.div>

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
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        loop={true}
                        style={{ paddingBottom: "50px" }}
                    >
                        {featuredMarkets.map((market) => (
                            <SwiperSlide key={market.symbol}>
                                <Link href={`/dashboard/trade/${market.symbol}`} style={{ textDecoration: "none" }}>
                                    <motion.div
                                        whileHover={{ scale: 1.03, borderColor: "#F97316", y: -5 }}
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
                                            <motion.div
                                                whileHover={{ rotate: 360 }}
                                                transition={{ duration: 0.5 }}
                                                style={{
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
                                                }}
                                            >
                                                {market.icon}
                                            </motion.div>
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
            <section style={{ padding: "80px 40px", borderTop: "1px solid #1a1a1a" }}>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        textAlign: "center",
                        fontSize: "24px",
                        fontWeight: "600",
                        marginBottom: "48px",
                        color: "#6b6b6b",
                    }}
                >
                    Supported Networks
                </motion.h2>

                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: "24px",
                    maxWidth: "1000px",
                    margin: "0 auto",
                }}>
                    {partners.map((partner, i) => (
                        <motion.div
                            key={partner.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ scale: 1.15, y: -5 }}
                            style={{
                                width: "100px",
                                height: "100px",
                                borderRadius: "20px",
                                background: "linear-gradient(145deg, #111 0%, #0d0d0d 100%)",
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
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        textAlign: "center",
                        fontSize: "32px",
                        fontWeight: "700",
                        marginBottom: "60px",
                    }}
                >
                    Why Trade on Orbitex?
                </motion.h2>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "24px",
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
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.02, borderColor: "#333", y: -5 }}
                            style={{
                                padding: "32px",
                                borderRadius: "20px",
                                background: "linear-gradient(145deg, #0d0d0d 0%, #111 100%)",
                                border: "1px solid #1a1a1a",
                                transition: "all 0.3s ease",
                            }}
                        >
                            <div style={{ fontSize: "40px", marginBottom: "20px" }}>{feature.icon}</div>
                            <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "12px" }}>{feature.title}</h3>
                            <p style={{ fontSize: "14px", color: "#6b6b6b", lineHeight: 1.6 }}>{feature.desc}</p>
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
                        <motion.a
                            key={link}
                            href="#"
                            whileHover={{ color: "#F97316" }}
                            style={{ color: "#6b6b6b", textDecoration: "none", fontSize: "14px" }}
                        >
                            {link}
                        </motion.a>
                    ))}
                </div>

                <div style={{ color: "#4a4a4a", fontSize: "13px" }}>
                    © 2024 Orbitex. All rights reserved.
                </div>
            </footer>
        </div>
    );
}

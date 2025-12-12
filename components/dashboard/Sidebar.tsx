"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
    { icon: "🏠", label: "Home", href: "/dashboard" },
    { icon: "📊", label: "Portfolio", href: "/dashboard/portfolio" },
    { icon: "📈", label: "Perps", href: "/dashboard/trade" },
    { icon: "📦", label: "Crates", href: "/dashboard/crates" },
    { icon: "🔄", label: "Swidge", href: "/dashboard/swap" },
    { icon: "💰", label: "Earn", href: "/dashboard/earn" },
    { icon: "🎁", label: "Airdrops", href: "/dashboard/airdrops" },
    { icon: "🐂", label: "Bullrun", href: "/dashboard/bullrun" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside style={{
            width: "260px",
            height: "100vh",
            background: "#0D0D0D",
            borderRight: "1px solid #333333",
            display: "flex",
            flexDirection: "column",
            position: "sticky",
            top: 0,
        }}>
            {/* Logo */}
            <div style={{ padding: "20px", borderBottom: "1px solid #333333" }}>
                <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
                    <motion.div
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.4 }}
                        style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "10px",
                            background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 6px 20px rgba(249, 115, 22, 0.35)",
                        }}
                    >
                        <span style={{ color: "white", fontWeight: "bold", fontSize: "18px" }}>O</span>
                    </motion.div>
                    <span style={{ fontSize: "20px", fontWeight: "bold", color: "#FFFFFF" }}>Orbitex</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav style={{ flex: 1, padding: "16px", overflowY: "auto" }}>
                {navItems.map((item, index) => {
                    const isActive = pathname === item.href ||
                        (item.href !== "/dashboard" && pathname?.startsWith(item.href));

                    return (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link
                                href={item.href}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    padding: "12px 16px",
                                    borderRadius: "10px",
                                    marginBottom: "4px",
                                    textDecoration: "none",
                                    color: isActive ? "#FFFFFF" : "#A0A0A0",
                                    background: isActive ? "#262626" : "transparent",
                                    transition: "all 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.background = "#1A1A1A";
                                        e.currentTarget.style.color = "#FFFFFF";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.background = "transparent";
                                        e.currentTarget.style.color = "#A0A0A0";
                                    }
                                }}
                            >
                                <span style={{
                                    fontSize: "18px",
                                    filter: isActive ? "none" : "grayscale(50%)",
                                }}>
                                    {item.icon}
                                </span>
                                <span style={{ fontSize: "14px", fontWeight: isActive ? "600" : "500" }}>
                                    {item.label}
                                </span>
                            </Link>
                        </motion.div>
                    );
                })}
            </nav>

            {/* Bottom section */}
            <div style={{ padding: "16px", borderTop: "1px solid #333333" }}>
                <div style={{
                    padding: "16px",
                    borderRadius: "12px",
                    background: "#1A1A1A",
                    border: "1px solid #333333",
                }}>
                    <p style={{ fontSize: "12px", color: "#6B6B6B", marginBottom: "6px" }}>What&apos;s new</p>
                    <p style={{ fontSize: "13px", color: "#A0A0A0", lineHeight: 1.4 }}>
                        Orbitex Extension, Monad, and more updates.
                    </p>
                </div>
            </div>
        </aside>
    );
}

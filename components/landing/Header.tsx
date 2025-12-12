"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { label: "Features", href: "#features" },
    { label: "Trade", href: "#trade" },
    { label: "Earn", href: "#earn" },
    { label: "Security", href: "#security" },
];

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                backgroundColor: isScrolled ? "rgba(13, 13, 13, 0.95)" : "transparent",
                backdropFilter: isScrolled ? "blur(20px)" : "none",
                borderBottom: isScrolled ? "1px solid rgba(51, 51, 51, 0.5)" : "none",
                transition: "all 0.3s ease",
            }}
        >
            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
                    {/* Logo */}
                    <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
                        <motion.div
                            whileHover={{ rotate: 180, scale: 1.1 }}
                            transition={{ duration: 0.4 }}
                            style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "12px",
                                background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 8px 24px rgba(249, 115, 22, 0.35)",
                            }}
                        >
                            <span style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}>O</span>
                        </motion.div>
                        <span style={{ fontSize: "22px", fontWeight: "bold", color: "#FFFFFF" }}>
                            Orbitex
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav style={{ display: "flex", alignItems: "center", gap: "8px" }} className="hidden md:flex">
                        {navItems.map((item, index) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    href={item.href}
                                    style={{
                                        padding: "10px 18px",
                                        color: "#A0A0A0",
                                        textDecoration: "none",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        borderRadius: "8px",
                                        transition: "all 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = "#FFFFFF";
                                        e.currentTarget.style.backgroundColor = "rgba(38, 38, 38, 0.5)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = "#A0A0A0";
                                        e.currentTarget.style.backgroundColor = "transparent";
                                    }}
                                >
                                    {item.label}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    {/* CTA Buttons */}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }} className="hidden md:flex">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Link
                                href="/dashboard"
                                style={{
                                    padding: "10px 18px",
                                    color: "#A0A0A0",
                                    textDecoration: "none",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    transition: "color 0.2s ease",
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.color = "#FFFFFF"}
                                onMouseLeave={(e) => e.currentTarget.style.color = "#A0A0A0"}
                            >
                                Log in
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href="/dashboard"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    padding: "12px 24px",
                                    background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
                                    color: "white",
                                    textDecoration: "none",
                                    borderRadius: "12px",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    boxShadow: "0 8px 24px rgba(249, 115, 22, 0.35)",
                                    transition: "all 0.3s ease",
                                }}
                            >
                                Get started
                            </Link>
                        </motion.div>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden"
                        style={{
                            padding: "10px",
                            background: "transparent",
                            border: "none",
                            color: "#A0A0A0",
                            cursor: "pointer",
                        }}
                    >
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden"
                        style={{
                            backgroundColor: "rgba(26, 26, 26, 0.98)",
                            backdropFilter: "blur(20px)",
                            borderTop: "1px solid #333333",
                        }}
                    >
                        <nav style={{ padding: "16px" }}>
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    style={{
                                        display: "block",
                                        padding: "14px 16px",
                                        color: "#A0A0A0",
                                        textDecoration: "none",
                                        borderRadius: "8px",
                                        marginBottom: "4px",
                                    }}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #333333" }}>
                                <Link
                                    href="/dashboard"
                                    style={{
                                        display: "block",
                                        textAlign: "center",
                                        padding: "14px",
                                        background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
                                        color: "white",
                                        textDecoration: "none",
                                        borderRadius: "12px",
                                        fontWeight: "600",
                                    }}
                                >
                                    Get started
                                </Link>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}

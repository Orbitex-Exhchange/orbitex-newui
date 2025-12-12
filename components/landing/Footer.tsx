"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const footerLinks = {
    Product: [
        { label: "Features", href: "#features" },
        { label: "Trade", href: "/dashboard/trade" },
        { label: "Earn", href: "/dashboard/earn" },
        { label: "Extension", href: "#" },
    ],
    Resources: [
        { label: "Documentation", href: "#" },
        { label: "API", href: "#" },
        { label: "Status", href: "#" },
        { label: "Changelog", href: "#" },
    ],
    Company: [
        { label: "About", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Contact", href: "#" },
    ],
    Legal: [
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
        { label: "Cookies", href: "#" },
    ],
};

const socialLinks = [
    { label: "Twitter", icon: "𝕏" },
    { label: "Discord", icon: "💬" },
    { label: "GitHub", icon: "⌨️" },
];

export default function Footer() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <footer
            ref={ref}
            style={{
                background: "#1A1A1A",
                borderTop: "1px solid #333333",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Background decoration */}
            <div style={{
                position: "absolute",
                top: "0",
                left: "50%",
                transform: "translateX(-50%)",
                width: "800px",
                height: "200px",
                background: "radial-gradient(ellipse, rgba(249, 115, 22, 0.05) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />

            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 20px", position: "relative", zIndex: 10 }}>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "2fr repeat(4, 1fr)",
                    gap: "40px",
                    marginBottom: "48px",
                }}>
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                    >
                        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", marginBottom: "16px" }}>
                            <motion.div
                                whileHover={{ rotate: 180 }}
                                transition={{ duration: 0.4 }}
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "12px",
                                    background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow: "0 8px 24px rgba(249, 115, 22, 0.3)",
                                }}
                            >
                                <span style={{ color: "white", fontWeight: "bold", fontSize: "18px" }}>O</span>
                            </motion.div>
                            <span style={{ fontSize: "22px", fontWeight: "bold", color: "#FFFFFF" }}>Orbitex</span>
                        </Link>

                        <p style={{ fontSize: "14px", color: "#6B6B6B", marginBottom: "20px", maxWidth: "250px", lineHeight: 1.6 }}>
                            The next generation decentralized exchange. Trade, swap, and earn across multiple chains.
                        </p>

                        <div style={{ display: "flex", gap: "12px" }}>
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href="#"
                                    whileHover={{ scale: 1.1, y: -3 }}
                                    whileTap={{ scale: 0.9 }}
                                    style={{
                                        width: "44px",
                                        height: "44px",
                                        borderRadius: "12px",
                                        background: "#262626",
                                        border: "1px solid #333333",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "18px",
                                        textDecoration: "none",
                                        transition: "all 0.3s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = "rgba(249, 115, 22, 0.5)";
                                        e.currentTarget.style.background = "#2D2D2D";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = "#333333";
                                        e.currentTarget.style.background = "#262626";
                                    }}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Footer link columns */}
                    {Object.entries(footerLinks).map(([category, links], catIndex) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.1 * catIndex }}
                        >
                            <h4 style={{ fontWeight: "600", color: "#FFFFFF", marginBottom: "20px", fontSize: "15px" }}>
                                {category}
                            </h4>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                {links.map((link) => (
                                    <li key={link.label} style={{ marginBottom: "12px" }}>
                                        <Link
                                            href={link.href}
                                            style={{
                                                fontSize: "14px",
                                                color: "#6B6B6B",
                                                textDecoration: "none",
                                                transition: "color 0.2s ease",
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.color = "#F97316"}
                                            onMouseLeave={(e) => e.currentTarget.style.color = "#6B6B6B"}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 }}
                    style={{
                        paddingTop: "24px",
                        borderTop: "1px solid #333333",
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "16px",
                    }}
                >
                    <p style={{ fontSize: "14px", color: "#6B6B6B" }}>
                        © {new Date().getFullYear()} Orbitex. All rights reserved.
                    </p>

                    <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#6B6B6B" }}>
                            <span style={{
                                position: "relative",
                                display: "flex",
                                width: "8px",
                                height: "8px",
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
                                    width: "8px",
                                    height: "8px",
                                    backgroundColor: "#22C55E",
                                }} />
                            </span>
                            All systems operational
                        </span>

                        <span style={{ fontSize: "13px", color: "#4a4a4a" }}>v1.0.0</span>
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
        </footer>
    );
}

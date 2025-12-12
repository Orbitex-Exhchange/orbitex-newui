"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const crates = [
    { id: 1, name: "Daily Crate", type: "Common", ready: true, color: "#3B82F6" },
    { id: 2, name: "Weekly Crate", type: "Rare", ready: false, timer: "2d 4h", color: "#8B5CF6" },
    { id: 3, name: "Milestone Crate", type: "Legendary", ready: false, progress: 65, color: "#F97316" },
];

const rewards = [
    { name: "100 USDC", chance: "0.5%", icon: "💵" },
    { name: "50 ORBX", chance: "2.5%", icon: "🪙" },
    { name: "XP Boost", chance: "15%", icon: "⚡" },
    { name: "Common NFT", chance: "35%", icon: "🖼️" },
    { name: "Points", chance: "47%", icon: "✨" },
];

function CrateCard({ crate }: { crate: typeof crates[0] }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            style={{
                padding: "32px",
                borderRadius: "20px",
                background: `linear-gradient(135deg, ${crate.color}15 0%, ${crate.color}05 100%)`,
                border: "1px solid #333333",
                position: "relative",
                overflow: "hidden",
                cursor: crate.ready ? "pointer" : "default",
                transition: "border-color 0.3s ease",
                borderColor: isHovered && crate.ready ? crate.color : "#333333",
            }}
        >
            {/* Background glow */}
            {crate.ready && (
                <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "200px",
                    height: "200px",
                    background: `radial-gradient(circle, ${crate.color}20 0%, transparent 70%)`,
                    pointerEvents: "none",
                }} />
            )}

            <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
                {/* Crate Icon */}
                <motion.div
                    animate={crate.ready ? { y: [0, -10, 0] } : {}}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        fontSize: "64px",
                        marginBottom: "24px",
                        filter: crate.ready ? "drop-shadow(0 0 20px rgba(255,255,255,0.2))" : "grayscale(80%)",
                    }}
                >
                    📦
                </motion.div>

                <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "#FFFFFF", marginBottom: "8px" }}>
                    {crate.name}
                </h3>

                <div style={{
                    fontSize: "14px",
                    color: crate.color,
                    fontWeight: "600",
                    marginBottom: "24px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                }}>
                    {crate.type}
                </div>

                {crate.ready ? (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            width: "100%",
                            padding: "14px",
                            borderRadius: "12px",
                            border: "none",
                            background: `linear-gradient(135deg, ${crate.color} 0%, ${crate.color}dd 100%)`,
                            color: "white",
                            fontSize: "16px",
                            fontWeight: "bold",
                            cursor: "pointer",
                            boxShadow: `0 8px 24px ${crate.color}40`,
                        }}
                    >
                        Open Crate
                    </motion.button>
                ) : (
                    <div style={{
                        width: "100%",
                        padding: "14px",
                        borderRadius: "12px",
                        background: "#262626",
                        border: "1px solid #333333",
                    }}>
                        {crate.progress ? (
                            <div>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontSize: "12px",
                                    color: "#A0A0A0",
                                    marginBottom: "6px"
                                }}>
                                    <span>Progress</span>
                                    <span>{crate.progress}%</span>
                                </div>
                                <div style={{ height: "6px", background: "#1A1A1A", borderRadius: "3px", overflow: "hidden" }}>
                                    <div style={{ width: `${crate.progress}%`, height: "100%", background: crate.color }} />
                                </div>
                            </div>
                        ) : (
                            <span style={{ color: "#A0A0A0", fontSize: "14px", fontWeight: "500" }}>
                                Opens in {crate.timer}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export default function CratesPage() {
    return (
        <div style={{ padding: "24px" }}>
            {/* Header */}
            <div style={{ marginBottom: "32px", textAlign: "center" }}>
                <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#FFFFFF", marginBottom: "8px" }}>
                    Mystery Crates
                </h1>
                <p style={{ color: "#6B6B6B", fontSize: "16px", maxWidth: "500px", margin: "0 auto" }}>
                    Unlock crates to earn exclusive rewards, tokens, and collectibles.
                </p>
            </div>

            {/* Crates Grid */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "24px",
                marginBottom: "48px",
            }}>
                {crates.map((crate) => (
                    <CrateCard key={crate.id} crate={crate} />
                ))}
            </div>

            {/* Stats Section */}
            <div style={{ marginBottom: "48px" }}>
                <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#FFFFFF", marginBottom: "20px" }}>
                    Your Stats
                </h2>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "16px",
                }}>
                    {[
                        { label: "Crates Opened", value: "12" },
                        { label: "Total Rewards", value: "$450.00" },
                        { label: "Best Drop", value: "Legendary" },
                        { label: "Next Drop", value: "2 Days" },
                    ].map((stat) => (
                        <div key={stat.label} style={{
                            padding: "20px",
                            borderRadius: "16px",
                            background: "#1A1A1A",
                            border: "1px solid #333333",
                            textAlign: "center",
                        }}>
                            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#FFFFFF", marginBottom: "4px" }}>
                                {stat.value}
                            </div>
                            <div style={{ fontSize: "13px", color: "#6B6B6B" }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Possible Rewards */}
            <div>
                <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#FFFFFF", marginBottom: "20px" }}>
                    Possible Rewards
                </h2>
                <div style={{
                    padding: "24px",
                    borderRadius: "16px",
                    background: "#1A1A1A",
                    border: "1px solid #333333",
                }}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                        gap: "20px",
                    }}>
                        {rewards.map((reward) => (
                            <div key={reward.name} style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                            }}>
                                <div style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "10px",
                                    background: "#262626",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "20px",
                                }}>
                                    {reward.icon}
                                </div>
                                <div>
                                    <div style={{ color: "#FFFFFF", fontSize: "14px", fontWeight: "500" }}>{reward.name}</div>
                                    <div style={{ color: "#F97316", fontSize: "12px" }}>{reward.chance}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

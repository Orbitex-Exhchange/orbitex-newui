"use client";

import { motion } from "framer-motion";

const airdrops = [
    {
        id: 1,
        name: "Orbitex Early Adopter",
        status: "Claimable",
        amount: "500 ORBX",
        value: "$125.00",
        icon: "🪐",
        color: "#F97316"
    },
    {
        id: 2,
        name: "LayerZero Eligibility",
        status: "Checked",
        amount: "Not Eligible",
        value: "-",
        icon: "0️⃣",
        color: "#A0A0A0"
    },
    {
        id: 3,
        name: "ZkSync Retroactive",
        status: "Pending",
        amount: "Undisclosed",
        value: "?",
        icon: "⚡",
        color: "#3B82F6"
    },
];

const missions = [
    { id: 1, title: "Swap $100+ on Base", xp: 500, done: true },
    { id: 2, title: "Deposit into Earn Vault", xp: 1000, done: false },
    { id: 3, title: "Refer a Friend", xp: 2500, done: false },
    { id: 4, title: "Bridge to Arbitrum", xp: 750, done: false },
];

function AirdropCard({ airdrop }: { airdrop: typeof airdrops[0] }) {
    const isClaimable = airdrop.status === "Claimable";

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            style={{
                padding: "24px",
                borderRadius: "20px",
                background: isClaimable
                    ? `linear-gradient(135deg, ${airdrop.color}15 0%, ${airdrop.color}05 100%)`
                    : "#1A1A1A",
                border: "1px solid",
                borderColor: isClaimable ? `${airdrop.color}40` : "#333333",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <div style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "16px",
                    background: isClaimable ? `${airdrop.color}20` : "#262626",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "28px",
                }}>
                    {airdrop.icon}
                </div>

                <div>
                    <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#FFFFFF", marginBottom: "4px" }}>
                        {airdrop.name}
                    </h3>
                    <div style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "13px",
                        color: isClaimable ? airdrop.color : "#6B6B6B"
                    }}>
                        <span style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: isClaimable ? airdrop.color : "#6B6B6B",
                        }} />
                        {airdrop.status}
                    </div>
                </div>
            </div>

            <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "20px", fontWeight: "bold", color: "#FFFFFF", marginBottom: "4px" }}>
                    {airdrop.amount}
                </div>
                <div style={{ fontSize: "14px", color: "#6B6B6B", marginBottom: "12px" }}>
                    {airdrop.value}
                </div>

                {isClaimable && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            padding: "8px 24px",
                            borderRadius: "10px",
                            border: "none",
                            background: `linear-gradient(135deg, ${airdrop.color} 0%, ${airdrop.color}dd 100%)`,
                            color: "white",
                            fontSize: "14px",
                            fontWeight: "600",
                            cursor: "pointer",
                            boxShadow: `0 4px 12px ${airdrop.color}40`,
                        }}
                    >
                        Claim
                    </motion.button>
                )}
            </div>
        </motion.div>
    );
}

export default function AirdropsPage() {
    return (
        <div style={{ padding: "24px", maxWidth: "1000px", margin: "0 auto" }}>
            {/* Header */}
            <div style={{ marginBottom: "40px", textAlign: "center" }}>
                <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#FFFFFF", marginBottom: "8px" }}>
                    Airdrop Zone
                </h1>
                <p style={{ color: "#6B6B6B", fontSize: "16px" }}>
                    Check eligibility, complete missions, and claim your rewards.
                </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "32px" }}>
                {/* Main Airdrops List */}
                <div>
                    <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#FFFFFF", marginBottom: "20px" }}>
                        Available Airdrops
                    </h2>
                    <div>
                        {airdrops.map((airdrop) => (
                            <AirdropCard key={airdrop.id} airdrop={airdrop} />
                        ))}
                    </div>
                </div>

                {/* Missions Sidebar */}
                <div style={{
                    padding: "24px",
                    borderRadius: "20px",
                    background: "#1A1A1A",
                    border: "1px solid #333333",
                    height: "fit-content",
                }}>
                    <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#FFFFFF", marginBottom: "20px" }}>
                        XP Missions
                    </h2>

                    <div style={{ marginBottom: "24px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                            <span style={{ color: "#A0A0A0", fontSize: "14px" }}>Level 5</span>
                            <span style={{ color: "#F97316", fontSize: "14px", fontWeight: "bold" }}>2,450 / 5,000 XP</span>
                        </div>
                        <div style={{ width: "100%", height: "8px", background: "#262626", borderRadius: "4px", overflow: "hidden" }}>
                            <div style={{ width: "49%", height: "100%", background: "#F97316", borderRadius: "4px" }} />
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        {missions.map((mission) => (
                            <div key={mission.id} style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                opacity: mission.done ? 0.5 : 1,
                            }}>
                                <div style={{
                                    width: "24px",
                                    height: "24px",
                                    borderRadius: "50%",
                                    border: mission.done ? "none" : "2px solid #333333",
                                    background: mission.done ? "#22C55E" : "transparent",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    fontSize: "14px",
                                }}>
                                    {mission.done && "✓"}
                                </div>
                                <div>
                                    <div style={{ color: "#FFFFFF", fontSize: "14px", textDecoration: mission.done ? "line-through" : "none" }}>{mission.title}</div>
                                    <div style={{ color: "#F97316", fontSize: "12px" }}>+{mission.xp} XP</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

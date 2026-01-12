"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ModalType = "deposit" | "withdraw" | "transfer" | null;
type AccountType = "spot" | "perpetual";

interface AccountSectionProps {
    spotBalance?: number;
    perpBalance?: number;
    unrealizedPnl?: number;
    marginRatio?: number;
}

export default function AccountSection({
    spotBalance = 0,
    perpBalance = 0,
    unrealizedPnl = 0,
    marginRatio = 0,
}: AccountSectionProps) {
    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const [fromAccount, setFromAccount] = useState<AccountType>("spot");
    const [toAccount, setToAccount] = useState<AccountType>("perpetual");
    const [amount, setAmount] = useState("");
    const [selectedAsset, _setSelectedAsset] = useState("USDT");
    const [selectedNetwork, _setSelectedNetwork] = useState("Ethereum");

    const handleAction = () => {
        console.log(`${activeModal}: ${amount} ${selectedAsset}`);
        setAmount("");
        setActiveModal(null);
    };

    const swapAccounts = () => {
        setFromAccount(toAccount);
        setToAccount(fromAccount);
    };

    return (
        <div style={{
            background: "#0b0b0e",
            borderTop: "1px solid #1e1e24",
            padding: "12px",
            fontSize: "11px",
        }}>
            {/* Header */}
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "12px",
            }}>
                <span style={{ fontWeight: "600", color: "#fff" }}>Account</span>
                <div style={{ display: "flex", gap: "4px" }}>
                    {(["deposit", "withdraw", "transfer"] as const).map((action) => (
                        <motion.button
                            key={action}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveModal(action)}
                            style={{
                                padding: "5px 10px",
                                borderRadius: "4px",
                                border: "none",
                                background: action === "deposit" ? "#00d395" : "#16161a",
                                color: action === "deposit" ? "#000" : "#a0a0a8",
                                fontSize: "10px",
                                fontWeight: "500",
                                cursor: "pointer",
                                textTransform: "capitalize",
                            }}
                        >
                            {action}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Account Equity */}
            <div style={{ marginBottom: "12px" }}>
                <div style={{ color: "#5c5c6b", fontSize: "10px", marginBottom: "6px" }}>Account Equity</div>
                {[
                    { label: "Spot total value", value: spotBalance },
                    { label: "Perp total value", value: perpBalance },
                    { label: "Perpetuals unrealized Pnl", value: unrealizedPnl, color: unrealizedPnl >= 0 ? "#00d395" : "#ff5252" },
                    { label: "Shield unrealized Pnl", value: 0 },
                ].map((item) => (
                    <div key={item.label} style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "3px 0",
                        color: "#a0a0a8",
                    }}>
                        <span>{item.label}</span>
                        <span style={{
                            fontFamily: "monospace",
                            color: item.color || "#fff",
                        }}>
                            {item.value.toFixed(2)} USDT
                        </span>
                    </div>
                ))}
            </div>

            {/* Margin */}
            <div>
                <div style={{ color: "#5c5c6b", fontSize: "10px", marginBottom: "6px" }}>Margin</div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", color: "#a0a0a8" }}>
                    <span>Account Margin Ratio</span>
                    <span style={{
                        fontFamily: "monospace",
                        color: marginRatio > 50 ? "#ff5252" : marginRatio > 20 ? "#ffa726" : "#00d395",
                    }}>
                        {marginRatio.toFixed(2)}%
                    </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", color: "#a0a0a8" }}>
                    <span>Account Maintenance Margin</span>
                    <span style={{ fontFamily: "monospace", color: "#fff" }}>0.00 USD</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", color: "#a0a0a8" }}>
                    <span>Account Equity</span>
                    <span style={{ fontFamily: "monospace", color: "#fff" }}>
                        {(spotBalance + perpBalance).toFixed(2)} USD
                    </span>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {activeModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActiveModal(null)}
                        style={{
                            position: "fixed",
                            inset: 0,
                            background: "rgba(0,0,0,0.8)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 200,
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                width: "380px",
                                background: "#16161a",
                                border: "1px solid #2a2a32",
                                borderRadius: "12px",
                                padding: "20px",
                            }}
                        >
                            {/* Modal Header */}
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "16px",
                            }}>
                                <span style={{ fontSize: "16px", fontWeight: "600", color: "#fff" }}>Account</span>
                                <button
                                    onClick={() => setActiveModal(null)}
                                    style={{
                                        background: "transparent",
                                        border: "none",
                                        color: "#5c5c6b",
                                        fontSize: "20px",
                                        cursor: "pointer",
                                    }}
                                >
                                    ×
                                </button>
                            </div>

                            {/* Modal Tabs */}
                            <div style={{
                                display: "flex",
                                gap: "16px",
                                borderBottom: "1px solid #2a2a32",
                                marginBottom: "16px",
                            }}>
                                {(["deposit", "withdraw", "transfer"] as const).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveModal(tab)}
                                        style={{
                                            padding: "8px 0",
                                            background: "none",
                                            border: "none",
                                            borderBottom: activeModal === tab ? "2px solid #00d395" : "2px solid transparent",
                                            color: activeModal === tab ? "#fff" : "#5c5c6b",
                                            fontSize: "13px",
                                            fontWeight: "500",
                                            cursor: "pointer",
                                            textTransform: "capitalize",
                                        }}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* Transfer Content */}
                            {activeModal === "transfer" && (
                                <>
                                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: "10px", color: "#5c5c6b", marginBottom: "4px" }}>From</div>
                                            <button
                                                style={{
                                                    width: "100%",
                                                    padding: "12px",
                                                    borderRadius: "8px",
                                                    border: "1px solid #2a2a32",
                                                    background: "#0b0b0e",
                                                    color: "#00d395",
                                                    fontSize: "13px",
                                                    fontWeight: "600",
                                                    cursor: "pointer",
                                                    textAlign: "left",
                                                    textTransform: "capitalize",
                                                }}
                                            >
                                                {fromAccount}
                                            </button>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={swapAccounts}
                                            style={{
                                                marginTop: "16px",
                                                padding: "8px",
                                                borderRadius: "8px",
                                                border: "none",
                                                background: "#2a2a32",
                                                color: "#fff",
                                                cursor: "pointer",
                                            }}
                                        >
                                            ⇄
                                        </motion.button>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: "10px", color: "#5c5c6b", marginBottom: "4px" }}>To</div>
                                            <button
                                                style={{
                                                    width: "100%",
                                                    padding: "12px",
                                                    borderRadius: "8px",
                                                    border: "1px solid #2a2a32",
                                                    background: "#0b0b0e",
                                                    color: "#00d395",
                                                    fontSize: "13px",
                                                    fontWeight: "600",
                                                    cursor: "pointer",
                                                    textAlign: "left",
                                                    textTransform: "capitalize",
                                                }}
                                            >
                                                {toAccount}
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Withdraw Content */}
                            {activeModal === "withdraw" && (
                                <div style={{ marginBottom: "16px" }}>
                                    <div style={{ fontSize: "10px", color: "#5c5c6b", marginBottom: "4px" }}>Account</div>
                                    <button
                                        style={{
                                            width: "100%",
                                            padding: "12px",
                                            borderRadius: "8px",
                                            border: "1px solid #2a2a32",
                                            background: "#0b0b0e",
                                            color: "#fff",
                                            fontSize: "13px",
                                            cursor: "pointer",
                                            textAlign: "left",
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <span>Perpetual account</span>
                                        <span style={{ color: "#5c5c6b" }}>▼</span>
                                    </button>
                                </div>
                            )}

                            {/* Network (for deposit/withdraw) */}
                            {(activeModal === "deposit" || activeModal === "withdraw") && (
                                <div style={{ marginBottom: "16px" }}>
                                    <div style={{ fontSize: "10px", color: "#5c5c6b", marginBottom: "4px" }}>Network</div>
                                    <button
                                        style={{
                                            width: "100%",
                                            padding: "12px",
                                            borderRadius: "8px",
                                            border: "1px solid #2a2a32",
                                            background: "#0b0b0e",
                                            color: "#fff",
                                            fontSize: "13px",
                                            cursor: "pointer",
                                            textAlign: "left",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                        }}
                                    >
                                        <span style={{
                                            width: "20px",
                                            height: "20px",
                                            borderRadius: "50%",
                                            background: "#627eea",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "10px",
                                        }}>
                                            Ξ
                                        </span>
                                        <span>{selectedNetwork}</span>
                                        <span style={{ marginLeft: "auto", color: "#5c5c6b" }}>▼</span>
                                    </button>
                                </div>
                            )}

                            {/* Amount Input */}
                            <div style={{ marginBottom: "16px" }}>
                                <div style={{ fontSize: "10px", color: "#5c5c6b", marginBottom: "4px" }}>Amount</div>
                                <div style={{ position: "relative" }}>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0.00"
                                        style={{
                                            width: "100%",
                                            padding: "12px",
                                            paddingRight: "100px",
                                            borderRadius: "8px",
                                            border: "1px solid #2a2a32",
                                            background: "#0b0b0e",
                                            color: "#fff",
                                            fontSize: "14px",
                                            fontFamily: "monospace",
                                            outline: "none",
                                        }}
                                    />
                                    <button
                                        style={{
                                            position: "absolute",
                                            right: "8px",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            padding: "6px 12px",
                                            borderRadius: "6px",
                                            border: "1px solid #2a2a32",
                                            background: "#16161a",
                                            color: "#ffa726",
                                            fontSize: "12px",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "6px",
                                        }}
                                    >
                                        <span style={{
                                            width: "16px",
                                            height: "16px",
                                            borderRadius: "50%",
                                            background: "#26a17b",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "8px",
                                            color: "#fff",
                                        }}>
                                            ₮
                                        </span>
                                        {selectedAsset}
                                        <span style={{ color: "#5c5c6b" }}>▼</span>
                                    </button>
                                </div>
                            </div>

                            {/* Info Row */}
                            {activeModal === "transfer" && (
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontSize: "11px",
                                    color: "#5c5c6b",
                                    marginBottom: "16px",
                                }}>
                                    <span>Transferable amount</span>
                                    <span style={{ color: "#a0a0a8" }}>--</span>
                                </div>
                            )}

                            {activeModal === "withdraw" && (
                                <>
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        fontSize: "11px",
                                        color: "#5c5c6b",
                                        marginBottom: "8px",
                                    }}>
                                        <span>Withdrawable amount</span>
                                        <span style={{ color: "#00d395" }}>0 USDT Max</span>
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        fontSize: "11px",
                                        color: "#5c5c6b",
                                        marginBottom: "16px",
                                    }}>
                                        <span>Transaction fee</span>
                                        <span style={{ color: "#a0a0a8" }}>0.05 USDT (0.04 USD)</span>
                                    </div>
                                    <div style={{
                                        padding: "10px",
                                        borderRadius: "6px",
                                        background: "rgba(255, 167, 38, 0.1)",
                                        border: "1px solid rgba(255, 167, 38, 0.2)",
                                        fontSize: "10px",
                                        color: "#ffa726",
                                        marginBottom: "16px",
                                    }}>
                                        ⚠️ Before you withdraw: Deposited tokens must be withdrawn on the same chain they were deposited; profits (USDT) can be withdrawn on any supported chain.
                                    </div>
                                </>
                            )}

                            {/* Action Button */}
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={handleAction}
                                style={{
                                    width: "100%",
                                    padding: "14px",
                                    borderRadius: "8px",
                                    border: "none",
                                    background: activeModal === "withdraw" ? "#ff5252" : "#00d395",
                                    color: activeModal === "withdraw" ? "#fff" : "#000",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    textTransform: "capitalize",
                                }}
                            >
                                {activeModal === "deposit" ? "Deposit" :
                                    activeModal === "withdraw" ? "Withdrawal" : "Transfer"}
                            </motion.button>

                            {activeModal === "withdraw" && (
                                <button
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        marginTop: "8px",
                                        background: "transparent",
                                        border: "none",
                                        color: "#5c5c6b",
                                        fontSize: "12px",
                                        cursor: "pointer",
                                    }}
                                >
                                    View history in Portfolio
                                </button>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

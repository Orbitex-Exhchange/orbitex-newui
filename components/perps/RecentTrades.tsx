"use client";

interface RecentTrade {
    price: number;
    size: number;
    side: "buy" | "sell";
    time: string;
}

interface RecentTradesProps {
    trades?: RecentTrade[];
}

const defaultTrades: RecentTrade[] = [
    { price: 3325.60, size: 2.4, side: "buy", time: "14:32:15" },
    { price: 3325.40, size: 1.1, side: "sell", time: "14:32:12" },
    { price: 3325.60, size: 0.8, side: "buy", time: "14:32:08" },
    { price: 3325.50, size: 3.2, side: "buy", time: "14:32:05" },
    { price: 3325.30, size: 1.5, side: "sell", time: "14:32:01" },
    { price: 3325.45, size: 0.6, side: "buy", time: "14:31:58" },
    { price: 3325.20, size: 2.1, side: "sell", time: "14:31:55" },
    { price: 3325.35, size: 1.8, side: "buy", time: "14:31:52" },
    { price: 3325.10, size: 0.9, side: "sell", time: "14:31:48" },
    { price: 3325.40, size: 1.3, side: "buy", time: "14:31:45" },
];

export default function RecentTrades({ trades = defaultTrades }: RecentTradesProps) {
    return (
        <div style={{
            height: "100%",
            background: "#0d0d0d",
            borderRadius: "12px",
            border: "1px solid #1a1a1a",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
        }}>
            {/* Header */}
            <div style={{
                padding: "12px 16px",
                borderBottom: "1px solid #1a1a1a",
            }}>
                <span style={{ fontSize: "13px", fontWeight: "600", color: "#fff" }}>Recent Trades</span>
            </div>

            {/* Column Headers */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                padding: "8px 12px",
                fontSize: "11px",
                color: "#6b6b6b",
                textTransform: "uppercase",
                borderBottom: "1px solid #1a1a1a",
            }}>
                <span>Price</span>
                <span style={{ textAlign: "right" }}>Size</span>
                <span style={{ textAlign: "right" }}>Time</span>
            </div>

            {/* Trades List */}
            <div style={{ flex: 1, overflow: "auto" }}>
                {trades.map((trade, i) => (
                    <div
                        key={i}
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr",
                            padding: "6px 12px",
                            fontSize: "12px",
                            fontFamily: "monospace",
                        }}
                    >
                        <span style={{ color: trade.side === "buy" ? "#22c55e" : "#ef4444" }}>
                            {trade.price.toFixed(2)}
                        </span>
                        <span style={{ color: "#a0a0a0", textAlign: "right" }}>
                            {trade.size.toFixed(4)}
                        </span>
                        <span style={{ color: "#6b6b6b", textAlign: "right" }}>
                            {trade.time}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

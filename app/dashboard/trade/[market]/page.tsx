"use client";

import { useParams } from "next/navigation";
import { useState, useCallback } from "react";
import PerpsHeader from "@/components/perps/PerpsHeader";
import TradingChart from "@/components/perps/TradingChart";
import OrderBookTradesPanel from "@/components/perps/OrderBookTradesPanel";
import TradePanel from "@/components/perps/TradePanel";
import PositionsPanel from "@/components/perps/PositionsPanel";
import AccountSection from "@/components/perps/AccountSection";

// Market data - would be fetched from API in production
const marketData: Record<string, {
    price: number;
    change24h: number;
    volume24h: string;
    high24h: number;
    low24h: number;
    openInterest: string;
    fundingRate: string;
    bestBid: number;
    bestAsk: number;
}> = {
    "ETH-USD": { price: 3325.60, change24h: 0.09, volume24h: "32.6B", high24h: 3380, low24h: 3290, openInterest: "1.2B", fundingRate: "0.0045%", bestBid: 3325.40, bestAsk: 3325.80 },
    "BTC-USD": { price: 92035, change24h: -0.74, volume24h: "51.9B", high24h: 93500, low24h: 91200, openInterest: "4.8B", fundingRate: "0.0032%", bestBid: 92030, bestAsk: 92040 },
    "SOL-USD": { price: 136.30, change24h: -1.30, volume24h: "4.5B", high24h: 142, low24h: 134, openInterest: "890M", fundingRate: "-0.0018%", bestBid: 136.25, bestAsk: 136.35 },
    "ARB-USD": { price: 1.42, change24h: 2.15, volume24h: "890M", high24h: 1.48, low24h: 1.38, openInterest: "320M", fundingRate: "0.0056%", bestBid: 1.415, bestAsk: 1.425 },
    "OP-USD": { price: 2.18, change24h: 1.85, volume24h: "540M", high24h: 2.25, low24h: 2.10, openInterest: "180M", fundingRate: "0.0041%", bestBid: 2.175, bestAsk: 2.185 },
    "AVAX-USD": { price: 38.50, change24h: -0.45, volume24h: "1.2B", high24h: 40.20, low24h: 37.80, openInterest: "420M", fundingRate: "-0.0012%", bestBid: 38.48, bestAsk: 38.52 },
};

export default function MarketTradingPage() {
    const params = useParams();
    const market = (params?.market as string) || "ETH-USD";
    const [showTradePanel, setShowTradePanel] = useState(true);
    const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

    const data = marketData[market] || marketData["ETH-USD"];
    const asset = market.split("-")[0];

    const handlePriceClick = useCallback((price: number) => {
        setSelectedPrice(price);
    }, []);

    return (
        <div style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            background: "#0b0b0e",
        }}>
            {/* Header */}
            <PerpsHeader
                currentMarket={market}
                price={data.price}
                change24h={data.change24h}
                volume24h={data.volume24h}
                high24h={data.high24h}
                low24h={data.low24h}
                openInterest={data.openInterest}
                fundingRate={data.fundingRate}
            />

            {/* Main Trading Area */}
            <div style={{
                flex: 1,
                display: "flex",
                minHeight: 0,
            }}>
                {/* Left Section: Chart + Quick Order + Positions */}
                <div style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    minWidth: 0,
                    borderRight: "1px solid #1e1e24",
                }}>
                    {/* Chart */}
                    <div style={{
                        flex: 1,
                        minHeight: "350px",
                        borderBottom: "1px solid #1e1e24",
                    }}>
                        <TradingChart
                            market={market}
                            currentPrice={data.price}
                            change24h={data.change24h}
                            bestBid={data.bestBid}
                            bestAsk={data.bestAsk}
                            onQuickOrder={(side, size) => {
                                console.log(`Quick ${side} order: ${size} ${asset} at market`);
                            }}
                        />
                    </div>



                    {/* Positions Panel */}
                    <div style={{
                        height: "220px",
                        flexShrink: 0,
                    }}>
                        <PositionsPanel />
                    </div>
                </div>

                {/* Right Section: OrderBook/Trades + Trade Panel */}
                <div style={{
                    width: showTradePanel ? "600px" : "300px",
                    display: "flex",
                    flexShrink: 0,
                    transition: "width 0.2s ease",
                }}>
                    {/* OrderBook / Trades Panel */}
                    <div style={{
                        width: "300px",
                        borderRight: showTradePanel ? "1px solid #1e1e24" : "none",
                    }}>
                        <OrderBookTradesPanel
                            currentPrice={data.price}
                            onPriceClick={handlePriceClick}
                        />
                    </div>

                    {/* Trade Panel + Account Section */}
                    {showTradePanel && (
                        <div style={{
                            width: "300px",
                            display: "flex",
                            flexDirection: "column",
                            overflow: "hidden",
                        }}>
                            <div style={{ flex: 1, overflow: "auto" }}>
                                <TradePanel
                                    market={market}
                                    currentPrice={data.price}
                                    bestBid={data.bestBid}
                                    bestAsk={data.bestAsk}
                                    key={selectedPrice}
                                />
                            </div>
                            <AccountSection />
                        </div>
                    )}
                </div>
            </div>

            {/* Toggle Trade Panel Button */}
            <button
                onClick={() => setShowTradePanel(!showTradePanel)}
                style={{
                    position: "fixed",
                    bottom: "16px",
                    right: "16px",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid #2a2a32",
                    background: "#16161a",
                    color: "#fff",
                    fontSize: "11px",
                    cursor: "pointer",
                    zIndex: 100,
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                }}
            >
                {showTradePanel ? "◀ Hide Panel" : "▶ Show Panel"}
            </button>
        </div>
    );
}

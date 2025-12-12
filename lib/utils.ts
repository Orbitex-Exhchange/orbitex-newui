import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names, handling conditional classes and merging Tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Format a number as currency
 */
export function formatCurrency(value: number, currency = "USD"): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}

/**
 * Format a number with compact notation (e.g., 1.5K, 2.3M)
 */
export function formatCompact(value: number): string {
    return new Intl.NumberFormat("en-US", {
        notation: "compact",
        compactDisplay: "short",
        maximumFractionDigits: 1,
    }).format(value);
}

/**
 * Format a percentage change
 */
export function formatPercentage(value: number): string {
    const sign = value >= 0 ? "+" : "";
    return `${sign}${value.toFixed(2)}%`;
}

/**
 * Format a crypto price with appropriate decimal places
 */
export function formatCryptoPrice(value: number): string {
    if (value >= 1000) {
        return formatCurrency(value).replace("$", "");
    }
    if (value >= 1) {
        return value.toFixed(2);
    }
    if (value >= 0.01) {
        return value.toFixed(4);
    }
    return value.toFixed(8);
}

/**
 * Truncate an address for display
 */
export function truncateAddress(address: string, chars = 4): string {
    if (!address) return "";
    return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

/**
 * Get the color class for a price change
 */
export function getPriceChangeClass(change: number): string {
    if (change > 0) return "text-success";
    if (change < 0) return "text-danger";
    return "text-text-secondary";
}

/**
 * Generate a random sparkline data array for demo purposes
 */
export function generateSparklineData(points = 20, trend: "up" | "down" | "neutral" = "neutral"): number[] {
    const data: number[] = [];
    let value = 50;

    const trendBias = trend === "up" ? 1.5 : trend === "down" ? -1.5 : 0;

    for (let i = 0; i < points; i++) {
        const change = (Math.random() - 0.5) * 10 + trendBias;
        value = Math.max(10, Math.min(90, value + change));
        data.push(value);
    }

    return data;
}

/**
 * Delay execution for a specified time
 */
export function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

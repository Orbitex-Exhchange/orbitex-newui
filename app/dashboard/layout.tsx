"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import RightSidebar from "@/components/dashboard/RightSidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Hide sidebars for perps trading pages
    const isPerpsRoute = pathname?.startsWith("/dashboard/trade");

    if (isPerpsRoute) {
        return (
            <div style={{
                minHeight: "100vh",
                background: "#0a0a0a",
            }}>
                {children}
            </div>
        );
    }

    return (
        <div style={{
            display: "flex",
            minHeight: "100vh",
            background: "#0D0D0D",
        }}>
            {/* Left Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main style={{
                flex: 1,
                minHeight: "100vh",
                background: "#0D0D0D",
                overflowY: "auto",
            }}>
                {children}
            </main>

            {/* Right Sidebar */}
            <RightSidebar />
        </div>
    );
}

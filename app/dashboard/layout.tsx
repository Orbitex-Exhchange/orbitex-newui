"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import RightSidebar from "@/components/dashboard/RightSidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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

"use client";

import dynamic from "next/dynamic";

// Dynamically import HeroUIProvider with SSR disabled to avoid prerender errors
const HeroUIProvider = dynamic(
    () => import("@heroui/react").then((mod) => mod.HeroUIProvider),
    { ssr: false }
);

export default function Providers({ children }: { children: React.ReactNode }) {
    return <HeroUIProvider>{children}</HeroUIProvider>;
}

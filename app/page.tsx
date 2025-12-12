import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import FeatureCards from "@/components/landing/FeatureCards";
import Features from "@/components/landing/Features";
import Security from "@/components/landing/Security";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <FeatureCards />
      <Features />
      <Security />
      <Footer />
    </main>
  );
}

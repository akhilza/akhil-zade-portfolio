import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SkillsPeriodicTable from "@/components/SkillsPeriodicTable";
import Work from "@/components/Work";
import Timeline from "@/components/Timeline";
import Achievements from "@/components/Achievements";
import Resume from "@/components/Resume";
import Footer from "@/components/Footer";
import { ScrollProgress, CursorGlow, Marquee } from "@/components/Effects";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <SkillsPeriodicTable />
        <Work />
        <Timeline />
        <Achievements />
        <Resume />
      </main>
      <Footer />
    </>
  );
}

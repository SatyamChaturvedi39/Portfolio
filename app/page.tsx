import Cursor         from "@/components/Cursor";
import LiquidEther    from "@/components/LiquidEther";
import Navbar         from "@/components/Navbar";
import Preloader      from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import Hero           from "@/components/sections/Hero";
import About          from "@/components/sections/About";
import Education      from "@/components/sections/Education";
import Skills         from "@/components/sections/Skills";
import Experience     from "@/components/sections/Experience";
import Projects       from "@/components/sections/Projects";
import Certifications from "@/components/sections/Certifications";
import Contact        from "@/components/sections/Contact";
import Footer         from "@/components/Footer";

export default function Home() {
  return (
    <>
      <LiquidEther />
      <Preloader />
      <ScrollProgress />
      <Cursor />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

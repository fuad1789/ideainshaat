import { setRequestLocale } from 'next-intl/server';
import { AppLoader } from '@/components/AppLoader';
import { CustomCursor } from '@/components/CustomCursor';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { Process } from '@/components/Process';
import { WhyUs } from '@/components/WhyUs';
import { Projects } from '@/components/Projects';
import { Testimonial } from '@/components/Testimonial';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { StickyCta } from '@/components/StickyCta';
import { RevealOnScroll } from '@/components/RevealOnScroll';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AppLoader />
      <CustomCursor />
      <Nav />
      <main className="app-surface">
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Process />
        <WhyUs />
        <Projects />
        <Testimonial />
        <Contact />
        <Footer />
      </main>
      <StickyCta />
      <RevealOnScroll />
    </>
  );
}

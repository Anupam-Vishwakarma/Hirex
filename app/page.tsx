import NavBar from '@/components/NavBar'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import TrustedBy from '@/components/TrustedBy'
import WhyLoveUs from '@/components/WhyLoveUs'
import AutopilotSection from '@/components/Autopilotsection'
import Testimonials from '@/components/Testimonials'
import PromoGrid from '@/components/PromoGrid'
import BadgeCardSection from '@/components/BadgeCardSection'
import Trending from '@/components/Trending'
import PopularReading from '@/components/PopularReading'
import FooterBar from '@/components/FooterBar'

export default function Page() {
  return (
    /* 'flex flex-col' ensures proper stacking.
       'bg-background' ensures the dark slate color from your screenshot is consistent.
       'selection:bg-primary/20' adds a subtle brand touch when users select text.
    */
    <main className="relative flex flex-col min-h-screen bg-background">
      <NavBar />
      
      {/* Spaced sections to match the breathable layout in your screenshot.
          Tailwind v4's 'space-y' or individual section padding works best here.
      */}
      <div className="flex flex-col gap-y-16 md:gap-y-24">
        <Hero />
        <Stats />
        <TrustedBy />
        <WhyLoveUs />
        <AutopilotSection />
        <Testimonials />
        <PromoGrid />
        <BadgeCardSection />
        <PopularReading />
        <Trending />
      </div>

      <FooterBar />
    </main>
  )
}
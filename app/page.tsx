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
    <main className="page">
      <NavBar />
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
      <FooterBar />
    </main>
  )
}
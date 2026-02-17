import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import MobileBottomNav from '@/components/MobileBottomNav';

export const metadata: Metadata = {
  title: 'HireX',
  description: 'HireX hiring platform',
  icons: {
    icon: '/favicon.ico',
  },
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script src="/assets/js/jquery-3.5.1.min.dc5e7f18c8.js" strategy="afterInteractive" />
        <Script src="/assets/ajax/libs/gsap/3.11.3/gsap.min.js" strategy="afterInteractive" />
        <Script src="/assets/ajax/libs/gsap/3.11.3/ScrollTrigger.min.js" strategy="afterInteractive" />
        <Script src="/assets/split-type.js" strategy="afterInteractive" />
        <Script src="/assets/npm/slick-carousel@1.8.1/slick/slick.min.js" strategy="afterInteractive" />
        <MobileBottomNav /> 
      </body>
    </html>
  )
}

import { HeroSection } from "@/components/hero-section"
import { DashboardPreview } from "@/components/dashboard-preview"
import { FeaturesSection } from "@/components/features-section"
import { PricingSection } from "@/components/pricing-section"
import { TestimonialGridSection } from "@/components/testimonial-grid-section"
import { FAQSection } from "@/components/faq-section"
import { CTASection } from "@/components/cta-section"
import { FooterSection } from "@/components/footer-section"
import { AnimatedSection } from "@/components/animated-section"
import { CursorMoneyEffects } from "@/components/cursor-money-effects"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-0">
      <div className="fixed right-4 bottom-5 md:right-6 md:bottom-7 z-[60] flex flex-col gap-3">
        <a
          href="https://www.tiktok.com/@finmate0?fbclid=IwY2xjawQibxhleHRuA2FlbQIxMABicmlkETFLREY4UUhtaEYxQ2I2TDFsc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHjv9sEEIRsqM_X66rSF4cvQOpb2imA_sWb0LpMjTJc-6Qs6ZUaVOWAWEcD0c_aem_eNbq1SaY3jkNlyfE5yhljw"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Mở TikTok FinMate"
          className="inline-flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-black text-white shadow-xl ring-1 ring-white/20 transition-transform hover:scale-105"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 md:h-7 md:w-7" fill="currentColor" aria-hidden="true">
            <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.204V2h-3.218v12.235a2.939 2.939 0 1 1-2.939-2.939c.244 0 .48.03.706.087V8.115a6.176 6.176 0 0 0-.706-.041A6.157 6.157 0 1 0 15.82 14.23V8.004a8.01 8.01 0 0 0 4.706 1.525V6.686h-.937z" />
          </svg>
        </a>
        <a
          href="https://www.facebook.com/profile.php?id=61581320641242"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Mở Facebook FinMate"
          className="inline-flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-xl ring-1 ring-white/30 transition-transform hover:scale-105"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 md:h-7 md:w-7" fill="currentColor" aria-hidden="true">
            <path d="M13.616 21.996V12.88h3.07l.46-3.553h-3.53V7.06c0-1.028.286-1.728 1.762-1.728l1.883-.001V2.153C16.985 2.109 15.865 2 14.56 2c-2.724 0-4.59 1.663-4.59 4.717v2.61H6.89v3.553h3.08v9.116h3.646z" />
          </svg>
        </a>
      </div>
      <CursorMoneyEffects />
      <div className="relative z-10">
        <main className="max-w-[1320px] mx-auto relative">
          <HeroSection />
        </main>
        <AnimatedSection id="features-section" className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-12" delay={0.1}>
          <FeaturesSection />
        </AnimatedSection>
        <AnimatedSection
          id="pricing-section"
          className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16"
          delay={0.2}
        >
          <PricingSection />
        </AnimatedSection>
        <AnimatedSection
          id="testimonials-section"
          className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16"
          delay={0.2}
        >
          <TestimonialGridSection />
        </AnimatedSection>
        <AnimatedSection id="faq-section" className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16" delay={0.2}>
          <FAQSection />
        </AnimatedSection>
        <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16" delay={0.2}>
          <CTASection />
        </AnimatedSection>
        <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16" delay={0.2}>
          <FooterSection />
        </AnimatedSection>
      </div>
    </div>
  )
}

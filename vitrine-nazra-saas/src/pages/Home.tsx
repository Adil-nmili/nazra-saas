import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import PartnersSection from '../components/Home/PartnersSection';
import BenefitsSection from '../components/Home/BenefitsSection';
import HowItWorksSection from '../components/Home/HowItWorksSection';
import PricingSection from '../components/Home/PricingSection';
import TestimonialsSection from '../components/Home/TestimonialsSection';
import FAQSection from '../components/Home/FAQSection';
import CTASection from '../components/Home/CTASection';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className='flex items-center justify-center'>
        <HeroSection />
      </div>
      <PartnersSection/>
      <BenefitsSection/>
      <HowItWorksSection/>
      <PricingSection/>
      <TestimonialsSection/>
      <CTASection/>
      <FAQSection/>
    </div>
  );
};

export default Home;

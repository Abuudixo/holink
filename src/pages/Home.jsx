import React from 'react';
import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import HowItWorks from '../components/HowItWorks';
import FeaturedListings from '../components/FeaturedListings';
import CTA from '../components/CTA';

const Home = () => {
    return (
        <>
            <Hero />
            <CategorySection />
            <HowItWorks />
            <FeaturedListings />
            <CTA />
        </>
    );
};

export default Home;

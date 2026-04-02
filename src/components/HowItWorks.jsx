import React from 'react';
import { Search, CalendarDays, Key } from 'lucide-react';

const steps = [
    {
        icon: Search,
        title: '1. Browse',
        description: 'Search through thousands of verified homes based on your location and date.',
        bgColor: 'bg-blue-50',
        iconColor: 'text-blue-500'
    },
    {
        icon: CalendarDays,
        title: '2. Book',
        description: 'Secure your rental with easy online payments and instant confirmation messages.',
        bgColor: 'bg-orange-50',
        iconColor: 'text-orange-500'
    },
    {
        icon: Key,
        title: '3. Rent',
        description: 'Check into your home and enjoy your seamless experience.',
        bgColor: 'bg-cyan-50',
        iconColor: 'text-cyan-500'
    }
];

const HowItWorks = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">How it Works</h2>
            <p className="text-gray-500 mb-16">Simple steps to get you on your way.</p>

            <div className="grid md:grid-cols-3 gap-12">
                {steps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center group">
                        <div className={`${step.bgColor} ${step.iconColor} p-6 rounded-2xl mb-6 transition-transform transform group-hover:scale-110 duration-300 shadow-sm`}>
                            <step.icon size={32} />
                        </div>
                        <h3 className="text-xl font-bold font-display text-gray-900 mb-3">{step.title}</h3>
                        <p className="text-gray-500 text-sm max-w-xs leading-relaxed">{step.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HowItWorks;

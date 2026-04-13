import React from 'react';
import { Search, Send, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const HowItWorks = () => {
    const { t } = useLanguage();

    const steps = [
        {
            icon: Search,
            title: t('how_step1_title'),
            description: t('how_step1_desc'),
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-500'
        },
        {
            icon: Send,
            title: t('how_step2_title'),
            description: t('how_step2_desc'),
            bgColor: 'bg-orange-50',
            iconColor: 'text-orange-500'
        },
        {
            icon: Phone,
            title: t('how_step3_title'),
            description: t('how_step3_desc'),
            bgColor: 'bg-cyan-50',
            iconColor: 'text-cyan-500'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">{t('how_title')}</h2>
            <p className="text-gray-500 mb-16">{t('how_subtitle')}</p>

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

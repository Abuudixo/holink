import React from 'react';
import { Globe, Youtube } from 'lucide-react';
import logo from '../assets/logo.png';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                
                {/* Brand & Logo */}
                <div className="flex flex-col items-center mb-10">
                    <img src={logo} alt="HoyLink Logo" className="h-20 w-auto object-contain mb-6" />
                    <p className="text-gray-500 text-sm max-w-md">
                        The premier marketplace for luxury home and apartment rentals in Mogadishu.
                    </p>
                </div>

                {/* Simplified Links */}
                <div className="flex flex-wrap justify-center gap-8 mb-10">
                    <a href="/rentals" className="text-sm font-bold text-gray-900 hover:text-primary transition-colors">Rent Homes</a>
                    <a href="/contacts" className="text-sm font-bold text-gray-900 hover:text-primary transition-colors">Contacts</a>
                    <a href="#" className="text-sm font-bold text-gray-900 hover:text-primary transition-colors">Terms</a>
                    <a href="#" className="text-sm font-bold text-gray-900 hover:text-primary transition-colors">Privacy</a>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-400">
                        &copy; {new Date().getFullYear()} HoyLink Inc. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <button className="text-gray-400 hover:text-primary transition-colors">
                            <Globe size={18} />
                        </button>
                        <button className="text-gray-400 hover:text-primary transition-colors">
                            <Youtube size={18} />
                        </button>
                    </div>
                </div>

            </div>
        </footer>
    );
};


export default Footer;

import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Home, Users, Settings, LogOut, Menu, X, Bell } from 'lucide-react';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const navigation = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Listings', href: '/admin/listings', icon: Home },
        { name: 'Users', href: '/admin/users', icon: Users },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    const isActive = (path) => {
        if (path === '/admin' && location.pathname !== '/admin') return false;
        return location.pathname.startsWith(path);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar Mobile Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-dark/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex lg:flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="font-display font-bold text-white">H</span>
                        </div>
                        <span className="font-display font-bold text-xl text-dark">HoyLink</span>
                    </Link>
                    <button className="lg:hidden text-gray-500 hover:text-dark cursor-pointer" onClick={() => setSidebarOpen(false)}>
                        <X size={24} />
                    </button>
                </div>

                <div className="flex flex-col flex-grow px-4 py-6 space-y-1 overflow-y-auto">
                    <p className="px-2 text-xs font-bold tracking-wider text-gray-400 uppercase mb-4">Admin Menu</p>
                    {navigation.map((item) => {
                        const active = isActive(item.href);
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                                    active 
                                    ? 'bg-primary/10 text-primary' 
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-dark'
                                }`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <Icon size={20} className={active ? 'text-primary' : 'text-gray-400'} />
                                {item.name}
                            </Link>
                        )
                    })}
                </div>

                <div className="p-4 border-t border-gray-200">
                    <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl font-medium text-red-600 hover:bg-red-50 transition-colors">
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen overflow-y-auto">
                {/* Top Header */}
                <header className="bg-white border-b border-gray-200 h-16 flex-shrink-0 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-30 sticky top-0">
                    <div className="flex items-center gap-4">
                        <button 
                            className="lg:hidden text-gray-500 hover:text-dark focus:outline-none" 
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <h1 className="text-xl font-display font-bold text-dark hidden sm:block">
                            {navigation.find(n => isActive(n.href))?.name || 'Dashboard'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-gray-400 hover:text-dark transition-colors rounded-full hover:bg-gray-100">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="w-px h-8 bg-gray-200 mx-1"></div>
                        <div className="flex items-center gap-3">
                            <div className="hidden md:block text-right tracking-tight">
                                <p className="text-sm font-bold text-dark leading-none">Admin User</p>
                                <p className="text-xs text-gray-500 mt-1">Superadmin</p>
                            </div>
                            <img 
                                src="https://i.pravatar.cc/150?u=admin" 
                                alt="Admin" 
                                className="w-9 h-9 rounded-full border border-gray-200"
                            />
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50/50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;

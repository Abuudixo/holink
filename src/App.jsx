import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

import Home from './pages/Home';
import Login from './pages/Login';
import ProductDetails from './pages/ProductDetails';
import RentHomes from './pages/RentHomes';
import Contacts from './pages/Contacts';

import Dashboard from './pages/admin/Dashboard';
import AdminListings from './pages/admin/AdminListings';

import { LanguageProvider } from './context/LanguageContext';
import { InterestProvider } from './context/InterestContext';
import { ListingsProvider } from './context/ListingsContext';

function App() {
    return (
        <LanguageProvider>
            <ListingsProvider>
                <InterestProvider>
                    <Router>
                        <Routes>
                            {/* Public Routes */}
                            <Route element={<PublicLayout />}>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/product/:id" element={<ProductDetails />} />
                                <Route path="/rentals" element={<RentHomes />} />
                                <Route path="/contacts" element={<Contacts />} />
                            </Route>

                            {/* Admin Routes */}
                            <Route path="/admin" element={<AdminLayout />}>
                                <Route index element={<Dashboard />} />
                                <Route path="listings" element={<AdminListings />} />
                            </Route>
                        </Routes>
                    </Router>
                </InterestProvider>
            </ListingsProvider>
        </LanguageProvider>
    );
}

export default App;


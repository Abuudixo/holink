import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductDetails from './pages/ProductDetails';
import RentHomes from './pages/RentHomes';
import Contacts from './pages/Contacts';

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/product/:id" element={<ProductDetails />} />
                        <Route path="/rentals" element={<RentHomes />} />
                        <Route path="/contacts" element={<Contacts />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}


export default App;


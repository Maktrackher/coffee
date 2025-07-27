import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import Toast from './components/Toast';
import BackToTop from './components/BackToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contacts from './pages/Contacts';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import LegalInfo from './pages/LegalInfo';
import AuthPage from './pages/Auth';
import Profile from './pages/Profile';
import ResetPassword from './pages/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Router>
          <AuthProvider>
            <CartProvider>
              <div className="min-h-screen bg-stone-50 flex flex-col">
                <Header />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={
                      <ProtectedRoute>
                        <Checkout />
                      </ProtectedRoute>
                    } />
                    <Route path="/about" element={<About />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<TermsOfService />} />
                    <Route path="/legal" element={<LegalInfo />} />
                    <Route path="/login" element={<AuthPage />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/profile" element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </main>
                <Footer />
              </div>
              <Toast />
              <BackToTop />
            </CartProvider>
          </AuthProvider>
        </Router>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { PurchaseSuccessPage } from './pages/PurchaseSuccessPage';
import { PurchaseErrorPage } from './pages/PurchaseErrorPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { LegalPage } from './pages/LegalPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100 bg-black text-white">
          <Header />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/categoria/:categoryName" element={<CategoryPage />} />
              <Route path="/producto/:id" element={<ProductDetailPage />} />
              <Route path="/carrito" element={<CartPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registro" element={<RegisterPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/compra-exitosa" element={<PurchaseSuccessPage />} />
              <Route path="/pago-fallido" element={<PurchaseErrorPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/nosotros" element={<AboutPage />} />
              <Route path="/quienes-somos" element={<AboutPage />} />
              <Route path="/contacto" element={<ContactPage />} />
              <Route path="/faqs" element={<FaqPage />} />
              <Route path="/terminos" element={<LegalPage title="Términos y Condiciones" />} />
              <Route path="/privacidad" element={<LegalPage title="Política de Privacidad" />} />
              <Route path="/politica-cookies" element={<LegalPage title="Política de Cookies" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
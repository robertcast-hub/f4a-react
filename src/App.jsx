// src/App.jsx
// Mapa de rutas de la aplicación (ver diagrama de navegación del ERS).
// El Router se monta en main.jsx para poder probar <App /> con MemoryRouter.
import { Route, Routes } from 'react-router-dom';
import { StoreLayout } from './components/layout/StoreLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { ScrollToTop } from './components/layout/ScrollToTop';

import { HomePage } from './pages/store/HomePage';
import { ProductsPage } from './pages/store/ProductsPage';
import { ProductDetailPage } from './pages/store/ProductDetailPage';
import { CategoriesPage } from './pages/store/CategoriesPage';
import { CategoryPage } from './pages/store/CategoryPage';
import { OffersPage } from './pages/store/OffersPage';
import { CartPage } from './pages/store/CartPage';
import { CheckoutPage } from './pages/store/CheckoutPage';
import { PurchaseResultPage } from './pages/store/PurchaseResultPage';
import { LoginPage } from './pages/store/LoginPage';
import { RegisterPage } from './pages/store/RegisterPage';
import { AboutPage } from './pages/store/AboutPage';
import { ContactPage } from './pages/store/ContactPage';
import { BlogsPage } from './pages/store/BlogsPage';
import { BlogDetailPage } from './pages/store/BlogDetailPage';
import { FaqPage } from './pages/store/FaqPage';
import { LegalPage } from './pages/store/LegalPage';
import { NotFoundPage } from './pages/store/NotFoundPage';

import { DashboardPage } from './pages/admin/DashboardPage';
import { OrdersPage } from './pages/admin/OrdersPage';
import { OrderDetailPage } from './pages/admin/OrderDetailPage';
import { ProductsAdminPage } from './pages/admin/ProductsAdminPage';
import { ProductShowPage } from './pages/admin/ProductShowPage';
import { ProductFormPage } from './pages/admin/ProductFormPage';
import { CriticalProductsPage } from './pages/admin/CriticalProductsPage';
import { ReportsPage } from './pages/admin/ReportsPage';
import { CategoriesAdminPage } from './pages/admin/CategoriesAdminPage';
import { CategoryFormPage } from './pages/admin/CategoryFormPage';
import { UsersAdminPage } from './pages/admin/UsersAdminPage';
import { UserShowPage } from './pages/admin/UserShowPage';
import { UserFormPage } from './pages/admin/UserFormPage';
import { ProfilePage } from './pages/admin/ProfilePage';

const App = () => (
  <>
    <ScrollToTop />
    <Routes>
      {/* ---------------- TIENDA (pública) ---------------- */}
      <Route element={<StoreLayout />}>
        <Route index element={<HomePage />} />
        <Route path="productos" element={<ProductsPage />} />
        <Route path="producto/:id" element={<ProductDetailPage />} />
        <Route path="categorias" element={<CategoriesPage />} />
        <Route path="categorias/:id" element={<CategoryPage />} />
        <Route path="ofertas" element={<OffersPage />} />
        <Route path="carrito" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="compra/exito/:orderId" element={<PurchaseResultPage success />} />
        <Route path="compra/error/:orderId" element={<PurchaseResultPage success={false} />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="registro" element={<RegisterPage />} />
        <Route path="nosotros" element={<AboutPage />} />
        <Route path="contacto" element={<ContactPage />} />
        <Route path="blogs" element={<BlogsPage />} />
        <Route path="blogs/:id" element={<BlogDetailPage />} />
        <Route path="faqs" element={<FaqPage />} />
        <Route path="terminos" element={<LegalPage title="Términos y condiciones" />} />
        <Route path="privacidad" element={<LegalPage title="Política de privacidad" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* ------------- ADMINISTRADOR (protegido) ------------- */}
      <Route
        path="admin"
        element={(
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        )}
      >
        <Route index element={<DashboardPage />} />
        <Route path="ordenes" element={<OrdersPage />} />
        <Route path="ordenes/:id" element={<OrderDetailPage />} />
        <Route path="productos" element={<ProductsAdminPage />} />
        <Route path="productos/nuevo" element={<ProductFormPage />} />
        <Route path="productos/criticos" element={<CriticalProductsPage />} />
        <Route path="productos/reportes" element={<ReportsPage inventory />} />
        <Route path="productos/:id" element={<ProductShowPage />} />
        <Route path="productos/:id/editar" element={<ProductFormPage />} />
        <Route path="categorias" element={<CategoriesAdminPage />} />
        <Route path="categorias/nueva" element={<CategoryFormPage />} />
        <Route path="categorias/:id/editar" element={<CategoryFormPage />} />
        <Route path="usuarios" element={<UsersAdminPage />} />
        <Route path="usuarios/nuevo" element={<UserFormPage />} />
        <Route path="usuarios/:id" element={<UserShowPage />} />
        <Route path="usuarios/:id/editar" element={<UserFormPage />} />
        <Route path="reportes" element={<ReportsPage />} />
        <Route path="perfil" element={<ProfilePage />} />
      </Route>
    </Routes>
  </>
);

export default App;

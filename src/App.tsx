import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ToastProvider from "./components/AdminComponents/ToastProvider";
import { CartProvider } from "./context/CartContext";
import { CartDropdownProvider } from "./hooks/useCartDropdown";
import About from './pages/About';
import Admin from "./pages/Admin";
import Catalog from "./pages/Catalog";
import Contact from './pages/Contact';
import { Flower } from './pages/Flower';
import Home from './pages/Home';
import Products from './pages/Products';

const App = () => {
  return (
    <Router>
      <div className="app">
        <CartDropdownProvider>
          <CartProvider>
            <ToastProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/flower/:flowerId" element={<Flower />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </ToastProvider>
          </CartProvider>
        </CartDropdownProvider>
      </div>
    </Router>
  );
};

export default App;

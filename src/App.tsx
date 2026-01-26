import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Products from './pages/Products';
import './styles/App.scss';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav>
      <Link to="/" className={isActive('/') ? 'active' : ''}>
        Главная
      </Link>
      <Link to="/products" className={isActive('/products') ? 'active' : ''}>
        Товары
      </Link>
      <Link to="/about" className={isActive('/about') ? 'active' : ''}>
        О нас
      </Link>
      <Link to="/contact" className={isActive('/contact') ? 'active' : ''}>
        Контакты
      </Link>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app">
        <header>
          <Navigation />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <footer>
          <p>&copy; 2026 Цветочный магазин. Все права защищены.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;

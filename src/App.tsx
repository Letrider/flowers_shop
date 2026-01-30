import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import { ROUTES } from "./types/routes";
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Products from './pages/Products';
import { Flower } from './pages/Flower';
import { Navbar } from './Components/Navbar/Navbar';
import './styles/App.scss';

const Navigation = () => {
  // const location = useLocation();

  // const isActive = (path: ROUTES) => location.pathname === path;

  return (
    <Navbar />
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
            <Route path="/flower/:flowerId" element={<Flower />} />
          </Routes>
        </main>
        {/* <footer>
          <p>&copy; 2026 Цветочный магазин. Все права защищены.</p>
        </footer> */}
      </div>
    </Router>
  );
};

export default App;

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import About from './pages/About';
import Admin from "./pages/Admin";
import Contact from './pages/Contact';
import { Flower } from './pages/Flower';
import Home from './pages/Home';
import Products from './pages/Products';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/flower/:flowerId" element={<Flower />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

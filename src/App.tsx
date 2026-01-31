import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import About from './pages/About';
import Contact from './pages/Contact';
import { Flower } from './pages/Flower';
import Home from './pages/Home';
import Products from './pages/Products';
import './styles/App.scss';

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
        </Routes>
      </div>
    </Router>
  );
};

export default App;

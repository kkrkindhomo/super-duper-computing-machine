import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home/Home';
import About from './components/About/About';
import logo from './assets/Logo/HornyHouswives-Enkel88-Logo.jpg';
import './App.css';

export default function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="nav-brand">
          <img src={logo} alt="Horny Housewives logo" />
          <span className="nav-brand-text">Horny Housewives</span>
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Horny Housewives · D-block Empire</span>
      </footer>
    </Router>
  );
}
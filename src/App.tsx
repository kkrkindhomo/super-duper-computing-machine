import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home/Home';
import About from './components/About/About';
import BigGL from './components/BigGL/BigGL';
import './App.css';

export default function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fbcfe8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
            <path d="M2 9h20" />
            <path d="M12 21V9" />
            <path d="M6 3l6 6" />
            <path d="M18 3l-6 6" />
          </svg>
          <div style={{ fontSize: '1.6rem' }}>
            <span style={{ fontWeight: '800', color: '#fbcfe8'}}>Horny </span>
            <span style={{ fontWeight: '800', color: '#ffffff' }}>Housewives</span>
          </div>
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/biggl">BigGL</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/biggl" element={<BigGL />} />
      </Routes>
    </Router>
  );
}
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import S1mple from './assets/pictures/S1mpleFAT.jpg'
import './App.css'; // Zorg dat de naam overeenkomt met jouw CSS bestand

// --- HOME PAGINA ---
const Home = () => {
  // Dit stukje geheugen onthoudt de likes, en we beginnen op 0
  const [likes, setLikes] = useState(0);

  return (
    <div className="page-container">
      <div className="hero">
        <h1>Welkom bij Horny Housewives!</h1>
        
        {/* Jouw afbeelding (zorg dat de naam 'S1mple' klopt met jouw import) */}
        <img className="S1mple" src={S1mple} alt="" style={{ width: '30%', height: 'auto', borderRadius: '8px' }} />
        
        {/* De Like Knop */}
        <div style={{ marginTop: '20px' }}>
          <button 
            onClick={() => setLikes(likes + 1)}
            style={{
              backgroundColor: '#ec4899',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '25px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.1s'
            }}
          >
            ❤️ {likes} Likes
          </button>
        </div>

      </div>
    </div>
  );
};
// --- ABOUT PAGINA ---
const About = () => (
  <div className="page-container">
    <div className="hero">
      <h1>Over Horny Housewives</h1>
      <p>
        Deze site is eigendom van het D-block empire.
      </p>
    </div>
  </div>
);


// --- HOOFD APPLICATIE ---
function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          {/* Glamorous Diamant SVG */}
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fbcfe8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
            <path d="M2 9h20" />
            <path d="M12 21V9" />
            <path d="M6 3l6 6" />
            <path d="M18 3l-6 6" />
          </svg>

          {/* Tweekleurige, stijlvolle tekst */}
          <div style={{ fontSize: '1.6rem' }}>
            <span style={{ fontWeight: '800', color: '#fbcfe8'}}>Horny </span>
            <span style={{ fontWeight: '800', color: '#ffffff' }}>Housewives</span>
          </div>
          
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
    </Router>
  );
}

export default App;

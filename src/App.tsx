import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import S1mple from './assets/pictures/S1mpleFAT.jpg'
import introduction from './assets/pictures/image.png'
import './App.css'; // Zorg dat de naam overeenkomt met jouw CSS bestand
import liamCasandera from './assets/vids/Hallo casandera van liam.mp4'
import liamDanst from './assets/vids/Liam danst.mp4'
import liamFooled from './assets/vids/Liam fooled the internet.mp4'
import liamVasthouden from './assets/vids/if you grab Liam.mp4'
import liamInvincible from './assets/vids/Liam invincible.mp4'
import liamScheid from './assets/vids/Liam scheiding.mp4'

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
        Deze site is eigendom van het <strong>D-block empire</strong>!
      </p>
      <br />
      <img src={introduction} alt="" />
    </div>
  </div>
);
// --- PINTEREST / BigGL PAGINA ---
const BigGL = () => {
  // Dit stukje onthoudt welk item is aangeklikt voor de pop-up
  const [geselecteerdItem, setGeselecteerdItem] = useState<any>(null);

  // Jouw makkelijke database
  const items = [
    {
      id: 1,
      titel: "Liam Wil een ontmoeting met Casandra. *GAAT FOUT*",
      beschrijving: "Is dit rizz chat?",
      media: liamCasandera, // Portret (hoog)
      type: "video" 
    },
    {
      id: 2,
      titel: "Liam heeft wel Moves.",
      beschrijving: "Dansen kan die",
      media: liamDanst, // Landschap (breed)
      type: "video" // Verander dit naar "video" als je hier een .mp4 link plaatst
    },
    {
      id: 3,
      titel: "Liam edit.",
      beschrijving: "Eerste edit",
      media: liamInvincible, // Landschap (breed)
      type: "video" // Verander dit naar "video" als je hier een .mp4 link plaatst
    },
    {
      id: 4,
      titel: "Liam fooled the internet for 7 days.",
      beschrijving: "Doet me denken aan DayZ.",
      media: liamFooled, // Landschap (breed)
      type: "video" // Verander dit naar "video" als je hier een .mp4 link plaatst
    },
    {
      id: 5,
      titel: "Het relatie stopt.",
      beschrijving: "Zo sad :(",
      media: liamScheid, // Landschap (breed)
      type: "video" // Verander dit naar "video" als je hier een .mp4 link plaatst
    },
    {
      id: 6,
      titel: "Liam over hem aanraken...",
      beschrijving: "Ik zou van hem blijven.",
      media: liamVasthouden, // Landschap (breed)
      type: "video" // Verander dit naar "video" als je hier een .mp4 link plaatst
    },
  ];

  return (
    <div className="page-container">
      <h1 style={{ marginBottom: '20px' }}>BigGL</h1>
      
      {/* De Pinterest Lay-out */}
      <div className="pinterest-grid">
        {items.map((item) => (
          <div key={item.id} className="pinterest-card" onClick={() => setGeselecteerdItem(item)}>
            {item.type === 'video' ? (
              // Als het een video is, tonen we hem zonder knoppen (als een bewegende foto)
              <video src={item.media} className="pinterest-media" muted autoPlay loop />
            ) : (
              // Als het een foto is
              <img src={item.media} alt={item.titel} className="pinterest-media" />
            )}
            <div className="pinterest-info">
              <h3>{item.titel}</h3>
              {/* Laat in het kleine kaartje alleen de eerste 50 tekens van de beschrijving zien */}
              <p>{item.beschrijving.substring(0, 50)}...</p>
            </div>
          </div>
        ))}
      </div>

      {/* De Pop-up (Modal) die opent als je ergens op klikt */}
      {geselecteerdItem && (
        <div className="modal-overlay" onClick={() => setGeselecteerdItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setGeselecteerdItem(null)}>×</button>
            
            <div className="modal-media-container">
              {geselecteerdItem.type === 'video' ? (
                // In de pop-up krijgt de video wel afspeelknoppen en geluid
                <video src={geselecteerdItem.media} controls autoPlay />
              ) : (
                <img src={geselecteerdItem.media} alt={geselecteerdItem.titel} />
              )}
            </div>
            
            <div className="modal-text">
              <h2 style={{ color: '#9d174d', marginTop: 0 }}>{geselecteerdItem.titel}</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#333' }}>
                {geselecteerdItem.beschrijving}
              </p>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

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
          <Link to="/biggl">BigGL</Link> {/* <-- Nieuwe link */}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/biggl" element={<BigGL />} /> {/* <-- Nieuwe route */}
      </Routes>
    </Router>
  );
}

export default App;

import { useState } from 'react';
import S1mple from '../../assets/pictures/S1mpleFAT.jpg';
import './Home.css';

export default function Home() {
  const [likes, setLikes] = useState(0);

  return (
    <div className="page-container">
      <div className="hero">
        <h1>Welkom bij Horny Housewives!</h1>
        
        <img className="S1mple" src={S1mple} alt="" style={{ width: '30%', height: 'auto', borderRadius: '8px' }} />
        
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
}
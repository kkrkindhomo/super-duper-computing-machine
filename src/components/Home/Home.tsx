import { useState } from 'react';
import S1mple from '../../assets/pictures/S1mpleFAT.jpg';
import './Home.css';

export default function Home() {
  const [likes, setLikes] = useState(0);

  return (
    <div className="page-container">
      <div className="hero">
        <h1>Welkom bij Horny Housewives</h1>
        <p>Een luxueuze ervaring, gesmeed in goud en roze.</p>

        <img className="S1mple" src={S1mple} alt="" style={{ width: '30%', height: 'auto', borderRadius: '12px' }} />

        <button className="like-button" onClick={() => setLikes(likes + 1)}>
          ❤️ {likes} Likes
        </button>
      </div>
    </div>
  );
}
import { useState } from 'react';
import liamCasandera from '../../assets/vids/Hallo casandera van liam.mp4';
import liamDanst from '../../assets/vids/Liam danst.mp4';
import liamFooled from '../../assets/vids/Liam fooled the internet.mp4';
import liamVasthouden from '../../assets/vids/if you grab Liam.mp4';
import liamInvincible from '../../assets/vids/Liam invincible.mp4';
import liamScheid from '../../assets/vids/Liam scheiding.mp4';
import './BigGL.css';

export default function BigGL() {
  const [geselecteerdItem, setGeselecteerdItem] = useState<any>(null);

  const items = [
    {
      id: 1,
      titel: "Liam Wil een ontmoeting met Casandra. *GAAT FOUT*",
      beschrijving: "Is dit rizz chat?",
      media: liamCasandera,
      type: "video" 
    },
    {
      id: 2,
      titel: "Liam heeft wel Moves.",
      beschrijving: "Dansen kan die",
      media: liamDanst,
      type: "video" 
    },
    {
      id: 3,
      titel: "Liam edit.",
      beschrijving: "Eerste edit",
      media: liamInvincible,
      type: "video" 
    },
    {
      id: 4,
      titel: "Liam fooled the internet for 7 days.",
      beschrijving: "Doet me denken aan DayZ.",
      media: liamFooled,
      type: "video" 
    },
    {
      id: 5,
      titel: "Het relatie stopt.",
      beschrijving: "Zo sad :(",
      media: liamScheid,
      type: "video" 
    },
    {
      id: 6,
      titel: "Liam over hem aanraken...",
      beschrijving: "Ik zou van hem blijven.",
      media: liamVasthouden,
      type: "video" 
    },
  ];

  return (
    <div className="page-container">
      <h1 style={{ marginBottom: '20px' }}>BigGL</h1>
      
      <div className="pinterest-grid">
        {items.map((item) => (
          <div key={item.id} className="pinterest-card" onClick={() => setGeselecteerdItem(item)}>
            {item.type === 'video' ? (
              <video src={item.media} className="pinterest-media" muted autoPlay loop />
            ) : (
              <img src={item.media} alt={item.titel} className="pinterest-media" />
            )}
            <div className="pinterest-info">
              <h3>{item.titel}</h3>
              <p>{item.beschrijving.substring(0, 50)}...</p>
            </div>
          </div>
        ))}
      </div>

      {geselecteerdItem && (
        <div className="modal-overlay" onClick={() => setGeselecteerdItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setGeselecteerdItem(null)}>×</button>
            
            <div className="modal-media-container">
              {geselecteerdItem.type === 'video' ? (
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
}
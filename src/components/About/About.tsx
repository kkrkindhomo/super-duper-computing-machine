import introduction from '../../assets/pictures/PieterIntro.png';
import './About.css';

export default function About() {
  return (
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
}
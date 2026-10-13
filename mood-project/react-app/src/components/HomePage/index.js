import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../store/session";
import { DEMO_USER } from "../auth/LoginForm";
import { Icon } from "../ui";
import { moodStyle } from "../../utils/moodColors";
import "./HomePage.css";

const PREVIEW_MOODS = [
  { name: "Uplifting", color: "red", songs: 24 },
  { name: "Nostalgic", color: "black", songs: 18 },
  { name: "Relaxed", color: "green", songs: 31 },
  { name: "Gloomy", color: "blue", songs: 12 },
  { name: "Epic", color: "purple", songs: 27 },
  { name: "Driving", color: "brown", songs: 15 },
];

const FEATURES = [
  {
    icon: "layers",
    title: "Moodlists",
    text: "Group songs by how they make you feel, each with its own color.",
  },
  {
    icon: "headphones",
    title: "Built-in player",
    text: "Press play on any song and keep listening while you browse.",
  },
  {
    icon: "search",
    title: "Instant search",
    text: "Find any song in your library by title or artist as you type.",
  },
];

const HomePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <main className="landing">
      <section className="container hero">
        <div className="hero__content">
          <p className="hero__badge">Music, organized by feeling</p>
          <h1 className="hero__title">
            Every song has a <span className="hero__highlight">mood</span>.
          </h1>
          <p className="hero__lead">
            Build moodlists for the way you feel — uplifting, nostalgic, gloomy,
            epic — and play them all in one place.
          </p>
          <div className="hero__actions">
            <Link to="/sign-up" className="btn btn--primary btn--lg">
              Get started — it's free
            </Link>
            <button
              className="btn btn--secondary btn--lg"
              onClick={() => dispatch(login(DEMO_USER.email, DEMO_USER.password))}
            >
              Try the demo
            </button>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          {PREVIEW_MOODS.map((mood) => (
            <div key={mood.name} className="hero__tile mood-gradient" style={moodStyle(mood.color)}>
              <span className="hero__tile-name">{mood.name}</span>
              <span className="hero__tile-count">{mood.songs} songs</span>
            </div>
          ))}
        </div>
      </section>

      <section className="container features">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="feature">
            <span className="feature__icon">
              <Icon name={feature.icon} size={20} />
            </span>
            <h2 className="feature__title">{feature.title}</h2>
            <p className="feature__text">{feature.text}</p>
          </div>
        ))}
      </section>

      <footer className="footer">
        <div className="container footer__inner">
          <span>Created by Matthew Satterwhite</span>
          <nav className="footer__links">
            <a href="https://github.com/MatthewSatt" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/matthew-satterwhite-008970211/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
};

export default HomePage;

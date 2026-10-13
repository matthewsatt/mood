import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { usePlayer } from "../../context/Player";
import { Artwork, Icon } from "../ui";
import "./PlayerBar.css";

const ICONS = {
  play: <Icon name="play" size={18} />,
  pause: <Icon name="pause" size={18} />,
  volume: <Icon name="volume" size={18} />,
  volumeMute: <Icon name="mute" size={18} />,
};

// The "now playing" bar pinned to the bottom of the screen
export default function PlayerBar() {
  const { current, playerRef, setIsPlaying, stop } = usePlayer();
  const moodlists = useSelector((state) => state.moodlists);
  const [failed, setFailed] = useState(false);
  const src = current && current.song_url;

  useEffect(() => setFailed(false), [src]);

  if (!current) return null;

  const mood = moodlists.find((m) => m.id === current.moodlistId);

  return (
    <div className="player-bar" role="region" aria-label="Now playing">
      <Link to={`/songs/${current.id}`} className="player-bar__song">
        <Artwork song={current} color={mood && mood.color} className="player-bar__art" />
        <div className="player-bar__meta">
          <span className="player-bar__title">{current.name}</span>
          <span className={`player-bar__artist ${failed ? "player-bar__artist--error" : ""}`}>
            {failed ? "Couldn't load this song" : current.artist}
          </span>
        </div>
      </Link>

      <AudioPlayer
        ref={playerRef}
        src={src}
        autoPlay
        className="player-bar__audio"
        layout="stacked-reverse"
        showJumpControls={false}
        customAdditionalControls={[]}
        customIcons={ICONS}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onError={() => setFailed(true)}
      />

      <div className="player-bar__end">
        <button className="icon-btn" onClick={stop} aria-label="Close player">
          <Icon name="close" />
        </button>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { loadMoodSongs, removeMoodSong } from "../../store/songs";
import { loadUserMoods } from "../../store/moodlist";
import { usePlayer } from "../../context/Player";
import { useToast } from "../../context/Toast";
import { ConfirmModal, Icon, Rating } from "../ui";
import { moodStyle } from "../../utils/moodColors";
import SongFormModal from "./SongFormModal";
import "./Songs.css";

const songCountLabel = (count) => `${count} ${count === 1 ? "song" : "songs"}`;

const Equalizer = () => (
  <span className="equalizer" aria-label="Now playing">
    <span />
    <span />
    <span />
  </span>
);

const Songs = () => {
  const dispatch = useDispatch();
  const showToast = useToast();
  const { current, isPlaying, toggle, songRemoved } = usePlayer();
  const moodlistId = Number(useParams().moodId);
  const songs = useSelector((state) => state.songs);
  const mood = useSelector((state) => state.moodlists.find((m) => m.id === moodlistId));
  const [status, setStatus] = useState("loading");
  // null = closed, {} = adding, a song = editing it
  const [formSong, setFormSong] = useState(null);
  const [deletingSong, setDeletingSong] = useState(null);

  useEffect(() => {
    let active = true;
    setStatus("loading");
    Promise.all([dispatch(loadMoodSongs(moodlistId)), dispatch(loadUserMoods())]).then(
      ([{ errors }]) => active && setStatus(errors ? "notfound" : "ready")
    );
    return () => {
      active = false;
    };
  }, [dispatch, moodlistId]);

  const handleDelete = async () => {
    const { errors } = await dispatch(removeMoodSong(deletingSong.id));
    if (!errors) songRemoved(deletingSong.id);
    setDeletingSong(null);
    showToast(errors ? errors[0] : `Removed “${deletingSong.name}”`);
  };

  if (status === "loading") {
    return <div className="spinner" role="status" aria-label="Loading songs" />;
  }

  if (status === "notfound" || !mood) {
    return (
      <main className="page">
        <div className="container">
          <div className="empty-state">
            <h2>Moodlist not found</h2>
            <p>It may have been deleted, or it belongs to someone else.</p>
            <Link to="/" className="btn btn--secondary">Back to your moods</Link>
          </div>
        </div>
      </main>
    );
  }

  // Newest first, so a song you just added shows up at the top
  const ordered = [...songs].reverse();
  const firstPlayable = ordered.find((song) => song.song_url);

  return (
    <main className="page">
      <div className="container">
        <Link to="/" className="back-link">
          <Icon name="arrowLeft" size={16} />
          All moods
        </Link>

        <header className="mood-hero mood-gradient" style={moodStyle(mood.color)}>
          <p className="mood-hero__eyebrow">Moodlist</p>
          <h1 className="mood-hero__title">{mood.name}</h1>
          <p className="mood-hero__meta">{songCountLabel(songs.length)}</p>
        </header>

        <div className="toolbar">
          <button
            className="toolbar__play"
            onClick={() => toggle(firstPlayable)}
            disabled={!firstPlayable}
            aria-label={`Play ${mood.name}`}
          >
            <Icon name="play" size={22} />
          </button>
          <button className="btn btn--secondary" onClick={() => setFormSong({})}>
            <Icon name="plus" size={16} />
            Add song
          </button>
        </div>

        {songs.length === 0 ? (
          <div className="empty-state">
            <span className="empty-state__icon">
              <Icon name="music" size={24} />
            </span>
            <h2>This mood is empty</h2>
            <p>Add a song that fits the feeling.</p>
            <button className="btn btn--primary" onClick={() => setFormSong({})}>
              <Icon name="plus" size={16} />
              Add song
            </button>
          </div>
        ) : (
          <>
            <div className="song-list__head" aria-hidden="true">
              <span>#</span>
              <span>Title</span>
              <span>Rating</span>
              <span />
            </div>
            <ol className="song-list">
              {ordered.map((song, i) => {
                const isCurrent = current && current.id === song.id;
                const showPause = isCurrent && isPlaying;
                return (
                  <li key={song.id} className={`song-row ${isCurrent ? "song-row--current" : ""}`}>
                    <div className="song-row__index">
                      <span className="song-row__number">{showPause ? <Equalizer /> : i + 1}</span>
                      <button
                        className="song-row__play"
                        onClick={() => toggle(song)}
                        disabled={!song.song_url}
                        aria-label={`${showPause ? "Pause" : "Play"} ${song.name}`}
                        title={song.song_url ? undefined : "No audio link"}
                      >
                        <Icon name={showPause ? "pause" : "play"} size={14} />
                      </button>
                    </div>
                    <div className="song-row__main">
                      <Link to={`/songs/${song.id}`} className="song-row__title">
                        {song.name}
                      </Link>
                      <span className="song-row__artist">
                        {song.artist}
                        {!song.song_url && <span className="song-row__badge">No audio</span>}
                      </span>
                    </div>
                    <Rating value={song.rating} />
                    <div className="song-row__actions">
                      <button
                        className="icon-btn"
                        onClick={() => setFormSong(song)}
                        aria-label={`Edit ${song.name}`}
                        title="Edit"
                      >
                        <Icon name="edit" size={16} />
                      </button>
                      <button
                        className="icon-btn icon-btn--danger"
                        onClick={() => setDeletingSong(song)}
                        aria-label={`Delete ${song.name}`}
                        title="Delete"
                      >
                        <Icon name="trash" size={16} />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ol>
          </>
        )}
      </div>

      {formSong && (
        <SongFormModal
          song={formSong.id ? formSong : null}
          moodlistId={moodlistId}
          onClose={() => setFormSong(null)}
        />
      )}

      {deletingSong && (
        <ConfirmModal
          title="Remove song?"
          message={
            <>
              <strong>{deletingSong.name}</strong> will be removed from {mood.name}.
            </>
          }
          confirmLabel="Remove"
          onConfirm={handleDelete}
          onClose={() => setDeletingSong(null)}
        />
      )}
    </main>
  );
};

export default Songs;

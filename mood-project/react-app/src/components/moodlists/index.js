import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadUserMoods, deleteMoodlist } from "../../store/moodlist";
import { useToast } from "../../context/Toast";
import { ConfirmModal, Icon } from "../ui";
import { moodStyle } from "../../utils/moodColors";
import MoodFormModal from "./MoodFormModal";
import "./moodlists.css";

const songCountLabel = (count = 0) => `${count} ${count === 1 ? "song" : "songs"}`;

const Moodlists = () => {
  const dispatch = useDispatch();
  const showToast = useToast();
  const moodlists = useSelector((state) => state.moodlists);
  const user = useSelector((state) => state.session.user);
  const [loading, setLoading] = useState(true);
  // null = closed, {} = creating, a moodlist = editing it
  const [formMood, setFormMood] = useState(null);
  const [deletingMood, setDeletingMood] = useState(null);

  useEffect(() => {
    dispatch(loadUserMoods()).then(() => setLoading(false));
  }, [dispatch]);

  const handleDelete = async () => {
    const { errors } = await dispatch(deleteMoodlist(deletingMood.id));
    setDeletingMood(null);
    showToast(errors ? errors[0] : `Deleted “${deletingMood.name}”`);
  };

  return (
    <main className="page">
      <div className="container">
        <header className="page-header">
          <div>
            <p className="eyebrow">Your library</p>
            <h1 className="page-title">{user.username}'s moods</h1>
            {!loading && (
              <p className="page-subtitle">
                {moodlists.length} {moodlists.length === 1 ? "moodlist" : "moodlists"}
              </p>
            )}
          </div>
          <button className="btn btn--primary" onClick={() => setFormMood({})}>
            <Icon name="plus" size={16} />
            New mood
          </button>
        </header>

        {loading ? (
          <div className="spinner" role="status" aria-label="Loading moods" />
        ) : moodlists.length === 0 ? (
          <div className="empty-state">
            <span className="empty-state__icon">
              <Icon name="layers" size={24} />
            </span>
            <h2>No moods yet</h2>
            <p>Create your first moodlist to start organizing songs by feeling.</p>
            <button className="btn btn--primary" onClick={() => setFormMood({})}>
              <Icon name="plus" size={16} />
              New mood
            </button>
          </div>
        ) : (
          <ul className="mood-grid">
            {moodlists.map((mood) => (
              <li key={mood.id} className="mood-card mood-gradient" style={moodStyle(mood.color)}>
                <Link to={`/moodlists/${mood.id}`} className="mood-card__link">
                  <Icon name="music" size={20} className="mood-card__icon" />
                  <span className="mood-card__name">{mood.name}</span>
                  <span className="mood-card__count">{songCountLabel(mood.songCount)}</span>
                </Link>
                <div className="mood-card__actions">
                  <button
                    className="mood-card__action"
                    onClick={() => setFormMood(mood)}
                    aria-label={`Edit ${mood.name}`}
                    title="Edit"
                  >
                    <Icon name="edit" size={16} />
                  </button>
                  <button
                    className="mood-card__action"
                    onClick={() => setDeletingMood(mood)}
                    aria-label={`Delete ${mood.name}`}
                    title="Delete"
                  >
                    <Icon name="trash" size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {formMood && (
        <MoodFormModal mood={formMood.id ? formMood : null} onClose={() => setFormMood(null)} />
      )}

      {deletingMood && (
        <ConfirmModal
          title="Delete mood?"
          message={
            <>
              <strong>{deletingMood.name}</strong> and its{" "}
              {songCountLabel(deletingMood.songCount)} will be permanently deleted.
            </>
          }
          onConfirm={handleDelete}
          onClose={() => setDeletingMood(null)}
        />
      )}
    </main>
  );
};

export default Moodlists;

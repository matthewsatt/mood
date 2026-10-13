import React, { useEffect, useState } from "react";
import { Modal } from "../../context/Modal";
import { MOOD_COLORS, moodStyle } from "../../utils/moodColors";
import Icon from "./Icon";
import "./ui.css";

export { Icon };

export const Wordmark = ({ className = "" }) => (
  <span className={`wordmark ${className}`} aria-label="mood">
    <span>m</span>
    <span>o</span>
    <span>o</span>
    <span>d</span>
  </span>
);

export const Rating = ({ value }) => (
  <span className="rating" title={`Rated ${value} out of 10`}>
    <Icon name="star" size={14} />
    {value}
    <span className="rating__max">/10</span>
  </span>
);

// Cover image, or a mood-colored tile when there is none (or it fails to load)
export function Artwork({ song, color, className = "" }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [song.song_image]);

  if (song.song_image && !failed) {
    return (
      <img
        className={`artwork ${className}`}
        src={song.song_image}
        alt=""
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    <div className={`artwork artwork--placeholder mood-gradient ${className}`} style={moodStyle(color)}>
      <Icon name="music" />
    </div>
  );
}

export const FormErrors = ({ errors }) =>
  errors.length > 0 ? (
    <ul className="form-errors" role="alert">
      {errors.map((error) => (
        <li key={error}>{error}</li>
      ))}
    </ul>
  ) : null;

export function ColorPicker({ value, onChange }) {
  return (
    <div className="color-picker" role="radiogroup" aria-label="Color">
      {MOOD_COLORS.map((color) => (
        <label key={color.value} className="color-picker__option">
          <input
            type="radio"
            name="mood-color"
            className="visually-hidden"
            value={color.value}
            checked={value === color.value}
            onChange={() => onChange(color.value)}
          />
          <span className="color-picker__swatch mood-gradient" style={moodStyle(color.value)} />
          <span className="color-picker__label">{color.label}</span>
        </label>
      ))}
    </div>
  );
}

// "Are you sure?" dialog for destructive actions. onConfirm may be async.
export function ConfirmModal({ title, message, confirmLabel = "Delete", onConfirm, onClose }) {
  const [busy, setBusy] = useState(false);

  const handleConfirm = async () => {
    setBusy(true);
    await onConfirm();
    setBusy(false);
  };

  return (
    <Modal title={title} onClose={onClose} size="sm">
      <p className="confirm__message">{message}</p>
      <div className="form-actions">
        <button className="btn btn--secondary" onClick={onClose} disabled={busy}>
          Cancel
        </button>
        <button className="btn btn--danger" onClick={handleConfirm} disabled={busy} autoFocus>
          <Icon name="trash" size={16} />
          {busy ? "Deleting…" : confirmLabel}
        </button>
      </div>
    </Modal>
  );
}

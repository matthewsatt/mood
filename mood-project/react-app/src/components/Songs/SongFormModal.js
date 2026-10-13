import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "../../context/Modal";
import { usePlayer } from "../../context/Player";
import { useToast } from "../../context/Toast";
import { addSong, editSong } from "../../store/songs";
import { FormErrors, Rating } from "../ui";

const MAX_LENGTH = 40;
const isUrl = (value) => /^https?:\/\/\S+$/i.test(value);

const validate = ({ name, artist, song_url, song_image }) => {
  const errors = [];
  if (!name.trim()) errors.push("Give the song a title.");
  if (name.trim().length > MAX_LENGTH) errors.push(`Title must be ${MAX_LENGTH} characters or fewer.`);
  if (!artist.trim()) errors.push("Add the artist.");
  if (artist.trim().length > MAX_LENGTH) errors.push(`Artist must be ${MAX_LENGTH} characters or fewer.`);
  if (song_url.trim() && !isUrl(song_url.trim())) errors.push("Audio link must start with http:// or https://");
  if (song_image.trim() && !isUrl(song_image.trim())) errors.push("Cover image link must start with http:// or https://");
  return errors;
};

// Adds a song to `moodlistId`, or edits `song` when one is passed
export default function SongFormModal({ song, moodlistId, onClose }) {
  const dispatch = useDispatch();
  const showToast = useToast();
  const { songChanged } = usePlayer();
  const [values, setValues] = useState({
    name: song ? song.name : "",
    artist: song ? song.artist : "",
    rating: song ? song.rating : 7,
    song_url: (song && song.song_url) || "",
    song_image: (song && song.song_image) || "",
  });
  const [errors, setErrors] = useState([]);
  const [busy, setBusy] = useState(false);

  const update = (field) => (e) => setValues({ ...values, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clientErrors = validate(values);
    setErrors(clientErrors);
    if (clientErrors.length) return;

    setBusy(true);
    const payload = {
      name: values.name.trim(),
      artist: values.artist.trim(),
      rating: Number(values.rating),
      song_url: values.song_url.trim(),
      song_image: values.song_image.trim(),
      moodlistId,
    };
    const result = song
      ? await dispatch(editSong({ ...payload, id: song.id }))
      : await dispatch(addSong(payload));

    if (result.errors) {
      setErrors(result.errors);
      setBusy(false);
      return;
    }
    if (song) songChanged(result.data);
    showToast(song ? "Song updated" : `Added “${payload.name}”`);
    onClose();
  };

  return (
    <Modal title={song ? "Edit song" : "Add song"} onClose={onClose}>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <FormErrors errors={errors} />

        <label className="field">
          <span className="field__label">Title</span>
          <input className="input" value={values.name} onChange={update("name")} autoFocus />
        </label>

        <label className="field">
          <span className="field__label">Artist</span>
          <input className="input" value={values.artist} onChange={update("artist")} />
        </label>

        <label className="field">
          <span className="field__label">Rating</span>
          <div className="range">
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={values.rating}
              onChange={update("rating")}
              style={{ "--fill": `${((values.rating - 1) / 9) * 100}%` }}
            />
            <span className="range__value">
              <Rating value={values.rating} />
            </span>
          </div>
        </label>

        <label className="field">
          <span className="field__label">Audio link</span>
          <input
            className="input"
            type="url"
            placeholder="https://… .mp3"
            value={values.song_url}
            onChange={update("song_url")}
          />
          <span className="field__hint">Optional. A direct link to an .mp3 or .mp4 file.</span>
        </label>

        <label className="field">
          <span className="field__label">Cover image link</span>
          <input
            className="input"
            type="url"
            placeholder="https://… .jpg"
            value={values.song_image}
            onChange={update("song_image")}
          />
          <span className="field__hint">Optional.</span>
        </label>

        <div className="form-actions">
          <button type="button" className="btn btn--secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn--primary" disabled={busy}>
            {song ? "Save changes" : "Add song"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "../../context/Modal";
import { useToast } from "../../context/Toast";
import { addMoodList, editMoodlist } from "../../store/moodlist";
import { ColorPicker, FormErrors } from "../ui";
import { moodStyle } from "../../utils/moodColors";

const MAX_NAME = 40;

// Creates a moodlist, or edits `mood` when one is passed
export default function MoodFormModal({ mood, onClose }) {
  const dispatch = useDispatch();
  const showToast = useToast();
  const [name, setName] = useState(mood ? mood.name : "");
  const [color, setColor] = useState(mood ? mood.color : "red");
  const [errors, setErrors] = useState([]);
  const [busy, setBusy] = useState(false);

  const trimmed = name.trim();
  const tooLong = trimmed.length > MAX_NAME;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!trimmed || tooLong) return;

    setBusy(true);
    const payload = { name: trimmed, color };
    const result = mood
      ? await dispatch(editMoodlist({ ...payload, id: mood.id }))
      : await dispatch(addMoodList(payload));

    if (result.errors) {
      setErrors(result.errors);
      setBusy(false);
      return;
    }
    showToast(mood ? "Mood updated" : `Created “${trimmed}”`);
    onClose();
  };

  return (
    <Modal title={mood ? "Edit mood" : "New mood"} onClose={onClose}>
      <form className="form" onSubmit={handleSubmit}>
        <div className="mood-preview mood-gradient" style={moodStyle(color)}>
          <span className="mood-preview__name">{trimmed || "Untitled mood"}</span>
        </div>

        <FormErrors errors={errors} />

        <label className="field">
          <span className="field__label">Name</span>
          <input
            className="input"
            placeholder="e.g. Late-night drive"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={tooLong}
            autoFocus
          />
          <span className="field__hint">
            {tooLong ? `${trimmed.length}/${MAX_NAME} — that's too long` : `${trimmed.length}/${MAX_NAME}`}
          </span>
        </label>

        <div className="field">
          <span className="field__label">Color</span>
          <ColorPicker value={color} onChange={setColor} />
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn--secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn--primary" disabled={!trimmed || tooLong || busy}>
            {mood ? "Save changes" : "Create mood"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

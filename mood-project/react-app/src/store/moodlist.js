import { request } from "./api";

const LOAD_MOODLISTS = "moodlists/LOAD_MOODLISTS";
const ADD_MOODLIST = "moodlists/ADD_MOODLIST";
const EDIT_MOODLIST = "moodlists/EDIT_MOODLIST";
const REMOVE_MOODLIST = "moodlists/REMOVE_MOODLIST";

const loadMoods = (moodlists) => ({ type: LOAD_MOODLISTS, moodlists });
const addMood = (mood) => ({ type: ADD_MOODLIST, mood });
const editMood = (mood) => ({ type: EDIT_MOODLIST, mood });
const removeMood = (id) => ({ type: REMOVE_MOODLIST, id });

// Every thunk resolves to { data } on success or { errors } on failure

export const loadUserMoods = () => async (dispatch) => {
  const result = await request("/api/moodlists/");
  if (result.data) dispatch(loadMoods(result.data));
  return result;
};

export const addMoodList = (mood) => async (dispatch) => {
  const result = await request("/api/moodlists/new", { method: "POST", body: mood });
  if (result.data) dispatch(addMood(result.data.mood));
  return result;
};

export const editMoodlist = (mood) => async (dispatch) => {
  const result = await request("/api/moodlists/edit", { method: "PUT", body: mood });
  if (result.data) dispatch(editMood(result.data));
  return result;
};

export const deleteMoodlist = (id) => async (dispatch) => {
  const result = await request(`/api/moodlists/${id}/delete`, { method: "DELETE" });
  if (result.data) dispatch(removeMood(id));
  return result;
};

const initialState = [];

export default function moodlistReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_MOODLISTS:
      return action.moodlists;
    case ADD_MOODLIST:
      return [...state, { songCount: 0, ...action.mood }];
    case EDIT_MOODLIST:
      return state.map((mood) =>
        mood.id === action.mood.id ? { ...mood, ...action.mood } : mood
      );
    case REMOVE_MOODLIST:
      return state.filter((mood) => mood.id !== action.id);
    default:
      return state;
  }
}

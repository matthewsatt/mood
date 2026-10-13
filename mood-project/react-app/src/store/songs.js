import { request } from "./api";

const LOAD_SONGS = "songs/LOAD_SONGS";
const ADD_SONG = "songs/ADD_SONG";
const EDIT_SONG = "songs/EDIT_SONG";
const REMOVE_SONG = "songs/REMOVE_SONG";

const loadSongs = (songs) => ({ type: LOAD_SONGS, songs });
const addS = (song) => ({ type: ADD_SONG, song });
const editS = (song) => ({ type: EDIT_SONG, song });
const removeS = (id) => ({ type: REMOVE_SONG, id });

// Every thunk resolves to { data } on success or { errors } on failure

export const loadMoodSongs = (moodlistId) => async (dispatch) => {
  const result = await request(`/api/songs/moodlists/${moodlistId}`);
  dispatch(loadSongs(result.data || []));
  return result;
};

export const getOneSong = (songId) => () => request(`/api/songs/one/${songId}`);

// All of the current user's songs, for the search bar
export const searchSongs = () => () => request("/api/songs/search");

export const addSong = (song) => async (dispatch) => {
  const result = await request("/api/songs/new", { method: "POST", body: song });
  if (result.data) dispatch(addS(result.data));
  return result;
};

export const editSong = (song) => async (dispatch) => {
  const result = await request("/api/songs/edit", { method: "PUT", body: song });
  if (result.data) dispatch(editS(result.data));
  return result;
};

export const removeMoodSong = (songId) => async (dispatch) => {
  const result = await request(`/api/songs/delete/${songId}`, { method: "DELETE" });
  if (result.data) dispatch(removeS(songId));
  return result;
};

const initialState = [];

export default function songReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SONGS:
      return action.songs;
    case ADD_SONG:
      return [...state, action.song];
    case EDIT_SONG:
      return state.map((song) => (song.id === action.song.id ? action.song : song));
    case REMOVE_SONG:
      return state.filter((song) => song.id !== action.id);
    default:
      return state;
  }
}

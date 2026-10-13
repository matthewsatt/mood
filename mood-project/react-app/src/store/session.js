import { request } from "./api";

// constants
const SET_USER = 'session/SET_USER';
export const REMOVE_USER = 'session/REMOVE_USER';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const { data } = await request('/api/auth/');
  if (data && !data.errors) {
    dispatch(setUser(data));
  }
}

// login and signUp resolve to null on success, or a list of error messages
export const login = (email, password) => async (dispatch) => {
  const { data, errors } = await request('/api/auth/login', {
    method: 'POST',
    body: { email, password },
  });
  if (errors) return errors;
  dispatch(setUser(data));
  return null;
}

export const logout = () => async (dispatch) => {
  const { errors } = await request('/api/auth/logout');
  if (!errors) {
    dispatch(removeUser());
  }
};

export const signUp = (username, email, password) => async (dispatch) => {
  const { data, errors } = await request('/api/auth/signup', {
    method: 'POST',
    body: { username, email, password },
  });
  if (errors) return errors;
  dispatch(setUser(data));
  return null;
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    default:
      return state;
  }
}

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  idToken: '',
  user: {
    email: '',
    familyName: '',
    givenName: '',
    id: '',
    name: '',
    photo: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setIdToken: (state, action) => {
      state.idToken = action.payload.idToken;
    },
    setUserInfo: (state, action) => {
      state.user = action.payload.user;
    },
    logout: (state, action) => {
      state.idToken = '';
      state = initialState;
    },
  },
});

export const setIdToken = userSlice.actions.setIdToken;
export const setUserInfo = userSlice.actions.setUserInfo;
export const logout = userSlice.actions.logout;

export default userSlice;

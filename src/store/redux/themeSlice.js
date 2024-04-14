import {createSlice} from '@reduxjs/toolkit';

import {THEMES} from '../../constants/AppColors';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: THEMES.LIGHT,
    defaultTheme: THEMES.LIGHT,
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload.theme;
    },
    resetTheme: (state, action) => {
      state.theme = state.defaultTheme;
    },
  },
});

export const setTheme = themeSlice.actions.setTheme;
export const resetTheme = themeSlice.actions.resetTheme;

export default themeSlice;

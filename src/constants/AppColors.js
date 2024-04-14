export const THEMES = {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
};

const THEME_COLORS = {
  LIGHT: {
    PRIMARY: '#5790DF',
    PRIMARY_LIGHT: '#95B8E8',
    PRIMARY_DARK: '#093D89',
    SECONDARY: '#E6EEFA',
    DARK_FILL: '#6C7A9C',
    BUTTON_FILL: '#E9E9EB',
    BODY: '#FFFFFF',
    BLACK: 'black',
    WHITE: 'white',
    LIGHT_GREY: '#D3D3D3',
    GRAY: 'gray',
  },
  DARK: {
    PRIMARY: '#345B99',
    PRIMARY_LIGHT: '#7586A0',
    PRIMARY_DARK: '#042B5B',
    SECONDARY: '#B3C6E5',
    DARK_FILL: '#505D76',
    BUTTON_FILL: '#D4D4D6',
    BODY: '#000000',
    BLACK: 'black',
    WHITE: 'white',
    LIGHT_GREY: '#D3D3D3',
    GRAY: 'gray',
  },
};

export const AppColors = (theme = THEMES.LIGHT) => {
  return THEME_COLORS[theme] || THEME_COLORS.LIGHT;
};

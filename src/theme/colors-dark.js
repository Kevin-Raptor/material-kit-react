import { alpha } from '@mui/material/styles';

const withAlphas = (color) => {
  return {
    ...color,
    alpha4: alpha(color.main, 0.04),
    alpha8: alpha(color.main, 0.08),
    alpha12: alpha(color.main, 0.12),
    alpha30: alpha(color.main, 0.30),
    alpha50: alpha(color.main, 0.50)
  };
};

export const neutral = {
  50: '#F8F9FA',
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D2D6DB',
  400: '#9DA4AE',
  500: '#6C737F',
  600: '#4D5761',
  700: '#2F3746',
  800: '#1C2536',
  900: '#111927'
};

export const indigo = withAlphas({
  lightest: '#BAC3FF',
  light: '#848CFF',
  main: '#5659F0',
  dark: '#2C2FB5',
  darkest: '#151775',
  contrastText: '#FFFFFF'
});

export const success = withAlphas({
  lightest: '#E9F5EC',
  light: '#B6E2C8',
  main: '#5DF5B0',
  dark: '#259E70',
  darkest: '#124734',
  contrastText: '#FFFFFF'
});

export const info = withAlphas({
  lightest: '#9ED4C4',
  light: '#59AB92',
  main: '#188B68',
  dark: '#0B5642',
  darkest: '#052D21',
  contrastText: '#FFFFFF'
});

export const warning = withAlphas({
  lightest: '#FFFAEB',
  light: '#FEF0C7',
  main: '#F79009',
  dark: '#B54708',
  darkest: '#7A2E0E',
  contrastText: '#FFFFFF'
});

export const error = withAlphas({
  lightest: '#FEF3F2',
  light: '#FEE4E2',
  main: '#F04438',
  dark: '#B42318',
  darkest: '#7A271A',
  contrastText: '#FFFFFF'
});
export const primary = withAlphas({
  lightest: '#FF0000',
  light: '#FF0000',
  main: '#FF0000',
  dark: '#FF0000',
  darkest: '#FF0000',
  contrastText: '#FF0000'
});

export const secondary = withAlphas({
  lightest: '#E9F5EC',
  light: '#B6E2C8',
  main: '#5DF5B0',
  dark: '#259E70',
  darkest: '#124734',
  contrastText: '#FFFFFF'
});

export const tertiary = withAlphas({
  lightest: '#9ED4C4',
  light: '#59AB92',
  main: '#188B68',
  dark: '#0B5642',
  darkest: '#052D21',
  contrastText: '#FFFFFF'
});

export const background = {
  default: '#141414',
  paper: '#141414'
};

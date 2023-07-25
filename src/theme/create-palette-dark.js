import { common } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';
import { error, indigo, info, neutral, primary, secondary, success, tertiary, warning, background } from './colors-dark';

export function createDarkPalette() {
  return {
    action: {
      active: neutral[500],
      disabled: alpha(neutral[900], 0.38),
      disabledBackground: alpha(neutral[900], 0.12),
      focus: alpha(neutral[900], 0.16),
      hover: alpha(neutral[900], 0.04),
      selected: alpha(neutral[900], 0.12)
    },
    background: {
      default: background.default,
      paper: background.paper
    },
    divider: '#F2F4F7',
    error,
    info,
    mode: 'light',
    neutral,
    primary,
    secondary,
    success,
    tertiary,
    text: {
      primary: neutral[900],
      secondary: neutral[500],
      disabled: alpha(neutral[900], 0.38)
    },
    warning
  };
}

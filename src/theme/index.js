import { createTheme as createMuiTheme } from '@mui/material';
import { createPalette,createPaletteDark } from './create-palette';
import { createComponents } from './create-components';
import { createShadows } from './create-shadows';
import { createTypography } from './create-typography';

export function createTheme() {
  const palette = createPalette();
  const darkPalette = createPaletteDark();
  const components = createComponents({ palette });
  const shadows = createShadows();
  const typography = createTypography();

  return createMuiTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1440
      }
    },
    components,
    darkPalette,
    shadows,
    shape: {
      borderRadius: 8
    },
    typography
  });
}

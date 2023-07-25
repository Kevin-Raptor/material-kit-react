import { createTheme as createMuiTheme } from '@mui/material';
import { createPalette } from './create-palette';
import { createDarkPalette } from './create-palette-dark';
import { createComponents } from './create-components';
import { createShadows } from './create-shadows';
import { createTypography } from './create-typography';

export function createTheme() {
  const palette = createPalette();
  const darkPalette = createDarkPalette();
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
    palette,
    // darkPalette,
    shadows,
    shape: {
      borderRadius: 8
    },
    typography
  });
}

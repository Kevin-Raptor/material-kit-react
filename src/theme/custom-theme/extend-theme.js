
import {unstable_createGetCssVar as systemCreateGetCssVar,unstable_prepareCssVars as prepareCssVars,}
from '@mui/system';

const lightColorScheme = {
    palette: {
      mode: 'light',
      primary: {
        default: '#3990FF',
        dark: '#02367D',
      },
      text: {
        default: '#111111',
      },
      // ... other colors
    },
  };

  const darkColorScheme = {
    palette: {
      mode: 'dark',
      primary: {
        default: '#265D97',
        dark: '#132F4C',
        main: '#5090D3',
      },
      text: {
        default: '#ffffff',
      },
      // ... other colors
    },
  };

  const createGetCssVar = (cssVarPrefix = 'my-app') =>
  systemCreateGetCssVar(cssVarPrefix);


  function extendTheme({ cssVarPrefix = 'my-app' } = {}) {
    const getCssVar = createGetCssVar(cssVarPrefix);
    const theme = {
      colorSchemes: {
        light: lightColorScheme,
        dark: darkColorScheme,
      },
      // ... any other objects independent of color-scheme,
      // like fontSizes, spacing tokens, etc
    };
  
    const { vars: themeVars, generateCssVars } = prepareCssVars(
      { colorSchemes: theme.colorSchemes },
      {
        prefix: cssVarPrefix,
      },
    );
    theme.vars = themeVars;
    theme.generateCssVars = generateCssVars;
    theme.palette = {
      ...theme.colorSchemes.light.palette,
      colorScheme: 'light',
    };
  
    return theme;
  }
  
  const myCustomDefaultTheme = extendTheme();
  
  export default myCustomDefaultTheme;
import { common } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';
import { error, indigo, info, neutral, success, warning } from './colors';


export function createDarkPalette() {

  return {
    "action": {
      "active": "#10B981",
      "disabled": "rgba(16, 185, 129, 0.38)",
      "disabledBackground": "rgba(16, 185, 129, 0.12)",
      "focus": "rgba(16, 185, 129, 0.16)",
      "hover": "rgba(16, 185, 129, 0.04)",
      "selected": "rgba(16, 185, 129, 0.12)"
    },
    "background": {
      "default": "#121212",
      "paper": "#1E1E1E"
    },
    "divider": "#2B2B2B",
    "error": {
      "lightest": "#7A2E0E",
      "light": "#B54708",
      "main": "#F79009",
      "dark": "#F79009",
      "darkest": "#F79009",
      "contrastText": "#FFFFFF",
      "alpha4": "rgba(247, 144, 9, 0.04)",
      "alpha8": "rgba(247, 144, 9, 0.08)",
      "alpha12": "rgba(247, 144, 9, 0.12)",
      "alpha30": "rgba(247, 144, 9, 0.3)",
      "alpha50": "rgba(247, 144, 9, 0.5)"
    },
    "info": {
      "lightest": "#164C63",
      "light": "#0E7090",
      "main": "#06AED4",
      "dark": "#CFF9FE",
      "darkest": "#ECFDFF",
      "contrastText": "#FFFFFF",
      "alpha4": "rgba(6, 174, 212, 0.04)",
      "alpha8": "rgba(6, 174, 212, 0.08)",
      "alpha12": "rgba(6, 174, 212, 0.12)",
      "alpha30": "rgba(6, 174, 212, 0.3)",
      "alpha50": "rgba(6, 174, 212, 0.5)"
    },
    "mode": "dark",
    "neutral": {
      "50": "#1E1E1E",
      "100": "#252525",
      "200": "#303030",
      "300": "#3C3C3C",
      "400": "#484848",
      "500": "#565656",
      "600": "#626262",
      "700": "#6E6E6E",
      "800": "#7A7A7A",
      "900": "#868686"
    },
    "primary": {
      "lightest": "#312E81",
      "light": "#4338CA",
      "main": "#6366F1",
      "dark": "#EBEEFE",
      "darkest": "#F5F7FF",
      "contrastText": "#FFFFFF",
      "alpha4": "rgba(99, 102, 241, 0.04)",
      "alpha8": "rgba(99, 102, 241, 0.08)",
      "alpha12": "rgba(99, 102, 241, 0.12)",
      "alpha30": "rgba(99, 102, 241, 0.3)",
      "alpha50": "rgba(99, 102, 241, 0.5)"
    },
    "success": {
      "lightest": "#134E48",
      "light": "#0B815A",
      "main": "#10B981",
      "dark": "#3FC79A",
      "darkest": "#F0FDF9",
      "contrastText": "#FFFFFF",
      "alpha4": "rgba(16, 185, 129, 0.04)",
      "alpha8": "rgba(16, 185, 129, 0.08)",
      "alpha12": "rgba(16, 185, 129, 0.12)",
      "alpha30": "rgba(16, 185, 129, 0.3)",
      "alpha50": "rgba(16, 185, 129, 0.5)"
    },
    "text": {
      "primary": "#FFFFFF",
      "secondary": "#10B981",
      "disabled": "rgba(16, 185, 129, 0.38)"
    },
    "warning": {
      "lightest": "#7A271A",
      "light": "#B42318",
      "main": "#F04438",
      "dark": "#F04438",
      "darkest": "#F04438",
      "contrastText": "#FFFFFF",
      "alpha4": "rgba(240, 68, 56, 0.04)",
      "alpha8": "rgba(240, 68, 56, 0.08)",
      "alpha12": "rgba(240, 68, 56, 0.12)",
      "alpha30": "rgba(240, 68, 56, 0.3)",
      "alpha50": "rgba(240, 68, 56, 0.5)"
    }
  }

}

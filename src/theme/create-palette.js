import { common } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';
import { error, indigo, info, neutral, success, warning } from './colors';


export function createPalette() {

  return{
    action: {
      active: "#5659F0",
      disabled: "rgba(30, 52, 46, 0.38)",
      disabledBackground: "rgba(30, 52, 46, 0.12)",
      focus: "rgba(30, 52, 46, 0.16)",
      hover: "rgba(30, 52, 46, 0.04)",
      selected: "rgba(30, 52, 46, 0.12)"
    },
    background: {
      default: "#F0EDEE",
      paper: "#F0EDEE"
    },
    divider: "#F2F4F7",
    error: {
      lightest: "#FEF3F2",
      light: "#FEE4E2",
      main: "#F04438",
      dark: "#B42318",
      darkest: "#7A271A",
      contrastText: "#FFFFFF",
      alpha4: "rgba(240, 68, 56, 0.04)",
      alpha8: "rgba(240, 68, 56, 0.08)",
      alpha12: "rgba(240, 68, 56, 0.12)",
      alpha30: "rgba(240, 68, 56, 0.3)",
      alpha50: "rgba(240, 68, 56, 0.5)"
    },
    info: {
      lightest: "#164C63",
      light: "#0E7090",
      main: "#06AED4",
      dark: "#CFF9FE",
      darkest: "#ECFDFF",
      contrastText: "#FFFFFF",
      alpha4: "rgba(6, 174, 212, 0.04)",
      alpha8: "rgba(6, 174, 212, 0.08)",
      alpha12: "rgba(6, 174, 212, 0.12)",
      alpha30: "rgba(6, 174, 212, 0.3)",
      alpha50: "rgba(6, 174, 212, 0.5)"
    },
    mode: "light",
    "neutral": {
      "50": "#E3E7E6",
      "100": "#C6D0CC",
      "200": "#A8BAB2",
      "300": "#8BA497",
      "400": "#6E8E7C",
      "500": "#517862",
      "600": "#34524A",
      "700": "#1E342E",
      "800": "#1A302A",
      "900": "#162C26"
    },
    primary: {
      lightest: "#5659F0",
      light: "#5659F0",
      main: "#5659F0",
      dark: "#5659F0",
      darkest: "#5659F0",
      contrastText: "#FFFFFF",
      alpha4: "rgba(86, 89, 240, 0.04)",
      alpha8: "rgba(86, 89, 240, 0.08)",
      alpha12: "rgba(86, 89, 240, 0.12)",
      alpha30: "rgba(86, 89, 240, 0.3)",
      alpha50: "rgba(86, 89, 240, 0.5)"
    },
    success: {
      lightest: "#F0FDF9",
      light: "#1E342E",
      main: "#188B68",
      dark: "#10B981",
      darkest: "#134E48",
      contrastText: "#FFFFFF",
      alpha4: "rgba(24, 139, 104, 0.04)",
      alpha8: "rgba(24, 139, 104, 0.08)",
      alpha12: "rgba(24, 139, 104, 0.12)",
      alpha30: "rgba(24, 139, 104, 0.3)",
      alpha50: "rgba(24, 139, 104, 0.5)"
    },
    text: {
      primary: "#1E342E",
      secondary: "#188B68",
      disabled: "rgba(30, 52, 46, 0.38)"
    },
    warning: {
      lightest: "#7A271A",
      light: "#B42318",
      main: "#F04438",
      dark: "#F04438",
      darkest: "#F04438",
      contrastText: "#FFFFFF",
      alpha4: "rgba(240, 68, 56, 0.04)",
      alpha8: "rgba(240, 68, 56, 0.08)",
      alpha12: "rgba(240, 68, 56, 0.12)",
      alpha30: "rgba(240, 68, 56, 0.3)",
      alpha50: "rgba(240, 68, 56, 0.5)"
    }
  }
  
  


}

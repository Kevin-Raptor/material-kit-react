import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CssBaseline, Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AuthConsumer, AuthProvider, useAuthContext } from "src/contexts/auth-context";
import { useNProgress } from "src/hooks/use-nprogress";
import { createTheme } from "src/theme";
import { createEmotionCache } from "src/utils/create-emotion-cache";
import "simplebar-react/dist/simplebar.min.css";
import { Provider } from "react-redux";
import store from "src/redux/store";
import "../components/maps/map-autocomplete.css";
import { useEffect, useState } from "react";
import { MaterialUISwitch } from "src/components/mui-swtich/material-ui-switch";

const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { isDarkMode } = useAuthContext();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(()=>{
    console.log({isDarkMode})

  },[isDarkMode])

  useNProgress();

  const getLayout = Component.getLayout ?? ((page) => page);

  const lightTheme = createTheme(false);
  const darkTheme = createTheme(true);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Devias Kit</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Provider store={store}>
          <AuthProvider>
            <ThemeProvider theme={darkMode ? createTheme(true): createTheme(false)}>
              <CssBaseline />
              <Grid container sx={{width:1}}>
              <MaterialUISwitch checked={darkMode}
              sx={{zIndex:'99999 !important'}}
              onChange={() =>{
                setDarkMode(!darkMode)
                console.log(!darkMode)
                // auth.switchTheme()
                }} />
  
              <AuthConsumer>
                {(auth) =>
                  auth.isLoading ? <SplashScreen /> : getLayout(<Component {...pageProps} />)
                }
              </AuthConsumer>
                </Grid>
            </ThemeProvider>
          </AuthProvider>
        </Provider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;

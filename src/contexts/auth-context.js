import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import { login } from 'src/utils/api-calls/service';
import { constant } from 'src/config/constant-config';
let token = null;
if (typeof window !== 'undefined') {
  // Perform localStorage action
  token = localStorage.getItem(constant.USER_TOKEN) ? localStorage.getItem(constant.USER_TOKEN) : null;
}
const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
  SET_AUTH_TOKEN: 'SET_AUTH_TOKEN',
  SWITCH_THEME: 'SWITCH_THEME'
};

const initialState = {
  isAuthenticated: true,
  isLoading: true,
  user: null,
  userAuthToken: token,
  isDarkMode: false
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  },
  [HANDLERS.SWITCH_THEME]: (state) => {
    return {
      ...state,
      isDarkMode: !state.isDarkMode
    };
  },
  [HANDLERS.SET_AUTH_TOKEN]: (state, action) => {
    const { token } = action.payload
    console.log('set auth token action', token)
    return {
      ...state,
      userAuthToken: token
    }
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    console.log(`initialze called`)
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;
    let token = '';

    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      const user = {
        id: '5e86809283e28b96d2d38537',
        avatar: '/assets/avatars/avatar-anika-visser.png',
        name: 'Anika Visser',
        email: 'johndoe@example.com'
      };

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const skip = () => {
    try {
      window.sessionStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Anika Visser',
      email: 'anika.visser@devias.io'
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  const signIn = async (email, password) => {
    console.log(`inside signIn`);
    if (email !== 'johndoe@example.com' || password !== 'password123') {
      throw new Error('Please check your email and password');
    }

    try {
      const requestBody = {
        auth: {
          username: email,
          password: password
        }
      };
      const result = await login(requestBody)
      const { token, username } = result.message;
      console.log('login api call result', result);
      if (result.success) {
        localStorage.setItem(constant.USER_TOKEN, token)
        dispatch({
          type: HANDLERS.SET_AUTH_TOKEN,
          payload: { token }
        });
      }
      window.sessionStorage.setItem('authenticated', 'true');

      const user = {
        id: '5e86809283e28b96d2d38537',
        avatar: '/assets/avatars/avatar-anika-visser.png',
        name: 'Anika Visser',
      };

      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: user
      });
    } catch (err) {
      console.error(err);
    }
  };

  const signUp = async (email, name, password) => {
    throw new Error('Sign up is not implemented');
  };

  const switchTheme = () => {
    console.log('ran')
    dispatch({
      type: HANDLERS.SWITCH_THEME
    });
  }
  const signOut = () => {
    localStorage.removeItem(constant.USER_TOKEN);
    window.sessionStorage.setItem('authenticated', 'false');

    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        skip,
        signIn,
        signUp,
        signOut,
        switchTheme
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);

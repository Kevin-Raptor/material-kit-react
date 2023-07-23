import * as reduxActions from '../../../constants/reduxActions'

const initialState = {
  darkMode:false
}

//function to update the state in the redux store
export function app(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
  switch (action.type) {
    case reduxActions.toggleDarkMode:
      return {
        ...state,
        darkMode: state.darkMode ? false : true
      }
    default:
      return state
  }
}
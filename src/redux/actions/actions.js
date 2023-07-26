
// Action Types
export const setUserAuthToken = 'SET_USER_AUTH_TOKEN';

// Action Creator
export const setUserAuthTokenAction = (userAuthToken) => ({
    type: setUserAuthToken,
    data: {userAuthToken}
})
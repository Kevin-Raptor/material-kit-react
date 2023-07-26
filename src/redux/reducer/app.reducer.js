import { constant } from "src/config/constant-config";
import { setUserAuthToken } from "../actions/actions";


const initialState = {
    userAuthToken: 'ABC'
}

export const appReducer = (state, action) =>{

    if (typeof state === 'undefined') {
        return initialState;
      }
    switch(action.type){
        case setUserAuthToken:
            return{
                ...state,
                userAuthToken: action.data.userAuthToken
            }
        default:
            return state;
        }
}
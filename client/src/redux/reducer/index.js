import { types } from "../actions";

const initial = {
    user: null,
allusers : [],
allcoment: [],
allcoment2: [],
usercom: [],
authToken: null,
homeData: null
}
export default function rootReducer (state= initial, action){
    switch(action.type){
        case types.POST_USER:
            return {
              ...state,
              user: action.payload,
            };

            case types.LOAD_HOME_DATA:
              return {
                ...state,
                homeData: action.payload,
              };
                case "SET_AUTH_TOKEN":
                    return {
                      ...state,
                      authToken: action.payload,
                    };
               default: return {...state}
    }
}
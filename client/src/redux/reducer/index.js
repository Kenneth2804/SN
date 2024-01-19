import { types } from "../actions";

const initial = {
  user: null,
  allusers: [],
  allcoment: [],
  allcoment2: [],
  usercom: [],
  authToken: null,
  homeData: null,
  isLoggedIn: false,
  user: null,
  error: null,
  token: null,
  userEmail: null,
  userEmail2: null,
};

export default function rootReducer(state = initial, action) {
  switch (action.type) {
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

    case types.LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        token: null,
      };

    case types.GET_COMMENTS:
      return {
        ...state,
        allcoment: action.payload, 
      };
      case types.CREATE_COMMENT:
        return {
          ...state,
          allcoment: [...state.allcoment, action.payload], 
        };
        case types.SET_USER_EMAIL:
          return {
            ...state,
            userEmail: action.payload,
            userEmail2: action.payload,
          }

    default:
      return { ...state };
  }
}

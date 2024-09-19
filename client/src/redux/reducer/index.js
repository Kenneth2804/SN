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
  error: null,
  token: null,
  userEmail: null,
  userEmail2: null,
  localizationData: null,
  userProfile: null,
  resetPasswordStatus: null,
  resetPasswordError: null,
  notifications: [],
  followers: [], 
  following: [], 
  followersCount: 0,
  followersList: [],
  likesData: null,
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

    case types.SET_USER:
      return {
        ...state,
        user: action.payload,
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
      };

    case types.GET_LOCALIZATION_DATA:
      return {
        ...state,
        localizationData: action.payload,
      };

    case types.PROFILE:
      return {
        ...state,
        userProfile: action.payload,
        isLoggedIn: true,
        user: action.payload,
      };

    case types.LOAD_RANDOM_USERS:
      return {
        ...state,
        allusers: action.payload,
      };

    case types.REQUEST_PASSWORD_RESET:
      return {
        ...state,
        resetPasswordStatus: "pending",
        resetPasswordError: null,
      };

    case types.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordStatus: "success",
        resetPasswordError: null,
      };

    case types.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        resetPasswordStatus: "failure",
        resetPasswordError: action.payload,
      };

    case types.LIKE_COMMENT:
      return {
        ...state,
        allcoment: state.allcoment.map(comment =>
          comment.id === action.payload.commentId
            ? { ...comment, likes: [...comment.likes, { userId: action.payload.userId }] }
            : comment
        ),
      };

    case types.UNLIKE_COMMENT:
      return {
        ...state,
        allcoment: state.allcoment.map(comment => 
          comment.id === action.payload.commentId
            ? { ...comment, likes: comment.likes.filter(like => like.userId !== action.payload.userId) }
            : comment
        )
      };

    case types.GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };

      case types.GET_FOLLOWERS:
        return {
          ...state,
          followersList: action.payload,
          followersCount: action.payload.length,
        };
      
        case types.FOLLOW_USER:
          return {
            ...state,
            following: [...state.following, action.payload] 
          };

          case types.UNFOLLOW_USER:
            return {
              ...state,
              following: state.following.filter(following => following.id !== action.payload),
            };
            case types.GET_LIKES:
              return {
                  ...state,
                  likesData: action.payload, 
              };
    default:
      return { ...state };
  }
}

import axios from "axios";
import { useDispatch } from 'react-redux';
const URL="/";

export const types ={
    POST_USER: "POST_USER",
    LOAD_HOME_DATA: "LOAD_HOME_DATA",
    LOGOUT: 'LOGOUT',
    GET_COMMENTS: 'GET_COMMENTS',
    CREATE_COMMENT: 'CREATE_COMMENT',
    SET_USER_EMAIL: 'SET_USER_EMAIL',
    GET_LOCALIZATION_DATA: "GET_LOCALIZATION_DATA",
    PROFILE: "PROFILE",
    LOAD_RANDOM_USERS:"LOAD_RANDOM_USERS",
    SET_USER: 'SET_USER',
    REQUEST_PASSWORD_RESET: "REQUEST_PASSWORD_RESET",
    RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS",
    RESET_PASSWORD_FAILURE: "RESET_PASSWORD_FAILURE",
    LIKE_COMMENT: 'LIKE_COMMENT',
    UNLIKE_COMMENT: 'UNLIKE_COMMENT',
    GET_NOTIFICATIONS: "GET_NOTIFICATIONS",
    FOLLOW_USER: "FOLLOW_USER",
    UNFOLLOW_USER: "UNFOLLOW_USER",
    GET_FOLLOWERS: "GET_FOLLOWERS",
    GET_LIKES: 'GET_LIKES',
    PUT_DESCRIPTION: 'PUT_DESCRIPTION',
}
export const setUser = (user) => {
  return {
    type: types.SET_USER,
    payload: user,
  };
};


export const postuser = (payload) =>{
    return async function (dispatch){
        try {
            var json = await axios.post(`${URL}postuser`, payload);
            return json
        } catch (error) {
            console.log(error)
        }
    }
}

export const home = () => {
    return async function (dispatch) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${URL}home`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch({ type: types.LOAD_HOME_DATA, payload: response.data });
        return response;
      } catch (error) {
        console.error(error);
      }
    };
  };
  
  


export const setAuthToken = (token) => ({
  type: "SET_AUTH_TOKEN",
  payload: token,
});

export const refreshToken = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/refresh-token', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const newToken = response.data.token;
      localStorage.setItem('token', newToken);
      dispatch(setAuthToken(newToken));
    } catch (error) {
      console.error('Error al refrescar el token:', error);
    }
  };
};


export const login = (email, password) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(`${URL}loginuser`, { email, password }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const token = response.data.token;
      const userEmail = email; 
      localStorage.setItem("token", token);
      localStorage.setItem("userEmail", userEmail);
      dispatch({ type: types.SET_USER_EMAIL, payload: userEmail }); 
      dispatch(setAuthToken(token));
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };
};

  

  export const logout = () => ({
    type: 'LOGOUT',
  });

  export const getComments = (country = '', city = '') => {
    return async function (dispatch) {
      try {
        let query = '';
        if (country || city) {
          const queryParams = new URLSearchParams();
          if (country) queryParams.append('country', country);
          if (city) queryParams.append('city', city);
          query = `?${queryParams.toString()}`;
        }
  
        const response = await axios.get(`${URL}comments${query}`);
        dispatch({ type: types.GET_COMMENTS, payload: response.data });
       
        return response;
      } catch (error) {
        console.error("Error al obtener comentarios:", error);
      }
    };
  };


  export const createComment = (formData) => {
    return async function (dispatch, getState) {
      try {
        const userEmail = getState().userEmail;
  
        if (!userEmail) {
          console.error("El correo electrónico del usuario es nulo");
          return;
        }
  
        formData.append('email', userEmail);
  
        const response = await axios.post(`${URL}postcomment`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        dispatch({ type: types.CREATE_COMMENT, payload: response.data });
        return response;
      } catch (error) {
        console.error("Error al crear comentario:", error);
      }
    };
  };
  export const getLocalization = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${URL}localization`);
            dispatch({ type: types.GET_LOCALIZATION_DATA, payload: response.data });
      
            return response;
        } catch (error) {
            console.error("Error al obtener la localización:", error);
        }
    };
};

export const getUserProfile = () => {
  return async function (dispatch) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token no encontrado");
        return;
      }

      const response = await axios.get(`${URL}profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: types.PROFILE, payload: response.data.user });
      return response;
    } catch (error) {
      console.error("Error al obtener el perfil del usuario:", error);
    }
  };
};

export const getRandomUsers = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL}getusers`);
      dispatch({ type: types.LOAD_RANDOM_USERS, payload: response.data });
      return response;
    } catch (error) {
      console.error("Error al obtener usuarios aleatorios:", error);
    }
  };
};

export function getid(id) {
  return async (dispatch) => {
    try {
      const data = await axios.get(`/getid/${id}`);

      return dispatch({
        type: "GET_ID",
        
        payload: data.data,
        
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export const updateProfile = (userData, file) => {
  return async function (dispatch) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token no encontrado");
        return;
      }
      let formData = new FormData();
      formData.append("name", userData.name);
      if (file) {
        formData.append("picture", file);
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(`${URL}editpicture`, formData, config);

      dispatch({ type: types.PROFILE, payload: response.data });

    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };
};

export const requestPasswordReset = (email) => {
  return async function (dispatch) {
    try {  
      const response = await axios.post(`${URL}forgotpassword`, { email });

    } catch (error) {
      console.error("Error al solicitar el restablecimiento de contraseña:", error);
 
      dispatch({ type: types.RESET_PASSWORD_FAILURE });
    }
  };
};

export const resetPassword = (email, verificationCode, newPassword) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(`${URL}resetpassword`, {
        email,
        verificationCode,
        newPassword,
      });
 
      dispatch({ type: types.RESET_PASSWORD_SUCCESS });
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      dispatch({ type: types.RESET_PASSWORD_FAILURE });
    }
  };
};


export const likeComment = (userId, commentId) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(`http://localhost:3001/like`, { userId, commentId });
      const message = response.data.message;
      if (message === 'Like eliminado.') {
        dispatch({ type: types.UNLIKE_COMMENT, payload: { commentId, userId } });
      } else {
        dispatch({ type: types.LIKE_COMMENT, payload: { commentId, userId } });
      }
      return response;
    } catch (error) {
      console.error("Error al dar like al comentario:", error);
    }
  };
};
export const getNotifications = (userId) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/noti/${userId}`);
      dispatch({ type: types.GET_NOTIFICATIONS, payload: response.data });
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };
};


export const followUser = (followingId) => {
  return async function (dispatch) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${URL}follow`, { followingId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: types.FOLLOW_USER, payload: response.data });
      return response;
    } catch (error) {
      console.error("Error al seguir al usuario:", error);
    }
  };
};

export const unfollowUser = (followingId) => {
  return async function (dispatch) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`/unfollow`, { followingId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: types.UNFOLLOW_USER, payload: followingId });
      return response;
    } catch (error) {
      console.error("Error al dejar de seguir al usuario:", error);
    }
  };
};

export const getFollowers = (userId) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${URL}followers/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: types.GET_FOLLOWERS, payload: response.data });
    } catch (error) {
      console.error("Error al obtener los seguidores:", error);
    }
  };
};
export const getLikes = (userId) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL}getlikes/${userId}`);
     
      dispatch({ type: types.GET_LIKES, payload: response.data });
      return response.data;
    } catch (error) {
      console.log('Error fetching likes:', error);
    }
  };
};
export const PutDescription = (userId, description) => {
  return async function (dispatch) {
    try {
      const response = await axios.put(`${URL}description/${userId}`, { description });
      dispatch({ type: types.PUT_DESCRIPTION, payload: response.data });
      return response.data;
    } catch (error) {
      console.log("Error Put Function", error);
    }
  };
};

export const DeleteNote = (noteId) => {
  return async function (dispatch) {
    try {
      const token = localStorage.getItem("token"); 
      const response = await axios.delete(`${URL}notedelete`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: { id: noteId },
      });

      dispatch({ type: "DELETE_NOTE_SUCCESS", payload: noteId });
      return response.data;
    } catch (error) {
      console.error("Error al eliminar la nota:", error);
      dispatch({ type: "DELETE_NOTE_FAILURE", payload: error });
    }
  };
};

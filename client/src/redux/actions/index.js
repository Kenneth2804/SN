import axios from "axios";
const URL="/";

export const types ={
    POST_USER: "POST_USER",
    LOAD_HOME_DATA: "LOAD_HOME_DATA",
    LOGOUT: 'LOGOUT',
    GET_COMMENTS: 'GET_COMMENTS',
    CREATE_COMMENT: 'CREATE_COMMENT',
    SET_USER_EMAIL: 'SET_USER_EMAIL',
}

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
        console.log("token", token)
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


export const login = (email, password) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(`${URL}loginuser`, { email, password }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const token = response.data.token;
      const userEmail = email; // Guarda el correo electrónico en una variable
      localStorage.setItem("token", token);
      localStorage.setItem("userEmail", userEmail); // Almacena el correo electrónico en localStorage
      dispatch({ type: types.SET_USER_EMAIL, payload: userEmail }); // Actualiza el estado con el correo electrónico
      dispatch(setAuthToken(token));
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };
};

  

  export const logout = () => ({
    type: 'LOGOUT',
  });

  export const getComments = () => {
    return async function (dispatch) {
      try {
        const response = await axios.get(`${URL}comments`);
        dispatch({ type: types.GET_COMMENTS, payload: response.data });
        console.log("comentarios", response)
        return response;
      } catch (error) {
        console.error("Error al obtener comentarios:", error);
      }
    };
  };

  export const createComment = (payload) => {
    return async function (dispatch) {
      try {
        const userEmail = getState().userEmail;
        
        if (!userEmail) {
          // El correo electrónico del usuario es nulo, manejar el error apropiadamente.
          console.error("El correo electrónico del usuario es nulo");
          return;
        }
  
        const response = await axios.post(`${URL}postcomment`, { ...payload, email: userEmail });
        dispatch({ type: types.CREATE_COMMENT, payload: response.data });
        return response;
      } catch (error) {
        console.error("Error al crear comentario:", error);
      }
    };
  };
  
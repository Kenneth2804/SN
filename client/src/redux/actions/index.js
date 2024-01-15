import axios from "axios";
const URL="/";

export const types ={
    POST_USER: "POST_USER",
    LOAD_HOME_DATA: "LOAD_HOME_DATA"
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
        dispatch({ type: types.LOAD_HOME_DATA, payload: response.data });
        return response; // Asegúrate de devolver la respuesta completa
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
        localStorage.setItem("token", token); 
        dispatch(setAuthToken(token));
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
      }
    };
  };
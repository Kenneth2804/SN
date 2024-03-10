import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/actions";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile);
  const [name, setName] = useState(userProfile ? userProfile.name : "");
  const [file, setFile] = useState(null);
  const [isNameEditable, setIsNameEditable] = useState(false); // Nuevo estado para controlar la edición del nombre

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(updateProfile({ name }, file))
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Perfil actualizado",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/profile");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salió mal al actualizar tu perfil!",
        });
      });
  };

  // Función para desbloquear el campo de nombre
  const toggleNameEditability = () => {
    setIsNameEditable((prevEditability) => !prevEditability);
  };

  return (
    <div>
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            disabled={!isNameEditable} // Se desactiva si isNameEditable es falso
          />
          <button type="button" onClick={toggleNameEditability}>
            {isNameEditable ? "Bloquear" : "Editar"} Nombre
          </button>
        </div>
        <div>
          <label htmlFor="picture">Imagen de Perfil:</label>
          <input
            type="file"
            id="picture"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Actualizar Perfil</button>
      </form>
    </div>
  );
}

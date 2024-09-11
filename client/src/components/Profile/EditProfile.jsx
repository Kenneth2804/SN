import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/actions";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../menu/Sidebar";

export default function EditProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile);
  const [name, setName] = useState(userProfile ? userProfile.name : "");
  const [file, setFile] = useState(null);
  const [isNameEditable, setIsNameEditable] = useState(false);

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

  const toggleNameEditability = () => {
    setIsNameEditable((prevEditability) => !prevEditability);
  };

  return (
    <>
    <Sidebar userData={userProfile}></Sidebar>
    <div className="max-w-md mx-auto p-8 border border-gray-300 rounded-lg">
      <h2 className="mb-6 text-xl font-semibold text-white ">Editar Perfil</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            disabled={!isNameEditable}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            />
          <button
            type="button"
            onClick={toggleNameEditability}
            className="mt-3 px-4 py-2 text-sm text-white bg-blue-500 border border-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
            >
            {isNameEditable ? "Bloquear" : "Editar"} Nombre
          </button>
        </div>
        <div className="mb-4">
          <label htmlFor="picture" className="block mb-2 text-sm font-medium text-white">
            Imagen de Perfil:
          </label>
          <input
            type="file"
            id="picture"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none"
            >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm text-white bg-blue-500 border border-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
            >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
            </>
  );
}

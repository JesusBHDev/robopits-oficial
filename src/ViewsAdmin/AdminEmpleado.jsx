import { EncabezadoAdmin, BotonMenu } from './ComponenetesAdmin/Encabezado'
import { crearEmpleado } from '../api/auth.js'
import { useForm } from "react-hook-form";
import { useState, useEffect } from 'react'
import { useAuth } from "../context/AuthContext.jsx";
function AdminEmpleado() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const { signupEmpleado, errors: RegisterErrors } = useAuth();

  const onSubmit = handleSubmit(async values => {
    signupEmpleado(values);
  });
  return (
    <div>
      <EncabezadoAdmin />
      <div className="w-full bg-emerald-700 h-auto p-8">
        <div>
          <h1>Empleados</h1>
        </div>
        <div className='bg-zinc-800 max-w-md p-10 rounded-md '>
          <form onSubmit={onSubmit}>
            <input type="text"
              {...register("Nombre")}
              className="w-full bg-zinc-700 text-white px-4 py2 rounded-md my-2"
              placeholder="Nombre"
            />
            <input type="text"
              {...register("Email")}
              className="w-full bg-zinc-700 text-white px-4 py2 rounded-md my-2"
              placeholder="Eamil"
            />
            <input type="text"
              {...register("Password")}
              className="w-full bg-zinc-700 text-white px-4 py2 rounded-md my-2"
              placeholder="Contraseña"
            />

            <button type="submit"> Registrarse</button>

          </form>

        </div>
      </div>
    </div>
  )
}

export default AdminEmpleado
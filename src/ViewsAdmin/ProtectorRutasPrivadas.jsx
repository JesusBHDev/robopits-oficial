import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function ProtectorRutasPrivadas({Page}) {
  
    const {empleadoLoading, isEmpleadoAuthenticated} = useAuth()
    console.log(empleadoLoading, isEmpleadoAuthenticated)

    if(empleadoLoading) return <h1>Cargando ...</h1>;

    if(!empleadoLoading && !isEmpleadoAuthenticated) return <Navigate to='/login-admin' replace/>
    
  return <Page />
}

export default ProtectorRutasPrivadas
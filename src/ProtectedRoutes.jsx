import { Navigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext.jsx"

function ProtectedRoutes({Page}) {

    const {loading, isAuthenticated} = useAuth()
    console.log(loading, isAuthenticated)

    if(loading) return <h1>Cargando ...</h1>;

    if(!loading && !isAuthenticated) return <Navigate to='/login' replace/>
    
  return <Page />
}


export default ProtectedRoutes
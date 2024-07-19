import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verificarToken,
     IniciarEmpleado, verificarTokenEmpleado, crearEmpleado } from "../api/auth.js"
import Cookies from "js-cookie";

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const [empleado, setEmpleado] = useState(null);
    const [isEmpleadoAuthenticated, setIsEmpleadoAuthenticated] = useState(false);
    const [empleadoErrors, setEmpleadoErrors] = useState([]);
    const [empleadoLoading, setEmpleadoLoading] = useState(true);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error.response.data);
            setErrors(error.response.data);
        }
    };

    const signupEmpleado = async (empleadoData) => {
        try {
            const res = await crearEmpleado(empleadoData);
            console.log(res.data);
            setEmpleado(res.data);
            setIsEmpleadoAuthenticated(true);
        } catch (error) {
            console.log(error.response.data);
            setEmpleadoErrors(error.response.data);
        }
    };

    const signin = async (user) =>{
        try {
            const cookies = Cookies.get();
            console.log(cookies)
            const res = await loginRequest(user);
            console.log(res);
            setIsAuthenticated(true);
            setUser(res.data);
            console.log(res.data.token)
            Cookies.set('token', res.data.token)
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message]);
        }
    };
    
    const signinEmpleado = async (empleadoData) => {
        try {
            const cookies = Cookies.get();
            console.log(cookies);
            const res = await IniciarEmpleado(empleadoData);
            console.log(res);
            setIsEmpleadoAuthenticated(true);
            setEmpleado(res.data);
            console.log(res.data.admin);
            Cookies.set('admin', res.data.admin);
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setEmpleadoErrors(error.response.data);
            }
            setEmpleadoErrors([error.response.data.message]);
        }
    };

    const logout = () =>{
        Cookies.remove("token");
        setIsAuthenticated(false);
        setUser(null);
    }

    const logoutEmpleado = () => {
        Cookies.remove("admin");
        setIsEmpleadoAuthenticated(false);
        setEmpleado(null);
    };

    useEffect(() =>{
        if(errors.length > 0){
            const timer = setTimeout(() =>{
                setErrors([])
            },5000)
            return () => clearTimeout(timer)
        }
    },[errors])

    useEffect(() => {
        if (empleadoErrors.length > 0) {
            const timer = setTimeout(() => {
                setEmpleadoErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [empleadoErrors]);


    useEffect(() => {
        async function checkLogin () {
          const cookies = Cookies.get();
          console.log(cookies);
      
          if (!cookies.token) {
            setIsAuthenticated(false);
            setLoading(false);
            return setUser(null);
          }
          try {
            const res = await verificarToken(cookies.token);
            console.log(res);
            if (!res.data) {
              setIsAuthenticated(false);
              setLoading(false);
              return;
            }
      
            setIsAuthenticated(true);
            setUser(res.data);
            setLoading(false);
          } catch (error) {
            console.log(error);
            setIsAuthenticated(false);
            setUser(null);
            setLoading(false);
          }
        }
      
        checkLogin();
      }, []);
      
      useEffect(() => {
        async function checkLoginEmpleado() {
            const cookies = Cookies.get();
            console.log(cookies);
    
            if (!cookies.admin) {
                setIsEmpleadoAuthenticated(false);
                setEmpleadoLoading(false);
                return setEmpleado(null);
            }
    
            try {
                const res = await verificarTokenEmpleado(cookies.admin);
                if (!res.data) {
                    setIsEmpleadoAuthenticated(false);
                    setEmpleadoLoading(false);
                    return;
                }
                setIsEmpleadoAuthenticated(true);
                setEmpleado(res.data);
                setEmpleadoLoading(false);
            } catch (error) {
                console.log(error);
                setIsEmpleadoAuthenticated(false);
                setEmpleado(null);
                setEmpleadoLoading(false);
            }
        }
    
        checkLoginEmpleado();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                signup,
                signin,
                loading,
                logout,
                user,
                isAuthenticated,
                errors,
                
                signupEmpleado,
                signinEmpleado,
                logoutEmpleado,
                empleado,
                isEmpleadoAuthenticated,
                empleadoErrors,
                empleadoLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
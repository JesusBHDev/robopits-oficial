import React from 'react'
import { useNavigate } from 'react-router-dom';

const ControladorErrores = () => {
    const navigate = useNavigate();

    const handleError = (error) => {
      if (error.response && error.response.status === 400) {
        navigate('/error400');
      } else {
        navigate('/error404');
      }
    };
  return (
    <div>
      
    </div>
  )
}

export default ControladorErrores

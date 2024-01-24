import React from 'react'
import { Link  } from 'react-router-dom';
const MigasPan = () => {
    const pathnames = window.location.pathname.split('/').filter((x) => x);
  
    return (
      <div>
        <Link to="/">Home</Link>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return (
            <span key={name}>
              <span> / </span>
              {isLast ? (
                <span>{name}</span>
              ) : (
                <Link to={routeTo}>{name}</Link>
              )}
            </span>
          );
        })}
      </div>
    );
  };

export default MigasPan
// genera codigo para un formulario
import { useAuth } from '@hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    let auth = useAuth();
    let location = useLocation();
    let localData = localStorage.getItem('user');
    let data = localData ? JSON.parse(localData) : null;
    if ( (!auth?.user.accessToken) || (!data?.user?.accesToken) ) {
        console.log('no se encontro el token');
      return <Navigate to="/inicio-sesion" state={{ from: location }} replace />;
    }
  
    return children;
}

export default RequireAuth
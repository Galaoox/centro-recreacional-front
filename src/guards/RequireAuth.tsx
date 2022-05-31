import { useAuth } from '@hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    let auth = useAuth();
    let location = useLocation();
    if ( (!auth?.user.accessToken)  ) {
      return <Navigate to="/inicio-sesion" state={{ from: location }} replace />;
    }
  
    return children;
}

export default RequireAuth
import { useAuth } from '@hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const RequireIsAdmin = ({ children }: { children: JSX.Element }) => {
    let auth = useAuth();
    let location = useLocation();
  
    if (!auth?.user?.isAdmin) {
      return <Navigate to="/" state={{ from: location }} replace />;
    }
  
    return children;
}

export default RequireIsAdmin
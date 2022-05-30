import { useAuth } from '@hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const RequireIsAdmin = ({ children }: { children: JSX.Element }) => {
    let auth = useAuth();
    let location = useLocation();
    let localData = localStorage.getItem('user');
    let data = localData ? JSON.parse(localData) : null;
    if ( (!auth?.user.isAdmin) || (!data && data.user.isAdmin) ) {
      return <Navigate to="/" state={{ from: location }} replace />;
    }
  
    return children;
}

export default RequireIsAdmin
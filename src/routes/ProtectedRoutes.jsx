import { Navigate } from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

export const ProtectedRoute = ({ children, requiredRole }) => {
  const auth = useAuthUser();
  const loginRoute = requiredRole === 'patient' ? '/user/login' : '/admin/login';

  if (!auth || auth.role !== requiredRole) {
    return <Navigate to={loginRoute} replace />;
  }
  return children;
};

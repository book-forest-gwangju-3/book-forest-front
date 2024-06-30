import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ children }) => {
  const isLogin = useSelector((state) => state.user.isLogin);
  if (!isLogin) {
    return <Navigate to="/report" replace />;
  }
  return children;
};
export default ProtectedRoute;

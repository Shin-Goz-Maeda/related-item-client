import { Navigate } from "react-router-dom";
import { useAuthContext } from "../common/context/AuthContext";

function PrivateRoute({ children }) {
  const { user } = useAuthContext();

  if (!user) {
    return (<Navigate to="login" />)
  }
  return children;
}

export default PrivateRoute;
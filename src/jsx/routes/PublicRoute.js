import { Navigate } from "react-router-dom";
import { useAuthContext } from "../common/context/AuthContext";

function PublicRoute({ children }) {
  const { user } = useAuthContext();

  if (user) {
    return <Navigate to="/" />
  }
  return children;
}

export default PublicRoute
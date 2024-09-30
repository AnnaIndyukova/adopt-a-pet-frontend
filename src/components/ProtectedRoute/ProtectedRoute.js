import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

function ProtectedRoute({ children, ...props }) {
  const { isLoggedIn } = useContext(AppContext);
  return (
    <Route {...props}>{isLoggedIn ? children : <Redirect to={"/"} />}</Route>
  );
}

export default ProtectedRoute;

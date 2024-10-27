import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

function ProtectedRoute({ children, anonymous = false, ...props }) {
  const { isLoggedIn } = useContext(AppContext);
  return (
    <Route
      {...props}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { showRegisterModal: true, from: location },
            }}
          />
        )
      }
    />
  );
}

export default ProtectedRoute;

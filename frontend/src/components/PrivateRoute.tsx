import { useLocation } from "react-router";
import { Navigate, Outlet } from "react-router";

export const PrivateRoute = () => {
  const token = localStorage.getItem("access_token");
  const location = useLocation();

  if (!token) {
    const redirectTo = location.pathname + location.search;
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(redirectTo)}`}
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
};

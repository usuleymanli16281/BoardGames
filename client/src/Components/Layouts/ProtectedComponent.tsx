import { Navigate, Outlet } from "react-router-dom";
import { isTokenValid } from "../../verfiy";

export default function ProtectedComponent() {

    return isTokenValid() ? <Outlet /> : <Navigate to="/login" />;
}

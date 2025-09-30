import { Navigate } from "react-router";
import Loading from "../../components/Loading";
import useAuth from "../../Hooks/useAuth";
import useUserInfo from "../../Hooks/useUserInfo";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { adminInfo,isLoading } = useUserInfo(user?.email);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

   if (isLoading) {
    return <Loading />;
  }

  if (adminInfo?.name !== "admin") {
    return <Navigate to="/" />;
  }
  return children;
};

export default AdminRoute;

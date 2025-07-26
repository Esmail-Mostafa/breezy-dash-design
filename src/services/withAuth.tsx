import { Navigate } from "react-router-dom";

const withAuth = (Compoenet) => {
  return function protectPAges(props) {
    const isLogging = !!localStorage.getItem("accessToken");
    if (!isLogging) {
      return <Navigate to="/login" />;
    }
    return <Compoenet {...props} />;
  };
};

export default withAuth
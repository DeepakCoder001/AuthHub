import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {

  const navigate = useNavigate();

  useEffect(() => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // redirect to login
    navigate("/login");
  }, []);

  return <h2>Logging out...</h2>;
};

export default Logout;
import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../slices/AuthSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    toast.success("User logout successfully");
    navigate("/");
  };
  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
      <div className="d-flex justify-content-center">
        <Button onClick={() => navigate("/dashboard/info")}>Info page</Button>
      </div>
    </div>
  );
};

export default Dashboard;

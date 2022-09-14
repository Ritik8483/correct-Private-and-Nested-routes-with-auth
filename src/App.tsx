import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/Auth/Dashboard";
import PrivateRoute from "./components/PrivateRoutes/PrivateRoute";
import Info from "./components/pages/Info";
import MoreInfo from "./components/pages/MoreInfo";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route element={<PrivateRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
              <Route path="dashboard/info" element={<Info/>} />
              <Route path="dashboard/info/more-info" element={<MoreInfo/>} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;

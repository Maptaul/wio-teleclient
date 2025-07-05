import { Route, Routes } from "react-router-dom";
import Dashboard from "./Layouts/Dashboard";
import Root from "./layouts/Root";
import AboutUs from "./pages/AboutUs/AboutUs";
import AdminHome from "./pages/Home/AdminHome";
import DashboardWelcome from "./pages/Home/DashboardWelcome";
import DoctorHome from "./pages/Home/DoctorHome";
import Home from "./pages/Home/Home";
import PatientHome from "./pages/Home/PatientHome";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Doctors from "./pages/doctors/Doctors";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/about" element={<AboutUs />} />
      </Route>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="home" element={<PatientHome />} />
        <Route path="doctor-home" element={<DoctorHome />} />
        <Route path="admin-home" element={<AdminHome />} />
        <Route path="appointments/*" element={<PatientHome />} />
        <Route path="my-patients" element={<PatientHome />} />
        <Route path="schedule" element={<PatientHome />} />
        <Route path="consultations" element={<PatientHome />} />
        <Route path="analytics" element={<PatientHome />} />
        <Route path="manage-users" element={<PatientHome />} />
        <Route path="manage-doctors" element={<PatientHome />} />
        <Route path="platform-analytics" element={<PatientHome />} />
        <Route path="system-settings" element={<PatientHome />} />
        <Route path="medical-records" element={<PatientHome />} />
        <Route path="profile" element={<PatientHome />} />
        <Route index element={<DashboardWelcome />} />
      </Route>
    </Routes>
  );
};

export default App;

import { useContext } from "react";
import {
  FaCalendarAlt,
  FaChartLine,
  FaCog,
  FaHeart,
  FaStethoscope,
  FaUserMd,
  FaUsers,
  FaVideo,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import RoleTestHelper from "../../Components/RoleTestHelper";
import { AuthContext } from "../../Providers/AuthProvider";

const DashboardWelcome = () => {
  const { user } = useContext(AuthContext);

  const patientQuickLinks = [
    { title: "Patient Home", path: "/dashboard/home", icon: FaHeart },
    {
      title: "My Appointments",
      path: "/dashboard/appointments/all",
      icon: FaCalendarAlt,
    },
    { title: "Find Doctors", path: "/doctors", icon: FaUserMd },
    {
      title: "Medical Records",
      path: "/dashboard/medical-records",
      icon: FaStethoscope,
    },
  ];
  const _doctorQuickLinks = [
    {
      title: "Doctor Home",
      path: "/dashboard/doctor-home",
      icon: FaStethoscope,
    },
    { title: "My Patients", path: "/dashboard/my-patients", icon: FaUsers },
    { title: "Schedule", path: "/dashboard/schedule", icon: FaCalendarAlt },
    {
      title: "Video Consultations",
      path: "/dashboard/consultations",
      icon: FaVideo,
    },
  ];

  const _adminQuickLinks = [
    { title: "Admin Home", path: "/dashboard/admin-home", icon: FaCog },
    { title: "Manage Users", path: "/dashboard/manage-users", icon: FaUsers },
    {
      title: "Manage Doctors",
      path: "/dashboard/manage-doctors",
      icon: FaUserMd,
    },
    {
      title: "Platform Analytics",
      path: "/dashboard/platform-analytics",
      icon: FaChartLine,
    },
  ];
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="text-center bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Your Dashboard
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          Hello, {user?.displayName || "User"}!
        </p>
        <p className="text-gray-500">
          This dashboard features role-based navigation inspired by a grievance
          management system.
        </p>
      </div>

      {/* Role Test Helper */}
      <RoleTestHelper />

      {/* Quick Links */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Quick Links
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {/* Show different quick links based on role - for now showing patient links */}
          {patientQuickLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 transform hover:scale-105 hover:border-blue-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-500 p-3 rounded-lg mb-3">
                  <link.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900">{link.title}</h3>
              </div>
            </NavLink>
          ))}
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Use the sidebar navigation to access all features and role-specific
            dashboards.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardWelcome;

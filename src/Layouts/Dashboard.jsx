import { useContext, useEffect, useState } from "react";
import { BsFastForwardCircleFill } from "react-icons/bs";
import {
  FaAngleDown,
  FaAngleUp,
  FaCalendarAlt,
  FaChartLine,
  FaCog,
  FaHeart,
  FaHome,
  FaUser,
  FaUserMd,
  FaUsers,
  FaVideo,
} from "react-icons/fa";
import { IoLogOutOutline, IoPlayBackCircle } from "react-icons/io5";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Loading from "../Components/Loading/Loading";
import { AuthContext } from "../Providers/AuthProvider";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAppointmentsDropdownOpen, setIsAppointmentsDropdownOpen] =
    useState(false);
  const { user, logOut, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("patient");
  const [_userData, setUserData] = useState(null);
  const [_doctorsData, setDoctorsData] = useState([]);
  const [dashboardCounts, setDashboardCounts] = useState({
    appointments: 0,
    totalDoctors: 0,
    totalPatients: 0,
    completedSessions: 0,
    upcomingAppointments: 0,
    completedAppointments: 0,
    todayAppointments: 0,
  });
  // Fetch user role and data from API with counts refresh functionality
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.email) return;

      try {
        // Fetch user data to get role
        const userResponse = await fetch(
          `http://localhost:5000/users?email=${user.email}`
        );
        if (userResponse.ok) {
          const users = await userResponse.json();
          const currentUser = users.find((u) => u.email === user.email);

          if (currentUser) {
            setUserData(currentUser);
            setUserRole(currentUser.role || "patient");
          }
        }

        // Fetch doctors data
        const doctorsResponse = await fetch("http://localhost:5000/doctors");
        if (doctorsResponse.ok) {
          const doctors = await doctorsResponse.json();
          setDoctorsData(doctors);
        }

        // Refresh dashboard counts
        refreshDashboardCounts();
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchUserData();
  }, [user?.email]);

  // Add a function to refresh dashboard counts
  const refreshDashboardCounts = async () => {
    try {
      // Mock data - in real app would fetch from appointments API
      const mockCounts = {
        appointments: 12,
        totalDoctors: 45,
        totalPatients: 156,
        completedSessions: 89,
        upcomingAppointments: 3,
        completedAppointments: 9,
        todayAppointments: 5,
      };

      setDashboardCounts(mockCounts);
    } catch (err) {
      console.error("Error fetching dashboard counts:", err.message);
    }
  };

  // Expose refreshDashboardCounts globally for status update pages
  useEffect(() => {
    window.refreshDashboardCounts = refreshDashboardCounts;
    return () => {
      delete window.refreshDashboardCounts;
    };
  }, [user, userRole]);

  const handleLogout = async () => {
    try {
      await logOut();
      setIsSidebarOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) return <Loading />;
  // Patient Menu
  const patientMenu = (
    <>
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
              isActive ? "bg-blue-500 text-white" : "text-gray-800"
            }`
          }
        >
          <FaHome className="mr-2 text-lg" />
          <span className="md:inline">Patient Home</span>
        </NavLink>
      </li>
      <li>
        <div className="relative">
          <button
            onClick={() =>
              setIsAppointmentsDropdownOpen(!isAppointmentsDropdownOpen)
            }
            className="flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-gray-800 w-full text-left"
          >
            <FaCalendarAlt className="mr-2 text-lg" />
            <span className="md:inline flex items-center gap-2">
              My Appointments
              <span className="inline-block bg-blue-600 text-white font-extrabold rounded-lg px-2 py-0.5 ml-1 text-sm shadow border border-blue-700">
                {dashboardCounts.appointments}
              </span>
            </span>
            {isAppointmentsDropdownOpen ? (
              <FaAngleUp className="ml-auto" />
            ) : (
              <FaAngleDown className="ml-auto" />
            )}
          </button>
          {isAppointmentsDropdownOpen && (
            <ul className="ml-6 mt-1 space-y-1">
              <li>
                <NavLink
                  to="/dashboard/appointments/upcoming"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                      isActive ? "bg-blue-500 text-white" : "text-gray-800"
                    }`
                  }
                >
                  <span className="md:inline flex items-center gap-2">
                    Upcoming
                    <span className="inline-block bg-green-500 text-white font-extrabold rounded-lg px-2 py-0.5 ml-1 text-sm shadow border border-green-700">
                      {dashboardCounts.upcomingAppointments}
                    </span>
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/appointments/today"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                      isActive ? "bg-blue-500 text-white" : "text-gray-800"
                    }`
                  }
                >
                  <span className="md:inline flex items-center gap-2">
                    Today
                    <span className="inline-block bg-orange-500 text-white font-extrabold rounded-lg px-2 py-0.5 ml-1 text-sm shadow border border-orange-700">
                      {dashboardCounts.todayAppointments}
                    </span>
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/appointments/completed"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                      isActive ? "bg-blue-500 text-white" : "text-gray-800"
                    }`
                  }
                >
                  <span className="md:inline flex items-center gap-2">
                    Completed
                    <span className="inline-block bg-gray-600 text-white font-extrabold rounded-lg px-2 py-0.5 ml-1 text-sm shadow border border-gray-800">
                      {dashboardCounts.completedAppointments}
                    </span>
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/appointments/all"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                      isActive ? "bg-blue-500 text-white" : "text-gray-800"
                    }`
                  }
                >
                  <span className="md:inline flex items-center gap-2">
                    All Appointments
                    <span className="inline-block bg-blue-600 text-white font-extrabold rounded-lg px-2 py-0.5 ml-1 text-sm shadow border border-blue-800">
                      {dashboardCounts.appointments}
                    </span>
                  </span>
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </li>
      <li>
        <NavLink
          to="/doctors"
          className={({ isActive }) =>
            `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
              isActive ? "bg-blue-500 text-white" : "text-gray-800"
            }`
          }
        >
          <FaUserMd className="mr-2 text-lg" />
          <span className="md:inline">Find Doctors</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/medical-records"
          className={({ isActive }) =>
            `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
              isActive ? "bg-blue-500 text-white" : "text-gray-800"
            }`
          }
        >
          <FaHeart className="mr-2 text-lg" />
          <span className="md:inline">Medical Records</span>
        </NavLink>
      </li>
    </>
  );
  // Doctor Menu
  const doctorMenu = (
    <>
      <li>
        <NavLink
          to="/dashboard/doctor-home"
          className={({ isActive }) =>
            `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
              isActive ? "bg-blue-500 text-white" : "text-gray-800"
            }`
          }
        >
          <FaHome className="mr-2 text-lg" />
          <span className="md:inline">Doctor Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/my-patients"
          className={({ isActive }) =>
            `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
              isActive ? "bg-blue-500 text-white" : "text-gray-800"
            }`
          }
        >
          <FaUsers className="mr-2 text-lg" />
          <span className="md:inline flex items-center gap-2">
            My Patients
            <span className="inline-block bg-green-600 text-white font-extrabold rounded-lg px-2 py-0.5 ml-1 text-sm shadow border border-green-800">
              {dashboardCounts.totalPatients}
            </span>
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/schedule"
          className={({ isActive }) =>
            `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
              isActive ? "bg-blue-500 text-white" : "text-gray-800"
            }`
          }
        >
          <FaCalendarAlt className="mr-2 text-lg" />
          <span className="md:inline flex items-center gap-2">
            Schedule
            <span className="inline-block bg-orange-500 text-white font-extrabold rounded-lg px-2 py-0.5 ml-1 text-sm shadow border border-orange-700">
              {dashboardCounts.todayAppointments}
            </span>
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/consultations"
          className={({ isActive }) =>
            `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
              isActive ? "bg-blue-500 text-white" : "text-gray-800"
            }`
          }
        >
          <FaVideo className="mr-2 text-lg" />
          <span className="md:inline">Video Consultations</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/analytics"
          className={({ isActive }) =>
            `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
              isActive ? "bg-blue-500 text-white" : "text-gray-800"
            }`
          }
        >
          <FaChartLine className="mr-2 text-lg" />
          <span className="md:inline">Analytics</span>
        </NavLink>
      </li>
    </>
  );
  // Admin Menu
  const adminMenu = (
    <>
      <li>
        <NavLink
          to="/dashboard/admin-home"
          className={({ isActive }) =>
            `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
              isActive ? "bg-blue-500 text-white" : "text-gray-800"
            }`
          }
        >
          <FaHome className="mr-2 text-lg" />
          <span className="md:inline">Admin Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/manage-users"
          className={({ isActive }) =>
            `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
              isActive ? "bg-blue-500 text-white" : "text-gray-800"
            }`
          }
        >
          <FaUsers className="mr-2 text-lg" />
          <span className="md:inline flex items-center gap-2">
            Manage Users
            <span className="inline-block bg-blue-600 text-white font-extrabold rounded-lg px-2 py-0.5 ml-1 text-sm shadow border border-blue-800">
              {dashboardCounts.totalPatients}
            </span>
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/manage-doctors"
          className={({ isActive }) =>
            `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
              isActive ? "bg-blue-500 text-white" : "text-gray-800"
            }`
          }
        >
          <FaUserMd className="mr-2 text-lg" />
          <span className="md:inline flex items-center gap-2">
            Manage Doctors
            <span className="inline-block bg-green-600 text-white font-extrabold rounded-lg px-2 py-0.5 ml-1 text-sm shadow border border-green-800">
              {dashboardCounts.totalDoctors}
            </span>
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/platform-analytics"
          className={({ isActive }) =>
            `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
              isActive ? "bg-blue-500 text-white" : "text-gray-800"
            }`
          }
        >
          <FaChartLine className="mr-2 text-lg" />
          <span className="md:inline">Platform Analytics</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/system-settings"
          className={({ isActive }) =>
            `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
              isActive ? "bg-blue-500 text-white" : "text-gray-800"
            }`
          }
        >
          <FaCog className="mr-2 text-lg" />
          <span className="md:inline">System Settings</span>
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="flex-shrink-0 bg-gray-200 shadow-md md:shadow-none md:w-56 transition-all duration-300">
          <div
            className={`w-58 mt-16 bg-gray-200 fixed top-0 left-0 h-full z-40 transition-transform duration-300 ease-in-out md:translate-x-0 md:w-56 md:static md:h-auto md:min-h-screen`}
          >
            <div className="p-4 h-full flex flex-col">
              <div className="flex items-center justify-center mb-6 relative">
                <div className="flex items-center justify-between w-full">
                  {" "}
                  <h1 className="text-xl text-left font-bold text-gray-800 w-full">
                    {userRole === "admin"
                      ? "Admin Dashboard"
                      : userRole === "doctor"
                      ? "Doctor Dashboard"
                      : "Patient Dashboard"}
                  </h1>
                  <button
                    className="focus:outline-none group"
                    onClick={() => setIsSidebarOpen(false)}
                    aria-label="Hide sidebar"
                    tabIndex={0}
                  >
                    <span className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                      Close sidebar
                    </span>
                    <IoPlayBackCircle className="text-4xl text-blue-600" />
                  </button>
                </div>
              </div>
              <nav className="flex-1">
                <ul className="space-y-1 text-base font-bold">
                  {" "}
                  {/* Conditionally render menu based on role */}
                  {userRole === "patient" && patientMenu}
                  {userRole === "doctor" && doctorMenu}
                  {userRole === "admin" && adminMenu}
                  {/* Common Menu Items */}
                  <div className="my-4 border-t border-gray-300"></div>
                  <li>
                    <NavLink
                      to="/dashboard/profile"
                      className={({ isActive }) =>
                        `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                          isActive ? "bg-blue-500 text-white" : "text-gray-800"
                        }`
                      }
                    >
                      <FaUser className="mr-2 text-lg" />
                      <span className="md:inline">Profile</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                          isActive ? "bg-blue-500 text-white" : "text-gray-800"
                        }`
                      }
                    >
                      <FaHome className="mr-2 text-lg" />
                      <span className="md:inline">Home</span>
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-gray-800 w-full text-left"
                    >
                      <IoLogOutOutline className="mr-2 text-lg" />
                      <span className="md:inline">Logout</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "flex-1" : "w-full"
        } bg-gray-100 min-h-screen p-6 md:p-8`}
      >
        {!isSidebarOpen && (
          <button
            className="mb-4 text-blue-600 focus:outline-none group"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Show sidebar"
            tabIndex={0}
          >
            <span className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
              Open sidebar
            </span>
            <BsFastForwardCircleFill className="text-4xl text-blue-600" />
          </button>
        )}

        {/* Role Switcher for Testing */}
        <div className="mb-4 flex justify-end">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">Test Role:</label>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

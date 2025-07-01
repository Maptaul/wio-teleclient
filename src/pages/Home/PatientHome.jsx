import { useContext, useState } from "react";
import {
  FaCalendarAlt,
  FaChartLine,
  FaHeart,
  FaPills,
  FaStethoscope,
  FaUserMd,
  FaVideo,
} from "react-icons/fa";
import { AuthContext } from "../../Providers/AuthProvider";

const PatientHome = () => {
  const { user } = useContext(AuthContext);
  const [dashboardData] = useState({
    upcomingAppointments: 3,
    totalAppointments: 24,
    doctorsConsulted: 8,
    healthScore: 85,
    activePrescriptions: 3,
  });

  const stats = [
    {
      title: "Upcoming Appointments",
      value: dashboardData.upcomingAppointments,
      icon: FaCalendarAlt,
      color: "bg-blue-500",
      change: "+2 this week",
    },
    {
      title: "Total Appointments",
      value: dashboardData.totalAppointments,
      icon: FaStethoscope,
      color: "bg-green-500",
      change: "+12%",
    },
    {
      title: "Health Score",
      value: `${dashboardData.healthScore}%`,
      icon: FaHeart,
      color: "bg-red-500",
      change: "+5%",
    },
    {
      title: "Active Prescriptions",
      value: dashboardData.activePrescriptions,
      icon: FaPills,
      color: "bg-purple-500",
      change: "-1",
    },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "June 22, 2025",
      time: "10:00 AM",
      type: "Video Call",
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Dermatologist",
      date: "June 24, 2025",
      time: "2:30 PM",
      type: "In-Person",
    },
    {
      id: 3,
      doctor: "Dr. Emily Davis",
      specialty: "General Practitioner",
      date: "June 26, 2025",
      time: "11:15 AM",
      type: "Video Call",
    },
  ];

  const quickActions = [
    {
      title: "Book Appointment",
      description: "Schedule a new consultation",
      icon: FaCalendarAlt,
      color: "bg-blue-500 hover:bg-blue-600",
      route: "/doctors",
    },
    {
      title: "Start Video Call",
      description: "Join your upcoming consultation",
      icon: FaVideo,
      color: "bg-green-500 hover:bg-green-600",
      route: "/video-call",
    },
    {
      title: "View Reports",
      description: "Check your medical reports",
      icon: FaChartLine,
      color: "bg-purple-500 hover:bg-purple-600",
      route: "/reports",
    },
    {
      title: "Find Doctors",
      description: "Browse available doctors",
      icon: FaUserMd,
      color: "bg-orange-500 hover:bg-orange-600",
      route: "/doctors",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.displayName || "Patient"}!
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your health today.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {stat.value}
                </p>
                <p className="text-sm text-green-600 mt-2">{stat.change}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Upcoming Appointments
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FaUserMd className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {appointment.doctor}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {appointment.specialty}
                      </p>
                      <p className="text-sm text-gray-500">
                        {appointment.date} at {appointment.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        appointment.type === "Video Call"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {appointment.type}
                    </span>
                    {appointment.type === "Video Call" && (
                      <button className="p-2 text-green-600 hover:text-green-700">
                        <FaVideo className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Quick Actions
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className={`${action.color} p-4 rounded-xl text-white transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl`}
                >
                  <div className="flex flex-col items-center text-center">
                    <action.icon className="h-6 w-6 mb-2" />
                    <h3 className="font-semibold text-sm mb-1">
                      {action.title}
                    </h3>
                    <p className="text-xs opacity-90">{action.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Health Insights */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Health Insights</h2>
            <p className="opacity-90">
              Your health metrics are looking good! You have 3 upcoming
              appointments scheduled. Keep up the great work with your regular
              checkups.
            </p>
          </div>
          <FaChartLine className="h-12 w-12 opacity-75" />
        </div>
      </div>
    </div>
  );
};

export default PatientHome;

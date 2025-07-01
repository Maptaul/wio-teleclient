import { useContext, useState } from "react";
import {
  FaCalendarAlt,
  FaChartLine,
  FaCheckCircle,
  FaClock,
  FaHeart,
  FaStethoscope,
  FaUsers,
  FaVideo,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const DoctorHome = () => {
  const { user } = useContext(AuthContext);
  const [dashboardData] = useState({
    todayAppointments: 8,
    totalPatients: 156,
    completedConsultations: 89,
    averageRating: 4.8,
    pendingAppointments: 5,
    weeklyConsultations: 45,
    patientSatisfaction: 96,
  });

  const [recentActivity] = useState([
    {
      id: 1,
      patient: "John Doe",
      type: "Video Consultation",
      time: "2 hours ago",
      status: "Completed",
    },
    {
      id: 2,
      patient: "Sarah Smith",
      type: "Follow-up",
      time: "4 hours ago",
      status: "Completed",
    },
    {
      id: 3,
      patient: "Mike Johnson",
      type: "Initial Consultation",
      time: "1 day ago",
      status: "Completed",
    },
    {
      id: 4,
      patient: "Emily Davis",
      type: "Check-up",
      time: "1 day ago",
      status: "Scheduled",
    },
  ]);

  const stats = [
    {
      title: "Today's Appointments",
      value: dashboardData.todayAppointments,
      icon: FaCalendarAlt,
      color: "bg-blue-500",
      change: "+3 from yesterday",
      link: "/dashboard/schedule",
    },
    {
      title: "Total Patients",
      value: dashboardData.totalPatients,
      icon: FaUsers,
      color: "bg-green-500",
      change: "+12 this month",
      link: "/dashboard/my-patients",
    },
    {
      title: "Completed Consultations",
      value: dashboardData.completedConsultations,
      icon: FaStethoscope,
      color: "bg-purple-500",
      change: "+8 this week",
      link: "/dashboard/consultations",
    },
    {
      title: "Average Rating",
      value: `${dashboardData.averageRating}/5`,
      icon: FaHeart,
      color: "bg-red-500",
      change: "+0.2 points",
      link: "/dashboard/analytics",
    },
  ];

  const quickActions = [
    {
      title: "Start Video Consultation",
      description: "Begin a video session with patients",
      icon: FaVideo,
      color: "bg-blue-600",
      link: "/dashboard/consultations",
    },
    {
      title: "View Today's Schedule",
      description: "Check appointments for today",
      icon: FaCalendarAlt,
      color: "bg-green-600",
      link: "/dashboard/schedule",
    },
    {
      title: "Patient Records",
      description: "Access patient medical records",
      icon: FaUsers,
      color: "bg-purple-600",
      link: "/dashboard/my-patients",
    },
    {
      title: "Analytics Dashboard",
      description: "View performance analytics",
      icon: FaChartLine,
      color: "bg-indigo-600",
      link: "/dashboard/analytics",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, Dr.{" "}
              {user?.displayName || user?.email?.split("@")[0] || "Doctor"}!
            </h1>
            <p className="text-gray-600 mt-1">
              Here's your practice overview for today
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-lg font-semibold text-blue-600">
              {dashboardData.todayAppointments} appointments today
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <NavLink
            key={index}
            to={stat.link}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="text-white text-xl" />
              </div>
            </div>
          </NavLink>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {quickActions.map((action, index) => (
              <NavLink
                key={index}
                to={action.link}
                className="flex items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className={`${action.color} p-3 rounded-full mr-4`}>
                  <action.icon className="text-white text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
              >
                <div className="flex items-center">
                  <div className="bg-blue-500 p-2 rounded-full mr-3">
                    {activity.status === "Completed" ? (
                      <FaCheckCircle className="text-white text-sm" />
                    ) : (
                      <FaClock className="text-white text-sm" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {activity.patient}
                    </p>
                    <p className="text-sm text-gray-600">{activity.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{activity.time}</p>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      activity.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <NavLink
              to="/dashboard/consultations"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View all consultations →
            </NavLink>
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Performance Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 rounded-lg bg-blue-50">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {dashboardData.weeklyConsultations}
            </div>
            <p className="text-gray-600">Consultations This Week</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-green-50">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {dashboardData.patientSatisfaction}%
            </div>
            <p className="text-gray-600">Patient Satisfaction</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-purple-50">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {dashboardData.pendingAppointments}
            </div>
            <p className="text-gray-600">Pending Appointments</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorHome;

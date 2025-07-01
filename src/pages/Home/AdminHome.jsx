import { useContext, useState } from "react";
import {
  FaChartBar,
  FaChartLine,
  FaCheckCircle,
  FaCog,
  FaExclamationTriangle,
  FaHospital,
  FaStethoscope,
  FaUserMd,
  FaUsers,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const AdminHome = () => {
  const { user } = useContext(AuthContext);
  const [dashboardData] = useState({
    totalDoctors: 45,
    totalPatients: 1250,
    totalAppointments: 3540,
    platformRevenue: 125400,
    activeConsultations: 12,
    systemUptime: 99.8,
    pendingVerifications: 8,
    monthlyGrowth: 15.5,
  });

  const [systemAlerts] = useState([
    {
      id: 1,
      type: "warning",
      message: "Server maintenance scheduled for tonight",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "info",
      message: "8 new doctor applications pending review",
      time: "4 hours ago",
    },
    {
      id: 3,
      type: "success",
      message: "Payment system update completed",
      time: "1 day ago",
    },
    {
      id: 4,
      type: "warning",
      message: "Storage usage at 85%",
      time: "1 day ago",
    },
  ]);

  const stats = [
    {
      title: "Total Doctors",
      value: dashboardData.totalDoctors,
      icon: FaUserMd,
      color: "bg-blue-500",
      change: "+5 this month",
      link: "/dashboard/manage-doctors",
    },
    {
      title: "Total Patients",
      value: dashboardData.totalPatients.toLocaleString(),
      icon: FaUsers,
      color: "bg-green-500",
      change: `+${dashboardData.monthlyGrowth}% growth`,
      link: "/dashboard/manage-users",
    },
    {
      title: "Platform Revenue",
      value: `$${dashboardData.platformRevenue.toLocaleString()}`,
      icon: FaChartLine,
      color: "bg-purple-500",
      change: "+22% this quarter",
      link: "/dashboard/platform-analytics",
    },
    {
      title: "System Uptime",
      value: `${dashboardData.systemUptime}%`,
      icon: FaHospital,
      color: "bg-red-500",
      change: "99.9% target",
      link: "/dashboard/system-settings",
    },
  ];

  const quickActions = [
    {
      title: "Manage Doctors",
      description: "Review and approve doctor applications",
      icon: FaUserMd,
      color: "bg-blue-600",
      link: "/dashboard/manage-doctors",
      badge: dashboardData.pendingVerifications,
    },
    {
      title: "Platform Analytics",
      description: "View detailed platform statistics",
      icon: FaChartBar,
      color: "bg-green-600",
      link: "/dashboard/platform-analytics",
    },
    {
      title: "User Management",
      description: "Manage patients and user accounts",
      icon: FaUsers,
      color: "bg-purple-600",
      link: "/dashboard/manage-users",
    },
    {
      title: "System Settings",
      description: "Configure platform settings",
      icon: FaCog,
      color: "bg-indigo-600",
      link: "/dashboard/system-settings",
    },
  ];

  const getAlertIcon = (type) => {
    switch (type) {
      case "warning":
        return <FaExclamationTriangle className="text-yellow-500" />;
      case "success":
        return <FaCheckCircle className="text-green-500" />;
      default:
        return <FaStethoscope className="text-blue-500" />;
    }
  };

  const getAlertBg = (type) => {
    switch (type) {
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      case "success":
        return "bg-green-50 border-green-200";
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back,{" "}
              {user?.displayName || user?.email?.split("@")[0] || "Admin"}!
            </h1>
            <p className="text-gray-600 mt-1">
              Here's your platform overview and system status
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
              {dashboardData.activeConsultations} active consultations
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
                className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <div className={`${action.color} p-3 rounded-full mr-4`}>
                    <action.icon className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {action.description}
                    </p>
                  </div>
                </div>
                {action.badge && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {action.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            System Alerts
          </h2>
          <div className="space-y-4">
            {systemAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded-lg border ${getAlertBg(alert.type)}`}
              >
                <div className="flex items-start">
                  <div className="mr-3 mt-0.5">{getAlertIcon(alert.type)}</div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">{alert.message}</p>
                    <p className="text-sm text-gray-500 mt-1">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <NavLink
              to="/dashboard/system-settings"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View all system logs →
            </NavLink>
          </div>
        </div>
      </div>

      {/* Platform Analytics Overview */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Platform Analytics Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 rounded-lg bg-blue-50">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {dashboardData.totalAppointments.toLocaleString()}
            </div>
            <p className="text-gray-600">Total Appointments</p>
            <p className="text-sm text-green-600 mt-1">+12% this month</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-green-50">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {dashboardData.activeConsultations}
            </div>
            <p className="text-gray-600">Active Consultations</p>
            <p className="text-sm text-blue-600 mt-1">Live now</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-purple-50">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {dashboardData.monthlyGrowth}%
            </div>
            <p className="text-gray-600">Monthly Growth</p>
            <p className="text-sm text-green-600 mt-1">Above target</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-yellow-50">
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {dashboardData.pendingVerifications}
            </div>
            <p className="text-gray-600">Pending Reviews</p>
            <p className="text-sm text-red-600 mt-1">Needs attention</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;

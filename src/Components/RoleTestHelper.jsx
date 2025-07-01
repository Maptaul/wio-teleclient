import { useState } from "react";
import { FaCheck, FaCog, FaInfo, FaUser, FaUserMd } from "react-icons/fa";

const RoleTestHelper = () => {
  const [currentRole, setCurrentRole] = useState("patient");

  const roleFeatures = {
    patient: [
      "Patient Home dashboard with health statistics",
      "Appointments dropdown with categorized counts (Upcoming, Today, Completed, All)",
      "Find Doctors navigation",
      "Medical Records access",
      "Profile management",
    ],
    doctor: [
      "Doctor Home dashboard with practice overview",
      "My Patients with count badges",
      "Schedule with today's appointments count",
      "Video Consultations management",
      "Analytics and performance tracking",
      "Recent activity feed",
    ],
    admin: [
      "Admin Home with platform overview",
      "Manage Users with user count badges",
      "Manage Doctors with doctor count badges",
      "Platform Analytics with growth metrics",
      "System Settings and alerts",
      "Revenue and uptime monitoring",
    ],
  };

  const roleInfo = {
    patient: {
      title: "Patient Dashboard",
      description:
        "Access your health information, appointments, and find doctors",
      icon: FaUser,
      color: "bg-blue-500",
    },
    doctor: {
      title: "Doctor Dashboard",
      description: "Manage your practice, patients, and consultations",
      icon: FaUserMd,
      color: "bg-green-500",
    },
    admin: {
      title: "Admin Dashboard",
      description: "Oversee platform operations, users, and analytics",
      icon: FaCog,
      color: "bg-purple-500",
    },
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <FaInfo className="text-blue-500 text-2xl mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard Features Guide
          </h1>
        </div>
        <p className="text-gray-600">
          This telemedicine dashboard is inspired by a grievance management
          system and features role-based navigation with dynamic counts,
          dropdowns, and comprehensive role-specific dashboards.
        </p>
      </div>

      {/* Role Selector */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Test Different Roles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(roleInfo).map(([role, info]) => (
            <button
              key={role}
              onClick={() => setCurrentRole(role)}
              className={`p-4 rounded-lg border-2 transition-all ${
                currentRole === role
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center mb-2">
                <div className={`${info.color} p-2 rounded-full mr-3`}>
                  <info.icon className="text-white text-lg" />
                </div>
                <h3 className="font-semibold text-gray-900">{info.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{info.description}</p>
            </button>
          ))}
        </div>
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800">
            <strong>Tip:</strong> Use the role switcher in the top-right of the
            dashboard to test different roles.
          </p>
        </div>
      </div>

      {/* Features for Selected Role */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {roleInfo[currentRole].title} Features
        </h2>
        <div className="space-y-3">
          {roleFeatures[currentRole].map((feature, index) => (
            <div key={index} className="flex items-start">
              <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Key Features from Grievance System */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Grievance System-Inspired Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Navigation Features
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Collapsible sidebar with smooth animations</li>
              <li>• Role-based menu rendering</li>
              <li>• Dropdown menus with expand/collapse</li>
              <li>• Active route highlighting</li>
              <li>• Count badges on menu items</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Dashboard Features
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Dynamic data fetching and counts</li>
              <li>• Role-specific statistics cards</li>
              <li>• Quick action buttons</li>
              <li>• Recent activity feeds</li>
              <li>• Professional, mobile-friendly UI</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Implementation Notes */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Implementation Notes
        </h2>
        <div className="prose text-gray-700">
          <p className="mb-3">
            This dashboard transforms the telemedicine app with a sidebar-based,
            role-driven layout inspired by the grievance management system you
            provided. Key adaptations include:
          </p>
          <ul className="list-disc list-inside space-y-1 mb-3">
            <li>Replaced complaint categories with appointment categories</li>
            <li>
              Adapted user roles (citizen→patient, employee→doctor,
              administrative→admin)
            </li>
            <li>
              Maintained the same navigation structure and count badge system
            </li>
            <li>Added telemedicine-specific quick actions and statistics</li>
            <li>Preserved the professional, government-style UI design</li>
          </ul>
          <p>
            The dashboard includes comprehensive role-specific home pages with
            statistics, quick actions, and recent activity feeds tailored to
            each user type.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleTestHelper;

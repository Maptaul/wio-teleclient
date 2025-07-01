const DoctorCard = ({ doctor }) => {
  // Add null check for doctor
  if (!doctor) {
    return null;
  }

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md flex flex-col gap-2">
      <div className="text-sm text-gray-400">
        Next available: {doctor.nearestApp || "Not available"}
      </div>
      <div className="text-lg font-semibold">{doctor.name}</div>
      <div className="text-sm text-blue-700 font-medium">{doctor.title}</div>
      <div className="text-yellow-500 text-sm">
        ⭐ {doctor.rating} ({doctor.numReviews} Reviews)
      </div>

      <div className="flex flex-wrap gap-1 mt-2">
        {doctor.interests && doctor.interests.length > 0 ? (
          doctor.interests.map((interest, idx) => (
            <span
              key={idx}
              className="bg-gray-100 text-xs px-2 py-1 rounded-full"
            >
              {interest}
            </span>
          ))
        ) : (
          <span className="text-gray-400 text-xs">
            No specializations listed
          </span>
        )}
      </div>

      <div className="text-sm mt-2 text-gray-500">
        {doctor.fees60min} EGP / 60 min • {doctor.fees30min} EGP / 30 min
      </div>

      <div className="flex justify-between mt-4">
        <button className="text-blue-600 text-sm">View Profile</button>
        <button className="bg-blue-600 text-white px-4 py-1 rounded-lg text-sm">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;

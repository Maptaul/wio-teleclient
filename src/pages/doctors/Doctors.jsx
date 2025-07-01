import { useEffect, useState } from "react";
import DoctorGrid from "./DoctorGrid";
import FilterSidebar from "./FilterSidebar";
import ReadyTherapist from "./ReadyTherapist";
import SearchBar from "./SearchBar";
import SortDropdown from "./SortDropDown";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data));
  }, []);

  return (
    <div className="bg-[#f9f9f9] min-h-screen max-w-full md:max-w-[90%] mx-auto">
      <ReadyTherapist />
      <h1 className="text-center text-3xl font-bold my-8 text-[#035fe9]">
        Our Doctors
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 px-4 md:px-12">
        <div className="md:col-span-1">
          <FilterSidebar />
        </div>
        <div className="md:col-span-4 flex flex-col space-y-4">
          <div className="flex gap-4">
            <SearchBar placeholder="Doctor name or title" />
            <SortDropdown />
          </div>
          <DoctorGrid doctors={doctors} />
        </div>
      </div>
    </div>
  );
};

export default Doctors;

import { BsClock } from "react-icons/bs";
import { FaGlobe, FaRegCalendarCheck, FaStar } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa6";
import { GiHeartPlus } from "react-icons/gi";
import { IoMdCalendar } from "react-icons/io";
import { PiGenderIntersexBold } from "react-icons/pi";

const FilterSidebar = () => {
  return (
    <aside className="bg-white p-4 rounded-2xl shadow-md w-full space-y-4">
      <h3 className="text-xl font-bold text-[#343a40] border-b pb-2">
        Filters
      </h3>

      {/* Availability */}
      <div>
        <div className="flex items-center text-blue-600 font-semibold mb-1">
          <FaRegCalendarCheck className="mr-2" />
          Availability
        </div>
        <div className="space-y-1 ml-6 text-sm">
          <label>
            <input type="checkbox" className="mr-2" /> Today
          </label>
          <br />
          <label>
            <input type="checkbox" className="mr-2" /> This Week
          </label>
          <br />
          <label>
            <input type="checkbox" className="mr-2" /> Online
          </label>
        </div>
      </div>

      {/* Date Picker */}
      <div>
        <div className="flex items-center text-blue-600 font-semibold mb-1">
          <IoMdCalendar className="mr-2" />
          Specific date or range
        </div>
        <input
          type="date"
          className="border rounded-lg px-2 py-1 w-full text-sm"
        />
      </div>

      {/* Speciality */}
      <div>
        <div className="flex items-center text-blue-600 font-semibold mb-1">
          <GiHeartPlus className="mr-2" />
          Areas of interest
        </div>
        <select className="border rounded-lg px-2 py-1 w-full text-sm">
          <option>Select speciality</option>
        </select>
      </div>

      {/* Duration */}
      <div>
        <div className="flex items-center text-blue-600 font-semibold mb-1">
          <BsClock className="mr-2" />
          Duration
        </div>
        <div className="ml-6 text-sm space-y-1">
          <label>
            <input type="checkbox" className="mr-2" /> 30 mins
          </label>
          <br />
          <label>
            <input type="checkbox" className="mr-2" /> 60 mins
          </label>
        </div>
      </div>

      {/* Gender */}
      <div>
        <div className="flex items-center text-blue-600 font-semibold mb-1">
          <PiGenderIntersexBold className="mr-2" />
          Doctor Gender
        </div>
        <div className="ml-6 text-sm space-y-1">
          <label>
            <input type="radio" name="gender" className="mr-2" /> Male
          </label>
          <br />
          <label>
            <input type="radio" name="gender" className="mr-2" /> Female
          </label>
          <br />
          <label>
            <input type="radio" name="gender" className="mr-2" /> Any
          </label>
        </div>
      </div>

      {/* Ratings */}
      <div>
        <div className="flex items-center text-blue-600 font-semibold mb-1">
          <FaStar className="mr-2" />
          Ratings
        </div>
        <div className="ml-6 flex text-yellow-400 text-lg">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>
      </div>

      {/* Language & Country */}
      <div>
        <div className="flex items-center text-blue-600 font-semibold mb-1">
          <FaGlobe className="mr-2" />
          Language and country
        </div>
        <select className="border rounded-lg px-2 py-1 w-full mb-2 text-sm">
          <option>Select language</option>
        </select>
        <select className="border rounded-lg px-2 py-1 w-full text-sm">
          <option>Select country</option>
        </select>
      </div>

      {/* Session Fees */}
      <div>
        <div className="flex items-center text-blue-600 font-semibold mb-1">
          <FaMoneyBillWave className="mr-2" />
          Session fees
        </div>
        <input type="range" min="50" max="500" className="w-full" />
      </div>

      {/* Reset Filters */}
      <button className="w-full bg-blue-50 border border-blue-500 text-blue-600 py-2 rounded-lg font-medium mt-4 hover:bg-blue-100 transition">
        Reset Filters
      </button>
    </aside>
  );
};

export default FilterSidebar;

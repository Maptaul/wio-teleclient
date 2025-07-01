import { IoIosSearch } from "react-icons/io";

const SearchBar = ({ placeholder }) => {
  return (
    <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 bg-white w-full">
      <IoIosSearch className="text-gray-500 mr-2" />
      <input
        className="w-full focus:outline-none"
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;

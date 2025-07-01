import { GoDotFill } from "react-icons/go";

const ReadyTherapist = () => {
  return (
    <div className="bg-white rounded-2xl p-4 m-4 md:m-8 shadow">
      <div className="flex items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-4 text-center">
          <h2 className="text-2xl font-bold ">
            If you need to talk now, we are here to help you
          </h2>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <img src="/src/assets/logo.png" className="w-16 h-16" alt="logo" />
        <div className="flex items-center text-green-600 text-xl">
          <GoDotFill /> 3 Doctor are ready to start now within 15 mins
        </div>
        <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg">
          Explore
        </button>
      </div>
    </div>
  );
};

export default ReadyTherapist;

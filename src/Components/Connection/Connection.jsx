import { FaPumpMedical } from "react-icons/fa6";
import { IoSadOutline } from "react-icons/io5";
import { MdNoFood, MdOutlinePeople } from "react-icons/md";
import { PiSmileySad, PiSyringeDuotone } from "react-icons/pi";
import { TbAppsFilled, TbMoodSadDizzy } from "react-icons/tb";

const specialties = [
  { icon: <PiSmileySad className="text-4xl" />, label: "Depression" },
  { icon: <TbMoodSadDizzy className="text-4xl" />, label: "Mood Disorders" },
  { icon: <IoSadOutline className="text-4xl" />, label: "Anxiety Disorders" },
  { icon: <FaPumpMedical className="text-4xl" />, label: "OCD" },
  { icon: <PiSyringeDuotone className="text-4xl" />, label: "Addiction" },
  { icon: <MdNoFood className="text-4xl" />, label: "Eating Disorders" },
  { icon: <MdOutlinePeople className="text-4xl" />, label: "Couple Therapy" },
  { icon: <TbAppsFilled className="text-4xl rotate-180" />, label: "Others" },
];

const Connection = () => {
  return (
    <section className="mb-10 px-4 py-20">
      <div className="flex flex-col space-y-6 max-w-full md:max-w-[90%]  mx-auto text-center">
        <h2 className="text-[#343a40] font-bold text-3xl">
          We Connect You With Licensed Doctor
        </h2>
        <p className="text-[#035fe9] text-xl">
          Select the speciality that fits your need.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-4">
          {specialties.map((item, idx) => (
            <div
              key={idx}
              className="text-[#035fe9] bg-white rounded-2xl p-4 flex items-center justify-center space-x-3 text-lg font-medium shadow-lg hover:shadow-xl transition"
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Connection;

const steps = [
  {
    id: 1,
    title: "Signup as a customer",
    desc: "Answer a few questions to get matched with the right doctor. You can also select the doctor yourself",
    img: "/src/assets/hiw1.svg",
  },
  {
    id: 2,
    title: "Book your session",
    desc: "Choose date and time that suits you and pay using different payment methods",
    img: "/src/assets/hiw2.svg",
  },
  {
    id: 3,
    title: "Start your journey",
    desc: "You can communicate with your doctor in different ways during the session: camera, mic, and chatting",
    img: "/src/assets/hiw3.svg",
  },
];

const HowItWorks = () => {
  return (
    <section className="max-w-full md:max-w-[90%]  mx-auto text-center mb-10 px-4">
      <div className="flex flex-col space-y-10 max-w-full   mx-auto">
        <h2 className="text-[#343a40] font-bold text-3xl text-center">
          How it works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-xl px-6 py-10">
          {steps.slice(0, 2).map((step) => (
            <div key={step.id} className="flex items-start space-x-6">
              <img
                src={step.img}
                alt={step.title}
                className="w-20 h-20 object-contain"
              />
              <div className="flex flex-col space-y-4">
                <h3 className="text-[#035fe9] font-bold text-lg">
                  {step.id}. {step.title}
                </h3>
                <p className="text-[#212529] text-sm">{step.desc}</p>
              </div>
            </div>
          ))}

          {/* Third step: full width */}
          <div className="md:col-span-2 flex items-start space-x-6 justify-center md:px-[20%]">
            <img
              src={steps[2].img}
              alt={steps[2].title}
              className="w-20 h-20 object-contain"
            />
            <div className="flex flex-col space-y-4">
              <h3 className="text-[#035fe9] font-bold text-lg">
                {steps[2].id}. {steps[2].title}
              </h3>
              <p className="text-[#212529] text-sm">{steps[2].desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

import Banner from "../../Components/Banner/Banner";
import Connection from "../../Components/Connection/Connection";
import HowItWorks from "../../Components/HowItWorksComp/HowItWorks";
import ReadyTherapist from "../doctors/ReadyTherapist";

const Home = () => {
  return (
    <div className="">
      <section>
        <Banner />
      </section>
      <section>
        <Connection />
      </section>
      <section className="max-w-full md:max-w-[90%] mx-auto">
        <ReadyTherapist />
      </section>
      <section>
        <HowItWorks />
      </section>
    </div>
  );
};

export default Home;

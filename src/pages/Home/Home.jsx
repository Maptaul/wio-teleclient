import Banner from "../../Components/Banner/Banner";
import ChooseUs from "../../Components/chooseUs/chooseUs";
import Features from "../../Components/features/features";
import HealthNetwork from "../../Components/healthNetwork/HealthNetwork";
import Services from "../../Components/services/services";
import Testimonials from "../../Components/testimonials/Testimonials";
import WhyChoose from "../../Components/whyChoose/WhyChoose";

const Home = () => {
  return (
    <div>
      <section>
        <Banner />
      </section>
      <section>
        <Services />
      </section>
      <section>
        <ChooseUs />
      </section>
      <section>
        <Features />
      </section>
      <section>
        <Testimonials />
      </section>
      <section>
        <WhyChoose />
      </section>
      <section>
        <HealthNetwork />
      </section>
    </div>
  );
};

export default Home;

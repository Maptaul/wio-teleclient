import { Helmet } from "react-helmet-async";
import Banner from "../../Components/Banner/Banner";
import ChooseUs from "../../Components/chooseUs/chooseUs";
import Features from "../../Components/features/features";
import HealthNetwork from "../../Components/healthNetwork/HealthNetwork";
import Services from "../../Components/services/services";
import Testimonials from "../../Components/testimonials/Testimonials";
import WhyChoose from "../../Components/whyChoose/WhyChoose";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>
          WioCare – Smart AI‑Powered Health App for Medicine Reminders & Doctor
          Appointments
        </title>
        <meta
          name="description"
          content="WioCare is a tech‑driven healthcare platform offering smart medicine reminders, easy doctor appointment booking, and personalized AI‑powered care—all with secure data protection."
        />
        <meta
          name="keywords"
          content="WioCare, healthcare app, medicine reminders, doctor appointment booking, AI healthcare, personalized health tracking, secure health data, telehealth solution"
        />
        <meta property="og:url" content="https://wiocare.com/" />
      </Helmet>

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
    </>
  );
};

export default Home;

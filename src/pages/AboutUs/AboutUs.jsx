import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { BiPlusMedical } from "react-icons/bi";
import { FaPlay } from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import styles from "./about.module.scss";

// Import assets
import founder from "../../assets/founder.webp";
import image1 from "../../assets/image1.jpg";
import image4 from "../../assets/image4.jpg";
import image5 from "../../assets/image5.jpg";
import logo from "../../assets/logo.webp";
import Leaders from "../../Components/leaders/Leaders";

// Simple counter component
const OdometerCounter = ({ value }) => {
  return <span>{value}</span>;
};

export default function AboutUs() {
  const [showVideo, setShowVideo] = useState(false);
  const videoId = "BW5XqkOprL4"; // Replace with your YouTube video ID
  const posterUrl = image1; // Use actual image

  const handlePlay = () => {
    setShowVideo(true);
  };

  return (
    <>
      <Helmet>
        <title>About WioCare – Our Mission, Our Team, Our Story</title>
        <meta
          name="description"
          content="Discover the team, mission, and story behind WioCare — a smart health platform designed to empower you with personalized care, medication reminders, and convenient doctor appointments."
        />
        <meta
          name="keywords"
          content="WioCare, about us, team, mission, health platform, medication reminder, doctor booking, personalized care, digital health"
        />
        <link rel="canonical" href="https://wiocare.vercel.app/about" />
        <meta
          property="og:title"
          content="About WioCare – Our Mission, Our Team, Our Story"
        />
        <meta
          property="og:description"
          content="Discover the team, mission, and story behind WioCare — a smart health platform designed to empower you with personalized care, medication reminders, and convenient doctor appointments."
        />
        <meta property="og:url" content="https://wiocare.vercel.app/about" />
        <meta property="og:type" content="website" />
      </Helmet>

      <main className={styles.page}>
        <section className={styles.banner}>
          <div className={styles.container}>
            <div className={styles.content}>
              <h1>Who We Are</h1>
              <h2>The Story Behind Wio Care</h2>
              <p>
                Wio Care is a tech-driven healthcare platform designed to
                simplify and enhance the way people monitor their health. We are
                a team of innovators, healthcare experts, and technology
                enthusiasts committed to creating smarter wellness solutions.
              </p>
              <div className={styles.btns}>
                <Link to="#leadership" className={styles.btnOne}>
                  Meet Us <MdKeyboardDoubleArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.missionVision}>
          <div className={styles.container}>
            <div className={styles.row}>
              <div className={styles.image}>
                <img src={image4} alt="Our Vision" />
              </div>
              <div className={styles.content}>
                <h2>
                  <span>Our Vision</span>
                  <h1 className={styles.visionTitle}>
                    Digital platform for everyone.
                  </h1>
                </h2>
                <p>
                  We strive to create a future where technology enhances patient
                  care, detects diseases early, and ensures affordable,
                  high-quality medical services for everyone.
                </p>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.content}>
                <h2>
                  <span>Our Mission</span>
                  Smarter and more Accessible with AI
                </h2>
                <p>
                  To be the top AI healthcare platform in Bangladesh, where no
                  one suffers from wrong diagnoses or unnecessary treatments,
                  and everyone has easy access to personalized health solutions
                </p>
              </div>
              <div className={styles.image}>
                <img src={image5} alt="Our Mission" />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.video}>
          <div className={styles.container}>
            <div className={styles.wrapper}>
              {!showVideo ? (
                <div className={styles.thumbnail} onClick={handlePlay}>
                  <img
                    src={posterUrl}
                    alt="Video thumbnail"
                    className="object-cover"
                  />
                  <div className={styles.play}>
                    <FaPlay />
                  </div>
                </div>
              ) : (
                <iframe
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Wio Care"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>
        </section>

        <section className={styles.healthcare}>
          <div className={styles.container}>
            <div className={styles.content}>
              <h2>Bringing Healthcare Closer to You</h2>
              <p>
                Imagine a world where healthcare is simple, fast, and always
                within reach. No more long waits, no more confusion—just the
                right care at the right time. With our AI-powered platform, we
                make sure you get the medical attention you need without the
                hassle.
              </p>
              <p>
                Whether it's finding the best doctor, keeping track of your
                prescriptions, or detecting health risks early, our smart
                technology works for you. Healthcare should be effortless, and
                we are here to make that a reality.
              </p>
            </div>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <h4>
                  <OdometerCounter value={99} />
                  .9
                  <span className={styles.fig}>%</span>
                </h4>
                <h5>Data Protection</h5>
              </div>
              <div className={styles.stat}>
                <h4>
                  <OdometerCounter value={750} />
                  <span className={styles.fig}>K</span> <BiPlusMedical />
                </h4>
                <h5>Health Assessments</h5>
              </div>
              <div className={styles.stat}>
                <h4>
                  <OdometerCounter value={1} />
                  .2
                  <span className={styles.fig}>M</span> <BiPlusMedical />
                </h4>
                <h5>Health Insights</h5>
              </div>
              <div className={styles.stat}>
                <h4>
                  <OdometerCounter value={500} /> <BiPlusMedical />
                </h4>
                <h5>Health Experts</h5>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.founder}>
          <div className={styles.container}>
            <div className={styles.row}>
              <div className={styles.image}>
                <img src={founder} alt="Founder" />
              </div>
              <div className={styles.content}>
                <img src={logo} alt="WioCare Logo" />
                <h2>Healthcare Made Smarter, Lives Made Better</h2>
                <p>
                  We started this journey to make healthcare easier and better
                  for everyone. With AI, we can help people get the right care
                  without delays or complications. Our goal is simple – to use
                  technology to improve lives and bring better healthcare to
                  all.
                </p>
                <h3>Bappa Siblo</h3>
                <h4>Founder Wio Care</h4>
              </div>
            </div>
          </div>
        </section>
        <Leaders />
      </main>
    </>
  );
}

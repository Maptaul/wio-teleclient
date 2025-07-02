import styles from "../../styles/Home.module.scss";
const Features = () => {
  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.image}>
            <img src={"/src/assets/track.svg"} alt={""} />
          </div>
          <div className={styles.content}>
            <h2>
              <span>Health Tracker</span>
              Track your Health with our app.
            </h2>
            <p>
              Stay on top of your health with our easy-to-use app. Monitor your
              medical records, track prescriptions, and get health updates—all
              in one place.
            </p>
            <ul>
              <li>Store & Access Medical Records anytime</li>
              <li>Get Medicine Reminders so you never miss a dose</li>
              <li>Track Your Health Progress with AI insights</li>
              <li>Book Doctor Appointments in just a few taps</li>
            </ul>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.content}>
            <h2>
              <span>Smart Notification</span>
              Never miss your medicine routine.
            </h2>
            <p>
              Get smart reminders so you always take your medicine on time. Our
              app helps you stay on track with your prescriptions, keeping you
              healthy and worry-free.
            </p>
            <ul>
              <li>Timely Alerts for every dose</li>
              <li>Easy-to-Use Tracker for all your medications</li>
              <li>AI-Powered Insights to manage your health better</li>
            </ul>
          </div>
          <div className={styles.image}>
            <img src={"/src/assets/notification.svg"} alt={""} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

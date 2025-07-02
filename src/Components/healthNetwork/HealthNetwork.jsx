import { IoMdDownload } from "react-icons/io";
import { Link } from "react-router-dom";
import styles from "../../styles/Home.module.scss";
import Stats from "../stats/Stats";
const HealthNetwork = () => {
  return (
    <section className={styles.healthNetwork}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.image}>
            <img src={"/src/assets/image2.jpg"} alt={""} />
          </div>
          <div className={styles.content}>
            <p className={styles.span}>Smart Health Network</p>
            <h2 className={styles.title}>
              AI-powered care, keeping patients healthy and on track.
            </h2>
            <p>
              For each project we establish relationships with partners who we
              know will help us create added value for your project. As well as
              bringing together the public and private sectors, we make
            </p>
            <Link to="" className={styles.btn}>
              Download App <IoMdDownload />
            </Link>
          </div>
        </div>
        <Stats />
      </div>
    </section>
  );
};

export default HealthNetwork;

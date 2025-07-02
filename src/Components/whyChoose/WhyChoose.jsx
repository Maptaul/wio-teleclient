import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.scss";
const WhyChoose = () => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    fetch("../../../public//features.json")
      .then((res) => res.json())
      .then((data) => setFeatures(data))
      .catch((err) => console.error("Failed to fetch features data", err));
  }, []);
  return (
    <section className={styles.whyChoose} id="projects">
      <div className={styles.container}>
        <div className={styles.head}>
          {/* <p className={styles.title}>Why choose us</p> */}
          <h2>Securely upload, store, and access patient data.</h2>
        </div>
        <div className={styles.row}>
          {features.map((category, index) => (
            <div key={index} className={styles.wrapper}>
              <div className={styles.content}>
                <h3>
                  <img src={"/src/assets/wiocare-vector.png"} alt={""} />{" "}
                  {category.title}
                </h3>
                <p>{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;

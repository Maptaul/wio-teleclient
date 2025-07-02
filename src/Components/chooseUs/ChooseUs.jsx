import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.scss";

const ChooseUs = () => {
  const [chooseUs, setChooseUs] = useState([]);

  useEffect(() => {
    fetch("../../../public/chooseUs.json")
      .then((res) => res.json())
      .then((data) => setChooseUs(data))
      .catch((err) => console.error("Failed to fetch chooseUs data", err));
  }, []);

  return (
    <section className={styles.whyChoose}>
      <div className={styles.container}>
        <div className={styles.head}>
          <p className={styles.title}>Why choose us</p>
          <h2>Fully Licensed, Bonded, And Insured</h2>
        </div>

        <div className={styles.row}>
          {chooseUs.map((category, index) => (
            <div key={index} className={styles.wrapper}>
              <div className={styles.content}>
                <h3>
                  <img
                    src="/src/assets/wiocare-vector.png"
                    alt=""
                    className={styles.iconImg}
                  />{" "}
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

export default ChooseUs;

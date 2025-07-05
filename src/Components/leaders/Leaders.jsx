import { useEffect, useState } from "react";
import styles from "../../pages/AboutUs/about.module.scss";

const Leaders = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch leaders data from JSON file
  useEffect(() => {
    const fetchLeaders = async () => {
      const response = await fetch("/leaders.json");
      const data = await response.json();
      setLeaders(data);
      setLoading(false);
    };
    fetchLeaders();
  }, []);

  return (
    <section className={styles.leaders} id="leadership">
      <div className={styles.container}>
        <div className={styles.head}>
          <h2>Our Leadership</h2>
        </div>
        <div className={styles.row}>
          {loading ? (
            <div className={styles.loading}>
              <p>Loading team members...</p>
            </div>
          ) : (
            <>
              {leaders.map((leader, index) => (
                <div key={index} className={styles.col}>
                  <div className={styles.image}>
                    <img src={leader.image} alt={leader.name} />
                  </div>
                  <div className={styles.about}>
                    <h3>{leader.name}</h3>
                    <p>{leader.position}</p>
                  </div>
                </div>
              ))}
              <div className={styles.col}>
                <div className={styles.about}>
                  <h2>20+</h2>
                  <h3>Amazing team members</h3>
                  <p>Doing amazing job everyday</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Leaders;

import { useEffect, useState } from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import styles from "../../styles/Home.module.scss";

const Services = () => {
  const [servicesData, setServicesData] = useState([]);
  const [openItems, setOpenItems] = useState({});

  useEffect(() => {
    fetch("/public/services.json")
      .then((res) => res.json())
      .then((data) => setServicesData(data))
      .catch((err) => console.error("Failed to fetch services data:", err));
  }, []);

  const toggleItem = (sectionIdx, featureIdx) => {
    const key = `${sectionIdx}-${featureIdx}`;
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <section className={styles.services} id="key">
      <div className={styles.container}>
        <div className={styles.head}>
          <h2>Services of WIO Care</h2>
          <p>
            WIO Care is trying to solve Bangladesh’s healthcare sector problem
            with the following services:
          </p>
        </div>

        <div className={styles.row}>
          {servicesData.map((section, sectionIdx) => (
            <div key={sectionIdx} className={styles.col}>
              <div className={styles.colWrap}>
                <div className={styles.contentWrap}>
                  <h3>{section.title}</h3>

                  {section.features.map((feature, featureIdx) => {
                    const key = `${sectionIdx}-${featureIdx}`;
                    const isOpen = openItems[key];

                    return (
                      <div
                        key={featureIdx}
                        className={`${styles.content} ${
                          isOpen ? styles.active : ""
                        }`}
                      >
                        <button
                          onClick={() => toggleItem(sectionIdx, featureIdx)}
                          className={styles.title}
                        >
                          <MdKeyboardDoubleArrowRight />
                          {feature.heading}
                        </button>

                        {isOpen && (
                          <p className={styles.description}>
                            {feature.description}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className={styles.image}>
                  <img src={section.image} alt={section.title} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

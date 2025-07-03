import { useEffect, useRef, useState } from "react";
import { BiPlusMedical } from "react-icons/bi";
import styles from "./stats.module.scss";

// Counter with animation and intersection observer
const OdometerCounter = ({ value }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) observer.unobserve(counterRef.current);
      observer.disconnect();
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return <span ref={counterRef}>{count}</span>;
};

export default function Stats() {
  return (
    <section className={styles.stats}>
      <div className="container max-w-7xl mx-auto px-4">
        <div className={styles.wrapper}>
          <div className={styles.stat}>
            <h4>
              <OdometerCounter value={325} />
              <span className={styles.fig}>K</span>
              <BiPlusMedical className={styles.plusIcon} />
            </h4>
            <h5>Active Users</h5>
          </div>
          <div className={styles.stat}>
            <h4>
              <OdometerCounter value={640} />
              <span className={styles.fig}>K</span>
              <BiPlusMedical className={styles.plusIcon} />
            </h4>
            <h5>Total Downloads</h5>
          </div>
          <div className={styles.stat}>
            <h4>
              <OdometerCounter value={200} />
              <BiPlusMedical className={styles.plusIcon} />
            </h4>
            <h5>Health Care Videos</h5>
          </div>
          <div className={styles.stat}>
            <h4>
              <OdometerCounter value={100} />
              <BiPlusMedical className={styles.plusIcon} />
            </h4>
            <h5>Diet Menus</h5>
          </div>
        </div>
      </div>
    </section>
  );
}

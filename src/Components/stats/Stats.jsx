import { useEffect, useState } from "react";
import { BiPlusMedical } from "react-icons/bi";
import "./stats.module.scss";

// Simple counter component to replace OdometerCounter
const OdometerCounter = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (count < value) {
        setCount(count + Math.ceil(value / 100));
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [count, value]);

  return <span>{count > value ? value : count}</span>;
};

export default function Stats() {
  return (
    <>
      <section className="stats">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="wrapper">
            <div className="stat">
              <h4>
                <OdometerCounter value={325} />
                <span className="fig">K</span> <BiPlusMedical />
              </h4>
              <h5>Active Users</h5>
            </div>
            <div className="stat">
              <h4>
                <OdometerCounter value={640} />
                <span className="fig">K</span> <BiPlusMedical />
              </h4>
              <h5>Total Download</h5>
            </div>
            <div className="stat">
              <h4>
                <OdometerCounter value={200} /> <BiPlusMedical />
              </h4>
              <h5>Health Care Videos</h5>
            </div>
            <div className="stat">
              <h4>
                <OdometerCounter value={100} /> <BiPlusMedical />
              </h4>
              <h5>Diet Menus</h5>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import styles from "../../styles/Home.module.scss";

const Banner = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.content_wrapper}>
            <div className={styles.content}>
              <h1>Welcome to Wio Care</h1>
              <h2>
                Revolutionizing Bangladesh's <br /> Healthcare with AI
              </h2>
              <div className={styles.btns}>
                <Link href="" className={styles.btnOne}>
                  Start For Free <MdKeyboardDoubleArrowRight />
                </Link>

                <Link href="" className={styles.btnTwo}>
                  Learn More <MdKeyboardDoubleArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;

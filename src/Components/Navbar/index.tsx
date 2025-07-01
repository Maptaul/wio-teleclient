import Link from "next/link";
import styles from "./header.module.scss";
import { Container } from "react-bootstrap";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import NextImage from "@/hooks/NextImage";
import Head from "next/head";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useRouter } from "next/router";
export default function Header() {
  const [show, setShow] = useState(false);

  const router = useRouter();

  const toggleClass = () => {
    setShow((prevState) => !prevState);
  };
  return (
    <>
      <Head>
        <link
          rel="icon"
          href="/images/wiocare-fav.png"
          type="image/svg+xml"
        ></link>
      </Head>
      <header className={styles.header}>
        <div className={styles.wrapper}>
          <Container className={styles.container}>
            <div className={styles.nav}>
              <div className={styles.logo}>
                <Link className={styles.navLink} href="/">
                  <NextImage src={"/images/wiocare.png"} alt={""} />
                </Link>
              </div>
              <ul className={`${show ? styles.show : ""} ${styles.menu}`}>
                <li className={styles.navItem}>
                  <Link
                    href="/"
                    className={`${styles.navLink} ${
                      router.pathname === "/" ? styles.active : ""
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link
                    href="/doctors"
                    className={`${styles.navLink} ${
                      router.pathname === "/doctors" ? styles.active : ""
                    }`}
                  >
                    Docotors
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link
                    href="/about"
                    className={`${styles.navLink} ${
                      router.pathname === "/about" ? styles.active : ""
                    }`}
                  >
                    About Us
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link
                    href="/features"
                    className={`${styles.navLink} ${
                      router.pathname === "/features" ? styles.active : ""
                    }`}
                  >
                    Features
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link
                    href="/plans"
                    className={`${styles.navLink} ${
                      router.pathname === "/plans" ? styles.active : ""
                    }`}
                  >
                    Plans
                  </Link>
                </li>
              </ul>
              <div className={styles.btns}>
                <div className={styles.btn}>
                  <Link className={styles.navLink} href="/e-services">
                    Download App <MdKeyboardDoubleArrowRight />
                  </Link>
                </div>
                <div className={styles.hamMenu} onClick={toggleClass}>
                  <GiHamburgerMenu />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>
    </>
  );
}

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { Navbar } from "@/components/Navbar/Navbar";
import styles from "./Layout.module.css";
import classnames from "classnames";

export function Layout({ children, ...props }) {
  const [prevScrollPosition, setPrevScrollPosition] = useState(null);

  useEffect(() => {
    setPrevScrollPosition(window.pageYOffset);
  }, []);

  const [isVisible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset;
      const visibiilty =
        currentScrollPosition < 200 ||
        prevScrollPosition > currentScrollPosition;

      setPrevScrollPosition(currentScrollPosition);
      setVisible(visibiilty);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPosition]);

  const navbarClass = classnames(styles.NavbarWrapper, {
    [styles.NavBarHidden]: !isVisible,
  });

  return (
    <>
      <Head>
        <title>futurebrian</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main {...props} className={styles.Layout}>
        <div className={navbarClass}>
          <Navbar />
        </div>
        <div style={{ gridRowStart: 2 }}>{children}</div>
      </main>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

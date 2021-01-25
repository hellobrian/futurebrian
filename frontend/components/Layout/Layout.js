import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import classnames from "classnames";
import useMedia from "use-media";

import { Navbar } from "@/components/Navbar/Navbar";
import styles from "./Layout.module.css";

export function Layout({ children, ...props }) {
  const isTablet = useMedia({ minWidth: "768px" });
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

      <main
        {...props}
        className={classnames(styles.Layout, {
          [styles.Tablet]: isTablet,
        })}
      >
        <div className={navbarClass}>
          <Navbar />
        </div>
        <div
          className={classnames(styles.Content, {
            [styles.Tablet]: isTablet,
          })}
        >
          {children}
        </div>
      </main>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

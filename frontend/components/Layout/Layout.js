import PropTypes from "prop-types";
import Head from "next/head";
import { Navbar } from "@/components/Navbar/Navbar";
import styles from "./Layout.module.css";

export function Layout({ children, ...props }) {
  return (
    <>
      <Head>
        <title>futurebrian</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main {...props} className={styles.Layout}>
        <Navbar></Navbar>
        <div style={{ gridRowStart: 2 }}>{children}</div>
      </main>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

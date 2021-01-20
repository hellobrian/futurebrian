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
        <div style={{ position: "fixed", width: "100%" }}>
          <Navbar />
        </div>
        <div style={{ gridRowStart: 2 }}>{children}</div>
      </main>
    </>
  );
}

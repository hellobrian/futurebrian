import Head from "next/head";
import { Nav } from "@/components/Nav/Nav";
import { Footer } from "@/components/Footer/Footer";

import styles from "@/styles/Home.module.css";

interface PageLayoutProps {
  className?: string;
  children: React.ReactNode
}

export function PageLayout(props: PageLayoutProps): JSX.Element {
  const { className = "", children } = props;
  return (
    <>
      <Head>
        <title>futurebrian</title>
      </Head>
      <div className={`${styles.PageLayout} ${className}`.trim()}>
        <Nav />
        <main className={styles.Main} data-name="Main">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}

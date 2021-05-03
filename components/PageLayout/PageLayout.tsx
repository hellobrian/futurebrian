import Head from "next/head";
import { Nav } from "@/components/Nav/Nav";
import { Footer } from "@/components/Footer/Footer";
import { VariantEnum } from "@/utils/types";

import styles from "./PageLayout.module.scss";

interface PageLayoutProps {
  className?: string;
  children: React.ReactNode;
  variant?: VariantEnum;
}

export function PageLayout(props: PageLayoutProps): JSX.Element {
  const { variant = VariantEnum.Default, className = "", children } = props;
  if (variant === VariantEnum.Default) {
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

  if (variant === VariantEnum.Twitch) {
    return (
      <>
        <Head>
          <title>futurebrian</title>
        </Head>
        <div className={`${styles.PageLayout} ${className}`.trim()}>
          <main className={styles.Main} data-name="Main">
            {children}
          </main>
        </div>
      </>
    );
  }
}

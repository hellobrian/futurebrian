import { useState, useEffect } from "react";
import Head from "next/head";
import { useMedia } from "use-media";

import { Navbar } from "@/components/Navbar/Navbar";
import { MenuComponent } from "@/components/MenuComponent/MenuComponent";
import styles from "./PageLayout.module.css";

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState(null);
  const isTablet = useMedia({ minWidth: 768, maxWidth: 1199 });
  const isDesktop = useMedia({ minWidth: 1200 });

  useEffect(() => {
    if (isTablet) {
      setBreakpoint("tablet");
    } else {
      if (isDesktop) {
        setBreakpoint("desktop");
      } else {
        setBreakpoint("mobile");
      }
    }
  }, [isTablet, isDesktop]);

  return { breakpoint };
}

export function PageLayout({ children }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { breakpoint } = useBreakpoint();
  return (
    <>
      <Head>
        <title>futurebrian</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.Main}>
        {breakpoint !== "desktop" && (
          <Navbar
            toggleMenu={() => setMenuOpen(!isMenuOpen)}
            isMenuOpen={isMenuOpen}
            variant={breakpoint}
          />
        )}

        {breakpoint === "mobile" && (
          <div className={styles.Content}>
            {isMenuOpen && <MenuComponent setMenuOpen={setMenuOpen} />}
            {!isMenuOpen && children}
          </div>
        )}

        {breakpoint === "tablet" && (
          <div className={styles.Content}>
            {isMenuOpen && <MenuComponent setMenuOpen={setMenuOpen} />}
            {!isMenuOpen && children}
          </div>
        )}

        {breakpoint === "desktop" && (
          <>
            <div className={styles.Sidebar}>
              <Navbar
                toggleMenu={() => setMenuOpen(!isMenuOpen)}
                isMenuOpen={isMenuOpen}
                variant={breakpoint}
              />
              <MenuComponent setMenuOpen={setMenuOpen}></MenuComponent>
            </div>
            <div className={styles.Content}>{children}</div>
          </>
        )}
      </main>
    </>
  );
}

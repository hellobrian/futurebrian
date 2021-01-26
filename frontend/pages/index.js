import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { request, gql } from "graphql-request";
import { useMedia } from "use-media";

import { Navbar } from "@/components/Navbar/Navbar";
import { MenuComponent } from "@/components/MenuComponent/MenuComponent";
import styles from "@/styles/Home.module.css";

const endpoint = process.env.GRAPHQL_ENDPOINT;
const query = gql`
  query {
    keyboards(sort: "name") {
      id
      name
    }
    keycaps(sort: "name") {
      id
      name
    }
  }
`;

export async function getStaticProps() {
  const data = await request(endpoint, query);
  return {
    props: { data },
    revalidate: 1,
  };
}

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

export default function Home({ data }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { breakpoint } = useBreakpoint();
  console.log({ breakpoint });

  return (
    <>
      <Head>
        <title>futurebrian</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.Main} style={{ height: "200vh" }}>
        {breakpoint !== "desktop" && (
          <Navbar
            toggleMenu={() => setMenuOpen(!isMenuOpen)}
            isMenuOpen={isMenuOpen}
            variant={breakpoint}
          />
        )}

        {breakpoint === "mobile" ||
          (breakpoint === "tablet" && (
            <div className={styles.Content}>
              {isMenuOpen && <MenuComponent data={data}></MenuComponent>}
              {!isMenuOpen && <h1>Home</h1>}
            </div>
          ))}

        {breakpoint === "desktop" && (
          <>
            <div className={styles.Sidebar}>
              <Navbar
                toggleMenu={() => setMenuOpen(!isMenuOpen)}
                isMenuOpen={isMenuOpen}
                variant={breakpoint}
              />
              <MenuComponent data={data}></MenuComponent>
            </div>
            <div className={styles.Content}>
              <h1>hello</h1>
            </div>
          </>
        )}
      </main>
    </>
  );
}

Home.propTypes = {
  data: PropTypes.shape({
    keyboards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      })
    ),
    keycaps: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      })
    ),
  }),
};

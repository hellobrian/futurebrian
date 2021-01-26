import { useState } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { request, gql } from "graphql-request";

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

export default function Home({ data }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <Head>
        <title>futurebrian</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.Main}>
        <Navbar
          toggleMenu={() => setMenuOpen(!isMenuOpen)}
          isMenuOpen={isMenuOpen}
        />
        <div style={{ gridRowStart: 2 }}>
          {isMenuOpen && <MenuComponent data={data}></MenuComponent>}
          {!isMenuOpen && <h1>Home</h1>}
        </div>
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

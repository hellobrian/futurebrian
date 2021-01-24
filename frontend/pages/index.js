import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { request, gql } from "graphql-request";
import { Layout } from "@/components/Layout/Layout";
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

function HeadingWrapper({ heading, info }) {
  return (
    <div className={`${styles.HeadingWrapper} mb--3`}>
      <h2 className={`heading ta--left fs--6 fw--normal px--3`}>{heading}</h2>
      <p className="ff--bebas fs--6 px--3">{info}</p>
    </div>
  );
}

function List({ children }) {
  return <ul className={styles.List}>{children}</ul>;
}

function ListItem({ children }) {
  return (
    <li className={`${styles.ListItem} fs--5`}>
      <span className="name">{children}</span>
    </li>
  );
}

export default function Home({ data }) {
  return (
    <Layout>
      <section className={`${styles.Section} mb--7`}>
        <HeadingWrapper
          heading="Keyboards"
          info={`${data.keyboards.length} keebs`}
        />
        <List>
          {data.keyboards.map((keyboard) => {
            return <ListItem key={keyboard.id}>{keyboard.name}</ListItem>;
          })}
        </List>
      </section>

      <section className={`${styles.Section}`}>
        <HeadingWrapper
          heading="Keycaps"
          info={`${data.keycaps.length} sets`}
        />

        <List>
          {data.keycaps.map((keycaps) => {
            return <ListItem key={keycaps.id}>{keycaps.name}</ListItem>;
          })}
        </List>
      </section>
    </Layout>
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

import { request, gql } from "graphql-request";

import { PageLayout } from "@/components/PageLayout/PageLayout";
import { GridGallery } from "@/components/GridGallery/GridGallery";
import styles from "@/styles/Keyboards.module.css";

const ENDPOINT = process.env.PROD_GRAPHQL_ENDPOINT;

export async function getStaticProps() {
  const query = gql`
    query {
      keycaps {
        name
        id
        thumbnail_public_id
      }
    }
  `;

  const data = await request(ENDPOINT, query);
  return {
    props: { data },
    revalidate: 1,
  };
}

export default function Keycaps({ data }) {
  return (
    <PageLayout className={styles.Keyboards}>
      <div className={styles.PageTitle}>
        <h2>Keycaps</h2>
      </div>
      <GridGallery images={data.keycaps} />
    </PageLayout>
  );
}

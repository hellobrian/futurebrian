import { request, gql } from "graphql-request";
import { GetStaticProps } from 'next'

import { PageLayout } from "@/components/PageLayout/PageLayout";
import { GridGallery } from "@/components/GridGallery/GridGallery";
import styles from "@/styles/Keyboards.module.css";
import { GridGalleryVariant, Keycap } from '@/utils/types'


const ENDPOINT = process.env.PROD_GRAPHQL_ENDPOINT;

export const getStaticProps: GetStaticProps = async () => {
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
  const { keycaps } = data;
  return {
    props: { keycaps },
    revalidate: 1,
  };
}

interface KeycapsProps {
  keycaps: [Keycap]
}

export default function Keycaps(props: KeycapsProps): JSX.Element {
  const { keycaps } = props;
  return (
    <PageLayout className={styles.Keycaps}>
      <div className={styles.PageTitle}>
        <h2>Keycaps</h2>
      </div>
      <GridGallery images={keycaps} variant={GridGalleryVariant.Keycaps} />
    </PageLayout>
  );
}

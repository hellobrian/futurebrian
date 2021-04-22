import { request, gql } from "graphql-request";
import { GetStaticProps } from 'next'

import { PageLayout } from "@/components/PageLayout/PageLayout";
import { GridGallery } from "@/components/GridGallery/GridGallery";
import styles from "@/styles/Keyboards.module.css";
import { Keyboard, GridGalleryVariant } from '@/utils/types'

const ENDPOINT = process.env.PROD_GRAPHQL_ENDPOINT;

export const getStaticProps: GetStaticProps = async () => {
  const query = gql`
    query {
      keyboards {
        name
        id
        thumbnail_public_id
      }
    }
  `;

  const data = await request(ENDPOINT, query);
  const { keyboards } = data;
  return {
    props: { keyboards },
    revalidate: 1,
  };
}

interface KeyboardsProps {
  keyboards: [Keyboard]
}

export default function Keyboards(props: KeyboardsProps): JSX.Element {
  const { keyboards } = props

  return (
    <PageLayout className={styles.Keyboards}>
      <div className={styles.PageTitle}>
        <h2>Keyboards</h2>
      </div>
      <GridGallery images={keyboards} variant={GridGalleryVariant.Keyboards} />
    </PageLayout>
  );
}

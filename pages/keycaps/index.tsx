import { request, gql } from "graphql-request";
import { GetStaticProps } from "next";

import { PageLayout } from "@/components/PageLayout/PageLayout";
import { GridGallery } from "@/components/GridGallery/GridGallery";
import styles from "@/styles/Keyboards.module.scss";
import { GridGalleryVariant, Keycap, StatusEnum } from "@/utils/types";

const ENDPOINT = process.env.PROD_GRAPHQL_ENDPOINT;

export const getStaticProps: GetStaticProps = async () => {
  const query = gql`
    query {
      keycaps {
        name
        id
        thumbnail_public_id
        status
      }
    }
  `;

  const data = await request(ENDPOINT, query);
  const { keycaps } = data;
  return {
    props: { keycaps },
    revalidate: 1,
  };
};

interface KeycapsProps {
  keycaps: [Keycap];
}

export default function Keycaps(props: KeycapsProps): JSX.Element {
  const { keycaps } = props;
  const using = keycaps.filter((keycap) => keycap.status === StatusEnum.Using);
  const storage = keycaps.filter(
    (keycap) => keycap.status === StatusEnum.Storage
  );

  return (
    <PageLayout className={styles.Keycaps}>
      <div className={"page-title"}>
        <h2>Keycaps</h2>
      </div>
      <GridGallery
        images={[...storage, ...using]}
        variant={GridGalleryVariant.Keycaps}
      />
    </PageLayout>
  );
}

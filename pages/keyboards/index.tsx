import { request, gql } from "graphql-request";
import { GetStaticProps } from "next";

import { PageLayout } from "@/components/PageLayout/PageLayout";
import { GridGallery } from "@/components/GridGallery/GridGallery";
import styles from "@/styles/Keyboards.module.scss";
import { Keyboard, GridGalleryVariant, StatusEnum } from "@/utils/types";

const ENDPOINT = process.env.PROD_GRAPHQL_ENDPOINT;

export const getStaticProps: GetStaticProps = async () => {
  const query = gql`
    query {
      keyboards {
        name
        id
        thumbnail_public_id
        status
      }
    }
  `;

  const data = await request(ENDPOINT, query);
  const { keyboards } = data;
  return {
    props: { keyboards },
    revalidate: 1,
  };
};

interface KeyboardsProps {
  keyboards: [Keyboard];
}

export default function Keyboards(props: KeyboardsProps): JSX.Element {
  const { keyboards } = props;
  const using = keyboards.filter(
    (keycap) => keycap.status === StatusEnum.Using
  );
  const storage = keyboards.filter(
    (keycap) => keycap.status === StatusEnum.Storage
  );

  return (
    <PageLayout className={styles.Keyboards}>
      <div className={"page-title"}>
        <h2>Keyboards</h2>
      </div>
      <GridGallery
        images={[...using, ...storage]}
        variant={GridGalleryVariant.Keyboards}
      />
    </PageLayout>
  );
}

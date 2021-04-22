import { request, gql } from "graphql-request";
import { CloudinaryContext, Transformation, Image } from "cloudinary-react";
import { useMedia } from "use-media";

import { PageLayout } from "@/components/PageLayout/PageLayout";
import styles from "@/styles/Keyboards.module.css";

const ENDPOINT = process.env.PROD_GRAPHQL_ENDPOINT;

export async function getStaticProps() {
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
  return {
    props: { data },
    revalidate: 1,
  };
}

function GridImage({ name, publicId }) {
  const isMobile = useMedia({ maxWidth: 750 });

  return (
    <div
      className={styles.GridItem}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image publicId={publicId} alt={`picture of a ${name} keyboard`}>
        <Transformation width={isMobile ? "400" : "600"} crop="scale" />
      </Image>

      <span className={styles.KeyboardName}>
        <p>{name}</p>
      </span>
    </div>
  );
}

export default function Keyboards({ data }) {
  return (
    <CloudinaryContext cloudName="brianhan">
      <PageLayout className={styles.Keyboards}>
        <div className={styles.Title}>
          <h2>Keyboards</h2>
        </div>

        <div className={styles.Grid}>
          {data.keyboards.map((keyboard) => (
            <GridImage
              name={keyboard.name}
              key={keyboard.id}
              publicId={keyboard.thumbnail_public_id}
            />
          ))}
        </div>
      </PageLayout>
    </CloudinaryContext>
  );
}

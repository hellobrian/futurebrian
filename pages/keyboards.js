import { useState } from "react";
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
      }
    }
  `;

  const data = await request(ENDPOINT, query);
  return {
    props: { data },
    revalidate: 1,
  };
}

function GridImage({ name }) {
  const [isHover, setHover] = useState(false);
  const isMobile = useMedia({ maxWidth: 750 });

  const on = () => setHover(true);
  const off = () => setHover(false);

  return (
    <div
      className={styles.GridItem}
      style={{
        background: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        publicId="futurebrian/bella/pbt%20notion/IMG_4296_d1quyo.webp"
        style={{
          opacity: isHover ? 0.9 : 1,
          transition: "opacity 200ms ease-in-out",
        }}
      >
        <Transformation width={isMobile ? "400" : "600"} crop="scale" />
      </Image>

      <span
        className={styles.KeyboardName}
        onMouseEnter={on}
        onMouseLeave={off}
      >
        <p>{name}</p>
      </span>
    </div>
  );
}

export default function Keyboards({ data }) {
  return (
    <PageLayout className={styles.Keyboards}>
      <div className={styles.Title}>
        <h2>Keyboards</h2>
      </div>

      <CloudinaryContext cloudName="brianhan">
        <div className={styles.Grid}>
          {data.keyboards.map((keyboard) => (
            <GridImage name={keyboard.name} key={keyboard.id} />
          ))}
        </div>
      </CloudinaryContext>
    </PageLayout>
  );
}

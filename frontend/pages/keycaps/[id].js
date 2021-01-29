import { request, gql } from "graphql-request";
import { PageLayout } from "@/layouts/PageLayout";
import styles from "@/styles/Keycap.module.css";

const strapiUrl = process.env.NEXT_PUBLIC_BASE_STRAPI_URL;
const endpoint = process.env.GRAPHQL_ENDPOINT;

export async function getStaticPaths() {
  const query = gql`
    query {
      keycaps {
        id
      }
    }
  `;
  const data = await request(endpoint, query);

  const paths = data.keycaps.map((keycap) => ({
    params: { id: keycap.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const query = gql`
    query getKeycap($id: ID!) {
      keycap(id: $id) {
        id
        name
        links {
          vendor
          interest_check
        }
        hero_image {
          url
          alternativeText
        }
      }
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

  const variables = {
    id: params.id,
  };
  const data = await request(endpoint, query, variables);
  return {
    props: { data },
    revalidate: 1,
  };
}

function Tag({ children }) {
  return <li className={styles.ListItem}>{children}</li>;
}

export default function Keycap({ data }) {
  return (
    <PageLayout data={data}>
      <div className={styles.Container}>
        {data.keycap.hero_image && (
          <img
            className={styles.MainImage}
            src={`${strapiUrl}${data.keycap.hero_image.url}`}
            alt={data.keycap.hero_image.alternativeText}
          />
        )}
        <h2 className="fs--9 fw--normal ta--center">{data.keycap.name}</h2>
        <ul
          className={`${styles.List} ta--center mb--7`}
          style={{ width: "100%" }}
        >
          {data.keycap.links && (
            <>
              {data.keycap.links[0].vendor && (
                <Tag>
                  <a href={data.keycap.links[0].vendor}>Vendor</a>
                </Tag>
              )}
              {data.keycap.links[0].interest_check && (
                <Tag>
                  <a href={data.keycap.links[0].interest_check}>
                    Interest Check
                  </a>
                </Tag>
              )}
            </>
          )}
        </ul>

        <details className={styles.YouTube}>
          <summary>Sound Test Video</summary>
          <div className={styles.EmbedWrapper}>
            <iframe
              width="100%"
              height="auto"
              src="https://www.youtube.com/embed/g-vBr9a36NE"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </details>

        <p className={`${styles.Post}`}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          perspiciatis corporis nemo natus veniam. Harum doloremque corrupti
          velit! Debitis sint odit corrupti vel cum esse animi saepe facilis,
          dignissimos quam! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Nostrum perspiciatis corporis nemo natus veniam. Harum
          doloremque corrupti velit! Debitis sint odit corrupti vel cum esse
          animi saepe facilis, dignissimos quam! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Nostrum perspiciatis corporis nemo natus
          veniam. Harum doloremque corrupti velit! Debitis sint odit corrupti
          vel cum esse animi saepe facilis, dignissimos quam! Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Nostrum perspiciatis corporis
          nemo natus veniam. Harum doloremque corrupti velit! Debitis sint odit
          corrupti vel cum esse animi saepe facilis, dignissimos quam!
        </p>
        <div className={styles.Gallery}>
          <img
            className={styles.Image}
            src="/keyboards/photos/ava-yellow.jpg"
            alt="ava"
          />
        </div>
      </div>
    </PageLayout>
  );
}

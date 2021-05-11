import { useQuery } from "react-query";
import { request, gql } from "graphql-request";
import { Transformation, Image } from "cloudinary-react";
import { GetStaticProps, GetStaticPaths } from "next";
import { useMedia } from "use-media";
// import ReactMarkdown from "react-markdown";

import { PageLayout } from "@/components/PageLayout/PageLayout";
import { Loading } from "@/components/Loading/Loading";
import { VideoThumbnail } from "@/components/VideoThumbnail/VideoThumbnail";

import styles from "@/styles/KeycapId.module.scss";

const endpoint = process.env.PROD_GRAPHQL_ENDPOINT;

export const getStaticPaths: GetStaticPaths = async () => {
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
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = gql`
    query getKeycap($id: ID!) {
      keycap(id: $id) {
        id
        name
        blog
        round
        videos {
          id
          name
          direct_link
          thumbnail_src
        }
      }
    }
  `;

  const variables = {
    id: params.id,
  };
  const data = await request(endpoint, query, variables);
  const { keycap } = data;

  return {
    props: { keycap },
    revalidate: 1,
  };
};

export default function Keycap({ keycap }): JSX.Element {
  async function getImages() {
    const res = await fetch(
      `https://res.cloudinary.com/brianhan/image/list/${keycap.name}.json`
    );
    const images = await res.json();
    return images;
  }
  const isMobile = useMedia({ maxWidth: 750 });
  const imageQuery = useQuery("images", getImages);
  const { data, status, error } = imageQuery;

  if (status === "error") {
    console.error(error);
    return <div>{error}</div>;
  }

  return (
    <PageLayout className={styles.KeyboardId}>
      <div
        className={"page-title"}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <h2 style={{ marginBottom: 8 }}>{keycap.name}</h2>
        {keycap.round && <p className={styles.Round}>Round {keycap.round}</p>}
        {/* <div className={styles.Blog}>
          <ReactMarkdown>{keycap.blog}</ReactMarkdown>
        </div> */}
      </div>
      {status === "loading" && <Loading />}
      {status === "success" && (
        <>
          {keycap.videos.length > 0 && (
            <>
              <div className={"page-title"} style={{ height: "10vh" }}>
                <h2 style={{ fontSize: 32 }}>Videos</h2>
              </div>
              <div className={styles.Gallery}>
                {keycap.videos.map((video) => (
                  <VideoThumbnail
                    headline={video.name}
                    title={"Typing Sounds"}
                    key={video.id}
                    href={video.direct_link}
                    src={video.thumbnail_src}
                    icon="youtube"
                    opacity={0.5}
                  />
                ))}
              </div>
            </>
          )}
          <div className={"page-title"} style={{ height: "10vh" }}>
            <h2 style={{ fontSize: 32 }}>Photos</h2>
          </div>
          <div className={styles.Gallery}>
            {data.resources.map((image) => (
              <div key={image.public_id}>
                <Image
                  publicId={image.public_id}
                  alt={`picture of ${keycap.name} keycaps`.trim()}
                >
                  <Transformation
                    width={isMobile ? "400" : "600"}
                    crop="scale"
                  />
                </Image>
              </div>
            ))}
          </div>
        </>
      )}
    </PageLayout>
  );
}

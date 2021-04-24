import { useQuery } from "react-query";
import { request, gql } from "graphql-request";
import { Transformation, Image } from "cloudinary-react";
import { GetStaticProps, GetStaticPaths } from "next";
import { useMedia } from "use-media";
import ReactMarkdown from "react-markdown";

import { PageLayout } from "@/components/PageLayout/PageLayout";
import { Loading } from "@/components/Loading/Loading";
import { VideoThumbnail } from "@/components/VideoThumbnail/VideoThumbnail";

import styles from "@/styles/KeyboardId.module.scss";

const endpoint = process.env.PROD_GRAPHQL_ENDPOINT;

export const getStaticPaths: GetStaticPaths = async () => {
  const query = gql`
    query {
      keyboards {
        id
      }
    }
  `;
  const data = await request(endpoint, query);

  const paths = data.keyboards.map((keyboard) => ({
    params: { id: keyboard.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = gql`
    query getKeyboard($id: ID!) {
      keyboard(id: $id) {
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
  const { keyboard } = data;

  return {
    props: { keyboard },
    revalidate: 1,
  };
};

export default function Keyboard({ keyboard }): JSX.Element {
  async function getImages() {
    const res = await fetch(
      `https://res.cloudinary.com/brianhan/image/list/${keyboard.name}.json`
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
        <h2 style={{ marginBottom: 8 }}>{keyboard.name}</h2>
        {keyboard.round && (
          <p className={styles.Round}>Round {keyboard.round}</p>
        )}
        {/* <div className={styles.Blog}>
          <ReactMarkdown>{keyboard.blog}</ReactMarkdown>
        </div> */}
      </div>
      {status === "loading" && <Loading />}
      {status === "success" && (
        <>
          {keyboard.videos.length > 0 && (
            <>
              <div className={"page-title"} style={{ height: "10vh" }}>
                <h2 style={{ fontSize: 32 }}>Videos</h2>
              </div>
              <div className={styles.Gallery}>
                {keyboard.videos.map((video) => (
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
                  alt={`picture of a ${keyboard.name} keyboard`.trim()}
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

import { request, gql } from "graphql-request";
import { GetStaticProps } from "next";

import { PageLayout } from "@/components/PageLayout/PageLayout";
import { VideoThumbnail } from "@/components/VideoThumbnail/VideoThumbnail";

import styles from "@/styles/Socials.module.scss";

const ENDPOINT = process.env.PROD_GRAPHQL_ENDPOINT;

export const getStaticProps: GetStaticProps = async () => {
  const query = gql`
    query {
      videos {
        name
        id
        direct_link
        thumbnail_src
      }
    }
  `;

  const data = await request(ENDPOINT, query);
  const { videos } = data;
  return {
    props: { videos },
    revalidate: 1,
  };
};

export default function Socials({ videos }): JSX.Element {
  const latestVideo = videos.filter((_, i) => videos.length - 1 === i)[0];

  return (
    <PageLayout>
      <div className={"page-title"}>
        <h2>Socials</h2>
      </div>
      <section
        className={styles.Section}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className={styles.TextWrapper}>
          <p>
            Here's where you can find my latest videos on{" "}
            <a href="https://www.youtube.com/channel/UCQGq3OYhoZJrlRaemSCe6Zg">
              YouTube.
            </a>
          </p>
          <p>
            I'm also on{" "}
            <a href="https://www.instagram.com/futurebrian_/">Instagram</a> and
            working my way into streaming more on{" "}
            <a href="https://www.twitch.tv/futurebrian">Twitch</a>.
          </p>
        </div>
        <div className={styles.VideoThumbnailList}>
          <VideoThumbnail
            icon="youtube"
            headline="latest video"
            title={latestVideo.name}
            href={latestVideo.direct_link}
            src={latestVideo.thumbnail_src}
          />
        </div>
        <div className={styles.TextWrapper}>
          <p>
            If you've been enjoying my content, thank you so much! I appreciate
            you and it's been a blast connecting with you and everyone through
            this hobby.
          </p>
        </div>
      </section>
    </PageLayout>
  );
}

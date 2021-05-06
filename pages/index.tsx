import { request, gql } from "graphql-request";
import { GetStaticProps } from "next";

import { PageLayout } from "@/components/PageLayout/PageLayout";
import { VideoThumbnail } from "@/components/VideoThumbnail/VideoThumbnail";
import { IconTwitch } from "@/components/Icons/Icons";

import styles from "@/styles/Home.module.scss";

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

export default function Home({ videos }): JSX.Element {
  const latestVideo = videos.filter((_, i) => videos.length - 1 === i)[0];

  return (
    <PageLayout>
      <div className={"page-title"} style={{ marginTop: 32 }}>
        <h2>Hello!</h2>
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
          <details>
            <summary className="bold">About futurebrian.com</summary>
            <p style={{ margin: "8px 0" }}>
              I'm Brian and I build and collect custom mechanical keyboards!
            </p>
            <p style={{ marginBottom: 8 }}>
              This website is where I centralize all my keyboard photos and
              videos. As I build more, I'll eventually share my thoughts and
              impressions on various aspects of the hobby. For now, I'm
              interested mostly in documenting all the keyboards and keycaps I
              can get my hands on.
            </p>
            <p>
              In case you're wondering, futurebrian.com is built using Next.js,
              Strapi CMS, Render and Cloudinary.
            </p>
          </details>
          <p>
            Here's where you can find my latest videos on{" "}
            <a href="https://www.youtube.com/channel/UCQGq3OYhoZJrlRaemSCe6Zg">
              YouTube.
            </a>{" "}
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
          <p
            className="bold subpixel-antialiased"
            style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            <IconTwitch style={{ width: 16, height: 16 }}></IconTwitch>
            <span>Twitch Streams</span>
          </p>
          <p style={{ margin: "8px 0", marginBottom: 16 }}>
            Tentatively streaming on{" "}
            <a href="https://www.twitch.tv/futurebrian">Twitch</a> every
            Thursday at 6PM CDT.
          </p>
          <p className="bold subpixel-antialiased">scheduled build streams</p>
          <ul>
            <li>
              <a href="/twitch">
                Stellar65 build with Lavendar switches - Thursday, May 6th @ 6PM
                CDT on Twitch
              </a>
            </li>
            <li>
              <a href="/twitch">
                Rebuild Savage65 with Mauves Thursday, May 13th @ 6PM CDT on
                Twitch
              </a>
            </li>
          </ul>
          <p className="bold subpixel-antialiased">future streams</p>
          <ul>
            <li>Stellar12 build with Lavendar switches</li>
            <li>Rebuild KBD8X MKII with Durock/JWK Linears (65g pink stem)</li>
            <li>ID80 Crystal Build (likey using Tactiles)</li>
            <li>Switch Couture Alice (likely using Linears)</li>
            <li>Rebuild Maja with POM plate and Banana Splits</li>
            <li>Rebuild Thermal (switches TBA)</li>
          </ul>
        </div>
      </section>
    </PageLayout>
  );
}

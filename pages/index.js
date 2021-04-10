import { request, gql } from "graphql-request";
import styles from "@/styles/Home.module.css";
import { IconYoutube, IconTwitch } from "@/components/Icons/Icons";

const endpoint = process.env.PROD_GRAPHQL_ENDPOINT;

export async function getStaticProps() {
  const query = gql`
    query {
      videos(sort: "created_at:DESC") {
        created_at
        id
        name
        direct_link
      }
    }
  `;

  const data = await request(endpoint, query);
  return {
    props: { data },
    revalidate: 1,
  };
}

const linkClassName = `fs--6 ${styles.link}`;

export default function Home({ data }) {
  const { videos } = data;

  const latestVideo = videos[0];
  console.log({ latestVideo });
  return (
    <div className={styles.Container}>
      <div className={styles.LinkTree}>
        <section className={styles.Section}>
          <h2 className={`fs--4 fw--normal ${styles.Headings}`}>
            <IconYoutube style={{ fill: "black", marginRight: 8 }} /> watch
            latest video
          </h2>
          <a href={latestVideo.direct_link} className={linkClassName}>
            {latestVideo.name}
          </a>
          <h2 className={`fs--4 fw--normal ${styles.Headings}`}>
            <IconYoutube style={{ fill: "black", marginRight: 8 }} />
            YouTube Playlists
          </h2>
          <a
            href="https://www.youtube.com/watch?v=Br-tTvCH2Q4&list=PLtLwzh2iLsjdftHzaraRQcDAoyyolLlpd"
            className={linkClassName}
          >
            tutorials
          </a>
          <a
            href="https://www.youtube.com/watch?v=Qe90FVYkPO4&list=PLtLwzh2iLsjcpuhfjjcYH9yE538cz-zlj"
            className={linkClassName}
          >
            Rama Thermal videos
          </a>
          <h2 className={`fs--4 fw--normal ${styles.Headings}`}>
            <IconTwitch style={{ fill: "black", marginRight: 8 }} /> watch
            latest stream
          </h2>
          <a
            href={"https://www.twitch.tv/videos/975525155"}
            className={linkClassName}
          >
            Dressing up keebs with GMK Hennesey + ePBT BOW
          </a>
        </section>
        <section className={styles.Section}>
          <h2 className={`fs--4 fw--normal ${styles.Headings}`}>socials</h2>
          <a
            href="https://www.youtube.com/channel/UCQGq3OYhoZJrlRaemSCe6Zg"
            className={linkClassName}
          >
            youtube
          </a>
          <a href="https://www.twitch.tv/futurebrian" className={linkClassName}>
            twitch
          </a>
          <a
            href="https://www.instagram.com/futurebrian_/"
            className={linkClassName}
          >
            instagram
          </a>
          <a
            href="https://www.reddit.com/user/futurebrian"
            className={linkClassName}
          >
            reddit
          </a>
          <a
            href="https://www.tiktok.com/@futurebrian"
            className={linkClassName}
          >
            tiktok
          </a>
        </section>
      </div>
    </div>
  );
}

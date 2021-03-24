import { request, gql } from "graphql-request";
import styles from "@/styles/Home.module.css";
import { IconYoutube } from "@/components/Icons/Icons";

const endpoint = process.env.PROD_GRAPHQL_ENDPOINT;

export async function getStaticProps() {
  const query = gql`
    query {
      videos(sort: "created_at:DESC") {
        created_at
        id
        name
        link
      }
    }
  `;

  const data = await request(endpoint, query);
  return {
    props: { data },
    revalidate: 1,
  };
}

const linkClassName = `fs--8 ${styles.link}`;

export default function Home({ data }) {
  const { videos } = data;

  const latestVideo = videos[0];
  console.log({ latestVideo });
  return (
    <div className={styles.Container}>
      <div className={styles.LinkTree}>
        <section className={styles.Section}>
          <h2 className={`fs--4 fw--normal ${styles.Headings}`}>
            <IconYoutube
              style={{ fill: "black", marginRight: 8 }}
            ></IconYoutube>{" "}
            watch latest video
          </h2>
          <a href={latestVideo.link} className={linkClassName}>
            {latestVideo.name}
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

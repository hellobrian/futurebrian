import { request, gql } from "graphql-request";
import { Layout } from "@/components/Layout/Layout";
import styles from "@/styles/Keyboard.module.css";

const endpoint = process.env.GRAPHQL_ENDPOINT;

export async function getStaticPaths() {
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
}

export async function getStaticProps({ params }) {
  const query = gql`
    query getKeyboard($id: ID!) {
      keyboard(id: $id) {
        id
        name
        layout
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

function ListItem({ children }) {
  return <li className={styles.ListItem}>{children}</li>;
}

export default function Keyboard({ data }) {
  return (
    <Layout>
      <div className={styles.Container}>
        <img
          className={styles.MainImage}
          src="/keyboards/photos/ava-yellow.jpg"
          alt="ava"
        />
        <h2 className="fs--9 fw--normal ta--center">{data.keyboard.name}</h2>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        <ul
          className={`${styles.List} ta--center mb--7`}
          style={{ width: "100%" }}
        >
          <ListItem>{data.keyboard.layout}</ListItem>
          <ListItem>hotswap / soldered</ListItem>
          <ListItem>{data.keyboard.layout} sldkfjsldfj</ListItem>
          <ListItem>hotswap / soldered</ListItem>
          <ListItem>{data.keyboard.layout}</ListItem>
          <ListItem>hotswap / soldered</ListItem>
          <ListItem>{data.keyboard.layout}</ListItem>
          <ListItem>hotswap / soldered</ListItem>
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
          <img
            className={styles.Image}
            src="/keyboards/photos/ava-yellow.jpg"
            alt="ava"
          />
          <img
            className={styles.Image}
            src="/keyboards/photos/ava-yellow.jpg"
            alt="ava"
          />
          <img
            className={styles.Image}
            src="/keyboards/photos/ava-yellow.jpg"
            alt="ava"
          />
          <img
            className={styles.Image}
            src="/keyboards/photos/ava-yellow.jpg"
            alt="ava"
          />
          <img
            className={styles.Image}
            src="/keyboards/photos/ava-yellow.jpg"
            alt="ava"
          />
          <img
            className={styles.Image}
            src="/keyboards/photos/ava-yellow.jpg"
            alt="ava"
          />
          <img
            className={styles.Image}
            src="/keyboards/photos/ava-yellow.jpg"
            alt="ava"
          />
          <img
            className={styles.Image}
            src="/keyboards/photos/ava-yellow.jpg"
            alt="ava"
          />
          <img
            className={styles.Image}
            src="/keyboards/photos/ava-yellow.jpg"
            alt="ava"
          />
          <img
            className={styles.Image}
            src="/keyboards/photos/ava-yellow.jpg"
            alt="ava"
          />
          <img
            className={styles.Image}
            src="/keyboards/photos/ava-yellow.jpg"
            alt="ava"
          />
        </div>
      </div>
    </Layout>
  );
}

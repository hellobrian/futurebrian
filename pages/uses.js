import { request, gql } from "graphql-request";
import ReactMarkdown from "react-markdown";

import styles from "@/styles/Uses.module.css";
const endpoint = process.env.PROD_GRAPHQL_ENDPOINT;

export async function getStaticProps() {
  const query = gql`
    query {
      tools {
        id
        name
        link
        vendor
        info
      }
    }
  `;

  const data = await request(endpoint, query);
  return {
    props: { data },
    revalidate: 1,
  };
}

export default function Uses({ data }) {
  return (
    <div className={styles.Container}>
      <h2 className={`fs--4 fw--normal ${styles.Headings}`}>
        Keyboard Building
      </h2>
      <section className={styles.Section}>
        {data.tools.map((tool) => (
          <div key={tool.id} className={styles.Tool}>
            <div className={styles.Headline}>
              <h3>
                {tool.link ? (
                  <a href={tool.link} className="fancy-link">
                    {tool.name}
                  </a>
                ) : (
                  tool.name
                )}
              </h3>
              <span className={styles.Vendor}>
                {tool.vendor && `${tool.vendor}`}
              </span>
            </div>
            <ReactMarkdown source={tool.info} />
          </div>
        ))}
      </section>
    </div>
  );
}

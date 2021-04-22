import { request, gql } from "graphql-request";
import { GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";

import { PageLayout } from "@/components/PageLayout/PageLayout";

import styles from "@/styles/Uses.module.css";

const ENDPOINT = process.env.PROD_GRAPHQL_ENDPOINT;

export const getStaticProps: GetStaticProps = async () => {
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

  const data = await request(ENDPOINT, query);
  const { tools } = data;
  return {
    props: { tools },
    revalidate: 1,
  };
};

interface Tool {
  id: string;
  name: string;
  link: string;
  vendor: string;
  info: string;
}

interface UsesProps {
  tools: [Tool];
}

export default function Uses(props: UsesProps): JSX.Element {
  const { tools } = props;
  return (
    <PageLayout>
      <div className={"page-title"}>
        <h2>Uses</h2>
      </div>
      <div className={styles.CardList}>
        {tools.map((tool) => (
          <div key={tool.id} className={styles.Card}>
            <h3>{tool.name}</h3>

            <a
              className={styles.Vendor}
              data-vendor={tool.vendor}
              href={tool.link}
            >
              {tool.vendor}
            </a>

            <div className={styles.Info}>
              <ReactMarkdown>{tool.info}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}

import { request, gql } from "graphql-request";
import { Layout } from "@/components/Layout/Layout";

const endpoint = process.env.GRAPHQL_ENDPOINT;
const query = gql`
  query {
    keyboards(sort: "name") {
      id
      name
      layout
    }
    keycaps(sort: "name") {
      id
      name
    }
  }
`;

export async function getStaticProps() {
  const data = await request(endpoint, query);
  return {
    props: { data },
    revalidate: 1,
  };
}

export default function Home({ data }) {
  return (
    <Layout>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </Layout>
  );
}

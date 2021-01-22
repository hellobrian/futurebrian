import { request, gql } from "graphql-request";
import { Layout } from "@/components/Layout/Layout";

const endpoint = process.env.GRAPHQL_ENDPOINT;
const query = gql`
  query {
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

export default function Keycaps({ data }) {
  return (
    <Layout>
      <div className="mx--size3">
        <h1>Keycaps</h1>
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </div>
    </Layout>
  );
}

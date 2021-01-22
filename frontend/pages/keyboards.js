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
  }
`;

export async function getStaticProps() {
  const data = await request(endpoint, query);
  return {
    props: { data },
  };
}

export default function Keyboards({ data }) {
  return (
    <Layout>
      <div className="mx--size3">
        <h1>Keyboards</h1>
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </div>
    </Layout>
  );
}

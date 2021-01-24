import { request, gql } from "graphql-request";
import { Layout } from "@/components/Layout/Layout";

const endpoint = process.env.GRAPHQL_ENDPOINT;

export async function getStaticPaths() {
  const query = gql`
    query {
      keycaps {
        id
      }
    }
  `;
  const data = await request(endpoint, query);

  const paths = data.keycaps.map((keycap) => ({
    params: { id: keycap.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const query = gql`
    query getKeycap($id: ID!) {
      keycap(id: $id) {
        id
        name
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

export default function Keycap({ data }) {
  return (
    <Layout>
      <div style={{ height: "200vh" }}>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </Layout>
  );
}

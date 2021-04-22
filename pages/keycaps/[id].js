import { request, gql } from "graphql-request";

const endpoint = process.env.PROD_GRAPHQL_ENDPOINT;

export async function getStaticPaths() {
  const query = gql`
    query {
      keycaps {
        id
      }
    }
  `;
  const data = await request(endpoint, query);

  const paths = data.keycaps.map((keyboard) => ({
    params: { id: keyboard.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const query = gql`
    query getKeycap($id: ID!) {
      keycap(id: $id) {
        id
        name
        blog
        round
        videos {
          id
          name
          embed_link
        }
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
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

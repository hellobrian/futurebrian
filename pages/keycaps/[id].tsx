import { request, gql } from "graphql-request";
import { GetStaticProps, GetStaticPaths } from 'next'

const endpoint = process.env.PROD_GRAPHQL_ENDPOINT;

export const getStaticPaths: GetStaticPaths = async () => {
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
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
  const { keycap } = data;

  return {
    props: { keycap },
    revalidate: 1,
  };
}

export default function Keycap({ keycap }): JSX.Element {
  return <pre>{JSON.stringify(keycap, null, 2)}</pre>;
}

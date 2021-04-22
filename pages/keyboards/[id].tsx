import { request, gql } from "graphql-request";
import { GetStaticProps, GetStaticPaths } from 'next'

const endpoint = process.env.PROD_GRAPHQL_ENDPOINT;

export const getStaticPaths: GetStaticPaths = async () => {
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = gql`
    query getKeyboard($id: ID!) {
      keyboard(id: $id) {
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
  const { keyboard } = data;
  return {
    props: { keyboard },
    revalidate: 1,
  };
}

export default function Keyboard({ keyboard }): JSX.Element {
  return <pre>{JSON.stringify(keyboard, null, 2)}</pre>;
}

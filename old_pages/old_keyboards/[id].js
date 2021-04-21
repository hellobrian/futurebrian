import { request, gql } from "graphql-request";

import { DetailPageLayout } from "@/layouts/DetailPageLayout";

const endpoint = process.env.PROD_GRAPHQL_ENDPOINT;

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
        blog
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

export default function Keyboard({
  data: {
    keyboard: { name, blog, videos },
  },
}) {
  return <DetailPageLayout name={name} blog={blog} videos={videos} />;
}

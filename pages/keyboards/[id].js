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
        hero_image {
          url
          alternativeText
        }
        videos {
          id
          name
          link
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
    keyboard: { name, hero_image, blog, videos },
  },
}) {
  return (
    <DetailPageLayout
      heroImage={hero_image}
      name={name}
      blog={blog}
      videos={videos}
    />
  );
}

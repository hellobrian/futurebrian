import { request, gql } from "graphql-request";

import { PageLayout } from "@/layouts/PageLayout";
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
        hero_image {
          url
          alternativeText
        }
      }
      keyboards(sort: "name") {
        id
        name
      }
      keycaps(sort: "name") {
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

export default function Keyboard({ data }) {
  return (
    <PageLayout data={data}>
      <DetailPageLayout
        heroImage={data.keyboard.hero_image}
        name={data.keyboard.name}
      ></DetailPageLayout>
    </PageLayout>
  );
}

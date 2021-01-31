import { request, gql } from "graphql-request";
import { PageLayout } from "@/layouts/PageLayout";
import { DetailPageLayout } from "@/layouts/DetailPageLayout";

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
        hero_image {
          url
          alternativeText
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
  return (
    <DetailPageLayout
      heroImage={data.keycap.hero_image}
      name={data.keycap.name}
    />
  );
}

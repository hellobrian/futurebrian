import { request, gql } from "graphql-request";
import { Layout } from "@/components/Layout/Layout";
import { CategoryList } from "@/components/CategoryList/CategoryList";

const endpoint = process.env.GRAPHQL_ENDPOINT;
const query = gql`
  query {
    keycaps(sort: "name") {
      id
      name
      links {
        vendor
        interest_check
      }
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
      <CategoryList data={data} variant="keycaps" />
    </Layout>
  );
}

import { request, gql } from "graphql-request";
import { Layout } from "@/components/Layout/Layout";
import { CategoryList } from "@/components/CategoryList/CategoryList";

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
      <CategoryList data={data} variant="keyboards" />
    </Layout>
  );
}

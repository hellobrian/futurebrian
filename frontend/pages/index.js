import PropTypes from "prop-types";
import { request, gql } from "graphql-request";
import { Layout } from "@/components/Layout/Layout";
import { CategoryList } from "@/components/CategoryList/CategoryList";

const endpoint = process.env.GRAPHQL_ENDPOINT;
const query = gql`
  query {
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

export async function getStaticProps() {
  const data = await request(endpoint, query);
  return {
    props: { data },
    revalidate: 1,
  };
}

export default function Home({ data }) {
  return (
    <Layout>
      <CategoryList data={data} variant="keyboards" />
      <CategoryList data={data} variant="keycaps" />
    </Layout>
  );
}

Home.propTypes = {
  data: PropTypes.shape({
    keyboards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      })
    ),
    keycaps: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      })
    ),
  }),
};

import PropTypes from "prop-types";
import { request } from "graphql-request";
import useSWR from "swr";

import { CategoryList } from "@/components/CategoryList/CategoryList";

export function MenuComponent({ setMenuOpen }) {
  const endpoint = process.env.NEXT_PUBLIC_PROD_GRAPHQL_ENDPOINT;
  const fetcher = (query) => request(endpoint, query);
  const { data, error } = useSWR(
    `
      {
        keyboards(sort: "name") {
          id
          name
        }
        keycaps(sort: "name") {
          id
          name
        }
      }
    `,
    fetcher
  );
  if (error) {
    console.log(error);
  }
  return data ? (
    <>
      <CategoryList setMenuOpen={setMenuOpen} variant="keyboards" data={data} />
      <CategoryList setMenuOpen={setMenuOpen} variant="keycaps" data={data} />
      {/* <CategoryList setMenuOpen={setMenuOpen} variant="socials" /> */}
      <CategoryList setMenuOpen={setMenuOpen} variant="other" />
    </>
  ) : null;
}

MenuComponent.propTypes = {
  setMenuOpen: PropTypes.func.isRequired,
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

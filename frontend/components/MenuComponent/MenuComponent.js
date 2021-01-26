import PropTypes from "prop-types";
import { CategoryList } from "@/components/CategoryList/CategoryList";
import { Socials } from "@/components/Socials/Socials";
// import styles from "./MenuComponent.module.css";

export function MenuComponent({ data }) {
  return (
    <>
      <CategoryList data={data} variant="keyboards" />
      <CategoryList data={data} variant="keycaps" />
      <Socials />
    </>
  );
}

MenuComponent.propTypes = {
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

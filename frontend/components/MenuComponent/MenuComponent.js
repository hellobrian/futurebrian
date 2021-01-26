import PropTypes from "prop-types";
import { CategoryList } from "@/components/CategoryList/CategoryList";

// import styles from "./MenuComponent.module.css";

export function MenuComponent({ data }) {
  return (
    <>
      <CategoryList variant="keyboards" data={data} />
      <CategoryList variant="keycaps" data={data} />
      <CategoryList variant="socials" />
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

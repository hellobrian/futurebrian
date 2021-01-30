import PropTypes from "prop-types";
import { CategoryList } from "@/components/CategoryList/CategoryList";

// import styles from "./MenuComponent.module.css";

export function MenuComponent({ data, setMenuOpen }) {
  return (
    <>
      <CategoryList setMenuOpen={setMenuOpen} variant="keyboards" data={data} />
      <CategoryList setMenuOpen={setMenuOpen} variant="keycaps" data={data} />
      <CategoryList setMenuOpen={setMenuOpen} variant="socials" />
    </>
  );
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

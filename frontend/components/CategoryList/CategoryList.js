import PropTypes from "prop-types";
import Link from "next/link";
import styles from "./CategoryList.module.css";

const VARIANTS = ["keyboards", "keycaps"];

function HeadingWrapper({ heading, info }) {
  return (
    <div className={`${styles.HeadingWrapper} mb--3`}>
      <h2 className={`heading ta--left fs--6 fw--normal px--3`}>{heading}</h2>
      <p className="ff--bebas fs--6 px--3">{info}</p>
    </div>
  );
}

HeadingWrapper.propTypes = {
  heading: PropTypes.string,
  info: PropTypes.string,
};

function List({ children }) {
  return <ul className={styles.List}>{children}</ul>;
}

List.propTypes = {
  children: PropTypes.node,
};

function ListItem({ children, variant }) {
  return (
    <>
      {variant === "keyboards" && (
        <li className={`${styles.ListItem} fs--5`}>
          <span className="name">{children}</span>
        </li>
      )}
      {variant === "keycaps" && (
        <li className={`${styles.ListItem} fs--5`}>
          <span className="name">{children}</span>
        </li>
      )}
    </>
  );
}

ListItem.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(VARIANTS),
};

export function CategoryList({ data, variant }) {
  return (
    <section className={`${styles.Section} mb--7`}>
      {variant === "keyboards" && (
        <HeadingWrapper
          heading={"Keyboards"}
          info={`${data.keyboards.length} keebs`}
        />
      )}

      {variant === "keycaps" && (
        <HeadingWrapper
          heading={"Keycaps"}
          info={`${data.keycaps.length} sets`}
        />
      )}
      <List>
        {variant === "keyboards" &&
          data.keyboards.map((keyboard) => {
            return (
              <ListItem key={keyboard.id} variant={variant}>
                <Link href={`/keyboards/${keyboard.id}`}>
                  <a className="ff--bebas">{keyboard.name}</a>
                </Link>
              </ListItem>
            );
          })}
        {variant === "keycaps" &&
          data.keycaps.map(({ id, name, links }) => {
            return (
              <ListItem key={id} variant={variant}>
                <Link href={`/keycaps/${id}`}>
                  <a className="ff--bebas">{name}</a>
                </Link>
                {links && (
                  <div className={styles.Links}>
                    {links[0].interest_check && (
                      <a href={links[0].interest_check}>Interest Check</a>
                    )}
                    {links[0].vendor && <a href={links[0].vendor}>Vendor</a>}
                  </div>
                )}
              </ListItem>
            );
          })}
      </List>
    </section>
  );
}

CategoryList.propTypes = {
  variant: PropTypes.oneOf(VARIANTS),
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

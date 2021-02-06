import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./CategoryList.module.css";

const VARIANTS = ["keyboards", "keycaps", "socials"];

function HeadingWrapper({ heading, info }) {
  return (
    <div className={`${styles.HeadingWrapper} mb--3`}>
      <h2 className={`heading ta--left fw--normal px--3 fs--4`}>{heading}</h2>
      <p className="ff--bebas px--3 fs--4">{info}</p>
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

function ListItem({ children }) {
  return (
    <li className={`${styles.ListItem}`}>
      <span className="name">{children}</span>
    </li>
  );
}

ListItem.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(VARIANTS),
};

export function CategoryList({ data, variant, setMenuOpen }) {
  const router = useRouter();
  console.log({ router });

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

      {variant === "socials" && (
        <HeadingWrapper heading={"Socials"} info="Follow Me" />
      )}

      <List>
        {variant === "keyboards" &&
          data.keyboards.map((keyboard) => {
            return (
              <ListItem key={keyboard.id} variant={variant}>
                <Link href={`/keyboards/${keyboard.id}`}>
                  <a
                    className={`ff--bebas ${
                      router.asPath === `/keyboards/${keyboard.id}` &&
                      "fancy-link"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {keyboard.name}
                  </a>
                </Link>
              </ListItem>
            );
          })}
        {variant === "keycaps" &&
          data.keycaps.map(({ id, name, links }) => {
            return (
              <ListItem key={id} variant={variant}>
                <Link href={`/keycaps/${id}`}>
                  <a
                    className={`ff--bebas ${
                      router.asPath === `/keycaps/${id}` && "fancy-link"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {name}
                  </a>
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
        {variant === "socials" && (
          <>
            <ListItem>
              <a
                onClick={() => setMenuOpen(false)}
                className="ff--bebas"
                href="https://www.instagram.com/futurebrian_/"
              >
                instagram
              </a>
            </ListItem>
            <ListItem>
              <a
                onClick={() => setMenuOpen(false)}
                className="ff--bebas"
                href="https://www.youtube.com/channel/UCQGq3OYhoZJrlRaemSCe6Zg"
              >
                youtube
              </a>
            </ListItem>
            <ListItem>
              {" "}
              <a
                onClick={() => setMenuOpen(false)}
                className="ff--bebas"
                href="https://www.reddit.com/user/futurebrian"
              >
                reddit
              </a>
            </ListItem>
          </>
        )}
      </List>
    </section>
  );
}

CategoryList.propTypes = {
  variant: PropTypes.oneOf(VARIANTS),
  setMenuOpen: PropTypes.func,
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

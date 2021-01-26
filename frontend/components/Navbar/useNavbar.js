import { useState, useEffect } from "react";

/**
 * On scroll, show and hide navbar.
 * Use isVisible prop to toggle a CSS .hidden class that you make up yourself
 *
 * Example:
 *
 * const { isVisible } = useNavbar();
 * const navbarClass = classnames(styles.NavbarWrapper, {
 *  [styles.NavBarHidden]: !isVisible,
 * });
 */
export function useNavbar() {
  const [prevScrollPosition, setPrevScrollPosition] = useState(null);

  useEffect(() => {
    setPrevScrollPosition(window.pageYOffset);
  }, []);

  const [isVisible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset;
      const visibiilty =
        currentScrollPosition < 200 ||
        prevScrollPosition > currentScrollPosition;

      setPrevScrollPosition(currentScrollPosition);
      setVisible(visibiilty);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPosition]);

  return { isVisible };
}

import { useState, useEffect } from "react";
import Toggle from "react-toggle";

import { IconMoon, IconSun } from "@/components/Icons/Icons";
import styles from "./DarkToggle.module.css";

const DARK_CLASS = "dark";

export const DarkToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add(DARK_CLASS);
    } else {
      document.documentElement.classList.remove(DARK_CLASS);
    }
  }, [isDark]);

  const handleClick = () => setIsDark(!isDark);

  return (
    <div className={styles.DarkToggle}>
      <button type="button" onClick={handleClick}>
        <IconSun isDark={isDark} />
      </button>
      <Toggle
        className={styles.Toggle}
        id="toggleSwitch"
        checked={isDark}
        onChange={(event) => setIsDark(event.target.checked)}
        icons={false}
        aria-label="Dark mode"
      />
      <button type="button" onClick={handleClick}>
        <IconMoon isDark={isDark} />
      </button>
    </div>
  );
};

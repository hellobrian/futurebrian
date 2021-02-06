import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Toggle from "react-toggle";

import styles from "./DarkToggle.module.css";

const DARK_CLASS = "dark";

function MoonIcon({ isDark }) {
  return (
    <svg
      fill={isDark ? "white" : "black"}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 1024 1024"
    >
      <path d="M348.64 242.368c0 241.6 165.728 437.44 370.144 437.44 50.816 0 99.232-12.16 143.328-34.016-54.24 142.72-191.872 244.352-353.632 244.352-209.056 0-378.56-169.504-378.56-378.56 0-154.24 92.416-286.688 224.736-345.696-3.712 24.896-6.016 50.336-6.016 76.48z"></path>
    </svg>
  );
}

function SunIcon({ isDark }) {
  return (
    <svg
      fill={isDark ? "white" : "black"}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 512 512"
    >
      <path d="M256 416c17.673 0 32 14.327 32 32v32c0 17.673-14.327 32-32 32s-32-14.327-32-32v-32c0-17.673 14.327-32 32-32zm0-320c-17.673 0-32-14.327-32-32V32c0-17.673 14.327-32 32-32s32 14.327 32 32v32c0 17.673-14.327 32-32 32zm224 128c17.673 0 32 14.327 32 32s-14.327 32-32 32h-32c-17.674 0-32-14.327-32-32s14.326-32 32-32h32zM96 256c0 17.673-14.327 32-32 32H32c-17.673 0-32-14.327-32-32s14.327-32 32-32h32c17.673 0 32 14.327 32 32zm318.392 113.137l22.628 22.629c12.496 12.495 12.496 32.758 0 45.254-12.497 12.496-32.759 12.496-45.255 0l-22.628-22.628c-12.496-12.495-12.496-32.758 0-45.255 12.497-12.496 32.759-12.496 45.255 0zM97.608 142.863L74.98 120.235c-12.497-12.497-12.497-32.758 0-45.255s32.758-12.497 45.255 0l22.628 22.628c12.497 12.497 12.497 32.758 0 45.255s-32.758 12.497-45.255 0zm316.784 0c-12.496 12.496-32.758 12.496-45.255 0-12.496-12.497-12.496-32.758 0-45.255l22.628-22.627c12.496-12.497 32.758-12.497 45.255 0 12.496 12.497 12.496 32.758 0 45.255l-22.628 22.627zM97.608 369.137c12.496-12.496 32.759-12.496 45.254 0 12.497 12.497 12.497 32.76 0 45.255l-22.627 22.628c-12.497 12.496-32.758 12.496-45.255 0s-12.497-32.759 0-45.254l22.628-22.629zM256 128c-70.692 0-128 57.308-128 128s57.308 128 128 128c70.691 0 128-57.309 128-128s-57.308-128-128-128zm0 208c-44.183 0-80-35.817-80-80s35.817-80 80-80 80 35.817 80 80-35.817 80-80 80z"></path>
    </svg>
  );
}

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
        <SunIcon isDark={isDark} />
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
        <MoonIcon isDark={isDark} />
      </button>
    </div>
  );
};

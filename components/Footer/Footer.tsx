import { useMedia } from "use-media";
import {
  IconYoutube,
  IconInstagram,
  IconTwitch,
} from "@/components/Icons/Icons";

import styles from "./Footer.module.css";

enum Links {
  YouTube = "https://www.youtube.com/channel/UCQGq3OYhoZJrlRaemSCe6Zg",
  Instagram =  "https://www.instagram.com/futurebrian_/",
  Twitch =  "https://www.twitch.tv/futurebrian"
}

export function Footer(): JSX.Element {
  const isMobile = useMedia({ maxWidth: 750 });
  return (
    <footer
      data-name="Footer"
      className={styles.Footer}
      style={
        isMobile
          ? {
              backgroundColor: "black",
              width: "fit-content",
              left: "50%",
              bottom: 8,
              transform: "translateX(-50%)",
              borderRadius: 20,
              height: 44,
            }
          : {}
      }
    >
      <a href={Links.Instagram} aria-label="instagram profile for futurebrian">
        <IconInstagram />
      </a>
      <a href={Links.YouTube} aria-label="youtube channel for futurebrian">
        <IconYoutube />
      </a>
      <a href={Links.Twitch} aria-label="twitch channel for futurebrian">
        <IconTwitch />
      </a>
    </footer>
  );
}

import {
  IconYoutube,
  IconInstagram,
  IconTwitch,
  IconReddit,
} from "@/components/Icons/Icons";

import styles from "./Footer.module.css";

const YOUTUBE = "https://www.youtube.com/channel/UCQGq3OYhoZJrlRaemSCe6Zg";
const INSTAGRAM = "https://www.instagram.com/futurebrian_/";
const REDDIT = "https://www.reddit.com/user/futurebrian";
const TWITCH = "https://www.twitch.tv/futurebrian";

export function Footer() {
  return (
    <footer data-name="Footer" className={styles.Footer}>
      <a href={INSTAGRAM} aria-label="instagram profile for futurebrian">
        <IconInstagram />
      </a>
      <a href={YOUTUBE} aria-label="youtube channel for futurebrian">
        <IconYoutube />
      </a>
      <a href={TWITCH} aria-label="twitch channel for futurebrian">
        <IconTwitch />
      </a>
      <a href={REDDIT} aria-label="reddit profile for futurebrian">
        <IconReddit />
      </a>
    </footer>
  );
}

import { IconYoutube } from "@/components/Icons/Icons";
import styles from "./VideoThumbnail.module.css";

export function VideoThumbnail(props): JSX.Element {
  const { text = "video thumbnail", icon = "" } = props;
  return (
    <a
      href="https://www.youtube.com/watch?v=BUlNAQkeew4"
      className={styles.VideoThumbnail}
    >
      <video
        id="video"
        muted
        preload="auto"
        loop
        autoPlay
        className={styles.Video}
      >
        <source
          src="https://res.cloudinary.com/brianhan/video/upload/v1619200933/L7MX7j_yeeuv3.mp4"
          type="video/mp4"
        />
      </video>
      <span className={styles.Text}>{text}</span>
      {icon === "youtube" && (
        <span className={styles.Icon}>
          Watch on YouTube <IconYoutube />
        </span>
      )}
    </a>
  );
}

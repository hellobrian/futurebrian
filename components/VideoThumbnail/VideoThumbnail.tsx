import { IconYoutube } from "@/components/Icons/Icons";
import styles from "./VideoThumbnail.module.scss";

export function VideoThumbnail(props): JSX.Element {
  const {
    headline = "video thumbnail",
    icon = "",
    href = "",
    title,
    src,
  } = props;
  return (
    <a href={href} className={styles.VideoThumbnail}>
      <video
        id="video"
        muted
        preload="auto"
        loop
        autoPlay
        className={styles.Video}
      >
        <source src={src} type="video/mp4" />
      </video>
      <span className={styles.Text}>
        <span className={styles.Headline}>{headline}</span>
        <span className={styles.Title}>{title}</span>
      </span>
      {icon === "youtube" && (
        <span className={styles.Icon}>
          Watch on YouTube <IconYoutube />
        </span>
      )}
    </a>
  );
}

import { IconYoutube } from "@/components/Icons/Icons";
import styles from "./VideoThumbnail.module.scss";

export function VideoThumbnail(props): JSX.Element {
  const {
    headline = "video thumbnail",
    icon = "",
    href = "",
    title,
    src,
    opacity = 1,
  } = props;

  const isLongHeadline = headline.split(" ").length > 3;

  return (
    <a href={href} className={styles.VideoThumbnail}>
      <video
        id="video"
        muted
        preload="auto"
        loop
        autoPlay
        className={styles.Video}
        style={{ opacity }}
      >
        <source src={src} type="video/mp4" />
      </video>
      <span className={styles.Text}>
        <p
          className={styles.Headline}
          style={
            isLongHeadline
              ? { fontSize: 32, lineHeight: 1, fontFamily: "var(--bebas)" }
              : {}
          }
        >
          {headline}
        </p>
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

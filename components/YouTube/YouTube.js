import styles from "./YouTube.module.css";

export function YouTube({ src, ...props }) {
  return (
    <div className={styles.EmbedWrapper} {...props}>
      <iframe
        width="100%"
        height="auto"
        src={src}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

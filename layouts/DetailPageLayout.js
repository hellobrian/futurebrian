import { useState, useRef, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./DetailPageLayout.module.css";

const strapiUrl = process.env.NEXT_PUBLIC_PROD_URL;

function Tag({ children }) {
  return <li className={styles.ListItem}>{children}</li>;
}

function MainImage({ imgUrl, alternativeText }) {
  const image = useRef();
  const [loaded, setLoaded] = useState(null);
  const [opacity, setOpacity] = useState(0);

  const handleLoad = useCallback(() => {
    if (loaded === null && image.current && image.current.src === imgUrl) {
      setLoaded(true);
    }
  }, [loaded, image, imgUrl]);

  useEffect(() => {
    if (
      loaded === null &&
      image.current &&
      image.current.src === imgUrl &&
      image.current.complete
    ) {
      setLoaded(true);
    }
  }, [loaded, image, imgUrl]);

  useEffect(() => {
    if (loaded == true) setOpacity(1);
  }, [loaded]);

  return (
    <img
      ref={image}
      className={`${styles.MainImage}`}
      src={imgUrl}
      alt={alternativeText}
      onLoad={handleLoad}
      style={{ opacity, transition: "opacity 200ms" }}
    />
  );
}

function YouTube() {
  return (
    <details className={styles.YouTube}>
      <summary>Sound Test Video</summary>
      <div className={styles.EmbedWrapper}>
        <iframe
          width="100%"
          height="auto"
          src="https://www.youtube.com/embed/g-vBr9a36NE"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </details>
  );
}

function Gallery() {
  return (
    <div className={styles.Gallery}>
      <img
        className={styles.Image}
        src="/keyboards/photos/ava-yellow.jpg"
        alt="ava"
      />
    </div>
  );
}

export function DetailPageLayout({ heroImage, name, blog, round }) {
  const imgUrl = heroImage ? `${strapiUrl}${heroImage.url}` : null;
  return (
    <div className={styles.Container}>
      {heroImage && (
        <MainImage
          imgUrl={imgUrl}
          alternativeText={heroImage.alternativeText}
        />
      )}

      <h2 className="fs--9 fw--normal ta--center">{name}</h2>
      <ul
        className={`${styles.List} ta--center mb--7`}
        style={{ width: "100%" }}
      >
        {round && <Tag>Round {round}</Tag>}
      </ul>

      {blog && (
        <div className={`${styles.Post}`}>
          <ReactMarkdown source={blog} />
        </div>
      )}
    </div>
  );
}

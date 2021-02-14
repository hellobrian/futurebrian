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
    <div className={styles.MainImage}>
      <img
        ref={image}
        data-src={imgUrl}
        src={imgUrl}
        alt={alternativeText}
        onLoad={handleLoad}
        style={{
          opacity,
          transition: "opacity 200ms",
        }}
      />
    </div>
  );
}

function YouTube({ src, ...props }) {
  return (
    <div className={styles.EmbedWrapper} {...props}>
      <iframe
        width="100%"
        height="auto"
        src={src}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

// function Gallery() {
//   return (
//     <div className={styles.Gallery}>
//       <img
//         className={styles.Image}
//         src="/keyboards/photos/ava-yellow.jpg"
//         alt="ava"
//       />
//     </div>
//   );
// }

export function DetailPageLayout({ heroImage, name, blog, round, videos }) {
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

      {videos && (
        <div className="mb--9">
          <h3 className="fs--9 fw--normal ta--center">Videos</h3>
          <div className={styles.Videos}>
            <>
              {videos.map((video) => (
                <YouTube
                  src={video.link}
                  key={video.id}
                  style={{ gridColumn: videos.length < 3 ? 2 : 1 }}
                />
              ))}
            </>
          </div>
        </div>
      )}
    </div>
  );
}

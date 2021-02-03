import ReactMarkdown from "react-markdown";
import styles from "./DetailPageLayout.module.css";

const strapiUrl = process.env.NEXT_PUBLIC_PROD_URL;

function Tag({ children }) {
  return <li className={styles.ListItem}>{children}</li>;
}

export function DetailPageLayout({ heroImage, name, blog, round }) {
  console.log({ blog });
  const imgUrl = heroImage ? `${strapiUrl}${heroImage.url}` : null;
  return (
    <div className={styles.Container}>
      {heroImage && (
        <img
          className={`${styles.MainImage}`}
          src={imgUrl}
          alt={heroImage.alternativeText}
        />
      )}
      <h2 className="fs--9 fw--normal ta--center">{name}</h2>
      <ul
        className={`${styles.List} ta--center mb--7`}
        style={{ width: "100%" }}
      >
        {round && <Tag>Round {round}</Tag>}
      </ul>
      {/* <details className={styles.YouTube}>
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
      </details> */}

      {blog && (
        <div className={`${styles.Post}`}>
          <ReactMarkdown source={blog} />
        </div>
      )}
      {/* <div className={styles.Gallery}>
        <img
          className={styles.Image}
          src="/keyboards/photos/ava-yellow.jpg"
          alt="ava"
        />
      </div> */}
    </div>
  );
}

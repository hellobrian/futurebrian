import styles from "./DetailPageLayout.module.css";

const strapiUrl = process.env.NEXT_PUBLIC_PROD_URL;

function Tag({ children }) {
  return <li className={styles.ListItem}>{children}</li>;
}

export function DetailPageLayout({ heroImage, name }) {
  const imgUrl = heroImage ? `${strapiUrl}${heroImage.url}` : null;
  return (
    <div className={styles.Container}>
      {heroImage && (
        <img
          className={`${styles.MainImage} ${styles.Full}`}
          src={imgUrl}
          alt={heroImage.alternativeText}
        />
      )}
      <h2 className="fs--9 fw--normal ta--center">{name}</h2>
      <ul
        className={`${styles.List} ta--center mb--7`}
        style={{ width: "100%" }}
      >
        <Tag>Tag</Tag>
      </ul>
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

      <p className={`${styles.Post}`}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
        perspiciatis corporis nemo natus veniam. Harum doloremque corrupti
        velit! Debitis sint odit corrupti vel cum esse animi saepe facilis,
        dignissimos quam! Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Nostrum perspiciatis corporis nemo natus veniam. Harum doloremque
        corrupti velit! Debitis sint odit corrupti vel cum esse animi saepe
        facilis, dignissimos quam! Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Nostrum perspiciatis corporis nemo natus veniam. Harum
        doloremque corrupti velit! Debitis sint odit corrupti vel cum esse animi
        saepe facilis, dignissimos quam! Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Nostrum perspiciatis corporis nemo natus veniam. Harum
        doloremque corrupti velit! Debitis sint odit corrupti vel cum esse animi
        saepe facilis, dignissimos quam!
      </p>
      <div className={styles.Gallery}>
        <img
          className={styles.Image}
          src="/keyboards/photos/ava-yellow.jpg"
          alt="ava"
        />
      </div>
    </div>
  );
}

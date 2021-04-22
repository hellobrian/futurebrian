import { Transformation, Image } from "cloudinary-react";
import { useMedia } from "use-media";

import styles from "./GridGallery.module.css";

function GridImage({ name, publicId }) {
  const isMobile = useMedia({ maxWidth: 750 });

  return (
    <div
      className={styles.GridImage}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image publicId={publicId} alt={`picture of a ${name} keyboard`}>
        <Transformation width={isMobile ? "400" : "600"} crop="scale" />
      </Image>

      <span className={styles.GridImageName}>
        <p>{name}</p>
      </span>
    </div>
  );
}

export function GridGallery({ images }) {
  return (
    <div className={styles.GridGallery}>
      {images.map((keyboard) => (
        <GridImage
          name={keyboard.name}
          key={keyboard.id}
          publicId={keyboard.thumbnail_public_id}
        />
      ))}
    </div>
  );
}

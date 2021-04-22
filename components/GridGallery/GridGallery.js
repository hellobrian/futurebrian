import { useState } from "react";
import { Transformation, Image } from "cloudinary-react";
import { useMedia } from "use-media";

import styles from "./GridGallery.module.css";

function GridImage({ name, publicId, color }) {
  const isMobile = useMedia({ maxWidth: 750 });
  const [isHover, setHover] = useState(false);

  const on = () => setHover(true);
  const off = () => setHover(false);

  return (
    <div
      onMouseEnter={on}
      onMouseLeave={off}
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

      <span
        className={styles.GridImageName}
        style={isHover ? { backgroundColor: color } : {}}
      >
        <p>{name}</p>
      </span>
    </div>
  );
}

export function GridGallery({ images, color }) {
  return (
    <div className={styles.GridGallery}>
      {images.map((keyboard) => (
        <GridImage
          name={keyboard.name}
          key={keyboard.id}
          publicId={keyboard.thumbnail_public_id}
          color={color}
        />
      ))}
    </div>
  );
}

import { useState } from "react";
import { Transformation, Image } from "cloudinary-react";
import { useMedia } from "use-media";

import styles from "./GridGallery.module.css";

function GridImage({ name, publicId }) {
  const isMobile = useMedia({ maxWidth: 750 });
  const [isHover, setHover] = useState(false);

  const on = () => setHover(true);
  const off = () => setHover(false);

  return (
    <div onMouseEnter={on} onMouseLeave={off} className={styles.GridImage}>
      <Image
        publicId={publicId}
        alt={`picture of a ${name} keyboard`}
        style={{
          opacity: isHover ? 0.5 : 1,
          transition: "opacity 200ms ease-in-out",
        }}
      >
        <Transformation width={isMobile ? "400" : "600"} crop="scale" />
      </Image>

      <span
        className={styles.GridImageName}
        style={{
          opacity: isHover ? 1 : 0,
          transition: "opacity 200ms ease-in-out",
        }}
      >
        {name}
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

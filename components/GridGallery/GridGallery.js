import { useState } from "react";
import { Transformation, Image } from "cloudinary-react";
import { useMedia } from "use-media";
import Link from "next/link";

import styles from "./GridGallery.module.css";

const transition = "opacity 200ms ease-in-out";

function GridImage({ name, publicId, id, variant }) {
  const isMobile = useMedia({ maxWidth: 750 });
  const [isHover, setHover] = useState(false);

  const on = () => setHover(true);
  const off = () => setHover(false);

  return (
    <Link href={`/${variant}/${id}`}>
      <a>
        <div onMouseEnter={on} onMouseLeave={off} className={styles.GridImage}>
          <Image
            publicId={publicId}
            alt={`picture of a ${name} keyboard`}
            style={
              !isMobile
                ? {
                    opacity: isHover ? 0.5 : 1,
                    transition,
                  }
                : {
                    opacity: 0.5,
                  }
            }
          >
            <Transformation width={isMobile ? "400" : "600"} crop="scale" />
          </Image>

          <span
            className={styles.GridImageName}
            style={
              !isMobile
                ? {
                    opacity: isHover ? 1 : 0,
                    transition,
                  }
                : {
                    opacity: 1,
                  }
            }
          >
            {name}
          </span>
        </div>
      </a>
    </Link>
  );
}

export function GridGallery({ images, variant }) {
  return (
    <div className={styles.GridGallery}>
      {images.map((keyboard) => (
        <GridImage
          id={keyboard.id}
          variant={variant}
          name={keyboard.name}
          key={keyboard.id}
          publicId={keyboard.thumbnail_public_id}
        />
      ))}
    </div>
  );
}

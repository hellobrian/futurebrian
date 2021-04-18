import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useQuery } from "react-query";
import { CloudinaryContext, Transformation, Image } from "cloudinary-react";

import styles from "./DetailPageLayout.module.css";
import { YouTube } from "@/components/YouTube/YouTube";

function Tag({ children }) {
  return <li className={styles.ListItem}>{children}</li>;
}

function Gallery({ name }) {
  async function getImages() {
    const res = await fetch(
      `https://res.cloudinary.com/brianhan/image/list/${name}.json`
    );
    const data = await res.json();
    return data;
  }
  const query = useQuery("images", getImages);
  const { data, status, error, refetch } = query;

  useEffect(refetch, [refetch, name]);

  if (!data || status.error) {
    console.log(error);
    return null;
  }
  if (status === "loading" || !data) {
    return <div>Loading...</div>;
  }

  const firstImage = data.resources.filter((_, i) => i === 0)[0];
  const restImages = data.resources.filter((_, i) => i !== 0);

  return (
    <CloudinaryContext cloudName="brianhan">
      <div className={styles.MainImage}>
        <Image publicId={firstImage.public_id} key={firstImage.public_id}>
          <Transformation
            crop="scale"
            width="808"
            dpr="auto"
            responsive_placeholder="blank"
          />
        </Image>
      </div>
      <div className={styles.Gallery}>
        {restImages.map((img) => {
          return (
            <Image publicId={img.public_id} key={img.public_id}>
              <Transformation
                crop="scale"
                width="300"
                dpr="auto"
                responsive_placeholder="blank"
              />
            </Image>
          );
        })}
      </div>
    </CloudinaryContext>
  );
}

export function DetailPageLayout({ heroImage, name, blog, round, videos }) {
  return (
    <div className={styles.Container}>
      <h2 className="fs--9 fw--normal ta--center">{name}</h2>
      <Gallery name={name} />

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

      {videos.length > 0 && (
        <div className="mb--9">
          <h3 className="fs--9 fw--normal ta--center">Videos</h3>
          <div className={styles.Videos}>
            <>
              {videos.map((video) => (
                <YouTube src={video.embed_link} key={video.id} />
              ))}
            </>
          </div>
        </div>
      )}
    </div>
  );
}

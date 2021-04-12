import { useState, useRef, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { useQuery } from "react-query";
import { CloudinaryContext, Transformation, Image } from "cloudinary-react";

import styles from "./DetailPageLayout.module.css";
import { YouTube } from "@/components/YouTube/YouTube";

const strapiUrl = process.env.NEXT_PUBLIC_PROD_URL;

function Tag({ children }) {
  return <li className={styles.ListItem}>{children}</li>;
}

function MainImage({ imgUrl, alternativeText }) {
  return (
    <div className={styles.MainImage}>
      <img data-src={imgUrl} src={imgUrl} alt={alternativeText} />
    </div>
  );
}

function Gallery({ name }) {
  async function getImages() {
    const res = await fetch(
      `https://res.cloudinary.com/brianhan/image/list/${name}.json`
    );
    const data = await res.json();
    return data;
  }
  const { data, status, error, refetch } = useQuery("images", getImages, {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  useEffect(refetch, [refetch, name]);

  if (status.error) {
    console.log(error);
    return null;
  }
  if (status === "loading" || !data) {
    return <div>Loading...</div>;
  }

  return (
    <CloudinaryContext cloudName="brianhan">
      <div className={styles.Gallery}>
        {data.resources.map((img) => (
          <a
            key={img.public_id}
            target="_blank"
            rel="noreferrer"
            href={`https://res.cloudinary.com/brianhan/image/upload/${img.public_id}.jpg`}
          >
            <Image publicId={img.public_id}>
              <Transformation
                crop="scale"
                width="300"
                height="200"
                dpr="auto"
                responsive_placeholder="blank"
              />
            </Image>
          </a>
        ))}
      </div>
    </CloudinaryContext>
  );
}

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

      <Gallery name={name} />

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

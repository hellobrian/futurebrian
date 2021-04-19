import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useQuery } from "react-query";
import { CloudinaryContext, Transformation, Image } from "cloudinary-react";
import Skeleton from "react-loading-skeleton";

import styles from "./DetailPageLayout.module.css";
import { YouTube } from "@/components/YouTube/YouTube";

function Tag({ children }) {
  return <li className={styles.ListItem}>{children}</li>;
}

function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 800,
        height: 800,
      }}
    >
      <svg
        className={styles.Loading}
        style={{ width: 48, height: 48 }}
        viewBox="0 0 300 100"
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
      >
        <circle cx="50" cy="50" r="50" />
      </svg>
    </div>
  );
}

function Thumbnail({ setImage, setSkeleton, img, mainImage }) {
  const [clicked, setClicked] = useState(false);
  return (
    <button
      type="button"
      key={img.public_id}
      onClick={() => {
        setImage(img.public_id);
        if (!clicked) {
          setSkeleton(true);
          setClicked(true);
        }
      }}
      style={
        mainImage === img.public_id
          ? {
              background: "white",
              border: "4px solid white",
            }
          : {
              background: "transparent",
              border: "4px solid transparent",
            }
      }
    >
      <Image publicId={img.public_id}>
        <Transformation
          crop="scale"
          width="300"
          dpr="auto"
          responsive_placeholder="blank"
        />
      </Image>
    </button>
  );
}

function Gallery({ name }) {
  const [skeleton, setSkeleton] = useState(false);
  const [stateData, setData] = useState(null);
  const [mainImage, setImage] = useState(null);
  async function getImages() {
    const res = await fetch(
      `https://res.cloudinary.com/brianhan/image/list/${name}.json`
    );
    const images = await res.json();
    return images;
  }
  const query = useQuery("images", getImages);
  const { data, status, error, refetch } = query;

  useEffect(refetch, [refetch, name]);
  useEffect(() => setData(data), [data]);
  useEffect(() => {
    if (!stateData) return;

    setImage(stateData.resources[0].public_id);
  }, [setImage, stateData]);

  useEffect(() => {
    if (!skeleton) return;

    setTimeout(() => setSkeleton(false), 2000);
  }, [skeleton]);

  if (!data || status.error) {
    console.log(error);
    return null;
  }
  if (status === "loading" || !data) {
    return <Skeleton height={800} />;
  }

  return (
    <CloudinaryContext cloudName="brianhan">
      <div className={styles.MainImage}>
        {skeleton ? (
          <Loading />
        ) : (
          <Image publicId={mainImage}>
            <Transformation
              crop="fill"
              height="800"
              dpr="auto"
              responsive_placeholder="blank"
            />
          </Image>
        )}
      </div>
      <div className={styles.Gallery}>
        {data.resources.map((img) => {
          return (
            <Thumbnail
              key={img.public_id}
              setImage={setImage}
              setSkeleton={setSkeleton}
              img={img}
              mainImage={mainImage}
            />
          );
        })}
      </div>
    </CloudinaryContext>
  );
}

export function DetailPageLayout({ name, blog, round, videos }) {
  return (
    <div className={styles.Container}>
      <h2 className="fs--9 fw--normal ta--center">{name}</h2>
      <ul
        className={`${styles.List} ta--center mb--7`}
        style={{ width: "100%" }}
      >
        {round ? <Tag>Round {round}</Tag> : null}
      </ul>
      <Gallery name={name} />

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

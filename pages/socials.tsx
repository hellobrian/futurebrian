import { PageLayout } from "@/components/PageLayout/PageLayout";
import { VideoThumbnail } from "@/components/VideoThumbnail/VideoThumbnail";

import styles from "@/styles/Socials.module.css";

export default function Socials(): JSX.Element {
  return (
    <PageLayout>
      <div className={"page-title"}>
        <h2>Socials</h2>
      </div>
      <div className={styles.VideoThumbnailList}>
        <VideoThumbnail icon="youtube" />
        <VideoThumbnail icon="youtube" />
        <VideoThumbnail icon="youtube" />
        <VideoThumbnail icon="youtube" />
      </div>
    </PageLayout>
  );
}

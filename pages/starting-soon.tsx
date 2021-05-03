import { PageLayout } from "@/components/PageLayout/PageLayout";
import { VariantEnum } from "@/utils/types";

import styles from "@/styles/Home.module.scss";

const gif1 =
  "https://media0.giphy.com/media/l3fQgFaM1XzWDaf6M/giphy.gif?cid=ecf05e4763odowp0yje45jjdygmef16hmwlkelpmn76n74bo&rid=giphy.gif&ct=g";
const gif2 =
  "https://media0.giphy.com/media/3o6ozyUiI5bAKck0BG/giphy.gif?cid=ecf05e47p3v4e96zxxxobpdgcykyit85139h7y7pkxcpttf8&amp;rid=giphy.gif&amp;ct=g";

const dog =
  "https://media0.giphy.com/media/GiWEowj3nQv9C/giphy.gif?cid=ecf05e4724hqzpfdz43mukf8qirwmntyiu53gsidj0tyymy6&rid=giphy.gif&ct=g";

export default function Commands(): JSX.Element {
  return (
    <PageLayout variant={VariantEnum.Twitch}>
      <div className={"page-title"} style={{ marginTop: 32 }}>
        <h2>starting soon!</h2>
      </div>
      <section
        className={styles.Section}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          <div>
            <img
              src={dog}
              alt="well be right back eric andre GIF by The Eric Andre Show"
            />
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

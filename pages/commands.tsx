import Link from "next/link";

import { PageLayout } from "@/components/PageLayout/PageLayout";

import styles from "@/styles/Home.module.scss";

function ListItem({ command, alias = "", children }) {
  return (
    <li
      style={{
        display: "grid",
        gridTemplateColumns: "200px 1fr",
        gap: 16,
      }}
    >
      <span
        style={{
          justifySelf: "right",
          color: "var(--red)",

          padding: 4,
        }}
      >
        {command}
      </span>{" "}
      <span style={{ padding: 4 }}>
        {children} {alias && `(alias: ${alias})`}
      </span>
    </li>
  );
}

export default function Commands(): JSX.Element {
  return (
    <PageLayout>
      <div className={"page-title"} style={{ marginTop: 32 }}>
        <h2>!commands</h2>
      </div>
      <section
        className={styles.Section}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: 24 }}>
          <p style={{ textAlign: "center", marginBottom: 32 }}>
            You can use these commands in futurebrian's{" "}
            <Link href="/twitch">
              <a>twitch</a>
            </Link>{" "}
            chat.
          </p>
          <ul>
            <ListItem command="!youtube">
              link to futurebrian's{" "}
              <Link href="/youtube">
                <a>youtube</a>
              </Link>{" "}
              page
            </ListItem>
            <ListItem command="!instagram" alias="!ig">
              link to futurebrian's{" "}
              <Link href="/instagram">
                <a>instagram</a>
              </Link>
            </ListItem>
            <ListItem command="!build">
              get info on what we're building in stream today
            </ListItem>
            <ListItem command="!tip">
              leave a tip for futurebrian via{" "}
              <Link href="https://streamelements.com/futurebrian/tip">
                <a>paypal</a>
              </Link>
            </ListItem>
            <ListItem command="!website">
              link to futurebrian's website (you're actually on it right now)
            </ListItem>
          </ul>
        </div>
      </section>
    </PageLayout>
  );
}

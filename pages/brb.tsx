import { useState, useRef, useEffect } from "react";

import { PageLayout } from "@/components/PageLayout/PageLayout";
import { VariantEnum } from "@/utils/types";

import styles from "@/styles/Home.module.scss";

const dog = [
  "https://media0.giphy.com/media/GiWEowj3nQv9C/giphy.gif?cid=ecf05e4724hqzpfdz43mukf8qirwmntyiu53gsidj0tyymy6&rid=giphy.gif&ct=g",
  "https://media3.giphy.com/media/nbMyAHO0PAVxJ5uJmG/giphy.gif?cid=ecf05e47fbr1l7824o12ym2cp9erntv2r3i50rnfvzoyx4l3&rid=giphy.gif&ct=g",
];

const ericAndre = [
  "https://media0.giphy.com/media/l3fQgFaM1XzWDaf6M/giphy.gif?cid=ecf05e4763odowp0yje45jjdygmef16hmwlkelpmn76n74bo&rid=giphy.gif&ct=g",
  "https://media0.giphy.com/media/3o6ozyUiI5bAKck0BG/giphy.gif?cid=ecf05e47p3v4e96zxxxobpdgcykyit85139h7y7pkxcpttf8&amp;rid=giphy.gif&amp;ct=g",
];

const sackLunchBunch = [
  "https://media2.giphy.com/media/U71T0l9kcKN8eWKiUM/giphy.gif?cid=ecf05e4799uqr3717lhhfn8w97ppu3f4mf7232m1190unqji&rid=giphy.gif&ct=g",
  "https://media4.giphy.com/media/h2NkH4y5156fz4VQEV/giphy.gif?cid=ecf05e47xliez5yozp6bqn5a45qowonskguk67ovwqdgjqz0&rid=giphy.gif&ct=g",
  "https://media4.giphy.com/media/Q8OGNzNytzJBmdRQUE/giphy.gif?cid=ecf05e47r8abdtn8os053gycykw8crf7k439rhfq4ad2kyja&rid=giphy.gif&ct=g",
];

const ghibli = [
  "https://media3.giphy.com/media/11D0XkJInM2ssU/giphy.gif?cid=ecf05e47tt4anr64gykhtx3shrycoivf2ebnv97jr4sut467&rid=giphy.gif&ct=g",
  "https://media0.giphy.com/media/Uz4cDaGXPxeuY/giphy.gif?cid=ecf05e47i4v6btfpotjgp5e2k9kususuhsp30pfqep8ag9n1&rid=giphy.gif&ct=g",
  "https://media1.giphy.com/media/sxtxMmbHzBYru/giphy.gif?cid=ecf05e472xvr89l0k7x6r8vqtygzie530heuqzzimkqsxoy9&rid=giphy.gif&ct=g",
];

const pokemon = [
  "https://media1.giphy.com/media/Tf3mp01bfrrUc/giphy.gif?cid=ecf05e47v8165gsdcn01z407uhtmoi3hwmxgqqjcwfvduw4b&rid=giphy.gif&ct=g",
  "https://media0.giphy.com/media/6PSBjgx7SVj7a/giphy.gif?cid=ecf05e47x8drqk208s00xhesuu3vjr77p56e00rwrrbr0evb&rid=giphy.gif&ct=g",
];

const appa =
  "https://media0.giphy.com/media/8YEnJb7uM19kImkV8R/giphy.gif?cid=ecf05e474s4t240un39npj6i1idcbe84g4r8n5inawdzn0eu&rid=giphy.gif&ct=g";

const jake =
  "https://media1.giphy.com/media/VJxNm7zrm3K4E/giphy.gif?cid=ecf05e47im7nye6oaa7vc5vszrr7why27c4wfjygtnz09w2y&rid=giphy.gif&ct=g";

const gifs = [
  appa,
  jake,
  ...ghibli,
  ...sackLunchBunch,
  ...ericAndre,
  ...dog,
  ...pokemon,
];

export default function Brb(): JSX.Element {
  const [count, setCount] = useState(0);
  const maxCount = gifs.length - 1;
  const duration = 1000 * 5;
  const countRef = useRef(count);
  countRef.current = count;

  useEffect(() => {
    const interval = setInterval(() => {
      if (count >= maxCount) {
        setCount(0);
      } else {
        setCount(count + 1);
      }
      //   setCount(Math.floor(Math.random() * maxCount));
    }, duration);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <PageLayout variant={VariantEnum.Twitch}>
      <div
        className={"page-title"}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h2>brb</h2>
      </div>
      {/* <section
        className={styles.Section}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          <img
            src={gifs[count]}
            alt="well be right back eric andre GIF by The Eric Andre Show"
          />
        </div>
      </section> */}
    </PageLayout>
  );
}

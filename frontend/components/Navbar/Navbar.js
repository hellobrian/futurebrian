import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IconMenu, IconClose } from "@/components/Icons/Icons";
import styles from "./Navbar.module.css";

function getRandomInt(max = 3) {
  return Math.floor(Math.random() * Math.floor(max));
}

function useRandomInt(max = 3) {
  const [randomInt, setRandomInt] = useState(max);

  useEffect(() => {
    setRandomInt(getRandomInt(max));
  }, [max]);

  return { randomInt };
}

function useTitleChanger(pathname) {
  const [title, setTitle] = useState("futurebrian");
  const { randomInt } = useRandomInt();

  useEffect(() => {
    switch (pathname) {
      case "/keycaps":
        if (randomInt === 0) {
          setTitle(`keycaps`);
        }

        if (randomInt === 1) {
          setTitle(`plastic love`);
        }

        if (randomInt === 2) {
          setTitle(`*clackity clack`);
        }

        break;

      case "/keyboards":
        if (randomInt === 0) {
          setTitle(`keyboards`);
        }

        if (randomInt === 1) {
          setTitle(`keebs`);
        }

        if (randomInt === 2) {
          setTitle(`all the keebs`);
        }
        break;

      case "/about":
        setTitle(`about`);
        break;

      case "/blog":
        if (randomInt === 0) {
          setTitle(`Too long for twitter`);
        } else {
          setTitle(`blog`);
        }
        break;
    }
  }, [pathname, randomInt]);

  return { title };
}

export function Navbar() {
  const router = useRouter();

  const { title } = useTitleChanger(router.pathname);

  return (
    <header className={styles.Navbar}>
      <h1>
        <Link href="/">
          <a className="ff--bebas" title="click here to go home">
            {title}
          </a>
        </Link>
      </h1>
      <nav>
        {router.pathname === "/menu" ? (
          <Link href="/">
            <a className={styles.Toggle}>
              <IconClose className={styles.IconClose}></IconClose>
            </a>
          </Link>
        ) : (
          <Link href="/menu">
            <a className={styles.Toggle}>
              <IconMenu className={styles.IconMenu}></IconMenu>
            </a>
          </Link>
        )}
      </nav>
    </header>
  );
}

import { cloneElement } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./Nav.module.css";

const LINKS = [
  { href: "/keyboards", text: "Keyboards", color: "var(--red)" },
  { href: "/keycaps", text: "Keycaps", color: "var(--red)" },
  { href: "/uses", text: "Uses", color: "var(--purple)" },
  { href: "/socials", text: "Socials", color: "var(--blue)" },
];

function NavLink({ href, children, color }) {
  const router = useRouter();

  const style =
    router.pathname === href
      ? {
          background: color,
        }
      : {};

  return <Link href={href}>{cloneElement(children, { style })}</Link>;
}

export function Nav() {
  return (
    <header className={styles.Nav}>
      <Link href="/">
        <a>
          <h1 className="fancy-link">futurebrian</h1>
        </a>
      </Link>
      <ul>
        {LINKS.map((link) => (
          <li key={link.text}>
            <NavLink href={link.href} color={link.color}>
              <a>{link.text}</a>
            </NavLink>
          </li>
        ))}
      </ul>
    </header>
  );
}

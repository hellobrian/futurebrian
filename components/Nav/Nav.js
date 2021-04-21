import { cloneElement } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./Nav.module.css";

const LINKS = [
  { href: "/keyboards", text: "Keyboards", borderColor: "var(--red)" },
  { href: "/keycaps", text: "Keycaps", borderColor: "var(--purple)" },
  { href: "/uses", text: "Uses", borderColor: "var(--blue)" },
  { href: "/socials", text: "Socials", borderColor: "var(--white)" },
];

function NavLink({ href, children }) {
  const router = useRouter();

  let className = children.props.className || "";

  if (router.pathname === href) {
    className = `${className} ${styles.IsActive}`.trim();
  }

  return <Link href={href}>{cloneElement(children, { className })}</Link>;
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
            <NavLink href={link.href}>
              <a style={{ borderColor: link.borderColor }}>{link.text}</a>
            </NavLink>
          </li>
        ))}
      </ul>
    </header>
  );
}

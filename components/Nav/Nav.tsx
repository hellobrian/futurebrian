import { cloneElement } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./Nav.module.scss";

enum LinkColor {
  Red = "var(--red)",
  Purple = "var(--purple)",
  Blue = "var(--blue)",
}

interface NavLinkProps {
  href: string;
  children: JSX.Element;
  color: LinkColor;
}

const LINKS = [
  { href: "/keyboards", text: "Keyboards", color: LinkColor.Red },
  { href: "/keycaps", text: "Keycaps", color: LinkColor.Red },
  { href: "/uses", text: "Uses", color: LinkColor.Purple },
  // { href: "/socials", text: "Socials", color: LinkColor.Blue },
];

function NavLink(props: NavLinkProps): JSX.Element {
  const { href, children, color } = props;
  const router = useRouter();

  const style = router.pathname.includes(href)
    ? {
        background: color,
      }
    : {};

  return <Link href={href}>{cloneElement(children, { style })}</Link>;
}

export function Nav(): JSX.Element {
  return (
    <header className={styles.Nav} data-name="Nav">
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

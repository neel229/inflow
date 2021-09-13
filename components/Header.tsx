import Link from "next/link";

export const Header = () => {
  return (
    <>
      <div>
        <li>
          <Link href="/">
            <a>Inflow</a>
          </Link>
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
      </div>
    </>
  );
};

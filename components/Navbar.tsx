import {
  Nav,
  LogoContainer,
  LinkContainer,
  NavLink,
} from "./styled/Navbar.styled";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <>
      <Nav>
        <LogoContainer>
          <Link href="/">
            <a>
              <Image src="/stitches.svg" width="35px" height="35px"></Image>
            </a>
          </Link>
        </LogoContainer>
        <LinkContainer>
          <Link href="/about">
            <NavLink>How It Works</NavLink>
          </Link>
        </LinkContainer>
        <LinkContainer>
          <Link href="/about">
            <NavLink>Add Course</NavLink>
          </Link>
        </LinkContainer>
        <LinkContainer>
          <Link href="/auth">
            <NavLink isAuth="true">Sign In</NavLink>
          </Link>
        </LinkContainer>
      </Nav>
    </>
  );
};

export default Navbar;

import { styled } from "@stitches/react";

export const Nav = styled("nav", {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  height: "75px",
});

export const LogoContainer = styled("div", {
  marginRight: "auto",
  padding: "16px 50px",
});

export const LinkContainer = styled("div", {
  padding: "1.3rem",
});

export const NavLink = styled("a", {
  textDecoration: "none",
  cursor: "pointer",
  variants: {
    isAuth: {
      true: {
        padding: "5px",
        borderRadius: "5px",

        "&:hover": {
          backgroundColor: "$grass4",
        },
      },
    },
  },
});

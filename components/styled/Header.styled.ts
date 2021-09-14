import { styled } from "@stitches/react";

export const Container = styled("header", {
  display: "flex",
  alignItems: "flex-start",
  paddingTop: "20px",
  paddingLeft: "100px",
  height: "55vh",
});

export const TextContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
});

export const VideoContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  alignItems: "center",
  textAlign: "center",
});
export const TitleContainer = styled("div", {
  fontFamily: "Poppins",
  fontSize: "28px",
});

export const SubTitleContainer = styled("div", {
  fontFamily: "Inter",
  fontSize: "20px",
  opacity: 0.7,
  paddingTop: "1.2rem",
});

import { styled } from "@stitches/react";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  paddingLeft: "100px",
  paddingBottom: "20px",
});

export const HContainer = styled("div", {
  fontFamily: "Poppins",
  fontSize: "450",
});

export const CContainer = styled("div", {
  padding: "20px",
});

export const CardContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  border: "black solid 1px",
});

export const IContainer = styled("div", {
  flex: "1",
  position: "relative",
  height: "70%",
});

export const DContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
});

export const TextDiv = styled("div", {
  whiteSpace: "nowrap",
  padding: "0.75rem",
  overflow: "hidden",
  textOverflow: "hidden",
  textAlign: "left",
});

export const APContainer = styled("div", {
  display: "flex",
  alignItems: "flex-start",
});

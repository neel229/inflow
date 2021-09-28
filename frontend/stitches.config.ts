import { createStitches } from "@stitches/react";
import { teal, purple, grass, indigo } from "@radix-ui/colors";

export const {
  config,
  createTheme,
  css,
  getCssText,
  globalCss,
  styled,
  theme,
} = createStitches({
  theme: {
    colors: {
      hiContrast: "hsl(206,10%,5%)",
      loContrast: "white",
      ...teal,
      ...purple,
      ...grass,
      ...indigo,
    },
    space: {
      1: "5px",
      2: "10px",
      3: "15px",
      4: "20px",
      5: "25px",
      6: "35px",
    },
    sizes: {
      1: "5px",
      2: "10px",
      3: "15px",
      4: "20px",
      5: "25px",
      6: "35px",
    },
    fontSizes: {
      1: "12px",
      2: "13px",
      3: "15px",
      4: "17px",
      5: "19px",
      6: "21px",
    },
    fonts: {
      system: "system-ui",
    },
  },
  utils: {
    marginX: (value: any) => ({
      marginLeft: value,
      marginRight: value,
    }),
    marginY: (value: any) => ({
      marginTop: value,
      marginBottom: value,
    }),
    paddingX: (value: any) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    paddingY: (value: any) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
  },
  media: {
    bp1: "(min-width: 520px)",
    bp2: "(min-width: 900px)",
  },
});

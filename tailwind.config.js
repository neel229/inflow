module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        spaceGrotesk: "'Space Grotesk', sans-serif",
        inter: "'Inter', sans-serif",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("radix-colors-for-tailwind")({
      colors: [
        "tomato",
        "red",
        "crimson",
        "pink",
        "plum",
        "purple",
        "violet",
        "indigo",
        "blue",
        "cyan",
        "teal",
        "green",
        "grass",
        "orange",
        "brown",
        "sky",
        "mint",
        "lime",
        "yellow",
        "amber",
        "gray",
        "mauve",
        "slate",
        "sage",
        "olive",
        "sand",
        "gold",
        "bronze",
      ],
    }),
  ],
};

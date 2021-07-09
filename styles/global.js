import css from "styled-jsx/css";

export default css.global`
  html,
  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  div,
  span,
  img,
  ul,
  li {
    margin: 0;
    padding: 0;
  }
  html {
    height: 100%;
  }
  body {
    min-height: 100vh;
    overflow: x-clip;
  }
  #__next {
    min-height: 100vh;
  }
  .separator {
    margin: 0 0.2em;
  }
`;

export const theme = {
  colors: {
    darkGrey: "#666",
    lightGrey: "#B3B3B3",
    veryLightGrey: "#ddd",
    primary: "#2c6279",
    secondary: "#97b365",
    red: "#c62828",
  },
  sizes: {
    boxPadding: "10px",
  },
  fonts: {
    sans: "proxima-nova",
    serif: "adobe-caslon-pro",
  },
};

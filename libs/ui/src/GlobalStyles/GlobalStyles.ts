import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
  html {
    line-height: 1;
    text-size-adjust: 100%;
    margin: 0;
    padding: 0;
    font-size: 62.5%;
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    padding: 0;
    font-size: 1.6rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: "Poppins", sans-serif;
    overflow-x: hidden;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  ul,
  ol {
    padding: 0 0 0 3rem;
    margin: 1rem 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    padding: 0;
    margin: 0;
  }

  a {
    background-color: transparent;
    color: inherit;
    font-weight: inherit;
  }

  img {
    border-style: none;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
    margin: 0;
    border: none;
    background-color: transparent;
    padding: 0;
  }

  textarea {
    overflow: auto;
  }

  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    appearance: button;
    cursor: pointer;
  }

  button::-moz-focus-inner,
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0;
    margin: 0;
  }
`

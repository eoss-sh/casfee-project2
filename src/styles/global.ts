import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
/*---- RESETS ----*/
/* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Remove default margin */
body,
h1,
h2,
h3,
h4,
p,
figure,
blockquote,
dl,
dd {
  margin: 0;
}

/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
ul[role='list'],
ol[role='list'] {
  list-style: none;
}

/* Set core root defaults */
html:focus-within {
  scroll-behavior: smooth;
}

/* Set core body defaults */
body {
  min-height: 100vh;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
}

/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
}

/* Make images easier to work with */
img,
picture {
  max-width: 100%;
  display: block;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
  font: inherit;
}

/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
  html:focus-within {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/*-- Custom Properties --*/

:root {
  --dark-green: #365d32;
  --light-green: #A1C181;
  --yellow: #FCCA46;
  --light-blue: #3AAED8;
  --dark-blue: #233D4D; 
  --white: #fff;
  --black: #000;
  --dark-grey: #5f5e5e;
}

/*-- Global Styles --*/

body {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.button {
  padding: 10px 30px;
  border: 1px solid #3AAED8;
  background-color: #3AAED8;
  border-radius: 10px;
}
.button:hover {
  background-color: transparent;
}

.button-primary {
  border:1px solid #FCCA46;
  background-color: #FCCA46;
}

`;

export default GlobalStyle;
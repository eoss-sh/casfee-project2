import { createGlobalStyle } from "styled-components";

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
dd, 
ul {
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
  --light-grey: #e5e5e5;
}

/*-- Global Styles --*/

body {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

// Typography
h1 {
  font-size: 3rem;
}

h2 {
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
}

h3 {
  font-size: 1.4rem;
}

h4 {
  font-size: 1.2rem;
}

p {
  font-size: 1rem;
}

// Inputs and Forms
input[type='file']{
  display: none;
}

// Selects
select {
  border: none;
  background-color: lightgray;
  border-radius: 30px;
  padding-left: 1%;
}
option {
  padding-left: 2%;
}
`;
export default GlobalStyle;

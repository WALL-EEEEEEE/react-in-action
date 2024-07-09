import React from 'react';
import {createRoot} from 'react-dom/client';

const node = document.getElementById('root')
const root = createRoot(node)
const n = React.createElement(
  "div", 
  {},
  "Hello, World!",
  React.createElement(
    "a",
    {href: "mailto:mark@ifelse.io"},
    React.createElement("h1", {}, "React In Action"),
    React.createElement("em", {}, "...and now it really is!")
  )
)
root.render(n)
const { createGlobPatternsForDependencies } = require("@nrwl/react/tailwind")
const { join } = require("path")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      "{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}",
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#D0974F",
        "gray": "#F5F5F5"
      },
    },
  },
  plugins: [],
}

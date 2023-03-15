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
        "primary-400": "#D0974F",
        "primary-500": "#C38B43",
      },
    },
  },
  plugins: [],
}

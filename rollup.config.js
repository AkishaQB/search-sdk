import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/index.js",

  output: {
    file: "dist/search-sdk.esm.js",
    format: "esm",
    sourcemap: true
  },

  plugins: [
    resolve(),
    terser()
  ],

  treeshake: {
    moduleSideEffects: false
  }
};

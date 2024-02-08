import { defineConfig } from "cypress";
// https://medium.com/@nelfayran/cypress-react-and-vite-collaboration-bed6761808fc 
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});

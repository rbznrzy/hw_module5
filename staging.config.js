const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "n8e2of",
  e2e: {
    baseUrl: 'https://sqlverifier-staging-08050d656f7a.herokuapp.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    environment: "staging"
  },
});

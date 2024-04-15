const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "n8e2of",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

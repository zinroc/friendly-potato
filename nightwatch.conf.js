const chromedriver = require("chromedriver");

module.exports = {
  src_folders: ["nightwatch/e2e"],
  output_folder: "nightwatch/results",
  custom_commands_path: "nightwatch/commands",
  custom_assertions_path: "",
  globals_path: "nightwatch/globalsModule.js",
  webdriver: {
    start_process: true,
    port: 4444,
    server_path: "node_modules/.bin/geckodriver",
    cli_args: [],
  },
  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: "firefox",
        alwaysMatch: {
          acceptInsecureCerts: true,
        },
      },
      launch_url: "http://localhost:3000",
      globals: {
        waitForConditionTimeout: 1000,
      },
    },
    chrome: {
      desiredCapabilities: {
        browserName: "chrome",
        chromeOptions: {
          w3c: false,
        },
      },
      webdriver: {
        port: 9515,
        server_path: chromedriver.path,
      },
    },
  },
};

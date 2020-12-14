const SEARCH_INPUT = '//input[@name="searchInput"]';
const SUBMIT_SEARCH = '//button[@name="submitSearch"]';
const REPO = "//div[text()='vanilla/vanilla']";

module.exports = {
  "Repo Lister - Org": (browser) => {
    browser
      .url("http://localhost:3000/")
      .waitForElementVisible("body")
      .useXpath()
      .setValue(SEARCH_INPUT, "vanilla")
      .click(SUBMIT_SEARCH)
      .waitForElementVisible(REPO)
      .end();
  },
};

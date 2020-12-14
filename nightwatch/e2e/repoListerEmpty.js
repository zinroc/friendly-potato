const SEARCH_INPUT = '//input[@name="searchInput"]';
const SUBMIT_SEARCH = '//button[@name="submitSearch"]';
const LISTING_FOR_USER = "//h2[@name='listingForUser']";

module.exports = {
  "Repo Lister - Empty": (browser) => {
    browser
      .url("http://localhost:3000/")
      .waitForElementVisible("body")
      .useXpath()
      .setValue(SEARCH_INPUT, "")
      .click(SUBMIT_SEARCH)
      .waitForElementNotPresent(LISTING_FOR_USER)
      .end();
  },
};

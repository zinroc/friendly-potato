import { resolveSort, sortOptions } from "../containers/RepoLister";

const testRepos = [
  { name: "b", stargazers_count: 10 },
  { name: "c", stargazers_count: 4 },
  { name: "a", stargazers_count: 3 },
  { name: "d", stargazers_count: 1 },
  { name: "e", stargazers_count: 6 },
];

describe("resolveSort", () => {
  it("Sorting repos alphabetically, first repo name should be named 'a'", () => {
    const newArr = testRepos.sort((a, b) =>
      resolveSort({ a, b, sortType: sortOptions.ALPHABETICAL })
    );

    expect(newArr[0].name).toBe("a");
  });

  it("Sorting repos by stargazer count, first repo name should be have 10 gazers ", () => {
    const newArr = testRepos.sort((a, b) =>
      resolveSort({ a, b, sortType: sortOptions.MOST_STARTS })
    );

    expect(newArr[0].stargazers_count).toBe(10);
  });

  it("Sorting empty array of repos results in an array of length 0", () => {
    const newArr1 = [].sort((a, b) =>
      resolveSort({ a, b, sortType: sortOptions.ALPHABETICAL })
    );
    const newArr2 = [].sort((a, b) =>
      resolveSort({ a, b, sortType: sortOptions.MOST_STARTS })
    );

    expect(newArr1.length).toBe(0);
    expect(newArr2.length).toBe(0);
  });
});

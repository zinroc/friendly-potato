import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { SET_SORT_BY } from "../redux/modules/main";

import RepoListerHeader from "../components/RepoListerHeader";
import RepoListerGrid from "../components/RepoListerGrid";
import Toggle from "../components/Toggle";

import { Error, Loading, Body, H2 } from "../components/common";

export const sortOptions = {
  ALPHABETICAL: "Alphabetical",
  MOST_STARTS: "By Most Stars",
};

export const resolveSort = ({ a, b, sortType }) => {
  switch (sortType) {
    case sortOptions.ALPHABETICAL: {
      return a.name.localeCompare(b.name);
    }
    case sortOptions.MOST_STARTS: {
      return b.stargazers_count - a.stargazers_count;
    }
    default: {
      return true;
    }
  }
};

const RepoLister = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SET_SORT_BY, sortBy: sortOptions.ALPHABETICAL });
  }, []);

  const error = useSelector((state) => state.main.error);
  const loading = useSelector((state) => state.main.loading);
  const repos = useSelector((state) => state.main.repos);
  const sortBy = useSelector((state) => state.main.sortBy);
  const githubAccountDisplayName = useSelector(
    (state) => state.main.githubAccountDisplayName
  );

  return (
    <>
      <RepoListerHeader />
      <Body>
        {githubAccountDisplayName && (
          <H2 name="listingForUser">
            Listing repositories for the user "{githubAccountDisplayName}"{" "}
          </H2>
        )}
        <Toggle
          label="Sort By"
          options={sortOptions}
          activeOption={sortBy}
          onChange={(newSortBy) =>
            dispatch({
              type: SET_SORT_BY,
              sortBy: newSortBy,
            })
          }
        />
        {loading && <Loading>"...Loading"</Loading>}
        {error && <Error>{error}</Error>}
        {repos.length === 0 &&
        githubAccountDisplayName &&
        !loading &&
        !error ? (
          <Error>This Account does not have any Repos</Error>
        ) : (
          <RepoListerGrid repos={repos} />
        )}
      </Body>
    </>
  );
};

export default RepoLister;

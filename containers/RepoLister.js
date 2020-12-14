import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { SET_SORT_BY } from "../redux/modules/main";

import RepoListerHeader from "../components/RepoListerHeader";
import RepoListerGrid from "../components/RepoListerGrid";
import Toggle from "../components/Toggle";

import { Error, Loading, Body, Page, H2 } from "../components/common";

const sortOptions = {
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
  const githubAccountName = useSelector(
    (state) => state.main.githubAccountName
  );

  return (
    <>
      <RepoListerHeader />
      <Body>
        {githubAccountName && (
          <H2>Listing repositories for the user "{githubAccountName}" </H2>
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
        {/*
          @TODO - discuss how error messages should be displayed.
          Should there be more descriptive message for common errors
          (i.e. org is misspelled)
        */}
        {error && <Error>{error}</Error>}
        {repos.length === 0 && githubAccountName && !loading && !error ? (
          <Error>This Account does not have any Repos</Error>
        ) : (
          <RepoListerGrid repos={repos} />
        )}
      </Body>
    </>
  );
};

export default RepoLister;

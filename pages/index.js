import Head from "next/head";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchReposForOrg, fetchReposForUser } from "../api/github";

import {
  FETCHING_REPOS_FAILURE,
  FETCHING_REPOS_START,
  FETCHING_REPOS_SUCCESS,
  SET_GITHUB_ACCOUNT_NAME,
  SET_SORT_BY,
} from "../redux/modules/main";

const Header = styled.div`
  background-color: black;
  text-align: center;
  width: 100%;
  padding: 10px;
  font-weight: 500;
  cursor: default;
  position: fixed;
  justify-content: space-around;
  display: flex;
  padding: 5px;
  font-size: 25px;
  @media (max-width: 700px) {
    display: block;
  }
`;

const SearchInput = styled.input`
  background-color: #363636;
  border: #363636 1px solid;
  padding: 12px;
  color: white;
  border-radius: 5px;
  width: 350px;
  ::placeholder {
    color: #d9d9d9;
  }
`;

const Button = styled.button`
  padding: 10px;
  background-color: white;
  color: black;
  font-weight: black;
  border: 1px solid white;
  border-radius: 5px;
  min-width: 100px;
  cursor: pointer;
`;

const HeaderTitle = styled.div`
  padding-top: 5px;
  color: white;
`;

const Spacer = styled.div`
  height: ${({ height }) => (height ? height : "0px")};
  @media (max-width: 700px) {
    ${({ mobileHeight }) => mobileHeight && `height: ${mobileHeight};`}
  }
`;

const Grid = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const GridItem = styled.div`
  width: 400px;
`;

const Body = styled.div`
  max-width: 1200px;
  text-align: left;
  display: inline-block;
  width: 100%;
`;

const Page = styled.div`
  text-align: center;
`;

const RepoCard = styled.div`
  margin: 10px;
  box-shadow: 2px 2px 2px 2px #d1d1d1;
  height: 200px;
  padding: 10px;
  border-radius: 10px;
  line-height: 20px;
  overflow: scroll;
`;

const RepoTitle = styled.div`
  font-weight: 600;
`;

const RepoStats = styled.div`
  color: #757575;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
`;

const RepoStat = styled.div`
  display: inline-flex;
`;

/* 
  @TODO - discuss,
  what is the desired behaviour if the description text is too long?
  Currently the card scrolls.
*/
const RepoDescription = styled.div`
  font-size: 15px;
  font-weight: 300;
`;

const H2 = styled.h2`
  font-weight: 300;
`;

const InlineLabel = styled.label`
  display: inline-flex;
  font-size: 20px;
`;

const ToggleContainer = styled.div`
  display: flex;
  margin-left: 10px;
`;

// @TODO - refactor this into a radio input
const ToggleOption = styled.button`
  border: solid #757575 1px;
  color: #757575;
  padding: 5px;
  font-size: 13px;
  width: 150px;
  text-align: center;
  cursor: pointer;
  background-color: white;
  ${({ isFirstOption }) =>
    isFirstOption &&
    `border-top-left-radius: 5px; border-bottom-left-radius: 5px;`}
  ${({ isLastOption }) =>
    isLastOption &&
    `border-top-right-radius: 5px; border-bottom-right-radius: 5px;`}
  ${({ isActive }) => isActive && `background-color: #e0fdff;`}
  :hover {
    background-color: #e0fdff;
  }
`;

const Loading = styled.div``;

const Error = styled.div`
  color: red;
`;

const Toggle = ({ options, activeOption, label, onChange = () => {} }) => {
  const keys = Object.keys(options);
  return (
    <InlineLabel>
      {label}
      <ToggleContainer>
        {keys.map((o, index) => (
          <ToggleOption
            key={o}
            isFirstOption={index === 0}
            isLastOption={index === keys.length - 1}
            isActive={options[o] === activeOption}
            id={options[o]}
            type="button"
            onClick={() => {
              if (options[o] !== activeOption) {
                onChange(options[o]);
              }
            }}
          >
            {options[o]}
          </ToggleOption>
        ))}
      </ToggleContainer>
    </InlineLabel>
  );
};

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

const Form = ({ onSubmit, children }) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit(e.target);
    }}
  >
    {children}
  </form>
);

export default function Home() {
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

  const fetchReposWrapper = async ({ searchInput }) => {
    dispatch({ type: FETCHING_REPOS_START, searchInput });
    try {
      const res = await fetchReposForOrg({ githubAccount: searchInput.value });
      dispatch({ type: FETCHING_REPOS_SUCCESS, repos: res.data });
    } catch (err) {
      try {
        /*
          @TODO - investigate - 
          is it possible for a user to have the same name as an org?
          how should the repos that belong to the user be differentiated
          from those that belong to the org?

          For now only show user repos if an org with the same name is not found.
        */
        const res = await fetchReposForUser({
          githubAccount: searchInput.value,
        });
        dispatch({ type: FETCHING_REPOS_SUCCESS, repos: res.data });
      } catch (err) {
        dispatch({
          type: FETCHING_REPOS_FAILURE,
          error: err,
        });
      }
    }
  };

  return (
    <Page>
      <Head>
        <title>Sergei - Github Repo Lister</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Header>
        <HeaderTitle>Github Repo Lister</HeaderTitle>
        <div>
          <Form
            onSubmit={(formValues) => {
              dispatch({
                type: SET_GITHUB_ACCOUNT_NAME,
                githubAccountName: formValues.searchInput
                  ? formValues.searchInput.value
                  : "",
              });

              fetchReposWrapper({
                searchInput: formValues.searchInput,
              });
            }}
          >
            <SearchInput
              name="searchInput"
              id="searchInput"
              placeholder="Search Users/Orgs"
            />{" "}
            <Button> Search </Button>
          </Form>
        </div>
      </Header>
      <Spacer height="75px" mobileHeight="150px;" />
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
        {error && <Error>{error}</Error>}{" "}
        <Grid>
          {repos.map((repo) => (
            <GridItem key={repo.id}>
              <RepoCard>
                <RepoTitle>{repo.full_name}</RepoTitle>
                <RepoStats>
                  <RepoStat>{repo.stargazers_count} Stargazers</RepoStat>
                  <RepoStat>{repo.watchers_count} People Watching</RepoStat>
                </RepoStats>

                <RepoDescription>{repo.description}</RepoDescription>
              </RepoCard>
            </GridItem>
          ))}
        </Grid>
      </Body>
    </Page>
  );
}

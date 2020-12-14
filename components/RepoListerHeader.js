import styled from "@emotion/styled";
import { useDispatch } from "react-redux";

import { fetchReposForOrg, fetchReposForUser } from "../api/github";

import { dark, placeholderLight } from "../styles/colors";

import {
  SET_GITHUB_ACCOUNT_NAME,
  FETCHING_REPOS_FAILURE,
  FETCHING_REPOS_START,
  FETCHING_REPOS_SUCCESS,
} from "../redux/modules/main";

import { Form, Button, Spacer } from "../components/common";

const HeaderContainer = styled.div`
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
  background-color: ${dark};
  border: ${dark} 1px solid;
  padding: 12px;
  color: white;
  border-radius: 5px;
  width: 350px;
  ::placeholder {
    color: ${placeholderLight};
  }
`;

const HeaderTitle = styled.div`
  padding-top: 5px;
  color: white;
`;

const fetchReposWrapper = async ({ dispatch, searchInput }) => {
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

const RepoListerHeader = () => {
  const dispatch = useDispatch();
  return (
    <>
      <HeaderContainer>
        <HeaderTitle>Github Repo Lister</HeaderTitle>
        <div>
          <Form
            onSubmit={(formValues) => {
              dispatch({
                type: SET_GITHUB_ACCOUNT_NAME,
                githubAccountDisplayName: formValues.searchInput
                  ? formValues.searchInput.value
                  : "",
              });

              fetchReposWrapper({
                dispatch,
                searchInput: formValues.searchInput,
              });
            }}
          >
            <SearchInput
              name="searchInput"
              id="searchInput"
              placeholder="Search Users/Orgs"
            />{" "}
            <Button name="submitSearch"> Search </Button>
          </Form>
        </div>
      </HeaderContainer>
      <Spacer height="75px" mobileHeight="150px;" />
    </>
  );
};

export default RepoListerHeader;

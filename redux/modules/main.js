import { resolveSort } from "../../containers/RepoLister";

export const FETCHING_REPOS_START = "main/START_FETCHING_REPOS";
export const FETCHING_REPOS_SUCCESS = "main/START_FETCHING_SUCCESS";
export const FETCHING_REPOS_FAILURE = "main/START_FETCHING_FAILURE";

export const SET_GITHUB_ACCOUNT_NAME = "main/SET_GITHUB_ACCOUNT_NAME";

export const SET_SORT_BY = "main/SET_SORT_BY";

const initialState = {
  error: "",
  loading: false,
  repos: [],
  githubAccountDisplayName: "",
  sortBy: "",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_SORT_BY: {
      return {
        ...state,
        sortBy: action.sortBy,
        repos: state.repos.sort((a, b) =>
          resolveSort({ a, b, sortType: action.sortBy })
        ),
      };
    }
    case FETCHING_REPOS_START: {
      return {
        ...state,
        error: "",
        loading: true,
        repos: [],
      };
    }
    case FETCHING_REPOS_SUCCESS: {
      return {
        ...state,
        loading: false,
        repos: action.repos.sort((a, b) =>
          resolveSort({ a, b, sortType: state.sortBy })
        ),
      };
    }
    case FETCHING_REPOS_FAILURE: {
      return {
        ...state,
        loading: false,
        error:
          action.error && action.error.message
            ? action.error.message
            : JSON.stringify(action.error),
      };
    }
    case SET_GITHUB_ACCOUNT_NAME: {
      return {
        ...state,
        githubAccountDisplayName: action.githubAccountDisplayName,
      };
    }
    default:
      return state;
  }
}

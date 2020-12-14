// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

const BASE_URL = "https://api.github.com/";

// assuming the assignment should be using this endpoint as it was the one in the problem definition document:

export const fetchReposForOrg = ({ githubAccount }) =>
  axios.get(`${BASE_URL}orgs/${githubAccount}/repos`);

export const fetchReposForUser = ({ githubAccount }) =>
  axios.get(`${BASE_URL}users/${githubAccount}/repos`);

export default {};

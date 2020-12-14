// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

const BASE_URL = "https://api.github.com/";

export const fetchRepos = ({ githubAccount }) =>
  axios.get(`${BASE_URL}orgs/${githubAccount}/repos`);

export default {};

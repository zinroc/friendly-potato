import Head from "next/head";

import { Page } from "../components/common";

import RepoLister from "../containers/RepoLister";

export default function Home() {
  return (
    <Page>
      <Head>
        <title>Sergei - Github Repo Lister</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <RepoLister />
    </Page>
  );
}

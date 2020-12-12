import Head from "next/head";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "@emotion/styled";

import { SET_GREETING } from "../redux/modules/main";

const Header = styled.div`
  background-color: black;
  text-align: center;
  width: 100%;
  color: white;
  padding: 10px;
  font-weight: 500;
  cursor: default;
  position: fixed;
  justify-content: space-around;
  display: flex;
  padding: 10px;
  font-size: 25px;
`;

const Spacer = styled.div`
  height: ${({ height }) => (height ? height : "0px")};
`;

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SET_GREETING, greeting: "Hello World" });
  }, []);

  const greeting = useSelector((state) => state.main.greeting);

  return (
    <div>
      <Head>
        <title>Sergei - Github Repo Lister</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header>Github Repo Lister</Header>
      <Spacer height="125px" />

      {greeting}
    </div>
  );
}

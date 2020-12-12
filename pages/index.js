import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { SET_GREETING } from "../redux/modules/main";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SET_GREETING, greeting: "Hello World" });
  }, []);

  const greeting = useSelector((state) => state.main.greeting);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {greeting}
    </div>
  );
}

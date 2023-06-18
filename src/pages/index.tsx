import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import type { Liff } from "@line/liff/exports";
import { useEffect, useState } from "react";

interface LiffProps {
  liff: Liff | null;
  liffError: string | null;
}

const Home: NextPage<LiffProps> = ({ liff, liffError }: LiffProps) => {
  const [profile, setProfile] = useState<string | null>(null);

  useEffect(() => {
    if (liff !== null) {
      if (!liff.isLoggedIn() && !liff.isInClient()) {
        /* empty */
        alert("ログインしてください");
      } else {
        const accessToken = liff.getAccessToken();
        liff
          .getProfile()
          .then((p) => {
            const str = JSON.stringify(p);
            setProfile(
              str
                .substring(1, str.length - 1)
                .replaceAll('"', "")
                .replaceAll(":", ": ")
                .split(",")
                .join("\n")
            );
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [liff]);

  return (
    <div>
      <Head>
        <title>LIFF App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>create-liff-app</h1>
        {liff != null && (
          <>
            <p>LIFF init succeeded.</p>
            <p className={styles.text}>{profile}</p>
          </>
        )}
        {liffError != null && (
          <>
            <p>LIFF init failed.</p>
            <p>
              <code>{liffError}</code>
            </p>
          </>
        )}
        <a
          href="https://developers.line.biz/ja/docs/liff/"
          target="_blank"
          rel="noreferrer"
        >
          LIFF Documentation
        </a>
      </main>
    </div>
  );
};

export default Home;

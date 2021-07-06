import Head from "next/head";
import client from "../lib/apollo-client";
import { BULLETINS_LIST } from "../lib/queries";
import { createDateObject, createDateString } from "../lib/dateUtils";

export async function getStaticProps() {
  const { data } = await client.query({
    query: BULLETINS_LIST,
  });

  return {
    props: {
      bulletins: data.bulletins,
    },
  };
}

export default function Home({ bulletins }) {
  return (
    <>
      <Head>
        <title>ESUMC Online Bulletin</title>
        <meta name="description" content="ESUMC Online Worship Bulletin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <main>
          <h1>Sanctuary Bulletins</h1>
          <ul>
            {bulletins.map((bulletin) => {
              const date = createDateObject(bulletin.date);
              return (
                <li key={bulletin.bulletin_id}>{createDateString(date)}</li>
              );
            })}
          </ul>
        </main>
      </div>
    </>
  );
}

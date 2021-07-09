import Head from "next/head";
import Link from "next/link";
import client from "../../lib/apollo-client";
import { DRAFT_BULLETINS_LIST } from "../../lib/queries";
import { createDateObject, createDateString } from "../../lib/dateUtils";

export async function getStaticProps() {
  try {
    const { data } = await client.query({
      query: DRAFT_BULLETINS_LIST,
    });
    return {
      props: {
        bulletins: data.sanctuaryBulletins,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        bulletins: false,
      },
    };
  }
}

export default function Home({ bulletins }) {
  return (
    <>
      <Head>
        <title>ESUMC Sanctuary Bulletins: Drafts</title>
        <meta name="description" content="ESUMC Online Worship Bulletin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <main>
          <h1>Draft Sanctuary Bulletins</h1>
          {bulletins ? (
            <ul>
              {bulletins.map((bulletin) => {
                const date = createDateObject(bulletin.date);
                return (
                  <li key={bulletin.uuid}>
                    <Link href={`/sanctuary/${bulletin.uuid}`}>
                      {createDateString(date)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>Internal server error.</p>
          )}
        </main>
      </div>
    </>
  );
}

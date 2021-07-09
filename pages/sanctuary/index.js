import Head from "next/head";
import Link from "next/link";
import client from "../../lib/apollo-client";
import { BULLETINS_LIST } from "../../lib/queries";
import {
  createDateObject,
  createDateString,
  getDateSearchString,
} from "../../lib/dateUtils";

export async function getStaticProps() {
  try {
    const { data } = await client.query({
      query: BULLETINS_LIST,
      variables: {
        date: getDateSearchString(),
      },
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
        <title>ESUMC Sanctuary Bulletin</title>
        <meta name="description" content="ESUMC Online Worship Bulletin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <header>
          <h1>Sanctuary Bulletins</h1>
        </header>
        <main>
          <div className="container">
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
          </div>
        </main>
      </div>
      <style jsx>{`
        header {
        }
        main {
          display: flex;
          justify-content: center;
        }
        .container {
          width: 100%;
          max-width: 500px;
        }
        h1 {
          font-family: adobe-caslon-pro;
          font-weight: bold;
          font-size: 2rem;
          text-align: center;
        }
      `}</style>
    </>
  );
}

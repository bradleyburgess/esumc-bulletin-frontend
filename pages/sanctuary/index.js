import Head from "next/head";
// import Link from "next/link";
import { ApolloProvider, useQuery } from "@apollo/client";
import client from "../../lib/apollo-client";
import { BULLETINS_LIST } from "../../lib/queries";
import { createDateObject, createDateString } from "../../lib/dateUtils";
import Loading from "../../components/common/Loading";
import Title from "../../components/common/IndexTitle";
import P from "../../components/sanctuary/Paragraph";
import ESUMCLogo from "../../components/common/ESUMCLogo";
import BulletinsList from "../../components/common/BulletinsList";

export async function getStaticProps() {
  try {
    const { data } = await client.query({
      query: BULLETINS_LIST,
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

export default function SanctuaryPage() {
  return (
    <ApolloProvider client={client}>
      <SanctuaryBulletins />
    </ApolloProvider>
  );
}

function SanctuaryBulletins() {
  const { loading, error, data } = useQuery(BULLETINS_LIST);

  return (
    <>
      <Head>
        <title>ESUMC Sanctuary Bulletins</title>
        <meta name="description" content="ESUMC Online Worship Bulletin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <header>
          <ESUMCLogo size="sm" href="/" />
          <Title>Sanctuary Bulletins</Title>
        </header>
        <main>
          {loading && <Loading />}
          {data &&
            (data.sanctuaryBulletins.length > 0 ? (
              <BulletinsList bulletins={data.sanctuaryBulletins} />
            ) : (
              <P>There are currently no drafts 🙂</P>
            ))}
          {error && <p>Internal server error</p>}
        </main>
      </div>
      <style jsx global>
        {`
          .container {
            text-align: center;
          }
          header {
            padding-top: 1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            & > * {
              margin-top: 1rem;
            }
          }
          main {
            padding-top: 1rem;
          }
        `}
      </style>
    </>
  );
}


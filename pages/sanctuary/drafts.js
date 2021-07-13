import Head from "next/head";
// import Link from "next/link";
import { ApolloProvider, useQuery } from "@apollo/client";
import client from "../../lib/apollo-client";
import { DRAFT_BULLETINS_LIST } from "../../lib/queries";
import { createDateObject, createDateString } from "../../lib/dateUtils";
import Loading from "../../components/Loading";
import Title from "../../components/IndexTitle";
import P from "../../components/Paragraph";
import ESUMCLogo from "../../components/ESUMCLogo";
import BulletinsList from "../../components/BulletinsList";

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

export default function DraftsPage() {
  return (
    <ApolloProvider client={client}>
      <Drafts />
    </ApolloProvider>
  );
}

function Drafts() {
  const { loading, error, data } = useQuery(DRAFT_BULLETINS_LIST);

  return (
    <>
      <Head>
        <title>ESUMC Sanctuary Bulletins: Drafts</title>
        <meta name="description" content="ESUMC Online Worship Bulletin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <header>
          <ESUMCLogo size="sm" href="/" />
          <Title>Draft Sanctuary Bulletins</Title>
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

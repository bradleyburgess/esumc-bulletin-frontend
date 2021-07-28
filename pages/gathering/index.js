import Head from "next/head";
// import Link from "next/link";
import { ApolloProvider, useQuery } from "@apollo/client";
import client from "../../lib/apollo-client";
import { GATHERING_BULLETINS_LIST } from "../../lib/queries";
import { createDateObject, createDateString } from "../../lib/dateUtils";
import Loading from "../../components/common/Loading";
import Title from "../../components/common/IndexTitle";
import P from "../../components/sanctuary/Paragraph";
import ESUMCLogo from "../../components/common/ESUMCLogo";
import BulletinsList from "../../components/common/BulletinsList";

export async function getStaticProps() {
  try {
    const { data } = await client.query({
      query: GATHERING_BULLETINS_LIST,
    });
    return {
      props: {
        bulletins: data.gatheringBulletins,
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

export default function GatheringPage() {
  return (
    <ApolloProvider client={client}>
      <GatheringBulletins />
    </ApolloProvider>
  );
}

function GatheringBulletins() {
  const { loading, error, data } = useQuery(GATHERING_BULLETINS_LIST);

  return (
    <>
      <Head>
        <title>ESUMC Gathering Bulletins</title>
        <meta name="description" content="ESUMC Online Worship Bulletin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <header>
          <ESUMCLogo size="sm" href="/" />
          <Title>Gathering Bulletins</Title>
        </header>
        <main>
          {loading && <Loading />}
          {data &&
            (data.gatheringBulletins.length > 0 ? (
              <BulletinsList
                bulletins={data.gatheringBulletins}
                location="gathering"
              />
            ) : (
              <P>There are currently no bulletins to show.</P>
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

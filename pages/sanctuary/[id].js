import { theme } from "../../styles/global";
import { useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import client from "../../lib/apollo-client";
import {
  BULLETIN,
  BULLETINS_LIST_IDS,
  GLOBAL_SETTINGS,
} from "../../lib/queries";
import { createDateObject, createDateString } from "../../lib/dateUtils";
import {
  makeTitleCase,
  formatUrl,
  formatCopyright,
} from "../../lib/stringUtils";
import { getFinanceStrings } from "../../lib/financesUtils";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import roseWindow from "../../public/rosette.png";
import BackButton from "../../components/BackButton";
import HR from "../../components/HR";
import A from "../../components/Anchor";
import Heading from "../../components/Heading";
import SubHeading from "../../components/SubHeading";
import P from "../../components/Paragraph";
import Copyright from "../../components/Copyright";
import Section from "../../components/Section";
import Finances from "../../components/Finances";

export async function getStaticPaths() {
  const { data } = await client.query({
    query: BULLETINS_LIST_IDS,
  });

  // Working:
  // console.log("getStaticPaths", data.sanctuaryBulletins);

  return {
    paths: data.sanctuaryBulletins.map((d) => `/sanctuary/${d.uuid}`),
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { data: bulletinData } = await client.query({
    query: BULLETIN,
    variables: {
      uuid: context.params.id || "",
    },
  });

  const { data: globalSettings } = await client.query({
    query: GLOBAL_SETTINGS,
  });

  // Redirect in case of undefined
  if (!bulletinData.sanctuaryBulletins[0])
    return { redirect: { destination: "/sanctuary", permanent: false } };

  return {
    props: {
      bulletin: bulletinData.sanctuaryBulletins[0],
      globalSettings: globalSettings.globalSetting,
    },
    revalidate: process.env.NODE_ENV === "production" ? 60 : 5,
  };
}

export default function BulletinPage({ bulletin, globalSettings }) {
  const {
    altar_flowers,
    articles,
    copyright,
    custom_image,
    title,
    date: _date,
    finances,
    liturgical_calendar,
    liturgy_order,
    location: _location,
    serving,
  } = bulletin;
  const { address, website } = globalSettings;

  const date = createDateObject(_date);
  const location = makeTitleCase(_location);
  const financeStrings = getFinanceStrings(finances);
  const urlString = formatUrl(website);

  useEffect(() => {
    const headings = document.querySelectorAll("h2");
    headings.forEach((heading) => {
      heading.innerHTML = heading.innerHTML.replaceAll(
        "|",
        '<span class="separator">|</span>'
      );
    });
  }, []);

  return (
    <>
      <Head>
        <title>Sanctuary: {liturgical_calendar}</title>
      </Head>
      <header className="navigation">
        {/* <BackButton href="/sanctuary" /> */}
      </header>
      <div className="container">
        <main>
          <div className="titlePage">
            <div className="roseWindow">
              <Image
                alt="Sanctuary Rose Window"
                src={custom_image ? custom_image : roseWindow}
              />
            </div>
            <h1 className="bulletinTitle">{title}</h1>
            <HR />
            <h2 className="bulletinSubTitle">
              {createDateString(date)} <br />
              {liturgical_calendar} <br />
              {location} | {date.time}
            </h2>
            <p className="address">
              {address.street} <br />
              {address.street2} <br />
              {address.city}, {address.state} {address.zip}
            </p>
            <p className="address">
              <A href={website}>{urlString}</A>
            </p>
          </div>
          <HR />
          {liturgy_order.map((item) => (
            <Section key={item.__typename + item.id} greybox={item.greybox}>
              <div className="sectionHeading">
                <Heading>{item.heading}</Heading>
                {item.subheading && <SubHeading>{item.subheading}</SubHeading>}
              </div>
              <div
                className="sectionContent"
                style={item.greybox ? { marginLeft: 0 } : null}
              >
                {item.content && (
                  <ReactMarkdown
                    remarkPlugins={[gfm]}
                    children={item.content}
                    components={{ p: P, a: A }}
                  />
                )}
              </div>
            </Section>
          ))}
          <HR />
          <Section>
            <Heading>Serving in Worship</Heading>
            <div className="sectionContent">
              <ul className="servingList">
                {serving.map((item) => (
                  <li
                    key={item.__typename + item.id}
                    className="servingListItem"
                  >
                    <SubHeading span>{item.name} </SubHeading>
                    <br />
                    <span className="servingRole">
                      {item.role && item.role}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Section>
          {finances && <Finances finances={financeStrings} />}
          {altar_flowers && (
            <Section>
              <Heading>Altar Flowers</Heading>
              <div className="sectionContent">
                <p>{altar_flowers}</p>
              </div>
            </Section>
          )}
          {articles &&
            articles.map((article) => (
              <Section key={article.__typename + article.id}>
                <Heading>{article.title}</Heading>
                <div className="sectionContent">
                  <P>{article.content}</P>
                </div>
              </Section>
            ))}
          <Copyright>{formatCopyright(copyright)}</Copyright>
        </main>
      </div>
      <style jsx>{`
        .navigation {
          display: flex;
          position: absolute;
        }
        .container {
          display: flex;
          justify-content: center;
        }
        main {
          position: absolute;
          top: 72px;
          max-width: 600px;
          font-family: ${theme.fonts.serif};
        }
        .titlePage {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .bulletinTitle {
          margin-top: 2rem;
          font-weight: normal;
          text-transform: uppercase;
          line-height: 1.15em;
        }
        .bulletinSubTitle {
          text-transform: uppercase;
          font-size: 1.75rem;
          font-weight: normal;
          line-height: 1.5em;
        }
        .roseWindow {
          max-width: 400px;
        }
        @media screen and (max-width: 450px) {
          .roseWindow {
            max-width: 300px;
          }
        }
        .address {
          line-height: 1.15em;
          font-size: 1.15rem;
          margin-top: 1rem;
        }
        .sectionContent {
          margin-left: 1rem;
          margin-top: 0.55rem;
        }
        @media screen and (max-width: 450px) {
          .sectionContent {
            margin-left: 0px;
          }
        }
        .servingList {
          list-style: none;
        }
        .servingListItem {
          margin-bottom: 0.45rem;
          &:last-of-type {
            margin-bottom: 0;
          }
        }
        .servingRole {
          font-style: italic;
          margin-left: 1rem;
          font-size: 1.125rem;
          line-height: 1.15em;
        }
      `}</style>
    </>
  );
}

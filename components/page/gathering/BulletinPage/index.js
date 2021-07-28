import { theme } from "../../../../styles/global";
import { useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import gatheringLogo from "../../../../public/gatheringlogo_full.png";
import BackButton from "../../../../components/common/BackButton";
import HR from "../../../../components/gathering/HR";
import A from "../../../../components/common/Anchor";
import Heading from "../../../../components/gathering/Heading";
import P from "../../../../components/gathering/Paragraph";
import Copyright from "../../../../components/common/Copyright";
import Section from "../../../../components/gathering/Section";
import { createDateObject, createDateString } from "../../../../lib/dateUtils";
import { formatUrl, formatCopyright } from "../../../../lib/stringUtils";

export default function BulletinPage({ bulletin, globalSettings }) {
  const {
    copyright,
    custom_image,
    title,
    date: _date,
    liturgical_calendar,
    liturgy_order,
  } = bulletin;
  const { address, website } = globalSettings;

  const date = createDateObject(_date);
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
        <title>Gathering: {liturgical_calendar}</title>
      </Head>
      <header className="navigation">
        <BackButton />
      </header>
      <div className="container">
        <main>
          <div className="titlePage">
            <div className="logo">
              <Image
                alt="Sanctuary Rose Window"
                src={custom_image ? custom_image : gatheringLogo}
              />
            </div>
            <h1 className="bulletinTitle">{liturgical_calendar}</h1>
            <HR />
            <h2 className="bulletinSubTitle">
              {createDateString(date)} | {date.time}
              {/* {liturgical_calendar} <br /> */}
            </h2>
            <p className="address">
              {address.street} <br />
              {address.street2} <br />
              {address.city}, {address.state} {address.zip}
            </p>
            <p className="address">
              <A href={website} color={theme.colors.orange}>{urlString}</A>
            </p>
          </div>
          <HR />
          {liturgy_order.map((item) => (
            <Section key={item.__typename + item.id} greybox={item.greybox}>
              <div>
                <Heading>{item.heading}</Heading>
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
          font-family: ${theme.fonts.sans};
        }
        .titlePage {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 10px;
        }
        .bulletinTitle {
          margin-top: 2rem;
          font-weight: bold;
          text-transform: uppercase;
          line-height: 1.5em;
        }
        .bulletinSubTitle {
          text-transform: uppercase;
          font-size: 1.75rem;
          font-weight: normal;
          line-height: 1.5em;
        }
        .logo {
          max-width: 400px;
        }
        @media screen and (max-width: 450px) {
          .logo {
            max-width: 300px;
          }
        }
        .address {
          line-height: 1.15em;
          font-size: 1.15rem;
          margin-top: 1rem;
        }
        .sectionContent {
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

import Image from "next/image";
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

export async function getStaticPaths() {
  const { data } = await client.query({
    query: BULLETINS_LIST_IDS,
  });

  return {
    paths: data.bulletins.map((d) => `/bulletins/${d.bulletin_id}`),
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { data: bulletinData } = await client.query({
    query: BULLETIN,
    variables: {
      bulletin_id: context.params.id,
    },
  });

  const { data: globalSettings } = await client.query({
    query: GLOBAL_SETTINGS,
  });

  return {
    props: {
      bulletin: bulletinData.bulletins[0],
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
    bulletin_title,
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

  return (
    <>
      <main>
        <Image
          alt="Sanctuary Rose Window"
          src={custom_image ? custom_image : "/rosette.png"}
          width={400}
          height={400}
        />
        <h1>{bulletin_title}</h1>
        <hr />
        <p>
          {createDateString(date)} <br />
          {liturgical_calendar} <br />
          {location} | {date.time}
        </p>
        <p>
          {address.street} <br />
          {address.street2} <br />
          {address.city}, {address.state} {address.zip}
        </p>
        <p>
          <a href={website}>{urlString}</a>
        </p>
        <hr />
        {liturgy_order.map((item) => (
          <div key={item.__typename + item.id}>
            <h1>{item.heading}</h1>
            {item.subheading && <h2>{item.subheading}</h2>}
            {item.content && (
              <ReactMarkdown remarkPlugins={[gfm]} children={item.content} />
            )}
          </div>
        ))}
        <hr />
        <div>
          <h1>Serving in Worship</h1>
          <ul>
            {serving.map((item) => (
              <li key={item.__typename + item.id}>
                {item.serving_name} {item.serving_role && item.serving_role}
              </li>
            ))}
          </ul>
        </div>
        {finances && (
          <div>
            <h1>Tithes & Offerings</h1>
            <h2>Thank you for your ongoing gifts</h2>
            <h3>Actual</h3>
            <h4>Week of {finances.weekly.week_of}</h4>
            <p>{financeStrings.weekly_donation}</p>
            <h4>Year to date total</h4>
            <p>{financeStrings.ytd_total}</p>
            <h3>Goal</h3>
            <h4>{new Date().getFullYear()} Total Goal</h4>
            <p>{financeStrings.yearly_goal}</p>
            <h4>YTD % of {new Date().getFullYear()} goal</h4>
            <p>{financeStrings.ytd_percent}%</p>
          </div>
        )}
        {altar_flowers && (
          <div>
            <h1>Altar Flowers</h1>
            <p>{altar_flowers}</p>
          </div>
        )}
        {articles &&
          articles.map((article) => (
            <div key={article.__typename + article.id}>
              <h1>{article.article_title}</h1>
              <p>{article.article_content}</p>
            </div>
          ))}
      </main>
      <footer>{formatCopyright(copyright)}</footer>
    </>
  );
}

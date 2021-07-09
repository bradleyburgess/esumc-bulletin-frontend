import { getDateSearchString } from "../../lib/dateUtils";
import client from "../../lib/apollo-client";
import {
  BULLETIN,
  GLOBAL_SETTINGS,
  LATEST_PUBLISHED_BULLETIN,
} from "../../lib/queries";
import BulletinPage from "../../components/PageComponents/BulletinPage";

export async function getStaticProps() {
  const date = new Date();
  const { data } = await client.query({
    query: LATEST_PUBLISHED_BULLETIN,
    variables: {
      date: getDateSearchString(date),
    },
  });
  const bulletinId = data.sanctuaryBulletins[0].uuid;
  const { data: bulletinData } = await client.query({
    query: BULLETIN,
    variables: {
      uuid: bulletinId || "",
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

export default BulletinPage;

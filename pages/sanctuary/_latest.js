import { getDateSearchString } from "../../lib/dateUtils";
import client from "../../lib/apollo-client";
import {
  SANCTUARY_BULLETIN,
  GLOBAL_SETTINGS,
  LATEST_PUBLISHED_SANCTUARY_BULLETIN,
  SANCTUARY_SETTINGS,
} from "../../lib/queries";
import BulletinPage from "../../components/page/sanctuary/BulletinPage";

export async function getStaticProps() {
  // get global settings
  const { data: globalSettings } = await client.query({
    query: GLOBAL_SETTINGS,
  });
  // get no. of days before
  const {
    data: {
      sanctuarySetting: { days_before_available: daysBefore },
    },
  } = await client.query({
    query: SANCTUARY_SETTINGS,
  });
  const date = new Date();
  const { data } = await client.query({
    query: LATEST_PUBLISHED_SANCTUARY_BULLETIN,
    variables: {
      date: getDateSearchString(date, daysBefore || 2),
    },
  });
  const bulletinId = data.sanctuaryBulletins[0].uuid;
  const { data: bulletinData } = await client.query({
    query: SANCTUARY_BULLETIN,
    variables: {
      uuid: bulletinId || "",
    },
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

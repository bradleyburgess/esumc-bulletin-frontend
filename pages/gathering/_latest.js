import { getDateSearchString } from "../../lib/dateUtils";
import client from "../../lib/apollo-client";
import {
  GATHERING_BULLETIN,
  GLOBAL_SETTINGS,
  LATEST_PUBLISHED_GATHERING_BULLETIN,
  GATHERING_SETTINGS,
} from "../../lib/queries";
import BulletinPage from "../../components/page/gathering/BulletinPage";

export async function getStaticProps() {
  // get global settings
  const { data: globalSettings } = await client.query({
    query: GLOBAL_SETTINGS,
  });
  // get no. of days before
  const {
    data: {
      gatheringSetting: { days_before_available: daysBefore },
    },
  } = await client.query({
    query: GATHERING_SETTINGS,
  });
  const date = new Date();
  const { data } = await client.query({
    query: LATEST_PUBLISHED_GATHERING_BULLETIN,
    variables: {
      date: getDateSearchString(date, daysBefore || 2),
    },
  });
  const bulletinId = data.gatheringBulletins[0].uuid;
  const { data: bulletinData } = await client.query({
    query: GATHERING_BULLETIN,
    variables: {
      uuid: bulletinId || "",
    },
  });

  // Redirect in case of undefined
  if (!bulletinData.gatheringBulletins[0])
    return { redirect: { destination: "/sanctuary", permanent: false } };
  return {
    props: {
      bulletin: bulletinData.gatheringBulletins[0],
      globalSettings: globalSettings.globalSetting,
    },
    revalidate: process.env.NODE_ENV === "production" ? 60 : 5,
  };
}

export default BulletinPage;

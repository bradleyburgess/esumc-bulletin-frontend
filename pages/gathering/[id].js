import client from "../../lib/apollo-client";
import {
  GATHERING_BULLETIN,
  GATHERING_BULLETINS_LIST_IDS,
  GLOBAL_SETTINGS,
} from "../../lib/queries";
import BulletinPage from "../../components/page/gathering/BulletinPage";

export async function getStaticPaths() {
  const { data } = await client.query({
    query: GATHERING_BULLETINS_LIST_IDS,
  });
  return {
    paths: data.gatheringBulletins.map((d) => `/gathering/${d.uuid}`),
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { data: bulletinData } = await client.query({
    query: GATHERING_BULLETIN,
    variables: {
      uuid: context.params.id || "",
    },
  });

  const { data: globalSettings } = await client.query({
    query: GLOBAL_SETTINGS,
  });

  // Redirect in case of undefined
  if (!bulletinData.gatheringBulletins[0])
    return { redirect: { destination: "/gathering", permanent: false } };

  return {
    props: {
      bulletin: bulletinData.gatheringBulletins[0],
      globalSettings: globalSettings.globalSetting,
    },
    revalidate: process.env.NODE_ENV === "production" ? 60 : 5,
  };
}

export default BulletinPage;

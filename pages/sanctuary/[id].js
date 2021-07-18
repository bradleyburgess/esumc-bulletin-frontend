import client from "../../lib/apollo-client";
import {
  BULLETIN,
  BULLETINS_LIST_IDS,
  GLOBAL_SETTINGS,
} from "../../lib/queries";
import BulletinPage from "../../components/PageComponents/BulletinPage";

export async function getStaticPaths() {
  const { data } = await client.query({
    query: BULLETINS_LIST_IDS,
  });
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

export default BulletinPage;

import { useEffect } from "react";
import { useRouter } from "next/router";
// import { ApolloProvider, useQuery } from "@apollo/client";
import client from "../../lib/apollo-client";
import {
  GATHERING_SETTINGS,
  LATEST_PUBLISHED_GATHERING_BULLETIN,
} from "../../lib/queries";
import { getDateSearchString } from "../../lib/dateUtils";
import Loading from "../../components/common/Loading";

export default function LatestPage() {
  const router = useRouter();
  useEffect(() => {
    (async () => {
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
      router.replace(`/gathering/${bulletinId}`);
    })();
  }, [router]);
  return (
    <>
      <div className="container">
        <Loading text="Loading bulletin …" />
      </div>
      <style jsx>{`
        .container {
          height: 100vh;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  );
}

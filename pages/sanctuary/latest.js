import { useEffect } from "react";
import { useRouter } from "next/router";
// import { ApolloProvider, useQuery } from "@apollo/client";
import client from "../../lib/apollo-client";
import {
  SANCTUARY_SETTINGS,
  LATEST_PUBLISHED_BULLETIN,
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
          sanctuarySetting: { days_before_available: daysBefore },
        },
      } = await client.query({
        query: SANCTUARY_SETTINGS,
      });
      const date = new Date();
      const { data } = await client.query({
        query: LATEST_PUBLISHED_BULLETIN,
        variables: {
          date: getDateSearchString(date, daysBefore || 2),
        },
      });
      const bulletinId = data.sanctuaryBulletins[0].uuid;
      router.replace(`/sanctuary/${bulletinId}`);
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

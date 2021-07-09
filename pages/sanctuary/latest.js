import { useEffect } from "react";
import { useRouter } from "next/router";
import { LATEST_PUBLISHED_BULLETIN } from "../../lib/queries";
import { getDateSearchString } from "../../lib/dateUtils";
import client from "../../lib/apollo-client";

export default function LatestSanctuary() {
  const router = useRouter();
  useEffect(() => {
    async function gotoLatestBulletin() {
      try {
        const { data } = await client.query({
          query: LATEST_PUBLISHED_BULLETIN,
          variables: {
            date: getDateSearchString(new Date()),
          },
        });
        console.log({ data });
        const bulletinId = data.sanctuaryBulletins[0].uuid;
        router.push(`/sanctuary/${bulletinId}`);
      } catch (error) {
        console.log(error);
        router.push("/sanctuary");
      }
    }
    gotoLatestBulletin();
  });

  return <div></div>;
}

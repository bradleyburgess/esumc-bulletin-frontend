import { gql } from "@apollo/client";

export const BULLETINS_LIST = gql`
  query BulletinsList {
    bulletins {
      date
      liturgical_calendar
      bulletin_id
    }
  }
`;

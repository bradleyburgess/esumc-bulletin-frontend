import { gql } from "@apollo/client";

export const BULLETINS_LIST = gql`
  query BulletinsList($date: String) {
    sanctuaryBulletins(
      where: { published: true, date_lte: $date }
      sort: "date:desc"
    ) {
      uuid
      liturgical_calendar
      date
    }
  }
`;

export const DRAFT_BULLETINS_LIST = gql`
  query DraftBulletinsList {
    sanctuaryBulletins(where: { published: false }, sort: "date:desc") {
      uuid
      date
      liturgical_calendar
    }
  }
`;

export const BULLETINS_LIST_IDS = gql`
  query BulletinsList {
    sanctuaryBulletins {
      uuid
    }
  }
`;

export const DRAFT_BULLETINS_LIST_IDS = gql`
  query DraftBulletinsList {
    sanctuaryBulletins(where: { published: false }, sort: "date:desc") {
      uuid
    }
  }
`;

export const LATEST_PUBLISHED_BULLETIN = gql`
  query BulletinLatest($date: String) {
    sanctuaryBulletins(
      where: { published: true, date_lte: $date }
      sort: "date:desc"
      limit: 1
    ) {
      uuid
    }
  }
`;

export const BULLETIN = gql`
  query SanctuaryBulletin($uuid: String) {
    sanctuaryBulletins(where: { uuid: $uuid }) {
      altar_flowers
      articles {
        __typename
        id
        title
        content
      }
      uuid
      title
      copyright
      date
      finances {
        ytd_total
        yearly_goal
        weekly {
          week_of
          amount
        }
      }
      liturgical_calendar
      liturgy_order {
        __typename
        id
        heading
        subheading
        content
        standing
        stylized
        greybox
      }
      location
      serving {
        __typename
        id
        name
        role
      }
    }
  }
`;

export const GLOBAL_SETTINGS = gql`
  query Settings {
    globalSetting {
      address {
        street
        street2
        city
        state
        zip
      }
      website
    }
  }
`;

export const SANCTUARY_SETTINGS = gql`
  query SanctuarySettings {
    sanctuarySetting {
      days_before_available
    }
  }
`;

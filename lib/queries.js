import { gql } from "@apollo/client";

export const SANCTUARY_BULLETINS_LIST = gql`
  query sanctuaryBulletinsList($date: String) {
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

export const GATHERING_BULLETINS_LIST = gql`
  query gatheringBulletinsList($date: String) {
    gatheringBulletins(
      where: { published: true, date_lte: $date }
      sort: "date:desc"
    ) {
      uuid
      liturgical_calendar
      date
    }
  }
`;

export const DRAFT_SANCTUARY_BULLETINS_LIST = gql`
  query draftSanctuaryBulletinsList {
    sanctuaryBulletins(where: { published: false }, sort: "date:desc") {
      uuid
      date
      liturgical_calendar
    }
  }
`;

export const DRAFT_GATHERING_BULLETINS_LIST = gql`
  query draftGatheringBulletinsList {
    gatheringBulletins(where: { published: false }, sort: "date:desc") {
      uuid
      date
      liturgical_calendar
    }
  }
`;

export const SANCTUARY_BULLETINS_LIST_IDS = gql`
  query sanctuaryBulletinsList {
    sanctuaryBulletins {
      uuid
    }
  }
`;

export const GATHERING_BULLETINS_LIST_IDS = gql`
  query gatheringBulletinsList {
    gatheringBulletins {
      uuid
    }
  }
`;

export const DRAFT_SANCTUARY_BULLETINS_LIST_IDS = gql`
  query sanctuaryDraftBulletinsList {
    sanctuaryBulletins(where: { published: false }, sort: "date:desc") {
      uuid
    }
  }
`;

export const DRAFT_GATHERING_BULLETINS_LIST_IDS = gql`
  query gatheringDraftBulletinsList {
    gatheringBulletins(where: { published: false }, sort: "date:desc") {
      uuid
    }
  }
`;

export const LATEST_PUBLISHED_SANCTUARY_BULLETIN = gql`
  query sanctuaryBulletinLatest($date: String) {
    sanctuaryBulletins(
      where: { published: true, date_lte: $date }
      sort: "date:desc"
      limit: 1
    ) {
      uuid
    }
  }
`;

export const LATEST_PUBLISHED_GATHERING_BULLETIN = gql`
  query gatheringBulletinLatest($date: String) {
    gatheringBulletins(
      where: { published: true, date_lte: $date }
      sort: "date:desc"
      limit: 1
    ) {
      uuid
    }
  }
`;

export const SANCTUARY_BULLETIN = gql`
  query sanctuaryBulletin($uuid: String) {
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
 
export const GATHERING_BULLETIN = gql`
  query gatheringBulletin($uuid: String) {
    gatheringBulletins(where: { uuid: $uuid }) {
      uuid
      title
      copyright
      date
      liturgical_calendar
      liturgy_order {
        __typename
        id
        heading
        content
        greybox
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

export const GATHERING_SETTINGS = gql`
  query GatheringSettings {
    gatheringSetting {
      days_before_available
    }
  }
`;

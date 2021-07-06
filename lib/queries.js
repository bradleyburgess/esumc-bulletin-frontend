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

export const BULLETINS_LIST_IDS = gql`
  query BulletinsListIds {
    bulletins {
      bulletin_id
    }
  }
`;

export const BULLETIN = gql`
  query Bulletin($bulletin_id: String) {
    bulletins(where: { bulletin_id: $bulletin_id }) {
      altar_flowers
      articles {
        __typename
        id
        article_title
        article_content
      }
      bulletin_id
      bulletin_title
      copyright
      date
      finances {
        ytd_total
        yearly_goal
        weekly {
          week_of
          weekly_donation
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
        serving_name
        serving_role
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

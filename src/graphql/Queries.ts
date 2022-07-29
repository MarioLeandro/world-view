import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
      capital
      emoji
      languages {
        code
        name
      }
      currency
    }
  }
`;

export const GET_COUNTRY = gql`
  query country($code: ID!) {
    country(code: $code) {
      code
      name
      capital
      phone
      continent {
        code
        name
      }
      states {
        code
        name
      }
      emoji
      languages {
        code
        name
      }
      currency
    }
  }
`;

import { gql } from "@apollo/client";

export const FIND_AD_BY_ID = gql`
  query FindAd($findAdId: ID!) {
    findAd(id: $findAdId) {
      title
      picture
    }
  }
`;

export const FIND_AD_BY_ID_FOR_UPDATE = gql`
  query FindAdForUpdate($findAdId: ID!) {
    findAd(id: $findAdId) {
      title
      description
      price
      picture
      location
      category {
        id
      }
    }
  }
`;

export const GET_LAST_ADS = gql`
  query GetLastAds($filter: FilterType) {
    ads(filter: $filter) {
      id
      title
      description
      price
      picture
      created_at
    }
  }
`;

export const CREATE_AD = gql`
  mutation CreateAd($data: CreateAdInput!) {
    createAd(data: $data) {
      id
    }
  }
`;

export const UPDATE_AD = gql`
  mutation UpdateAd($data: UpdateAdInput!) {
    updateAd(data: $data) {
      id
    }
  }
`;

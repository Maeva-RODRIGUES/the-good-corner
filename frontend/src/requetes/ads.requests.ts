import { gql } from "@apollo/client";

export const FIND_AD_BY_ID = gql`
  query FindAd($findAdId: ID!) {
    findAd(id: $findAdId) {
      title
      picture
      price
      id
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
      tags {
        #ajout de tags
        label
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

export const SEARCH_AD = gql`
  query SearchAd($search: SearchInput!) {
    searchAd(search: $search) {
      categoryId
      categoryTitle
      ads {
        title
        id
      }
    }
  }
`;

export const GET_INFOS_FOR_CHECKOUTS = gql`
  query GetInfosForCheckout($ids: [ID!]!) {
    getInfosForCheckout(ids: $ids) {
      id
      title
      description
      picture
      price
    }
  }
`;

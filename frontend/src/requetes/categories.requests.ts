import { gql } from "@apollo/client";

export const LIST_CATEGORIES = gql`
  query Categories {
    categories {
      id
      title
    }
  }
`;

export const LIST_CATEGORIES_AND_TAGS = gql`
  query CategoriesAndTags {
    categories {
    id
    title
  }
  tags {
    id
    label
  }
}
`;



export const FIND_CATEGORY_BY_ID = gql`
  query FindCategory($data: FindCategoryInput!) {
    findCategory(data: $data) {
      ads {
        title
        id
        description
        price
        created_at
        location
        picture
      }
    }
  }
`;

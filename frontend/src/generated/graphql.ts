import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  AccountNumber: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Byte: { input: any; output: any; }
  CountryCode: { input: any; output: any; }
  CountryName: { input: any; output: any; }
  Cuid: { input: any; output: any; }
  Currency: { input: any; output: any; }
  DID: { input: any; output: any; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  DateTimeISO: { input: any; output: any; }
  DeweyDecimal: { input: any; output: any; }
  Duration: { input: any; output: any; }
  EmailAddress: { input: any; output: any; }
  GUID: { input: any; output: any; }
  GeoJSON: { input: any; output: any; }
  HSL: { input: any; output: any; }
  HSLA: { input: any; output: any; }
  HexColorCode: { input: any; output: any; }
  Hexadecimal: { input: any; output: any; }
  IBAN: { input: any; output: any; }
  IP: { input: any; output: any; }
  IPCPatent: { input: any; output: any; }
  IPv4: { input: any; output: any; }
  IPv6: { input: any; output: any; }
  ISBN: { input: any; output: any; }
  ISO8601Duration: { input: any; output: any; }
  JSON: { input: any; output: any; }
  JSONObject: { input: any; output: any; }
  JWT: { input: any; output: any; }
  LCCSubclass: { input: any; output: any; }
  Latitude: { input: any; output: any; }
  LocalDate: { input: any; output: any; }
  LocalDateTime: { input: any; output: any; }
  LocalEndTime: { input: any; output: any; }
  LocalTime: { input: any; output: any; }
  Locale: { input: any; output: any; }
  Long: { input: any; output: any; }
  Longitude: { input: any; output: any; }
  MAC: { input: any; output: any; }
  NegativeFloat: { input: any; output: any; }
  NegativeInt: { input: any; output: any; }
  NonEmptyString: { input: any; output: any; }
  NonNegativeFloat: { input: any; output: any; }
  NonNegativeInt: { input: any; output: any; }
  NonPositiveFloat: { input: any; output: any; }
  NonPositiveInt: { input: any; output: any; }
  ObjectID: { input: any; output: any; }
  PhoneNumber: { input: any; output: any; }
  Port: { input: any; output: any; }
  PositiveFloat: { input: any; output: any; }
  PositiveInt: { input: any; output: any; }
  PostalCode: { input: any; output: any; }
  RGB: { input: any; output: any; }
  RGBA: { input: any; output: any; }
  RoutingNumber: { input: any; output: any; }
  SESSN: { input: any; output: any; }
  SafeInt: { input: any; output: any; }
  SemVer: { input: any; output: any; }
  Time: { input: any; output: any; }
  TimeZone: { input: any; output: any; }
  Timestamp: { input: any; output: any; }
  URL: { input: any; output: any; }
  USCurrency: { input: any; output: any; }
  UUID: { input: any; output: any; }
  UnsignedFloat: { input: any; output: any; }
  UnsignedInt: { input: any; output: any; }
  UtcOffset: { input: any; output: any; }
  Void: { input: any; output: any; }
};

export type Ad = {
  __typename?: 'Ad';
  category?: Maybe<Category>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  picture: Scalars['String']['output'];
  price?: Maybe<Scalars['Float']['output']>;
  tags?: Maybe<Array<Tag>>;
  title?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['String']['output']>;
};

export type AdCategory = {
  __typename?: 'AdCategory';
  created_at: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  location: Scalars['String']['output'];
  picture: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  title: Scalars['String']['output'];
};

export type Category = {
  __typename?: 'Category';
  ads?: Maybe<Array<Ad>>;
  created_at?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['String']['output']>;
};

export type CreateAdInput = {
  categoryId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  price: Scalars['Float']['input'];
  tagsIds?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export type CreateCategoryInput = {
  title: Scalars['String']['input'];
};

export type CreateTagInput = {
  label: Scalars['String']['input'];
};

export type FilterType = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<FindOptionOrderValue>;
};

export type FindCategory = {
  __typename?: 'FindCategory';
  ads?: Maybe<Array<AdCategory>>;
};

export type FindCategoryInput = {
  id: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['String']['input']>;
};

export enum FindOptionOrderValue {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Mutation = {
  __typename?: 'Mutation';
  createAd?: Maybe<Ad>;
  createCategory?: Maybe<Category>;
  createTag?: Maybe<Tag>;
  deleteAd?: Maybe<Scalars['String']['output']>;
  deleteCategory?: Maybe<Scalars['String']['output']>;
  deleteTag?: Maybe<Scalars['String']['output']>;
  updateAd?: Maybe<Ad>;
  updateCategory?: Maybe<Category>;
  updateTag?: Maybe<Tag>;
};


export type MutationCreateAdArgs = {
  data: CreateAdInput;
};


export type MutationCreateCategoryArgs = {
  data: CreateCategoryInput;
};


export type MutationCreateTagArgs = {
  data: CreateTagInput;
};


export type MutationDeleteAdArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTagArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateAdArgs = {
  data: UpdateAdInput;
};


export type MutationUpdateCategoryArgs = {
  data: UpdateCategoryInput;
};


export type MutationUpdateTagArgs = {
  data: UpdateTagInput;
};

export type Query = {
  __typename?: 'Query';
  ads?: Maybe<Array<Ad>>;
  categories?: Maybe<Array<Category>>;
  findAd?: Maybe<Ad>;
  findCategory?: Maybe<FindCategory>;
  findTag?: Maybe<Tag>;
  tags?: Maybe<Array<Tag>>;
};


export type QueryAdsArgs = {
  filter?: InputMaybe<FilterType>;
};


export type QueryFindAdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindCategoryArgs = {
  data: FindCategoryInput;
};


export type QueryFindTagArgs = {
  id: Scalars['UUID']['input'];
};

export type Tag = {
  __typename?: 'Tag';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['String']['output']>;
};

export type UpdateAdInput = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  tagsIds?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCategoryInput = {
  id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type UpdateTagInput = {
  id: Scalars['ID']['input'];
  label: Scalars['String']['input'];
};

export type FindAdQueryVariables = Exact<{
  findAdId: Scalars['ID']['input'];
}>;


export type FindAdQuery = { __typename?: 'Query', findAd?: { __typename?: 'Ad', title?: string | null, picture: string } | null };

export type FindAdForUpdateQueryVariables = Exact<{
  findAdId: Scalars['ID']['input'];
}>;


export type FindAdForUpdateQuery = { __typename?: 'Query', findAd?: { __typename?: 'Ad', title?: string | null, description?: string | null, price?: number | null, picture: string, location?: string | null, category?: { __typename?: 'Category', id: string } | null } | null };

export type GetLastAdsQueryVariables = Exact<{
  filter?: InputMaybe<FilterType>;
}>;


export type GetLastAdsQuery = { __typename?: 'Query', ads?: Array<{ __typename?: 'Ad', id?: string | null, title?: string | null, description?: string | null, price?: number | null, picture: string, created_at?: any | null }> | null };

export type CreateAdMutationVariables = Exact<{
  data: CreateAdInput;
}>;


export type CreateAdMutation = { __typename?: 'Mutation', createAd?: { __typename?: 'Ad', id?: string | null } | null };

export type UpdateAdMutationVariables = Exact<{
  data: UpdateAdInput;
}>;


export type UpdateAdMutation = { __typename?: 'Mutation', updateAd?: { __typename?: 'Ad', id?: string | null } | null };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', categories?: Array<{ __typename?: 'Category', id: string, title: string }> | null };

export type CategoriesAndTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesAndTagsQuery = { __typename?: 'Query', categories?: Array<{ __typename?: 'Category', id: string, title: string }> | null, tags?: Array<{ __typename?: 'Tag', id: string, label: string }> | null };

export type FindCategoryQueryVariables = Exact<{
  data: FindCategoryInput;
}>;


export type FindCategoryQuery = { __typename?: 'Query', findCategory?: { __typename?: 'FindCategory', ads?: Array<{ __typename?: 'AdCategory', title: string, id: string, description?: string | null, price: number, created_at: string, location: string, picture: string }> | null } | null };


export const FindAdDocument = gql`
    query FindAd($findAdId: ID!) {
  findAd(id: $findAdId) {
    title
    picture
  }
}
    `;

/**
 * __useFindAdQuery__
 *
 * To run a query within a React component, call `useFindAdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAdQuery({
 *   variables: {
 *      findAdId: // value for 'findAdId'
 *   },
 * });
 */
export function useFindAdQuery(baseOptions: Apollo.QueryHookOptions<FindAdQuery, FindAdQueryVariables> & ({ variables: FindAdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAdQuery, FindAdQueryVariables>(FindAdDocument, options);
      }
export function useFindAdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAdQuery, FindAdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAdQuery, FindAdQueryVariables>(FindAdDocument, options);
        }
export function useFindAdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindAdQuery, FindAdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAdQuery, FindAdQueryVariables>(FindAdDocument, options);
        }
export type FindAdQueryHookResult = ReturnType<typeof useFindAdQuery>;
export type FindAdLazyQueryHookResult = ReturnType<typeof useFindAdLazyQuery>;
export type FindAdSuspenseQueryHookResult = ReturnType<typeof useFindAdSuspenseQuery>;
export type FindAdQueryResult = Apollo.QueryResult<FindAdQuery, FindAdQueryVariables>;
export const FindAdForUpdateDocument = gql`
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

/**
 * __useFindAdForUpdateQuery__
 *
 * To run a query within a React component, call `useFindAdForUpdateQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAdForUpdateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAdForUpdateQuery({
 *   variables: {
 *      findAdId: // value for 'findAdId'
 *   },
 * });
 */
export function useFindAdForUpdateQuery(baseOptions: Apollo.QueryHookOptions<FindAdForUpdateQuery, FindAdForUpdateQueryVariables> & ({ variables: FindAdForUpdateQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAdForUpdateQuery, FindAdForUpdateQueryVariables>(FindAdForUpdateDocument, options);
      }
export function useFindAdForUpdateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAdForUpdateQuery, FindAdForUpdateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAdForUpdateQuery, FindAdForUpdateQueryVariables>(FindAdForUpdateDocument, options);
        }
export function useFindAdForUpdateSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindAdForUpdateQuery, FindAdForUpdateQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAdForUpdateQuery, FindAdForUpdateQueryVariables>(FindAdForUpdateDocument, options);
        }
export type FindAdForUpdateQueryHookResult = ReturnType<typeof useFindAdForUpdateQuery>;
export type FindAdForUpdateLazyQueryHookResult = ReturnType<typeof useFindAdForUpdateLazyQuery>;
export type FindAdForUpdateSuspenseQueryHookResult = ReturnType<typeof useFindAdForUpdateSuspenseQuery>;
export type FindAdForUpdateQueryResult = Apollo.QueryResult<FindAdForUpdateQuery, FindAdForUpdateQueryVariables>;
export const GetLastAdsDocument = gql`
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

/**
 * __useGetLastAdsQuery__
 *
 * To run a query within a React component, call `useGetLastAdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLastAdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLastAdsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetLastAdsQuery(baseOptions?: Apollo.QueryHookOptions<GetLastAdsQuery, GetLastAdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLastAdsQuery, GetLastAdsQueryVariables>(GetLastAdsDocument, options);
      }
export function useGetLastAdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLastAdsQuery, GetLastAdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLastAdsQuery, GetLastAdsQueryVariables>(GetLastAdsDocument, options);
        }
export function useGetLastAdsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetLastAdsQuery, GetLastAdsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetLastAdsQuery, GetLastAdsQueryVariables>(GetLastAdsDocument, options);
        }
export type GetLastAdsQueryHookResult = ReturnType<typeof useGetLastAdsQuery>;
export type GetLastAdsLazyQueryHookResult = ReturnType<typeof useGetLastAdsLazyQuery>;
export type GetLastAdsSuspenseQueryHookResult = ReturnType<typeof useGetLastAdsSuspenseQuery>;
export type GetLastAdsQueryResult = Apollo.QueryResult<GetLastAdsQuery, GetLastAdsQueryVariables>;
export const CreateAdDocument = gql`
    mutation CreateAd($data: CreateAdInput!) {
  createAd(data: $data) {
    id
  }
}
    `;
export type CreateAdMutationFn = Apollo.MutationFunction<CreateAdMutation, CreateAdMutationVariables>;

/**
 * __useCreateAdMutation__
 *
 * To run a mutation, you first call `useCreateAdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAdMutation, { data, loading, error }] = useCreateAdMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateAdMutation(baseOptions?: Apollo.MutationHookOptions<CreateAdMutation, CreateAdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAdMutation, CreateAdMutationVariables>(CreateAdDocument, options);
      }
export type CreateAdMutationHookResult = ReturnType<typeof useCreateAdMutation>;
export type CreateAdMutationResult = Apollo.MutationResult<CreateAdMutation>;
export type CreateAdMutationOptions = Apollo.BaseMutationOptions<CreateAdMutation, CreateAdMutationVariables>;
export const UpdateAdDocument = gql`
    mutation UpdateAd($data: UpdateAdInput!) {
  updateAd(data: $data) {
    id
  }
}
    `;
export type UpdateAdMutationFn = Apollo.MutationFunction<UpdateAdMutation, UpdateAdMutationVariables>;

/**
 * __useUpdateAdMutation__
 *
 * To run a mutation, you first call `useUpdateAdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAdMutation, { data, loading, error }] = useUpdateAdMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateAdMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAdMutation, UpdateAdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAdMutation, UpdateAdMutationVariables>(UpdateAdDocument, options);
      }
export type UpdateAdMutationHookResult = ReturnType<typeof useUpdateAdMutation>;
export type UpdateAdMutationResult = Apollo.MutationResult<UpdateAdMutation>;
export type UpdateAdMutationOptions = Apollo.BaseMutationOptions<UpdateAdMutation, UpdateAdMutationVariables>;
export const CategoriesDocument = gql`
    query Categories {
  categories {
    id
    title
  }
}
    `;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
      }
export function useCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
        }
export function useCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
        }
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesSuspenseQueryHookResult = ReturnType<typeof useCategoriesSuspenseQuery>;
export type CategoriesQueryResult = Apollo.QueryResult<CategoriesQuery, CategoriesQueryVariables>;
export const CategoriesAndTagsDocument = gql`
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

/**
 * __useCategoriesAndTagsQuery__
 *
 * To run a query within a React component, call `useCategoriesAndTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesAndTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesAndTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesAndTagsQuery(baseOptions?: Apollo.QueryHookOptions<CategoriesAndTagsQuery, CategoriesAndTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoriesAndTagsQuery, CategoriesAndTagsQueryVariables>(CategoriesAndTagsDocument, options);
      }
export function useCategoriesAndTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoriesAndTagsQuery, CategoriesAndTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoriesAndTagsQuery, CategoriesAndTagsQueryVariables>(CategoriesAndTagsDocument, options);
        }
export function useCategoriesAndTagsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CategoriesAndTagsQuery, CategoriesAndTagsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CategoriesAndTagsQuery, CategoriesAndTagsQueryVariables>(CategoriesAndTagsDocument, options);
        }
export type CategoriesAndTagsQueryHookResult = ReturnType<typeof useCategoriesAndTagsQuery>;
export type CategoriesAndTagsLazyQueryHookResult = ReturnType<typeof useCategoriesAndTagsLazyQuery>;
export type CategoriesAndTagsSuspenseQueryHookResult = ReturnType<typeof useCategoriesAndTagsSuspenseQuery>;
export type CategoriesAndTagsQueryResult = Apollo.QueryResult<CategoriesAndTagsQuery, CategoriesAndTagsQueryVariables>;
export const FindCategoryDocument = gql`
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

/**
 * __useFindCategoryQuery__
 *
 * To run a query within a React component, call `useFindCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindCategoryQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useFindCategoryQuery(baseOptions: Apollo.QueryHookOptions<FindCategoryQuery, FindCategoryQueryVariables> & ({ variables: FindCategoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindCategoryQuery, FindCategoryQueryVariables>(FindCategoryDocument, options);
      }
export function useFindCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindCategoryQuery, FindCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindCategoryQuery, FindCategoryQueryVariables>(FindCategoryDocument, options);
        }
export function useFindCategorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindCategoryQuery, FindCategoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindCategoryQuery, FindCategoryQueryVariables>(FindCategoryDocument, options);
        }
export type FindCategoryQueryHookResult = ReturnType<typeof useFindCategoryQuery>;
export type FindCategoryLazyQueryHookResult = ReturnType<typeof useFindCategoryLazyQuery>;
export type FindCategorySuspenseQueryHookResult = ReturnType<typeof useFindCategorySuspenseQuery>;
export type FindCategoryQueryResult = Apollo.QueryResult<FindCategoryQuery, FindCategoryQueryVariables>;
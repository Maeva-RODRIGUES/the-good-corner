import Cardad from "@/components/Ads/Cardad";
import {
  FindOptionOrderValue,
  GetLastAdsQuery,
  GetLastAdsQueryVariables,
} from "@/generated/graphql";
import { GET_LAST_ADS } from "@/requetes/ads.requests";
import { ProductType } from "@/types/ads";
import { useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";
import { useEffect, useState } from "react";
// import { getLastAds } from "@/requests/categories.requests";

function Listads() {
  const { data, loading, error } = useQuery<
    GetLastAdsQuery,
    GetLastAdsQueryVariables
  >(GET_LAST_ADS, {
    variables: { filter: { limit: 5, order: FindOptionOrderValue["Desc"] } },
    fetchPolicy: "network-only",
  });

  if (loading) {
    return <div>Chargement en cours</div>;
  }
  if (error) {
    return (
      <div>
        <p>{error.message}</p>
      </div>
    );
  }
  return (
    <>
      <p className="text-3xl text-gray-900 dark:text-white mb-4">
        Les dernières annonces...
      </p>

      <div className="flex flex-wrap gap-4">
        {data?.ads ? (
          data?.ads?.map((product) => {
            return <Cardad key={product.id} data={product} />;
          })
        ) : (
          <div>Aucune annonce</div>
        )}
      </div>
    </>
  );
}

export default Listads;
function useQUery(GET_LAST_ADS: DocumentNode): {
  data: any;
  loading: any;
  error: any;
} {
  throw new Error("Function not implemented.");
}

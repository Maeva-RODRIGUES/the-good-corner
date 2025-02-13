import { FIND_AD_BY_ID } from "@/requetes/ads.requests";
import AdContent from "./AdContent";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { FindAdQuery, FindAdQueryVariables } from "@/generated/graphql";
import { useEffect } from "react";

function AdDetails() {
  const params = useParams();

  const { data, error, loading, refetch } = useQuery<
    FindAdQuery,
    FindAdQueryVariables
  >(FIND_AD_BY_ID, {
    variables: {
      findAdId: params.id!,
    },
    skip: params.id === undefined,
  });
  useEffect(() => {
    refetch({ findAdId: params.id });
  }, [params.id]);

  if (loading) {
    return <div>Chargement en cours</div>;
  }

  return (
    <div>
      {data?.findAd && (
        <AdContent product={data.findAd} error={error?.message} />
      )}
    </div>
  );
}

export default AdDetails;

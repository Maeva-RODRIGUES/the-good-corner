import { FIND_AD_BY_ID } from "@/requetes/ads.requests";
import AdContent from "./AdContent";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import {
  FindAdQuery,
  FindAdQueryVariables,
  useFindAdLazyQuery,
  // useFindAdQuery,
} from "@/generated/graphql";
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
  // const { data, error, loading, refetch } = useFindAdQuery({
  //   variables: { findAdId: params.id! },
  //   skip: params.id === undefined,
  // });

  /**======================
   *    Exemple d'un useLazyQuery
   *========================**/
  // const [findAdById, { data, error, loading }] = useLazyQuery<
  //   FindAdQuery,
  //   FindAdQueryVariables
  // >(FIND_AD_BY_ID);
  // // const [findAdById, {data, error, loading}] = useFindAdLazyQuery();

  // console.log("%c⧭", "color: #364cd9", error);
  // console.log("%c⧭", "color: #33cc99", data);

  useEffect(() => {
    refetch({ findAdId: params.id });
  }, [params.id]);

  if (loading) {
    return <div>Chargement en cours</div>;
  }

  // lorsque params.id changera, on rejouera la requête mais avec de nouvelles variables (donc le nouvel id);

  return (
    <div>
      {/* <button
        onClick={() => findAdById({ variables: { findAdId: params.id } })}
      >
        Va récupérer l'annonce
      </button> */}
      {data?.findAd && (
        <AdContent product={data.findAd} error={error?.message} />
      )}
    </div>
  );
}

export default AdDetails;

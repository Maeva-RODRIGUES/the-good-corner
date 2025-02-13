import Cardad from "@/components/Ads/Cardad";
import {
  FindCategoryQuery,
  FindCategoryQueryVariables,
} from "@/generated/graphql";
import { FIND_CATEGORY_BY_ID } from "@/requetes/categories.requests";
import { CategoryType } from "@/types/categories";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { getAds } from "@/requests/categories.requests";

function AdsFromCategory() {
  const params = useParams();

  const { data, error, loading } = useQuery<
    FindCategoryQuery,
    FindCategoryQueryVariables
  >(FIND_CATEGORY_BY_ID, {
    variables: { data: { id: params.id! } },
    skip: params.id === undefined,
    fetchPolicy: "network-only",
  });
  // const [loading, setLoading] = useState(false);
  console.log("%c⧭", "color: #eeff00", data);

  if (loading) {
    return <div>Chargement en cours</div>;
  }
  return (
    <div className="flex flex-wrap gap-4">
      {data?.findCategory?.ads?.map((a) => (
        <Cardad key={a.id} data={a} />
      ))}
    </div>
  );
}

export default AdsFromCategory;

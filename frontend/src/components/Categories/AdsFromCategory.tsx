import Cardad from "@/components/Ads/Cardad";
import { CategoryType } from "@/types/categories";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAds } from "@/requests/categories.requests";

function AdsFromCategory() {
  const params = useParams();
  const [ads, setAds] = useState<CategoryType["ads"]>([]);
  const [loading, setLoading] = useState(false);
  const getAdsFromCategory = async () => {
    try {
      const data = await getAds(params.id!);
      if (data.success) {
        setAds(data.result.ads);
      }
    } catch (err: any) {
      console.log("il y a eu une erreur");
    }
    setLoading(false);
  };
  useEffect(() => {
    getAdsFromCategory();
  }, [params.id]);

  if (loading) {
    return <div>Chargement en cours</div>;
  }
  return (
    <div className="flex flex-wrap gap-4">
      {ads?.map((a) => (
        <Cardad key={a.id} data={a} />
      ))}
    </div>
  );
}

export default AdsFromCategory;

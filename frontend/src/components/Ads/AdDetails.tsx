import AdContent from "./AdContent";
import { ProductType } from "@/types/ads";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findAd } from "@/requests/ads.requests";

function AdDetails() {
  const params = useParams();
  const [product, setProduct] = useState<ProductType>();
  const [isloading, setIsloading] = useState<boolean>(true);
  const [error, setError] = useState("");

  const getAd = async () => {
    try {
      const data = await findAd(params.id!);
      if (data.success) {
        setProduct(data.result);
      }
    } catch (err: any) {
      setError(err.response.data.message);
    }
    setIsloading(false);
  };

  useEffect(() => {
    getAd();
  }, []);

  if (isloading) {
    return <div>Chargement en cours</div>;
  }

  return <div>{product && <AdContent product={product} error={error} />}</div>;
}

export default AdDetails;

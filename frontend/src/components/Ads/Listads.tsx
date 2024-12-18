import Cardad from "@/components/Ads/Cardad";
import { ProductType } from "@/types/ads";
import { useEffect, useState } from "react";
// import { getLastAds } from "@/requests/categories.requests";

function Listads() {
  const [dataProduct, setDataProduct] = useState<ProductType[]>([]); //? setDataProduct devra être utilisé pour mettre à jour l'état, autrement dit dataProduct
  const [isloading, setIsloading] = useState<boolean>(true);

  const getAds = async () => {
    try {
      // const data = await getLastAds();
      // if (data.success) {
      //   setDataProduct(data.result);
      //   setIsloading(false);
      // }
    } catch (err: unknown) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAds();
  }, []);

  if (isloading) {
    return <div>Chargement en cours</div>;
  }
  return (
    <>
      <p className="text-3xl text-gray-900 dark:text-white mb-4">
        Les dernières annonces...
      </p>

      <div className="flex flex-wrap gap-4">
        {dataProduct.length > 0 ? (
          dataProduct.map((product) => {
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

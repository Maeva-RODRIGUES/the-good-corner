// frontend/src/components/ListAds.tsx

import Card from '../components/Cards'; // On importe le composant Card pour pouvoir l'utiliser dans ce fichier
import instance from "../lib/instance.ts";
import { useEffect, useState} from "react";
export type ProductType = {
  id: string;
  title: string;
  description: string;
  price: number;
  picture: string;
  location: string;
  created_at: string;
  updated_at: string;
};

function Listads() {
  const [dataProduct, setDataProduct] = useState<ProductType[]>([]); //? setDataProduct devra être utilisé pour mettre à jour l'état, autrement dit dataProduct
  const [isloading, setIsloading] = useState<boolean>(true);

  const getAds = async () => {
    try {
      const { data } = await instance.get<ProductType[]>("/ads/list");
      setDataProduct(data);
      setIsloading(false);
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
      {dataProduct.length > 0 ? (
        dataProduct.map((product) => {
          return <Card key={product.id} data={product} />;
        })
      ) : (
        <div>Aucune annonce</div>
      )}
    </>
  );
}

export default Listads;


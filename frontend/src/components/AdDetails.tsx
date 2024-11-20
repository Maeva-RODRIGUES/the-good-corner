//components/AdDetails.tsx
//  Créer un composant qui récupère les détails d'une seule annonce et les affiche.
// todo 
// todo Créer un composant et définir la routeavec react rooter
// todo Récupère l'ID depuis l'URL avec useParams
// todo Faire une requête pour récupérer les détails de l'annonce.
// todo Affiche les informations avec gestion des états de chargement et des erreurs.
// todo Vérifier et tester le bon fonctionnement du composant.


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductType } from "./ListAds";
import instance from "../lib/instance";
function AdDetails() {
  const params = useParams();
  const [product, setProduct] = useState<ProductType>();
  const [isloading, setIsloading] = useState<boolean>(true);
  const [error, setError] = useState("");

  console.log(params);

  const getAd = async () => {
    try {
      const { data } = await instance.get<ProductType>(
        `/ads/find/${params.id}`
      );
      setProduct(data);
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
  // if (!product){
  //   return <div>{error}</div>
  // }
  return (
    <div>
      {product ? (
        <>
          <h1>Détails d'une annonce</h1>
          <p>Titre : {product.title}</p>
        </>
      ) : (
        <div>{error}</div>
      )}
    </div>
  );
}

export default AdDetails;
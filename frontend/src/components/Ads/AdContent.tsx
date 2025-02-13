import defaultPicture from "@/assets/picture.png";
import { Ad } from "@/generated/graphql";
import useAppContext from "@/hooks/useAppContext";
import { useState } from "react";

function AdContent({ product, error }: { product: Ad; error?: string }) {
  const { addToCart } = useAppContext();
  const [cartButtonState, setCartButtonState] = useState<boolean>(false);
  return (
    <div className="flex flex-col items-center">
      <h1>Détails d'une annonce</h1>
      <p>Titre : {product.title}</p>
      <p className="font-bold text-xl">Prix : {product.price}</p>
      <div className="flex items-center flex-col">
        <div className="flex flex-col md:flex-row justify-between items-center text-cyan-400 mb-10">
          <button
            className={`mt-6 px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-cyan-400 focus:outline-none w-96 ${
              cartButtonState && "bg-cyan-500 hover:bg-cyan-500 text-white"
            }`}
            onClick={() => {
              addToCart(product.id!);
              setCartButtonState(true);
              setTimeout(() => setCartButtonState(false), 3000);
            }}
          >
            {cartButtonState
              ? "Le produit a été ajouté au panier"
              : "Ajouter au panier"}
          </button>
        </div>
        <img
          src={
            product.picture
              ? `${import.meta.env.VITE_BACKEND_URL_FILES}${product.picture}`
              : defaultPicture
          }
          alt="Image"
          style={{ maxWidth: "300px", maxHeight: "300px" }}
        />
      </div>
      {error}
    </div>
  );
}

export default AdContent;

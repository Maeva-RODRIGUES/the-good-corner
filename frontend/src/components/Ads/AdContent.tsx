import { ProductType } from "@/types/ads";
import defaultPicture from "@/assets/picture.png";

function AdContent({
  product,
  error,
}: {
  product: ProductType;
  error: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <h1>Détails d'une annonce</h1>
      <p>Titre : {product.title}</p>
      <img
        src={
          product.picture
            ? `${import.meta.env.VITE_BACKEND_URL_FILES}${product.picture}`
            : defaultPicture
        }
        alt="Image"
        style={{ maxWidth: "300px", maxHeight: "300px" }}
      />
      {error}
    </div>
  );
}

export default AdContent;

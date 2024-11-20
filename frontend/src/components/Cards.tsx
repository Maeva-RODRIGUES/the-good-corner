// Cards.tsx

import { ProductType } from "./ListAds";
import { Link } from "react-router-dom";

function Card(props: { data: ProductType }) {
  return (
    <>
      <div className="card">
        <h1>{props.data.title}</h1>
        <p>{props.data.description}</p>
        <p>{props.data.created_at}</p>
        <p>{props.data.price} €</p>
        <Link to={`/ads/${props.data.id}`}>Voir le produit</Link>
      </div>
    </>
  );
}

export default Card;


// Cards.tsx

// Définition des types pour les props que le composant Cards attend
interface CardProps {
  title: string;
  description: string;
  created_at: string;
  price: string;
}

// Extraire directement les props dans la déstructuration 👇
function Card({ title, description, created_at, price }: CardProps) {
  return (
    <div style={{ border: '1px solid #fff', padding: '10px', backgroundColor: '#654321', color: 'white', width: '150px' }}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>{created_at}</span>
        <span>{price}</span>
      </div>
    </div>
  );
}

export default Card;



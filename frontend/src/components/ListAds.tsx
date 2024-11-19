// frontend/src/components/ListAds.tsx

import Card from '../components/Cards'; // On importe le composant Card pour pouvoir l'utiliser dans ce fichier
import instance from "../lib/instance.ts";
import { useEffect } from "react";


// Le composant ListAds est une fonction qui affiche une liste d'annonces sous forme de cartes.
function ListAds() {
    useEffect(() => {
        //on va faire notre requête ici
        instance.get("/ads/list")
      }, []);
    
    // Déclaration d'un tableau "ads" contenant les données des annonces à afficher.
    // Chaque objet d'annonce contient un identifiant (id), un titre (title), une description (description), et un prix (price).
    const ads = [
      {
        id: "0d20a325-1919-483d-ab90-c9249dbb4bd3", 
        title: "Mon super titre 5",  
        description: "Ma super description 5", 
        price: 20,  
      },
      {
        id: "a63e3c8d-3e77-4f1b-99a0-bdbb446c9fa6", 
        title: "Mon super titre 6",  
        description: "Ma super description 6", 
        price: 25,  
      },
      {
        id: "a63e3c8d-3e77-4f1b-99a0-bdbb446c9fp6", 
        title: "Mon super titre 7",  
        description: "Ma super description 7", 
        price: 23,  
      },
      {
        id: "a63e3c8d-3e77-4f1b-99a0-blbb456c9fa6", 
        title: "Mon super titre 8",  
        description: "Ma super description 8", 
        price: 22,  
      },
    ];
  
    // Ici on retourne du JSX, une structure HTML qui affiche la liste des annonces
    // Chaque annonce est passée à un composant "Card" pour l'affichage.
    // On utilise une fonction "map" pour parcourir chaque élément du tableau "ads" et afficher un composant "Card" pour chaque annonce.
    return (
      <div style={{ display: 'flex', gap: '20px' }}>  {/* Un conteneur div avec un style en ligne qui organise les éléments en ligne avec un écart de 20px entre les cartes */}
        {ads.map((ad) => ( // Pour chaque annonce dans le tableau "ads", on génère un composant "Card"
          <Card 
            key={ad.id}  // On utilise l'id de l'annonce comme clé unique pour chaque Card, ce qui permet à React de mieux gérer la mise à jour des éléments
            title={ad.title}  // On passe le titre de l'annonce en tant que prop "title"
            description={ad.description}  // On passe la description en tant que prop "description"
            price={`${ad.price}€`}  // On passe le prix avec un signe euro, on utilise la syntaxe template string pour ajouter "€"
            created_at="2024-11-19"  // Date fixe passée en prop pour l'affichage (peut être dynamique si besoin)
          />
        ))}
      </div>
    );
  }
  
  export default ListAds;  // On exporte le composant pour pouvoir l'utiliser dans d'autres fichiers

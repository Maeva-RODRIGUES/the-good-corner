//src/routes/ads.routes.ts

import { Router } from "express";

// Création d'une instance de routeur d'Express
const router = Router();

// Définition du type d'annonce (Ad)
type Ad = {
  id: string;
  title: string;
  description: string;
  price: number;
  picture: string;
  location: string;
};

// Liste d'annonces d'exemple
const adsList: Ad[] = [
  {
    id: "1",
    title: "Mon super titre 1",
    description: "Ma super description 1",
    price: 20.0,
    picture: "",
    location: "Paris",
  },
  {
    id: "2",
    title: "Mon super titre 2",
    description: "Ma super description 2",
    price: 30.0,
    picture: "",
    location: "Toulouse",
  },
];

// Route pour obtenir la liste des annonces
router.get("/list", (req, res) => {
  // Ligne commentée pour une autre variante de la route
  // router.get("/ads/list", (req, res) => {
  res.send(adsList); // Envoie la liste des annonces en réponse
});

// Route pour rechercher une annonce par ID
router.get("/find/:id", (req, res) => {
  // Ligne commentée pour une autre variante de la route
  // router.get("/ads/find/:id", (req, res) => {
  // Exemple d'URL : http://localhost:4000/ads/find/123456789 (variable de chemin)
  // Exemple d'URL avec query : http://localhost:4000/ads/find?id=123456789 (variable de requête)
});

// Exportation du routeur pour l'utiliser dans d'autres parties de l'application
export default router;

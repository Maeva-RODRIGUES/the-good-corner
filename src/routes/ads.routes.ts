//src/routes/ads.routes.ts

import { Router } from "express";
import AdService from "../services/ad.service";
import { Ad, PartialAdWithoutId} from "../types/ads";

const router = Router();

router.get("/list", async (req, res) => {
  try {
    const adsList = await new AdService().listAds();
    res.send(adsList);
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
});

router.get("/find/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const ad = await new AdService().findAdById(id);
    res.send(ad);
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
});

//Appeler la route de façon async pour intégrer ma fonction create
router.post("/create", async (req, res) => {
  const { id, title, description, picture, location, price }: Ad = req.body;

  const ad = {
    id,
    title,
    description,
    picture,
    location,
    price,
  };

  try {
    const newAd = await new AdService().create(ad);
    res.status(201).send({ success: true, ad: newAd });
  } catch (err: any) {
    res.status(500).send({ success: false, errorMessage: err.message });
  }
});


router.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // const { title, description, picture, location, price }: Partial<Ad>= req.body;
    const { title, description, picture, location, price }: PartialAdWithoutId = req.body;

    const ad = { 
      title: title || '', 
      description: description || '', 
      picture: picture || '', 
      location: location || '', 
      price: price !== undefined ? price : 0, 
    };

    const adUpdate = await new AdService().update(id, ad);
    res.send(adUpdate);
  } catch (error) {
    console.error(error);
    res.send({ error: "L'article n'as pas été trouvé" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const adDelete = await new AdService().delete(id);

    res.send({ message: `L'annonce ${adDelete} as bien été supprimé` });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "L'annonce n'as pas pu etre suprrimé" });
  }
});

export default router;


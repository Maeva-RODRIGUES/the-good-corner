//src/routes/ads.routes.ts
import { Router } from "express";
import AdService  from "../services/ad.service";;
import AdEntity from "../entities/Ad.entity";

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

//express validator
router.post("/create", async (req, res) => {
  const {
    title,
    description,
    picture,
    location,
    price,
    category,
    tagsIds,
  }: Omit<AdEntity, "id" | "created_at" | "updated_at" | "tags"> & {
    tagsIds: string[];
  } = req.body;

  const ad = {
    title,
    description,
    picture,
    location,
    price,
    category,
    tagsIds: tagsIds ?? [],
  };

  try {
    const newAd = await new AdService().create(ad);
    console.log("newAd", newAd);
    res.status(201).send({ success: true, ad: newAd });
  } catch (err: any) {
    res.status(500).send({ success: false, errorMessage: err.message });
  }
});

router.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  // const { title, description, picture, location, price }: Partial<Ad>= req.body;
  const {
    title,
    description,
    picture,
    location,
    price,
    tagsIds
  }: Partial<Omit<AdEntity, "id" | "tags">  & {
    tagsIds: string[];
  }> = req.body;

  const ad = { title, description, picture, location, price, tagsIds };
  try {
    const adUpdate = await new AdService().update(id, ad);
    res.send(adUpdate);
  } catch (err: any) {
    res.status(500).send({ success: false, errorMessage: err.message ?? err }); // opérateur de coalescence ?? ||
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const adDelete = await new AdService().delete(id);

    res.send({ message: `L'annonce ${adDelete} a bien était supprimée` });
  } catch (error: any) {
    res.send({ error: "L'annonce n'a pas pu etre supprimée :" + error });
  }
});
export default router;
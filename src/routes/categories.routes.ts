//routes/categories.routes.ts

import { Router } from "express";
import CategoryService from "../services/category.service";
import { Category, PartialCategoryWithoutId } from "../types/categories";

const router = Router();
const categoryService = new CategoryService();

//GET/list
router.get("/list",async (req,res) => {
    try {
        const categoriesList = await categoryService.listCategories(); // Appeler la méthode
        res.send(categoriesList); // Envoyer les catégories en réponse
      } catch (err:any) {
        res.status(500).send({message: err.message });
      }
    });

//GET/find:id
router.get("/find/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const cat = await new CategoryService().findCategoryById(id);
      res.send(cat);
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  });
  
// POST /create-express validator
router.post("/create", async (req, res) => {
    const {id,title }: Category = req.body;

    const category = {
        id,
        title,
    };

    try {
        const newCategory = await new CategoryService().create(category);
        res.status(201).send({ success: true, category: newCategory});
    } catch (err: any) {
        res.status(500).send({ success: false, errorMessage: err.message });
    }
});

//PATCH /update
router.patch("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { title }: PartialCategoryWithoutId = req.body;
  
    const category = { title };
    try {
      const categoryUpdate = await new CategoryService().update(id, category);
      res.send(categoryUpdate);
    } catch (err: any) {
      res.status(500).send({ success: false, errorMessage: err.message ?? err }); // opérateur de coalescence ?? ||
    }
  });

//DEL/delete
router.delete("/delete/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const categoryDelete = await new CategoryService().delete(id);
  
      res.send({ message: `La catégorie ${categoryDelete} as bien été supprimé` });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "La catégorie  n'a pas pu etre suprrimé" });
    }
  });


export default router;
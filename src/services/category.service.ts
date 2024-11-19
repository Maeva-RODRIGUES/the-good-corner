//services/category.service.ts

import CategoryRepository from "../repositories/CategoryRepository";
import CategoryEntity from "../entities/Category.entity";

export default class CategoryService {
    db:CategoryRepository;

    constructor() {
        this.db = new CategoryRepository();
      }

    // listCategories
      async listCategories() {
        return await this.db.find();
      }

 /**-----------------------
   *     Petit exemple de l'utilisation de la méthode personnalisée du Repository
   *  
   *  
   *------------------------**/

// findCategoryById
async findCategoryById(id: string, limit?: string) {
  let category: CategoryEntity | null;
  if (limit) { // si limit est indiquée, on va chercher la méthode personnalisé dans notre repository
    category = await this.db.findCategoryByIdWithLimitAds(id, limit);
  } else {
    category = await this.db.findOne({ where: { id } });
  }
  // const category = await this.db.findOne({ where: { id } });
  if (!category) {
    throw new Error("No Category found");
  }
  return category;
}

// createCategory
async create(category: Omit<CategoryEntity,"id" | "created_at" | "updated_at">) {
  const newCategory = await this.db.create(category); // Créer une instance de catégorie
  return this.db.save(newCategory); // Sauvegarder dans la base de données
}

// updateCategory
async update(id: string, category: Partial<Omit<CategoryEntity, "id">>) {
  const categoryFound = await this.findCategoryById(id);
  const categoryUpdate = this.db.merge(categoryFound, category);

  return await this.db.save(categoryUpdate);
}
  
// deleteCategory
async delete(id: string) {
  const deleteCategory= await this.db.delete({
    id,
  });

  if (deleteCategory.affected === 0) {
    throw new Error("No category found");
  }

  return id;
}
}

    
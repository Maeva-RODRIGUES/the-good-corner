import { Repository } from 'typeorm';  // Utilisation de TypeORM
import CategoryEntity from '../entities/Category.entity';  // L'entité Category
import datasource from "../lib/datasource";  
import AdRepository from "./Ad.repository";


export default class CategoryRepository extends Repository<CategoryEntity> {
    constructor() {
      // Appel au constructeur parent de Repository avec l'entité CategoryEntity
      super(CategoryEntity, datasource.createEntityManager());
    }

    
    /**======================
   *?    On pourra rajouter de nouvelles fonctions à notre catalogue de requêtes
   *========================**/

   async findCategoryByIdWithLimitAds(id: string, limit: string) {
    const adsRepository = new AdRepository();
    const category = await this.findOne({
      where: { id },
    });
    if (!category) {
      throw new Error("No Category found");
    }
    const ads = await adsRepository.find({
      where: { category: { id } },
      order: { created_at: "DESC" },
      take: +limit,
    });
    /**======================
     *    Exemple de query builder
     *========================**/
    // const ads = await adsRepository.createQueryBuilder("ad")
    //   .where("ad.categoryId = :id", { id })
    //   .orderBy("ad.created_at", "DESC")
    //   .take(+limit)
    //   // .take(parseInt(limit))
    //   .getMany();

    return { ...category, ads };
  }
}
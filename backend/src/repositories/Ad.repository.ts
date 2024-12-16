import AdEntity from '../entities/Ad.entity';
import datasource from '../lib/datasource';
import { Repository } from 'typeorm';

export default class AdRepository extends Repository<AdEntity> {
  constructor() {
    super(AdEntity, datasource.createEntityManager());
  }

  /**======================
   *?    On pourra rajouter de nouvelles fonctions à notre catalogue de requêtes
   *========================**/
  //   async findAdWithCategory() {
  //     return await this.findOne({ relations: ["category"] });
  //   }
}

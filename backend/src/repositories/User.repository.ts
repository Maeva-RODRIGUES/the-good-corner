import UserEntity from '@/entities/User.entity';
import datasource from '../lib/datasource';
import { Repository } from 'typeorm';

export default class UserRepository extends Repository<UserEntity> {
  constructor() {
    super(UserEntity, datasource.createEntityManager());
  }

  /**======================
   *?    On pourra rajouter de nouvelles fonctions à notre catalogue de requêtes
   *========================**/

}

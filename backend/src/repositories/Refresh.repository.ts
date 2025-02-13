import datasource from "../lib/datasource";
import { Repository } from "typeorm";
import RefreshTokenEntity from "@/entities/RefreshToken.entity";

export default class RefreshTokenRepository extends Repository<RefreshTokenEntity> {
  constructor() {
    super(RefreshTokenEntity, datasource.createEntityManager());
  }

  /**======================
   *?    On pourra rajouter de nouvelles fonctions à notre catalogue de requêtes
   *========================**/
}

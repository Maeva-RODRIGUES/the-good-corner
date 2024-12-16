import { DataSource } from "typeorm";
import AdEntity from "../entities/Ad.entity";
import CategoryEntity from "../entities/Category.entity";
import TagEntity from "../entities/Tag.entity";

export default new DataSource({
  type: "sqlite",
  database: "the-good-corner-orm.sqlite",
  // entities: ["/src/entities/*.entities.ts"],
  entities: [AdEntity, CategoryEntity, TagEntity],
  synchronize: true, // pas à utiliser en prod (faire des migrations pour la prod);
  logging: false, // nous permettra de voir les requêtes SQL qui sont jouées dans le terminal
  // logging: ["error", "query"], // nous permettra de voir les requêtes SQL qui sont jouées dans le terminal
});

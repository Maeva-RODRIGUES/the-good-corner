import { DataSource } from "typeorm";
import AdEntity from "../entities/Ad.entity";
import CategoryEntity from "../entities/Category.entity";
import TagEntity from "../entities/Tag.entity";
import UserEntity from "@/entities/User.entity";
import RefreshTokenEntity from "@/entities/RefreshToken.entity";

export default new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  // entities: ["/src/entities/*.entities.ts"],
  entities: [AdEntity, CategoryEntity, TagEntity, RefreshTokenEntity, UserEntity],
  synchronize: true, // pas à utiliser en prod (faire des migrations pour la prod);
  logging: false, // nous permettra de voir les requêtes SQL qui sont jouées dans le terminal
  // logging: ["error", "query"], // nous permettra de voir les requêtes SQL qui sont jouées dans le terminal
});

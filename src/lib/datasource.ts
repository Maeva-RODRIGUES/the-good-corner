//lib/datasource.ts

import { DataSource } from "typeorm";
import AdEntity from "../entities/Ad.entity";
import CategoryEntity from "../entities/Category.entity";

export default new DataSource ({
    type:"sqlite",
    database: "the-good-corner-orm.sqlite",
    entities:[AdEntity, CategoryEntity],
    //entities:["/src/entities/*.entities.ts"],automatiser
    synchronize: true, // ne pas utiliser en prod (faire des migrations)
    logging: ["error", "query"] // permet de voir les requêtes SQL qui sont joués dans le terminal





})
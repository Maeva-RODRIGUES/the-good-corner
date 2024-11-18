//services/ad.service.ts
import { Ad, PartialAdWithoutId } from "../types/ads.d";
import sqlite3 from "sqlite3";
import CategoryService from "./category.service";
import { Category } from "../types/categories";
import AdRepository from "../repositories/Ad.repository";
import AdEntity from "../entities/Ad.entity";

export default class AdService {
  //db: sqlite3.Database;
 db: AdRepository

  //Initialisation de la connexion dans le constructeur
  constructor() {
   // this.db = new sqlite3.Database("the-good-corner.db");
   this.db = new AdRepository();
  }

  async listAds() {
    return await this.db.find({ relations: ["category"] });
     // return new Promise<Ad[]>((resolve, reject) => {
    //   // this.db.all<Ad>("SELECT ads.*,  categories.title as categoryTitle FROM ads INNER JOIN categories ON ads.categoryID=categories.id", (err, rows) => {
    //   this.db.all<Ad & { category: string }>(
    //     `SELECT 
    //           ads.id,
    //           ads.title,
    //           ads.description,
    //           ads.price,
    //           ads.picture,
    //           ads.location,
    //           JSON_OBJECT(
    //               'id', categories.id,
    //               'title', categories.title
    //           ) AS category
    //        FROM ads
    //        INNER JOIN categories ON ads.categoryID = categories.id`,
    //     (err, rows) => {
    //       if (err) {
    //         reject(err.message);
    //       }
    //       const formattedRows = rows.map((row) => ({
    //         ...row,
    //         category: JSON.parse(row.category), // Ici on parse le JSON
    //       }));
    //       resolve(formattedRows);
    //       // resolve(rows);
    //     }
    //   );
    // });
  }
  findAdById(id: string) {
     // return new Promise<Ad & { category: Category }>((resolve, reject) => {
    //   this.db.get<Ad & { category: string }>(
    //     `SELECT 
    //         ads.id,
    //           ads.title,
    //           ads.description,
    //           ads.price,
    //           ads.picture,
    //           ads.location,
    //           JSON_OBJECT(
    //             'id', categories.id,
    //             'title', categories.title
    //           ) AS category
    //        FROM ads
    //        INNER JOIN categories ON ads.categoryID = categories.id WHERE ads.id = ?`,
    //     [id],
    //     function (err: any, row) {
    //       console.log("ROW", row);
    //       console.log(err);
    //       if (err) {
    //         reject(err.message);
    //       }
    //       if (!row) {
    //         reject("L'annonce n'existe pas");
    //       }
    //       const formattedRow = {
    //         ...row,
    //         category: JSON.parse(row.category), // Ici on parse le JSON
    //       };
    //       resolve(formattedRow);
    //     }
    //   );
    // });
  }

  async create(ad: Omit<AdEntity, "id">) {
    // create de typeorm créé UNE INSTANCE
    //il n'y a que "save" qui sauvegarde (save fait un INSERT INTO lorsque l'élément n'existe pas (id??) sinon un UPDATE SET)
    //save retourne l'élément
    const newAd = await this.db.save({
      ...ad,
    });

    return newAd;
     // return new Promise<Ad>(async (resolve, reject) => {
    //   try {
    //     //Vérification que la catégorie existe bien :
    //     await new CategoryService().findCategoryById(ad.categoryId);

    //     this.db.run(
    //       "INSERT INTO ads (title, description, price, picture, location, categoryId) VALUES (?, ?, ?, ?, ?, ?)",
    //       [
    //         ad.title,
    //         ad.description,
    //         ad.price,
    //         ad.picture,
    //         ad.location,
    //         ad.categoryId,
    //       ],
    //       function (err: any) {
    //         if (err) {
    //           console.log("error", err);
    //           reject(err);
    //         } else {
    //           resolve({ ...ad, id: `${this.lastID}` });
    //         }
    //       }
    //     );
    //   } catch (err) {
    //     reject(err);
    //   }
    // });
  }
  
  async update(id: string, ad: Partial<PartialAdWithoutId>) {
     // return new Promise<Ad>(async (resolve, reject) => {
    //   try {
    //     const adFound = await this.findAdById(id);
    //     Object.keys(ad).forEach((k) => {
    //       //title, description, picture, location, price
    //       if (ad[k]) {
    //         // si title n'est pas undefined :  if ad.title
    //         adFound[k] = ad[k]; // title de l'annonce trouvée est égal au titre reçu adFound.title = ad.title
    //       }
    //     });
    //     this.db.run(
    //       "UPDATE ads SET title = ?, description = ?, picture = ?, location = ?, price = ? WHERE id = ?",
    //       [
    //         adFound.title,
    //         adFound.description,
    //         adFound.picture,
    //         adFound.location,
    //         adFound.price,
    //         id,
    //       ],
    //       function (err) {
    //         if (err) {
    //           reject("Il y a eu une erreur");
    //         }
    //         if (this.changes === 0) {
    //           reject("L'annonce n'existe pas");
    //         }

    //         resolve(adFound);
    //       }
    //     );
    //   } catch (err) {
    //     reject(err);
    //   }
    // });
  }
  async delete(id: string) {
    // return new Promise<string>((resolve, reject) => {
    //   // const ad = await this.findAdById(id);
    //   this.db.run("DELETE FROM ads WHERE id = ?", [id], function (error) {
    //     if (error) {
    //       reject(error);
    //     } else {
    //       if (this.changes === 0) {
    //         reject("L'annonce n'existe pas");
    //       }
    //       console.log("CHANGES", this.changes);

    //       resolve(id);
    //     }
    //   });
    // });

    // const ad = await this.findAdById(id);
    // adsList = adsList.filter((a) => a.id !== ad.id);

    // return ad.id;
    // const adIndex = adsList.findIndex((ad) => ad.id === id);
    // if (adIndex === -1) {
    //   throw new Error("Ad not found");
    // } else {
    //   const adId = adsList[adIndex].id;
    //   adsList.splice(adIndex, 1); //modificateur
    //   return adId;
    // }
  }
}

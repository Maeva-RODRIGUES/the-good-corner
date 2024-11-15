//services/ad.service.ts
import { Ad, PartialAdWithoutId } from "../types/ads.d";
import sqlite3 from "sqlite3";

let adsList: Ad[] = [
  {
    id: "1",
    title: "Mon super titre 1",
    description: "Ma super description 1",
    price: 20.0,
    picture: "",
    location: "Paris",
  },
  {
    id: "2",
    title: "Mon super titre 2",
    description: "Ma super description 2",
    price: 30.0,
    picture: "",
    location: "Toulouse",
  },
];
export default class AdService {
  db: sqlite3.Database;

  //Initialisation de la connexion dans le constructeur
  constructor() {
    this.db = new sqlite3.Database("the-good-corner.db");
  }

  async listAds() {
    return new Promise<Ad[]>((resolve, reject) => {
      this.db.all<Ad>("SELECT * FROM ad", (err, rows) => {
        if (err) {
          reject(err.message);
        }

        resolve(rows);
      });
    });
  }
  findAdById(id: string) {
    return new Promise<Ad>((resolve, reject) => {
      this.db.get<Ad>(
        "SELECT * FROM ad WHERE id = ?",
        [id],
        (err: any, row) => {
          if (err) {
            reject(err.message);
          }

          resolve(row);
        }
      );
    });
  }

  create(ad: Ad) {
    return new Promise<Ad>((resolve, reject) => {
      this.db.run(
        "INSERT INTO ad (title, description, price, picture, location) VALUES (?, ?, ?, ?, ?)",
        [ad.title, ad.description, ad.price, ad.picture, ad.location],
        function (err: any) {
          if (err) {
            console.log("error", err);
            reject(err);
          } else {
            resolve({ ...ad, id: `${this.lastID}` });
          }
        }
      );
    });
  }
  
  async update(id: string, ad: Partial<PartialAdWithoutId>) {
    return new Promise<Ad>(async (resolve, reject) => {
      const adFound = await this.findAdById(id);
      Object.keys(ad).forEach((k) => {
        //title, description, picture, location, price
        if (ad[k]) {
          // si title n'est pas undefined :  if ad.title
          adFound[k] = ad[k]; // title de l'annonce trouvée est égal au titre reçu adFound.title = ad.title
        }
      });

      this.db.run(
        "UPDATE ad SET title = ?, description = ?, picture = ?, location = ?, price = ? WHERE id = ?",
        [
          adFound.title,
          adFound.description,
          adFound.picture,
          adFound.location,
          adFound.price,
          id,
        ],
        function (err) {
          if (err) {
            reject("Il y a eu une erreur");
          }
          if (this.changes === 0) {
            reject("L'annonce n'existe pas");
          }

          resolve(adFound);
        }
      );
    });
  }
  delete(id: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        this.db.run("DELETE FROM ads WHERE id = ?", [id], (err) => {
            if (err) {
                reject(err.message);
            } else {
                resolve(id); // Résoudre avec l'ID de l'annonce supprimée
            }
        });
    });
 }
}
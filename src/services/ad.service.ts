//services/ad.service.ts

import CategoryService from "./category.service";
import AdRepository from "../repositories/Ad.repository";
import AdEntity from "../entities/Ad.entity";


export default class AdService {
 db: AdRepository;

  //Initialisation de la connexion dans le constructeur
  constructor() {
   this.db = new AdRepository();
  }

  async listAds() {
    return await this.db.find({ relations: ["category"] });
  }

  async findAdById(id: string) {
    const ad = await this.db.findOne({ where: { id } });
    if (!ad) {
      throw new Error("No ad found");
    }
    return ad;
  }

  // / Méthode pour créer une nouvelle annonce
  async create(ad: Omit<AdEntity,  "id" | "created_at" | "updated_at" >) {
     // Ici, Omit<Ad, "id" | "created_at" | "updated_at"> signifie qu'on envoie une annonce sans 'id', 'created_at' et 'updated_at'.
    // create de typeorm créé UNE INSTANCE
    //il n'y a que "save" qui sauvegarde (save fait un INSERT INTO lorsque l'élément n'existe pas (id??) sinon un UPDATE SET)
    //save retourne l'élément
    // Le but est de créer une nouvelle annonce dans la base de données en utilisant la méthode 'save' du repository.
    // La méthode 'save' va soit ajouter une nouvelle annonce 
    const newAd =  await this.db.save(ad); // On attend que la base de données enregistre l'annonce et on stocke l'annonce retournée.
    return newAd;
  }
  
  async update(id: string, ad: Partial<Omit<AdEntity, "id">>) {
    const adFound = await this.findAdById(id);
    const adUpdate = this.db.merge(adFound, ad);
    return await this.db.save(adUpdate);
  }


  async delete(id: string) {
    const deletedAd = await this.db.delete({
      id,
    });

    if (deletedAd.affected === 0) {
      throw new Error("No ad found");
    }

    return id;
  }
}

  


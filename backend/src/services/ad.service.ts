//services/ad.service.ts

import AdRepository from "../repositories/Ad.repository";
import AdEntity from "../entities/Ad.entity";
import TagService from "./tag.service";
import TagEntity from "../entities/Tag.entity";

export default class AdService {
  db: AdRepository;

  constructor() {
    this.db = new AdRepository();
  }

  async listAds() {
    return await this.db.find({ relations: ["category", "tags"] });
  }

  async findAdById(id: string) {
    const ad = await this.db.findOne({ where: { id } });
    if (!ad) {
      throw new Error("No ad found");
    }
    return ad;
  }

  async create({
    tagsIds,
    ...ad
  }: Omit<AdEntity, "id" | "created_at" | "updated_at" | "tags"> & {
    tagsIds: string[];
  }) {
    // create de typeorm créé UNE INSTANCE
    //il n'y a que "save" qui sauvegarde (save fait un INSERT INTO lorsque l'élément n'existe pas (id??) sinon un UPDATE SET)
    //save retourne l'élément
    let tags: TagEntity[] = [];
    if (tagsIds.length > 0) {
      tags = await new TagService().findMultipleTagsByIds(tagsIds);
      console.log("%c⧭", "color: #917399", tags);
    }

    const newAd = await this.db.save({
      ...ad,
      tags,
    });

    return newAd;
  }
  async update(
    id: string,
    {
      tagsIds,
      ...ad
    }: Partial<
      Omit<AdEntity, "id" | "tags"> & {
        tagsIds: string[];
      }
    >
  ) {
    let tags: TagEntity[] = [];
    if (tagsIds && tagsIds.length > 0) {
      tags = await new TagService().findMultipleTagsByIds(tagsIds);
    }

    const adFound = await this.findAdById(id);
    const adUpdate = this.db.merge(adFound, { ...ad, tags }); //
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


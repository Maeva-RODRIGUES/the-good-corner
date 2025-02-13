import AdRepository from "../repositories/Ad.repository";
import CategoryEntity from "../entities/Category.entity";
import CategoryService from "./category.service";
import TagEntity from "../entities/Tag.entity";
import TagService from "./tag.service";
import { validate } from "class-validator";
import {
  MutationCreateAdArgs,
  MutationUpdateAdArgs,
  QueryAdsArgs,
  QuerySearchAdArgs,
} from "@/generated/graphql";
import { ILike, In } from "typeorm";

export default class AdService {
  db: AdRepository;

  constructor() {
    this.db = new AdRepository();
  }

  async listAds(options: QueryAdsArgs["filter"]) {
    return await this.db.find({
      relations: ["category", "tags"],
      order: { created_at: options?.order ?? "ASC" },
      take: options?.limit || undefined,
    });
  }

  async findAdById(id: string) {
    const ad = await this.db.findOne({
      where: { id },

      relations: ["category", "tags"],
    });
    if (!ad) {
      throw new Error("No ad found");
    }
    return ad;
  }

  async create({ tagsIds, categoryId, ...ad }: MutationCreateAdArgs["data"]) {
    let tags: TagEntity[] = [];
    if (tagsIds && tagsIds?.length > 0) {
      tags = await new TagService().findMultipleTagsByIds(tagsIds);
    }
    const description = ad.description;
    const category: CategoryEntity =
      await new CategoryService().findCategoryById({ id: categoryId });
    const newAd = this.db.create({
      ...ad,
      description,
      tags,
      category,
      // category: { id: categoryId },
    });
    const errors = await validate(newAd);
    if (errors.length > 0) {
      throw new Error(errors[0].toString());
    }
    await this.db.save(newAd);
    return newAd;
  }
  async update(
    id: string,
    { tagsIds, categoryId, ...ad }: MutationUpdateAdArgs["data"]
  ) {
    let tags: TagEntity[] = [];
    let category: CategoryEntity | undefined;
    if (categoryId) {
      category = await new CategoryService().findCategoryById({
        id: categoryId,
      });
    }
    if (tagsIds && tagsIds.length > 0) {
      tags = await new TagService().findMultipleTagsByIds(tagsIds);
    }
    const adFound = await this.findAdById(id);
    const adUpdate = this.db.merge(adFound, { ...ad, tags, category });
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
  async searchAd(search: QuerySearchAdArgs["search"]) {
    const queryBuilder = this.db.createQueryBuilder("ad")
      .leftJoinAndSelect("ad.category", "category")
      .where("ad.title ILIKE :searchText", { searchText: `%${search.text}%` })
      .select([
        "category.id AS categoryid",
        "category.title AS categorytitle",
        "json_agg(ad) AS ads",
      ])
      .groupBy("category.id, category.title");
  
    const results = await queryBuilder.getRawMany();
  
    return results.map((result) => ({
      categoryId: result.categoryid,
      categoryTitle: result.categorytitle,
      ads: result.ads,
    }));
  }

  async getAdsInfosFromIds (ids: string[]) {
    return await this.db.find({where: {id: In(ids)}, select: ["id", "picture", "description", "price", "title"]});
  }
  
}

import AdEntity from "@/entities/Ad.entity";
import {
  MutationCreateAdArgs,
  MutationDeleteTagArgs,
  MutationUpdateAdArgs,
  QueryAdsArgs,
  QueryFindAdArgs,
} from "@/generated/graphql";
import AdService from "@/services/ad.service";
// import { AdCreateType, AdUpdateType, FilterType } from "@/types/ads";

export default {
  Query: {
    ads: async (
      _: any,
      { filter }: QueryAdsArgs
    ): // { filter }: { filter: FilterType }
    Promise<AdEntity[]> => {
      const adsList = await new AdService().listAds(filter);
      return adsList;
    },
    findAd: async (_: any, { id }: QueryFindAdArgs): Promise<AdEntity> => {
      const ad = await new AdService().findAdById(id);
      return ad;
    },
  },
  Mutation: {
    createAd: async (
      _: any,
      { data }: MutationCreateAdArgs
    ): Promise<AdEntity> => {
      const newAd = await new AdService().create({ ...data, picture: "" });
      return newAd;
    },
    updateAd: async (
      _: any,
      { data }: MutationUpdateAdArgs
    ): Promise<AdEntity> => {
      const adUpdate = await new AdService().update(data.id, {
        ...data,
        picture: "", //? à revoir avec l'upload plus tard
      });
      return adUpdate;
    },
    deleteAd: async (_: any, { id }: MutationDeleteTagArgs): Promise<string> => {
      const adDelete = await new AdService().delete(id);
      return `L'annonce ${adDelete} a bien était supprimée`;
    },
  },
  //   Ad: {
  //     category: (parent: any) => {
  //         console.log("PARENT", parent);
  //         /// chercher dans le dataloader
  //         // return {       }
  // //   prévoir un return
  //     }
  //   }
};

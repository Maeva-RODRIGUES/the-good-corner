import AdEntity from "@/entities/Ad.entity";
import {
  InfosForCheckout,
  MutationCreateAdArgs,
  MutationDeleteAdArgs,
  MutationUpdateAdArgs,
  QueryAdsArgs,
  QueryFindAdArgs,
  QueryGetInfosForCheckoutArgs,
  QuerySearchAdArgs,
  SearchAdsResult,
} from "@/generated/graphql";
import AdService from "@/services/ad.service";
import { MyContext } from "..";

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
    searchAd: async (
      _: any,
      { search }: QuerySearchAdArgs
    ): Promise<SearchAdsResult[]> => {
      if (search.text.length <= 2) {
        throw new Error("Minimum 3 caractères pour effectuer la recherche");
      }
      const result = await new AdService().searchAd(search);
      return result;
    },
    getInfosForCheckout: async (
      _: any,
      { ids }: QueryGetInfosForCheckoutArgs
    ): Promise<InfosForCheckout[]> => {
      const ads = await new AdService().getAdsInfosFromIds(ids);
      return ads;
    },
  },
  Mutation: {
    createAd: async (
      _: any,
      { data }: MutationCreateAdArgs,
      ctx: MyContext
    ): Promise<AdEntity> => {
      if (!ctx.user) {
        throw new Error(
          "Vous devez être authentifié pour accéder à la création d'annonce!"
        );
      }
      const newAd = await new AdService().create({ ...data });
      return newAd;
    },
    updateAd: async (
      _: any,
      { data }: MutationUpdateAdArgs
    ): Promise<AdEntity> => {
      const adUpdate = await new AdService().update(data.id, {
        ...data,
      });
      return adUpdate;
    },
    deleteAd: async (_: any, { id }: MutationDeleteAdArgs): Promise<string> => {
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

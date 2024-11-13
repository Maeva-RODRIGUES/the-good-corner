//services/ad.service.ts
import { Ad, PartialAdWithoutId } from "../types/ads.d";

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
  listAds() {
    return adsList;
  }
  findAdById(id: string) {
    const ad = adsList.find((ad) => ad.id === id);
    if (!ad) {
      throw new Error("L'annonce n'existe pas");
    }
    return ad;
  }
  create(ad: Ad) {
    const adExists = adsList.some((a) => a.id === ad.id);
    if (adExists) {
      throw new Error("L'annonce existe déjà");
    }

    adsList.push(ad);
    return ad;
  }
  update(id: string, ad: Partial<PartialAdWithoutId>) {
    const adFound = this.findAdById(id);

    Object.keys(ad).forEach((k) => {
      if (ad[k]) {
        adFound[k] = ad[k];
      }
    });

    console.log(adsList);

    return adFound;
  }
  delete(id: string) {
    const ad = this.findAdById(id);
    adsList = adsList.filter((a) => a.id !== ad.id);

    return ad.id;
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

    
  
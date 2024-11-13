//services/ad.service.ts

import { Ad } from "../types/ads.d";

const adsList: Ad[] = [
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
    create(ad: Ad){
        //1ere solution : index
        //2eme solution: checkAd => rappeler findAdById
         
        adsList
        adsList.push(ad)
        console.info(adsList)
        return ad.id
      }
    }
    
  
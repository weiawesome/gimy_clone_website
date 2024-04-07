import {AdType, ResponseAdInformation} from "@/model/repsonse/ad_information";
import {config} from "@/service/config";

export async function GetAd(adType:AdType){
    const url=config.SERVICE_URL+config.ROUTE_AD+adType
    return await fetch(url)
        .then(response => response.json())
        .then((data: ResponseAdInformation) => {
            return data
        })
        .catch(error => console.error('Error:', error));
}
import {AdType, ResponseAdInformation} from "@/model/repsonse/ad_information";
import {config} from "@/service/config";

export async function GetAd(adType:AdType,service_url:string){
    const url=service_url+config.ROUTE_AD+adType
    return await fetch(url)
        .then(response => response.json())
        .then((data: ResponseAdInformation) => {
            return data
        })
        .catch(error => console.error('Error:', error));
}
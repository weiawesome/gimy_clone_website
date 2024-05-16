import {config} from "@/service/config";
import {ResponseFilmsRanked} from "@/model/repsonse/films_ranked";

export async function GetRankedFilms(service_url:string,film_category:string){
    if (film_category===String(undefined)){
        return
    }
    const url=service_url+config.ROUTE_RANKED+film_category
    return await fetch(url)
        .then(response => response.json())
        .then((data: ResponseFilmsRanked) => {
            return data
        })
        .catch(error => console.error('Error:', error));
}
import { ResponseFilmsSearch } from "@/model/repsonse/films_search";
import {config} from "@/service/config";

export async function GetSearchFilms(search_celebrity:boolean,content:string,page:number){
    if (content===String(undefined)){
        return
    }
    const offset=(page-1)*config.PAGE_SIZE
    const limit=config.PAGE_SIZE
    let url: string
    if (search_celebrity){
        url=config.SERVICE_URL+config.ROUTE_CELEBRITY_SEARCH+"?"+"content="+content+"&"+"offset="+offset+"&"+"limit="+limit
    } else{
        url=config.SERVICE_URL+config.ROUTE_CONTENT_SEARCH+"?"+"content="+content+"&"+"offset="+offset+"&"+"limit="+limit
    }
    return await fetch(url)
        .then(response => response.json())
        .then((data: ResponseFilmsSearch) => {
            return data
        })
        .catch(error => console.error('Error:', error));
}
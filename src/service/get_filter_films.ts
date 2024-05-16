import {config} from "@/service/config";

export async function GetFilterFilms(service_url:string,film_type:string,film_category:string|string[]|undefined,location:string|string[]|undefined,releaseYear:string|string[]|undefined,orderType:string,page:number){
    let url=service_url+config.ROUTE_FILTER+film_type+"?"+"order_type="+orderType
    const offset=(page-1)*config.PAGE_SIZE
    const limit=config.PAGE_SIZE

    url+="&"+"offset="+offset
    url+="&"+"limit="+limit

    if (film_category!==undefined){
        url+="&"+"category="+String(film_category)
    }
    if (location!==undefined){
        url+="&"+"location="+String(location)
    }
    if (releaseYear!=undefined){
        url+="&"+"release_year="+String(releaseYear)
    }

    return await fetch(url)
        .then(response => response.json())
        .then((data: ResponseFilmList) => {
            return data
        })
        .catch(error => console.error('Error:', error));
}
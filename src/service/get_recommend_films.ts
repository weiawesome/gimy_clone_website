import {config} from "@/service/config";

export async function GetRecommendFilms(){
    let url=config.SERVICE_URL+config.ROUTE_BASIC
    const offset=0
    const limit=config.PAGE_SIZE

    url+="?"+"offset="+offset
    url+=+"&"+"limit="+limit

    return await fetch(url)
        .then(response => response.json())
        .then((data: ResponseFilmList) => {
            return data
        })
        .catch(error => console.error('Error:', error));
}
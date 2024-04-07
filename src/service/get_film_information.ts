import {config} from "@/service/config";

export async function GetFilmInformation(film_id:string){
    if (film_id===String(undefined)){
        return
    }
    const url=config.SERVICE_URL+config.ROUTE_INFORMATION+film_id
    return await fetch(url)
        .then(response => response.json())
        .then((data: ResponseFilmInformation) => {
            return data
        })
        .catch(error => console.error('Error:', error));
}

export async function GetFilmRoutesInformation(film_id:string){
    if (film_id===String(undefined)){
        return
    }
    const url=config.SERVICE_URL+config.ROUTE_ROUTES_INFORMATION+film_id
    return await fetch(url)
        .then(response => response.json())
        .then((data: ResponseFilmRoutesInformation) => {
            return data
        })
        .catch(error => console.error('Error:', error));
}
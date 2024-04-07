import {config} from "@/service/config";

export async function GetPopularTypeFilms(film_type:string){
    if (film_type===String(undefined)){
        return
    }
    const url=config.SERVICE_URL+config.ROUTE_POPULAR_TYPE+film_type
    return await fetch(url)
        .then(response => response.json())
        .then((data: ResponseFilmList) => {
            return data
        })
        .catch(error => console.error('Error:', error));
}

export async function GetPopularCategoryFilms(film_category:string){
    if (film_category===String(undefined)){
        return
    }
    const url=config.SERVICE_URL+config.ROUTE_POPULAR_CATEGORY+film_category
    return await fetch(url)
        .then(response => response.json())
        .then((data: ResponseFilmList) => {
            return data
        })
        .catch(error => console.error('Error:', error));
}
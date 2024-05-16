import {config} from "@/service/config";
import {ResponseFilmCreate} from "@/model/repsonse/film_created";
import {RequestCreateFilm} from "@/model/request/film_create";

export async function CreateFilm(service_url:string,request:RequestCreateFilm): Promise<ResponseFilmCreate> {
    const url=service_url+config.ROUTE_CREATE_FILM
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(request),
        });
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(JSON.stringify(errorResponse));
        } else{
            return await response.json()
        }
    } catch (error) {
        throw error
    }
}
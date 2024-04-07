import {config} from "@/service/config";
import {ResponseFilmCreate} from "@/model/repsonse/film_created";
import {RequestCreateFilm} from "@/model/request/film_create";

export async function CreateFilm(request:RequestCreateFilm): Promise<ResponseFilmCreate> {
    const url=config.SERVICE_URL+config.ROUTE_CREATE_FILM
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
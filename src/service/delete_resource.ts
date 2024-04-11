import {config} from "@/service/config";

export async function DeleteFilmEpisode(route:string, id:string, episode:string, state:string): Promise<void> {
    const url=config.SERVICE_URL+config.ROUTE_UPLOAD_FILM_RESOURCE+route+"/"+id+"/"+episode+"?"+"state="+state

    try {
        const response = await fetch(url, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(JSON.stringify(errorResponse));
        }
    } catch (error) {
        throw error
    }
}

export async function DeleteFilm(id:string): Promise<void> {
    const url=config.SERVICE_URL+config.ROUTE_CREATE_FILM+"/"+id

    try {
        const response = await fetch(url, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(JSON.stringify(errorResponse));
        }
    } catch (error) {
        throw error
    }
}
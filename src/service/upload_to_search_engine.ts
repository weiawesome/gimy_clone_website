import {config} from "@/service/config";

export async function UploadToSearchEngine(film_id:string): Promise<void> {
    const url=config.SERVICE_URL+config.ROUTE_UPLOAD_SEARCH_ENGINE+film_id

    try {
        const response = await fetch(url, {
            method: 'POST',
        });
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(JSON.stringify(errorResponse));
        }
    } catch (error) {
        throw error
    }
}
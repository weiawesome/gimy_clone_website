import {config} from "@/service/config";

export async function UploadFilmResource(service_url:string,route:string,id:string,episode:string,state:string,file:File): Promise<void> {
    const url=service_url+config.ROUTE_UPLOAD_FILM_RESOURCE+route+"/"+id+"/"+episode+"?"+"state="+state
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(JSON.stringify(errorResponse));
        }
    } catch (error) {
        throw error
    }
}

export async function UploadImageResource(service_url:string,id:string,file:File): Promise<void> {
    const url=service_url+config.ROUTE_UPLOAD_FILM_IMAGE+id
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(JSON.stringify(errorResponse));
        }
    } catch (error) {
        throw error
    }
}
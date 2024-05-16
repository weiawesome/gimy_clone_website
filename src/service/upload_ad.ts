import {config} from "@/service/config";
import {AdType} from "@/model/repsonse/ad_information";

export async function UploadAd(service_url:string,file: File, advertisementType: AdType, expiredTime: string): Promise<void> {
    const url=service_url+config.ROUTE_UPLOAD_AD
    const formData = new FormData();
    formData.append("file", file);
    formData.append("advertisement_type", advertisementType);
    formData.append("expired_time", expiredTime);

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            const errorResponse = await response.json(); // 假設服務器返回的是 JSON 格式的錯誤資訊
            throw new Error(JSON.stringify(errorResponse));
        }
    } catch (error) {
        throw error
    }
}
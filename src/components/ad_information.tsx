import React, {useEffect, useState} from "react";
import "@/app/globals.css"
import {AdType} from "@/model/repsonse/ad_information";
import {GetAd} from "@/service/get_ad";
import Image from 'next/image';


interface AdInformationProps{
    adType:AdType
}

const AdInformation:React.FC<AdInformationProps>=({adType})=>{
    const [source,setSource]=useState("")
    const [loadError,setLoadError]=useState(false)

    useEffect(() => {
        setLoadError(false);
        GetAd(adType).then((r)=>setSource(r!.URL))
    }, [adType]);
    if (loadError){
        return
    }
    if (adType===AdType.WEB_BAR){
        return(
            <div className={"mt-3 mb-3 w-full h-24 lg:h-56 flex items-center justify-center overflow-hidden"}>
                <Image alt={"ad"} width={750} height={150} src={source} className={"w-full"} onError={()=>{setLoadError(true)}}></Image>
            </div>
        )
    }
    return (
        <div className={"mt-3 mb-3 flex items-center justify-center"}>
            <Image alt={"ad"} width={300} height={300} src={source} onError={()=>{setLoadError(true)}}/>
        </div>
    )
}
export default AdInformation
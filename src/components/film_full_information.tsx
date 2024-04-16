import React from "react";
import "@/app/globals.css"
import {FormatCategory, GetTypeRouteFormCategory} from "@/service/utils";
import Link from "next/link";
interface FilmInformationProps{
    filmInformation:ResponseFilmInformation
    film_route:string
    episode:string
}
const FilmFullInformation:React.FC<FilmInformationProps>=({filmInformation,film_route,episode})=>{
    return(
        <div className={"flex flex-col justify-start ml-3"}>
                <div className={"flex flex-row text-lg font-bold"}>
                    <Link href={"/resource/"+filmInformation?.id} className={"text-primary-color"}>{filmInformation?.title}</Link>
                    <p>&nbsp;-&nbsp;</p>
                    <p>{episode}</p>
                    <p>&nbsp;-&nbsp;</p>
                    <p>{film_route}</p>
                </div>
                <div className={"flex flex-row justify-start overflow-hidden truncate text-normal-color text-sm mt-0.5"}>
                    <div className={"flex flex-row mr-3"}>
                        <p>類別&nbsp;:&nbsp;</p>
                        <Link href={GetTypeRouteFormCategory(filmInformation?.category)+"?category="+filmInformation?.category} className={"font-bold hover:text-primary-color"}>{FormatCategory(filmInformation?.category)}</Link>
                    </div>
                    <p className={"font-bold mr-3"}>|</p>
                    <div className={"flex flex-row mr-3"}>
                        <p>年分&nbsp;:&nbsp;</p>
                        <Link href={GetTypeRouteFormCategory(filmInformation?.category)+"?releaseYear="+filmInformation?.releaseYear} className={"font-bold hover:text-primary-color"}>{filmInformation?.releaseYear}</Link>
                    </div>
                    <p className={"font-bold mr-3"}>|</p>
                    <div className={"flex flex-row mr-3"}>
                        <p>人氣&nbsp;:&nbsp;</p>
                        <p className={"font-bold"}>{filmInformation?.popularity}</p>
                    </div>
                </div>
                <p className={"mt-3 break-words lg:hidden"}>{filmInformation?.introduction}</p>
            </div>
    )
}
export default FilmFullInformation
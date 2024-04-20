import React, {useEffect, useState} from "react";
import "@/app/globals.css"
import {ConvertUTCDateToLocalDate, FormatCategory, FormatLocation, GetTypeRouteFormCategory} from "@/service/utils";
import Link from "next/link";
import Image from 'next/image';

interface FilmInformationProps{
    filmInformation:ResponseFilmInformation
}
const FilmInformation:React.FC<FilmInformationProps>=({filmInformation})=>{
    const [loadError,setLoadError]=useState(false)
    const [bgLoadError,setBgLoadError]=useState(false)
    useEffect(() => {
        setLoadError(false)
        setBgLoadError(false)
    }, [filmInformation]);
    return(
        <div className={"p-3 flex flex-row w-full mb-3"}>
            <Image alt={"image"} width={200} height={250} className={"lg:hidden filter -z-50 opacity-85 absolute blur drop-shadow-lg w-full h-52 object-cover object-center"} src={bgLoadError?"/icon.png":filmInformation?.resource} onError={()=>{setBgLoadError(true)}}/>
            <div className={"h-52 lg:h-60 flex flex-col justify-center aspect-4/5"}>
                <Image alt={"image"} width={200} height={250} className={"aspect-4/5 h-full shadow-lg rounded-lg overflow-hidden lg:w-auto"} src={loadError?"/icon.png":filmInformation?.resource} onError={()=>{setLoadError(true)}}/>
            </div>
            <div className={"flex flex-col justify-start ml-3 truncate lg:hidden"}>
                <p className={"font-bold text-normal-color text-lg"}>{filmInformation?.title}</p>
                <div className={"mt-2 flex flex-row justify-start"}>
                    {filmInformation!==undefined && filmInformation?.actors.map((item,index)=>{
                        return(
                            <Link href={"/resource/search/celebrity?content="+item} key={index} className={"mr-2 text-normal-color hover:text-primary-color text-md hover:font-bold"}>{item}</Link>
                        )
                    })}
                </div>
                <div className={"mt-2 flex flex-row justify-start"}>
                    <Link href={GetTypeRouteFormCategory(filmInformation?.category)+"?category="+filmInformation?.category} className={"text-normal-color hover:text-primary-color text-md hover:font-bold"}>{FormatCategory(filmInformation?.category)}</Link>
                    <p className={"ml-2 mr-2"}>/</p>
                    <p>{filmInformation?.releaseYear}</p>
                    <p className={"ml-2 mr-2"}>/</p>
                    {filmInformation?.directors.map((item,index)=>{
                        return (
                            <Link href={"/resource/search/celebrity?content="+item} key={index} className={"mr-2 text-normal-color hover:text-primary-color text-md hover:font-bold"}>{item}</Link>
                        )
                    })}
                </div>
                <p className={"mt-2 text-reverse-color md:text-plain-color text-md"}>{"狀態 : "+filmInformation?.state}</p>
                <p className={"mt-2 text-reverse-color md:text-plain-color text-md"}>{"更新 : "+ConvertUTCDateToLocalDate(filmInformation?.updateTime)}</p>
                <p className={"mt-2 text-reverse-color md:text-plain-color text-md"}>{"人氣 : "+filmInformation?.popularity}</p>
            </div>
            <div className={"hidden lg:flex ml-10 flex-col w-full text-md"}>
                <p className={"text-2xl font-bold text-normal-color"}>{filmInformation?.title}</p>
                <div className={"flex flex-col justify-start mt-5"}>
                    <div className={"flex flex-row w-2/3"}>
                        <div className={"flex flex-1"}>
                            <p className={"text-plain-color"}>狀態&nbsp;:&nbsp;</p>
                            <p className={"text-normal-color"}>{filmInformation?.state}</p>
                        </div>
                        <div className={"flex flex-1 justify-start flex-row"}>
                            <p className={"text-plain-color"}>類別&nbsp;:&nbsp;</p>
                            <Link href={GetTypeRouteFormCategory(filmInformation?.category)+"?category="+filmInformation?.category} className={"text-normal-color hover:text-primary-color"}>{FormatCategory(filmInformation?.category)}</Link>
                        </div>
                    </div>
                    <div className={"truncate flex flex-row w-2/3 mt-2.5"}>
                        <p className={"text-plain-color"}>主演&nbsp;:&nbsp;</p>
                        {filmInformation?.actors.map((item,index)=>{
                            return (
                                <Link href={"/resource/search/celebrity?content="+item} className={"mr-2 text-normal-color hover:text-primary-color"} key={index}>{item}</Link>
                            )
                        })}
                    </div>
                    <div className={"flex flex-row w-2/3 mt-2.5"}>
                        <div className={"flex flex-1"}>
                            <p className={"text-plain-color"}>導演&nbsp;:&nbsp;</p>
                            {filmInformation?.directors.map((item,index)=>{
                                return (
                                    <Link href={"/resource/search/celebrity?content="+item} key={index} className={"mr-2 text-normal-color hover:text-primary-color"}>{item}</Link>
                                )
                            })}
                        </div>
                        <div className={"flex flex-1 justify-start flex-row"}>
                            <p className={"text-plain-color"}>國家/地區&nbsp;:&nbsp;</p>
                            <Link href={GetTypeRouteFormCategory(filmInformation?.category)+"?location="+filmInformation?.location} className={"text-normal-color hover:text-primary-color"}>{FormatLocation(filmInformation?.location)}</Link>
                        </div>
                    </div>
                    <div className={"flex flex-row w-2/3 mt-2.5"}>
                        <div className={"flex flex-1"}>
                            <p className={"text-plain-color"}>年代&nbsp;:&nbsp;</p>
                            <p className={"text-normal-color"}>{filmInformation?.releaseYear}</p>
                        </div>
                        <div className={"flex flex-1 justify-start flex-row"}>
                            <p className={"text-plain-color"}>更新時間&nbsp;:&nbsp;</p>
                            <p className={"text-normal-color"}>{ConvertUTCDateToLocalDate(filmInformation?.updateTime).substring(0,ConvertUTCDateToLocalDate(filmInformation?.updateTime).length-3)}</p>
                        </div>
                    </div>
                    <div className={"flex flex-row w-2/3 mt-2.5"}>
                        <p className={"text-plain-color"}>人氣&nbsp;:&nbsp;</p>
                        <p className={"text-normal-color"}>{filmInformation?.popularity}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FilmInformation
import React, {useState} from "react";
import "@/app/globals.css"
import {ConvertUTCDateToLocalDate, FormatCategory, FormatLocation, GetTypeRouteFormCategory} from "@/service/utils";
import Link from "next/link";
import Image from 'next/image';

interface SearchResultCardProps{
    id:string
    resource :string
    title:string
    state:string
    category:string
    actors:string[]
    directors:string[]
    location:string
    language:string
    releaseYear:number
    updateTime:string
    introduction:string
}

const SearchResultCard:React.FC<SearchResultCardProps>=({id,resource,title,state,category,actors,directors,location,language,releaseYear,updateTime,introduction})=>{
    const [loadError,setLoadError]=useState(false);
    return(
        <div className={"flex flex-1 p-1 justify-start hover:bg-normal-color hover:bg-opacity-10"}>
            <div className={"w-full relative flex flex-row m-1 group"}>
                <Link href={"/resource/"+id} className={"w-1/4"}>
                    <Image width={200} height={250} src={loadError?"/icon.png":resource} onError={()=>{setLoadError(true)}} alt={"image"} className={"shadow-lg bg-white rounded-lg w-full h-full"}></Image>
                    <div className="absolute bottom-0 text-reverse-color p-2 text-sm">
                        {state}
                    </div>
                </Link>
                <div className={"w-3/4 ml-5"}>
                    <div className={"flex flex-row p-2 items-center"}>
                        <Link href={"/resource/"+id} className={"text-md lg:text-xl lg:font-bold text-normal-color hover:text-primary-color truncate"}>{title}</Link>
                        <p className={"text-sm text-plain-color ml-10"}>{state}</p>
                    </div>
                    <div className={"lg:flex flex-row p-2 hidden"}>
                        <p className={"text-plain-color text-md"}>狀態&nbsp;:&nbsp;</p>
                        <p className={"text-md text-normal-color"}>{state}</p>
                    </div>
                    <div className={"flex flex-row p-2 pt-0 lg:pt-2"}>
                        <p className={"text-plain-color text-md hidden lg:block"}>類型&nbsp;:&nbsp;</p>
                        <Link href={GetTypeRouteFormCategory(category)+"?"+"category="+category} className={"text-md hover:text-primary-color text-normal-color"}>{FormatCategory(category)}</Link>
                    </div>
                    <div className={"flex flex-row p-2 pt-0 lg:pt-2"}>
                        <p className={"text-plain-color text-md hidden lg:block"}>主演&nbsp;:&nbsp;</p>
                        <div className={"flex flex-row truncate overflow-ellipsis"}>
                            {actors.map((item,index)=>{
                                return <Link href={"/resource/search/celebrity"+"?"+"content="+item} key={index} className={"mr-3 text-md text-normal-color truncate hover:text-primary-color"}>{item}</Link>
                            })}
                        </div>
                    </div>
                    <div className={"lg:flex flex-row p-2 hidden"}>
                        <div className={"flex flex-1 flex-row"}>
                            <p className={"text-plain-color text-md"}>導演&nbsp;:&nbsp;</p>
                            <div className={"flex flex-row truncate overflow-ellipsis"}>
                                {directors.map((item,index)=>{
                                    return <Link href={"/resource/search/celebrity"+"?"+"content="+item} key={index} className={"text-md text-normal-color truncate hover:text-primary-color"}>{item}</Link>
                                })}
                            </div>
                        </div>
                        <div className={"flex flex-1 flex-row"}>
                            <p className={"text-plain-color text-md"}>國家/地區&nbsp;:&nbsp;</p>
                            <p className={"text-md text-normal-color"}>{FormatLocation(location)}</p>
                        </div>
                    </div>
                    <div className={"lg:flex flex-row p-2 hidden"}>
                        <div className={"flex flex-1 flex-row"}>
                            <p className={"text-plain-color text-md"}>語言/字幕&nbsp;:&nbsp;</p>
                            <p className={"text-md text-normal-color truncate"}>{language}</p>
                        </div>
                        <div className={"flex flex-1 flex-row"}>
                            <p className={"text-plain-color text-md"}>年代&nbsp;:&nbsp;</p>
                            <p className={"text-md text-normal-color"}>{releaseYear}</p>
                        </div>
                    </div>
                    <div className={"lg:flex flex-row p-2 hidden"}>
                        <p className={"text-plain-color text-md"}>更新時間&nbsp;:&nbsp;</p>
                        <p className={"text-md text-normal-color"}>{ConvertUTCDateToLocalDate(updateTime)}</p>
                    </div>
                    <div className={"lg:flex flex-row p-2 hidden"}>
                        <p className={"text-plain-color text-md"}>詳細介紹&nbsp;:&nbsp;</p>
                        <p className={"text-plain-color text-md truncate"}>{introduction}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SearchResultCard;
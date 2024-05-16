import React, {useEffect, useState} from "react";
import "@/app/globals.css"
import {GetRankedFilms} from "@/service/get_ranked_films";
import {ResponseFilmsRanked} from "@/model/repsonse/films_ranked";
import {FormatCategory} from "@/service/utils";
import Link from "next/link";

interface RankingListProps{
    service_url:string
    base_url:string
    category:string
}

const RankingList:React.FC<RankingListProps>=({service_url,base_url,category})=>{
    const [filmRanked,setFilmRanked] =useState<ResponseFilmsRanked>()
    useEffect(() => {
        GetRankedFilms(service_url,category).then((r)=>setFilmRanked(r!))
    }, [base_url, category, service_url]);
    return (
        <div className={"flex flex-col pr-3 pb-3"}>
            <div className={"items-center flex flex-row justify-between"}>
                <p className={"font-bold text-normal-color text-lg"}>{FormatCategory(category)}</p>
                <Link href={base_url+"?"+"category="+category} className={"text-sm text-plain-color hover:text-primary-color font-bold"}>更多</Link>
            </div>
            {filmRanked?.ranked_films.map((item,index)=>{
                return (
                    <div className={"mt-2.5"} key={index}>
                        <div className={"flex flex-row justify-between items-center"}>
                            <Link href={"/resource/"+item.id} className={"mr-2.5 overflow-hidden truncate flex items-center text-normal-color hover:text-primary-color"}>
                                {index+1<=3?
                                    <p className={"p-0.5 pl-4 pr-3 rounded-l-xl text-sm bg-primary-color text-reverse-color"}>{index+1}</p>:
                                    <p className={"p-0.5 pl-4 pr-3 rounded-l-xl text-sm bg-reverse-color text-normal-color"}>{index+1}</p>
                                }
                                <p className={"truncate ml-2.5 text-sm"}>{item.title}</p>
                            </Link>
                            <p className={"text-end text-opacity-50 text-plain-color"}>{item.popularity}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default RankingList
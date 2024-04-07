import React, {useEffect, useState} from "react";
import "@/app/globals.css"
import {GetRankedFilms} from "@/service/get_ranked_films";
import {ResponseFilmsRanked} from "@/model/repsonse/films_ranked";
import {FormatCategory} from "@/service/utils";
import Link from "next/link";
import {GetFilmInformation} from "@/service/get_film_information";
import Sub_title from "@/components/sub_title";
import Image from 'next/image';

interface RankingSideListProps{
    base_url:string
    category:string
}

const RankingSideList:React.FC<RankingSideListProps>=({base_url,category})=>{
    const [filmRanked,setFilmRanked] =useState<ResponseFilmsRanked>()
    const [firstFilmInformation,setFirstFilmInformation]=useState<ResponseFilmInformation>()
    const [loadError,setLoadError]=useState(false)
    useEffect(() => {
        GetRankedFilms(category).then((r)=>{
            setFilmRanked(r!);
            GetFilmInformation(r!.ranked_films[0].id).then((fr)=>setFirstFilmInformation(fr!))
        })

    }, [base_url,category]);
    return (
        <div className={"flex flex-col pr-3 pb-3"}>
            <Sub_title title={FormatCategory(category)+"排行榜"}></Sub_title>
            {firstFilmInformation!==undefined &&(
                <div className={"relative mt-2.5 flex justify-between"}>
                    <p className={"absolute pl-2 pr-2 p-1 rounded-tl-lg text-sm bg-primary-color text-reverse-color z-30"}>{1}</p>
                    <Link href={"resource/"+firstFilmInformation.id} className={"w-1/2 relative"}>
                        <Image width={200} height={250} src={loadError?"/icon.png":firstFilmInformation.resource} alt={"image"} className={"bg-reverse-color shadow-lg rounded-lg w-full h-full"} onError={()=>{setLoadError(true)}}></Image>
                        <div className="absolute bottom-0 right-0 text-reverse-color p-1 text-sm">
                            {firstFilmInformation.state}
                        </div>
                    </Link>
                    <div className={"truncate text-sm text-normal-color items-start w-1/2 pl-3"}>
                        <p className={"text-lg font-bold"}>{firstFilmInformation.title}</p>
                        <p className={"mt-3"}>{firstFilmInformation.actors.join(",")}</p>
                        <p className={"mt-1"}>{firstFilmInformation.state}</p>
                    </div>

                </div>
            )}

            {filmRanked?.ranked_films.map((item,index)=>{
                if (index===0){
                    return
                }
                return (
                    <div className={"mt-2.5"} key={index}>
                        <div className={"flex flex-row justify-between items-center"}>
                            <Link href={"/resource/"+item.id} className={"flex flex-1 items-center text-normal-color hover:text-primary-color"}>
                                {index+1<=3?
                                    <p className={"p-0.5 pl-4 pr-3 rounded-l-xl text-sm bg-primary-color text-reverse-color"}>{index+1}</p>:
                                    <p className={"p-0.5 pl-4 pr-3 rounded-l-xl text-sm bg-reverse-color text-normal-color"}>{index+1}</p>
                                }
                                <p className={"ml-3 text-sm"}>{item.title}</p>
                            </Link>
                            <p className={"flex-1 text-end text-opacity-50 text-plain-color"}>{item.popularity}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default RankingSideList
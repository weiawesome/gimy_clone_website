'use client'
import React, {useEffect, useState} from "react";
import "@/app/globals.css"
import {GetFilmRoutesInformation} from "@/service/get_film_information";
import Link from "next/link";
interface EditEpisodeButtonProps {
    film_id:string|string[]|undefined
    film_route:string|string[]|undefined
    episode:string|string[]|undefined
}

const EditEpisodeButton: React.FC<EditEpisodeButtonProps> = ({ film_id,film_route,episode }) => {
    const [prevEpisode,setPrevEpisode]=useState("/resource/"+film_id+"/"+film_route+"?episode="+episode)
    const [nextEpisode,setNextEpisode]=useState("/resource/"+film_id+"/"+film_route+"?episode="+episode)
    useEffect(() => {
        if (film_id===undefined || film_route===undefined || episode===undefined){
            return
        }
        GetFilmRoutesInformation(String(film_id)).then((r)=>{
            let rIndex=r!.film_routes.findIndex((value)=>{return value.route===film_route})
            let result=r!.film_routes[rIndex]!.episodes.indexOf(String(episode))
            if (result>0){
                setPrevEpisode("/resource/"+film_id+"/"+film_route+"?episode="+r!.film_routes[rIndex].episodes[result-1])
            }
            if (result<r!.film_routes[rIndex].episodes.length-1){
                setNextEpisode("/resource/"+film_id+"/"+film_route+"?episode="+r!.film_routes[rIndex].episodes[result+1])
            }
        })
    }, [episode, film_id, film_route]);
    return (
        <div className={"flex flex-row justify-evenly m-3 rounded-lg font-bold to-100% text-normal-color"}>
            <Link href={prevEpisode} className={"flex-1 text-center p-1 rounded transition duration-300 ease-in-out hover:bg-primary-color hover:text-reverse-color"}>上一集</Link>
            <Link href={nextEpisode} className={"flex-1 text-center p-1 rounded transition duration-300 ease-in-out hover:bg-primary-color hover:text-reverse-color"}>下一集</Link>
        </div>
    );

}

export default EditEpisodeButton;
import Link from "next/link";
import React from "react";
import "@/app/globals.css"

interface EpisodeProps{
    film_id:string
    film_route:string
    episode:string
    choose:boolean
}

const Episode:React.FC<EpisodeProps>=({film_id,film_route,episode,choose})=>{
    if (choose){
        return (
            <Link href={"/resource/"+film_id+"/"+film_route+"?episode="+episode} className={"text-center text-sm flex-1 p-1 shadow rounded bg-primary-color text-reverse-color"}>
                {episode}
            </Link>
        )
    }
    return (
        <Link href={"/resource/"+film_id+"/"+film_route+"?episode="+episode} className={"text-center text-sm flex-1 p-1 bg-reverse-color text-normal-color shadow rounded transition duration-300 ease-in-out hover:bg-primary-color hover:text-reverse-color"}>
            {episode}
        </Link>
    )
}
export default Episode
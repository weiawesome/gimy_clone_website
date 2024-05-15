import React from "react";
import Sub_title from "@/components/sub_title";
import Episode from "@/components/episode";
import "@/app/globals.css"

interface FilmRoutesInformationProps{
    film_id:string
    information:ResponseFilmRoutesInformation
    chose_state:boolean
    chosen_film_route:string
    chosen_episode:string
}
const FilmRoutesInformation:React.FC<FilmRoutesInformationProps>=({film_id,information,chose_state,chosen_film_route,chosen_episode})=>{
    return (
        <div className={"pl-2 pr-2"}>
            {information!==undefined && information.film_routes.map((item, index)=>{
                return(
                    <div key={index} className={"mb-8"}>
                        <Sub_title title={item.route}></Sub_title>
                        <div className={"grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4"}>
                            {item.episodes.map((episode,episodeIndex)=>{
                                return(
                                    <Episode key={episodeIndex} film_id={film_id} film_route={item.route} episode={episode} choose={chose_state && item.route===chosen_film_route && episode===chosen_episode}></Episode>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default FilmRoutesInformation
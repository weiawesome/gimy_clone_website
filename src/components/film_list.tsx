import React from "react";
import FilmCard from "@/components/film_card";
import "@/app/globals.css"
export interface FilmListProps{
    list:ResponseFilmList
}

const FilmList:React.FC<FilmListProps>=({list})=>{
    return (
        <div className={"grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"}>
            {list?.films.map((item,index)=>{
                return (
                    <FilmCard key={index} id={item.id} resource={item.resource} state={item.state} title={item.title} actors={item.actors}></FilmCard>
                )
            })}
        </div>
    )
}
export default FilmList
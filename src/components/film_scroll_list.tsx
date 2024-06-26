import React from "react";
import FilmCard from "@/components/film_card";
import "@/app/globals.css"

interface FilmScrollListProps{
    list:ResponseFilmList
}

const FilmScrollList:React.FC<FilmScrollListProps>=({list})=>{
    return (
        <div className={"w-full h-auto overflow-y-hidden flex overflow-x-scroll flex-row"}>
            {list?.films.map((item,index)=>{
                return (
                    <div className={"max-w-44 min-w-44 mr-5"} key={index}>
                        <FilmCard id={item.id} resource={item.resource} state={item.state} title={item.title} actors={item.actors}></FilmCard>
                    </div>
                )
            })}
        </div>
    )
}
export default FilmScrollList
import React, {useEffect, useState} from "react";
import {GetPopularCategoryFilms, GetPopularTypeFilms} from "@/service/get_popular_films";
import FilmCard from "@/components/film_card";
import {QueryMode} from "@/data/category"
import "@/app/globals.css"
import {GetRecommendFilms} from "@/service/get_recommend_films";
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
import React, {useEffect, useState} from "react";
import {GetPopularCategoryFilms, GetPopularTypeFilms} from "@/service/get_popular_films";
import FilmCard from "@/components/film_card";
import {QueryMode} from "@/data/category"
import "@/app/globals.css"
import {GetRecommendFilms} from "@/service/get_recommend_films";
interface FilmListProps{
    query_mode:string
    value:string
}

const FilmList:React.FC<FilmListProps>=({query_mode,value})=>{
    const [films,setFilms]=useState<ResponseFilmList>();
    useEffect(() => {
        if (query_mode===QueryMode.TYPE){
            GetPopularTypeFilms(value).then(r => setFilms(r!))
        } else if (query_mode===QueryMode.CATEGORY){
            GetPopularCategoryFilms(value).then(r => setFilms(r!))
        } else if(query_mode===QueryMode.RECOMMEND){
            GetRecommendFilms().then(r=>setFilms(r!))
        }
    }, [query_mode,value]);
    return (
        <div className={"grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"}>
            {films?.films.map((item,index)=>{
                return (
                    <FilmCard key={index} id={item.id} resource={item.resource} state={item.state} title={item.title} actors={item.actors}></FilmCard>
                )
            })}
        </div>
    )
}
export default FilmList
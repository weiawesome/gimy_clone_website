import React, {useEffect, useState} from "react";
import {GetPopularCategoryFilms, GetPopularTypeFilms} from "@/service/get_popular_films";
import FilmCard from "@/components/film_card";
import {QueryMode} from "@/data/category"
import "@/app/globals.css"
import {GetRecommendFilms} from "@/service/get_recommend_films";
interface FilmScrollListProps{
    query_mode:string
    value:string|undefined
}

const FilmScrollList:React.FC<FilmScrollListProps>=({query_mode,value})=>{
    const [films,setFilms]=useState<ResponseFilmList>();
    useEffect(() => {
        if (query_mode===QueryMode.TYPE){
            GetPopularTypeFilms(value!).then(r => setFilms(r!))
        } else if (query_mode===QueryMode.CATEGORY){
            GetPopularCategoryFilms(value!).then(r => setFilms(r!))
        } else if(query_mode===QueryMode.RECOMMEND){
            GetRecommendFilms().then(r=>setFilms(r!))
        }
    }, [query_mode,value]);
    return (
        <div className={"w-full h-auto overflow-y-hidden flex overflow-x-scroll flex-row"}>
            {films?.films.map((item,index)=>{
                return (
                    <div className={"max-w-52 min-w-40 h-auto"} key={index}>
                        <div className={"mr-5"}>
                            <FilmCard id={item.id} resource={item.resource} state={item.state} title={item.title} actors={item.actors}></FilmCard>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default FilmScrollList
import React, {useEffect, useState} from "react";
import "@/app/globals.css"
import FilmCard from "@/components/film_card";
import {GetFilterFilms} from "@/service/get_filter_films";

interface FilterContentProps{
    film_type:string
    category:string|string[]|undefined
    location:string|string[]|undefined
    release_year:string|string[]|undefined
    order_type:string
    page:number
}

const FilterContent:React.FC<FilterContentProps>=({film_type,category,location,release_year,order_type,page})=>{
    const [films,setFilms]=useState<ResponseFilmList>()
    useEffect(() => {
        GetFilterFilms(film_type,category,location,release_year,order_type,page).then(r=>setFilms(r!))
    }, [category, film_type, location, order_type, page, release_year]);
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
export default FilterContent
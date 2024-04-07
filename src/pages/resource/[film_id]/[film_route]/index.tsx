"use client"
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import TitleBar from "@/components/title_bar";
import {config} from "@/service/config"
import ScrollToTopButton from "@/components/scroll_to_top_button";
import "@/app/globals.css"
import {GetFilmInformation} from "@/service/get_film_information";
import FilmRoutesInformation from "@/components/film_routes_information";
import HLSVideoPlayer from "@/components/HLSVideoPlayer";
import EditEpisodeButton from "@/components/edit_episode_button";
import FilmFullInformation from "@/components/film_full_information";
import Footer from "@/components/footer";
import {CategoryMapping} from "@/data/category";
import AdInformation from "@/components/ad_information";
import {AdType} from "@/model/repsonse/ad_information";

const FilmResourcePage:React.FC=()=>{
    const router = useRouter();
    const { film_id,film_route,episode } = router.query;
    const [filmInformation,setFilmInformation]=useState<ResponseFilmInformation>()

    useEffect(() => {
        GetFilmInformation(String(film_id)).then(r => setFilmInformation(r!))
    }, [film_id,film_route,episode]);

    return (
        <main>
            <TitleBar index={filmInformation===undefined ? CategoryMapping.ALL_CATEGORY.index:
                filmInformation!.category in CategoryMapping?
                // @ts-ignore
                CategoryMapping[filmInformation!.category].index:CategoryMapping.ALL_CATEGORY.index
            }></TitleBar>
            <ScrollToTopButton></ScrollToTopButton>
            <div className={"bg-center items-center"}>
                <HLSVideoPlayer src={config.SERVICE_URL+config.ROUTE_MEDIA_LIST+film_route+"/"+film_id+"/"+episode} prepare={film_route!==undefined && film_id!==undefined && episode!==undefined}/>
                <EditEpisodeButton film_id={film_id} film_route={film_route} episode={episode}></EditEpisodeButton>
            </div>
            <FilmFullInformation film_route={String(film_route)} episode={String(episode)} filmInformation={filmInformation!}></FilmFullInformation>
            <AdInformation adType={AdType.WEB_BAR}></AdInformation>
            <FilmRoutesInformation chose_state={true} chosen_film_route={String(film_route)} chosen_episode={String(episode)} film_id={String(film_id)}></FilmRoutesInformation>
            <Footer></Footer>
        </main>
    )
}
export default FilmResourcePage
"use client"
import React from "react";
import TitleBar from "@/components/title_bar";
import {config} from "@/service/config"
import ScrollToTopButton from "@/components/scroll_to_top_button";
import "@/app/globals.css"
import {GetFilmInformation, GetFilmRoutesInformation} from "@/service/get_film_information";
import FilmRoutesInformation from "@/components/film_routes_information";
import HLSVideoPlayer from "@/components/HLSVideoPlayer";
import EditEpisodeButton from "@/components/edit_episode_button";
import FilmFullInformation from "@/components/film_full_information";
import Footer from "@/components/footer";
import {CategoryMapping} from "@/data/category";
import AdInformation from "@/components/ad_information";
import {AdType} from "@/model/repsonse/ad_information";
import Head from "next/head";
import {GetServerSideProps} from "next";

export interface FilmResourceInformationProps{
    film_id:string
    film_route:string
    episode:string
    serviceUrl:string
    filmInformation:ResponseFilmInformation
    filmRoutesInformation:ResponseFilmRoutesInformation
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { query } = context;
    const film_id = query.film_id;
    const film_route = query.film_route;
    const episode = query.episode;
    if(typeof film_id!=='string' || typeof film_route!=='string' || typeof episode!=='string'){
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    const filmInformation=await GetFilmInformation(film_id)
    const filmRoutesInformation=await GetFilmRoutesInformation(film_id)
    const serviceUrl=config.API_SERVICE_URL;
    return {props:{film_id,film_route,episode,serviceUrl,filmInformation,filmRoutesInformation}};
};

const FilmResourcePage:React.FC<FilmResourceInformationProps>=({film_id,film_route,episode,serviceUrl,filmInformation,filmRoutesInformation})=>{
    return (
        <main>
            <Head>
                <title>{filmInformation.title}線上看 {episode} - Wei-Gimy 維劇迷</title>
            </Head>
            <TitleBar index={
                filmInformation.category in CategoryMapping?
                // @ts-ignore
                CategoryMapping[filmInformation.category].index:CategoryMapping.ALL_CATEGORY.index
            }></TitleBar>
            <ScrollToTopButton></ScrollToTopButton>
            <div className={"bg-center items-center"}>
                <HLSVideoPlayer src={serviceUrl+config.ROUTE_MEDIA_LIST+film_route+"/"+film_id+"/"+episode}/>
                <EditEpisodeButton film_id={film_id} film_route={film_route} episode={episode}></EditEpisodeButton>
            </div>
            <FilmFullInformation film_route={film_route} episode={episode} filmInformation={filmInformation}></FilmFullInformation>
            <AdInformation adType={AdType.WEB_BAR} service_url={serviceUrl}></AdInformation>
            <FilmRoutesInformation chose_state={true} chosen_film_route={film_route} chosen_episode={episode} film_id={film_id} information={filmRoutesInformation}></FilmRoutesInformation>
            <Footer></Footer>
        </main>
    )
}
export default FilmResourcePage
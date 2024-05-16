import React from "react";
import TitleBar from "@/components/title_bar";
import ScrollToTopButton from "@/components/scroll_to_top_button";
import FilmInformation from "@/components/film_information";
import {GetFilmInformation, GetFilmRoutesInformation} from "@/service/get_film_information";
import FilmRoutesInformation from "@/components/film_routes_information";
import "@/app/globals.css"
import Sub_title from "@/components/sub_title";
import {AllCategory, CategoryMapping} from "@/data/category";
import {FormatCategory, GetTypeRouteFormCategory, GetTypeValueFormCategory} from "@/service/utils";
import FilmScrollList from "@/components/film_scroll_list";
import Footer from "@/components/footer";
import AdInformation from "@/components/ad_information";
import {AdType} from "@/model/repsonse/ad_information";
import RankingSideList from "@/components/ranking_side_list";
import Head from "next/head";
import {GetServerSideProps} from "next";
import {config} from "@/service/config";
import {GetRecommendFilms} from "@/service/get_recommend_films";
import {GetPopularCategoryFilms} from "@/service/get_popular_films";

interface FilmInformationProps{
    film_id:string
    serviceUrl:string
    filmInformation:ResponseFilmInformation
    filmRoutesInformation:ResponseFilmRoutesInformation
    categoryFilmList:ResponseFilmList
    homeFilmList:ResponseFilmList
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { query } = context;
    const film_id = query.film_id;
    if(typeof film_id!=='string'){
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    const filmInformation=await GetFilmInformation(film_id)
    const filmRoutesInformation=await GetFilmRoutesInformation(film_id)
    const categoryFilmList=await GetPopularCategoryFilms(filmInformation!.category);
    const homeFilmList=await GetRecommendFilms();
    if (filmInformation===undefined || filmRoutesInformation===undefined || categoryFilmList===undefined || homeFilmList===undefined){
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    const serviceUrl=config.API_SERVICE_URL
    return {props:{film_id,serviceUrl,filmInformation,filmRoutesInformation,categoryFilmList,homeFilmList}};
};
const FilmInformationPage:React.FC<FilmInformationProps>=({film_id,serviceUrl,filmInformation,filmRoutesInformation,categoryFilmList,homeFilmList})=>{

    return (
        <main>
            <Head>
                <title>{filmInformation.title}線上看 - {GetTypeValueFormCategory(filmInformation?.category)} - Wei-Gimy 維劇迷</title>
            </Head>
            <TitleBar index={
                filmInformation.category in CategoryMapping?
                // @ts-ignore
                CategoryMapping[filmInformation.category].index:CategoryMapping.ALL_CATEGORY.index
            }></TitleBar>
            <ScrollToTopButton></ScrollToTopButton>
            <FilmInformation film_id={film_id} filmRoutesInformation={filmRoutesInformation} filmInformation={filmInformation!} ></FilmInformation>
            <div className={"flex justify-between"}>
                <div className={"flex w-full flex-col lg:w-2/3"}>
                    <FilmRoutesInformation chose_state={false} chosen_film_route={""} chosen_episode={""} film_id={film_id} information={filmRoutesInformation}></FilmRoutesInformation>
                    <AdInformation adType={AdType.WEB_BAR} service_url={serviceUrl}></AdInformation>
                    <div className={"w-full m-3"}>
                        <p className={"text-normal-color font-bold text-md"}>劇情介紹</p>
                        <p className={"text-sm text-normal-color"}>{filmInformation?.introduction}</p>
                    </div>
                    <div className={"mt-5 w-full h-auto"}>
                        <Sub_title title={"熱播"+FormatCategory(filmInformation?.category)}></Sub_title>
                        <FilmScrollList list={categoryFilmList}></FilmScrollList>
                    </div>
                    <div className={"mt-5 w-full h-auto"}>
                        <Sub_title title={"熱門推薦"}></Sub_title>
                        <FilmScrollList list={homeFilmList}></FilmScrollList>
                    </div>
                </div>
                <div className={"hidden pl-10 lg:flex w-1/3 flex-col"}>
                    <AdInformation adType={AdType.WEB} service_url={serviceUrl}></AdInformation>
                    <RankingSideList service_url={serviceUrl} base_url={GetTypeRouteFormCategory(filmInformation?.category)} category={filmInformation===undefined?AllCategory.QUERY_CATEGORY:filmInformation.category}></RankingSideList>
                    <AdInformation adType={AdType.WEB_CORNER} service_url={serviceUrl}></AdInformation>
                </div>
            </div>
            <Footer></Footer>
        </main>
    )
}
export default FilmInformationPage
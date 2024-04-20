import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import TitleBar from "@/components/title_bar";
import ScrollToTopButton from "@/components/scroll_to_top_button";
import FilmInformation from "@/components/film_information";
import {GetFilmInformation} from "@/service/get_film_information";
import FilmRoutesInformation from "@/components/film_routes_information";
import "@/app/globals.css"
import Sub_title from "@/components/sub_title";
import {AllCategory, CategoryMapping, QueryMode} from "@/data/category";
import {FormatCategory, GetTypeRouteFormCategory, GetTypeValueFormCategory} from "@/service/utils";
import FilmScrollList from "@/components/film_scroll_list";
import Footer from "@/components/footer";
import AdInformation from "@/components/ad_information";
import {AdType} from "@/model/repsonse/ad_information";
import RankingSideList from "@/components/ranking_side_list";
import Head from "next/head";

const FilmInformationPage:React.FC=()=>{
    const router = useRouter();
    const { film_id } = router.query;
    const [filmInformation,setFilmInformation]=useState<ResponseFilmInformation>()

    useEffect(() => {
        GetFilmInformation(String(film_id)).then(r => setFilmInformation(r!))
    }, [film_id]);

    return (
        <main>
            <Head>
                <title>{filmInformation?.title}線上看 - {GetTypeValueFormCategory(filmInformation?.category)} - Wei-Gimy 維劇迷</title>
            </Head>
            <TitleBar index={filmInformation===undefined ? CategoryMapping.ALL_CATEGORY.index:
                filmInformation!.category in CategoryMapping?
                // @ts-ignore
                CategoryMapping[filmInformation!.category].index:CategoryMapping.ALL_CATEGORY.index
            }></TitleBar>
            <ScrollToTopButton></ScrollToTopButton>
            <FilmInformation filmInformation={filmInformation!}></FilmInformation>
            <div className={"flex justify-between"}>
                <div className={"flex w-full flex-col lg:w-2/3"}>
                    <FilmRoutesInformation chose_state={false} chosen_film_route={""} chosen_episode={""} film_id={String(film_id)}></FilmRoutesInformation>
                    <AdInformation adType={AdType.WEB_BAR}></AdInformation>
                    <div className={"w-full m-3"}>
                        <p className={"text-normal-color font-bold text-md"}>劇情介紹</p>
                        <p className={"text-sm text-normal-color"}>{filmInformation?.introduction}</p>
                    </div>
                    <div className={"mt-5 w-full h-auto"}>
                        <Sub_title title={"熱播"+FormatCategory(filmInformation?.category)}></Sub_title>
                        <FilmScrollList query_mode={QueryMode.CATEGORY} value={filmInformation?.category}></FilmScrollList>
                    </div>
                    <div className={"mt-5 w-full h-auto"}>
                        <Sub_title title={"熱門推薦"}></Sub_title>
                        <FilmScrollList query_mode={QueryMode.RECOMMEND} value={""}></FilmScrollList>
                    </div>
                </div>
                <div className={"hidden pl-10 lg:flex w-1/3 flex-col"}>
                    <AdInformation adType={AdType.WEB}></AdInformation>
                    <RankingSideList base_url={GetTypeRouteFormCategory(filmInformation?.category)} category={filmInformation===undefined?AllCategory.QUERY_CATEGORY:filmInformation.category}></RankingSideList>
                    <AdInformation adType={AdType.WEB_CORNER}></AdInformation>
                </div>
            </div>
            <Footer></Footer>
        </main>
    )
}
export default FilmInformationPage
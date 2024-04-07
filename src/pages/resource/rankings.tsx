import React from "react";
import TitleBar from "@/components/title_bar";
import ScrollToTopButton from "@/components/scroll_to_top_button";
import {
    AnimateTypeInformation,
    MovieTypeInformation,
    RankingsTypeInformation,
    TvSeriesTypeInformation
} from "@/data/type"
import "@/app/globals.css"
import Footer from "@/components/footer";
import RankingList from "@/components/ranking_list";
import {
    AnimateAnimate, MovieDrama,TvSeriesHKSeries,
    TvSeriesJPSeries, TvSeriesKRSeries, TvSeriesTWSeries, TvSeriesUSSeries
} from "@/data/category";
const RankingsPage:React.FC=()=>{
    return (
        <main>
            <TitleBar index={RankingsTypeInformation.index}></TitleBar>
            <ScrollToTopButton></ScrollToTopButton>
            <p className={"text-center text-normal-color font-bold text-3xl mt-5 mb-10"}>本週維劇迷排行</p>
            <div className={"grid grid-cols-1 lg:grid-cols-3 gap-4"}>
                <RankingList base_url={AnimateTypeInformation.route} category={AnimateAnimate.QUERY_CATEGORY}></RankingList>
                <RankingList base_url={TvSeriesTypeInformation.route} category={TvSeriesKRSeries.QUERY_CATEGORY}></RankingList>
                <RankingList base_url={TvSeriesTypeInformation.route} category={TvSeriesUSSeries.QUERY_CATEGORY}></RankingList>
                <RankingList base_url={TvSeriesTypeInformation.route} category={TvSeriesJPSeries.QUERY_CATEGORY}></RankingList>
                <RankingList base_url={TvSeriesTypeInformation.route} category={TvSeriesTWSeries.QUERY_CATEGORY}></RankingList>
                <RankingList base_url={TvSeriesTypeInformation.route} category={TvSeriesHKSeries.QUERY_CATEGORY}></RankingList>
                <RankingList base_url={AnimateTypeInformation.route} category={AnimateAnimate.QUERY_CATEGORY}></RankingList>
                <RankingList base_url={MovieTypeInformation.route} category={MovieDrama.QUERY_CATEGORY}></RankingList>
            </div>
            <Footer></Footer>
        </main>
    )
}

export default RankingsPage
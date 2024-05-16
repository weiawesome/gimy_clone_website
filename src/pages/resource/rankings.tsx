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
    AnimateAnimate, MovieDrama, TvSeriesHKSeries,
    TvSeriesJPSeries, TvSeriesKRSeries, TvSeriesTWSeries, TvSeriesUSSeries
} from "@/data/category";
import Head from "next/head";
import {GetServerSideProps} from "next";
import {config} from "@/service/config";
import {ClientServiceProps} from "@/data/utils";
export const getServerSideProps: GetServerSideProps = async () => {
    const serviceUrl=config.API_SERVICE_URL
    return {props: {serviceUrl}};
};
const RankingsPage:React.FC<ClientServiceProps>=({serviceUrl})=>{
    return (
        <main>
            <Head>
                <title>Wei-Gimy 維劇迷 每周排行榜</title>
            </Head>
            <TitleBar index={RankingsTypeInformation.index}></TitleBar>
            <ScrollToTopButton></ScrollToTopButton>
            <p className={"text-center text-normal-color font-bold text-3xl mt-5 mb-10"}>本週維劇迷排行</p>
            <div className={"grid grid-cols-1 lg:grid-cols-3 gap-4"}>
                <RankingList service_url={serviceUrl} base_url={AnimateTypeInformation.route} category={AnimateAnimate.QUERY_CATEGORY}></RankingList>
                <RankingList service_url={serviceUrl} base_url={TvSeriesTypeInformation.route} category={TvSeriesKRSeries.QUERY_CATEGORY}></RankingList>
                <RankingList service_url={serviceUrl} base_url={TvSeriesTypeInformation.route} category={TvSeriesUSSeries.QUERY_CATEGORY}></RankingList>
                <RankingList service_url={serviceUrl} base_url={TvSeriesTypeInformation.route} category={TvSeriesJPSeries.QUERY_CATEGORY}></RankingList>
                <RankingList service_url={serviceUrl} base_url={TvSeriesTypeInformation.route} category={TvSeriesTWSeries.QUERY_CATEGORY}></RankingList>
                <RankingList service_url={serviceUrl} base_url={TvSeriesTypeInformation.route} category={TvSeriesHKSeries.QUERY_CATEGORY}></RankingList>
                <RankingList service_url={serviceUrl} base_url={AnimateTypeInformation.route} category={AnimateAnimate.QUERY_CATEGORY}></RankingList>
                <RankingList service_url={serviceUrl} base_url={MovieTypeInformation.route} category={MovieDrama.QUERY_CATEGORY}></RankingList>
            </div>
            <Footer></Footer>
        </main>
    )
}

export default RankingsPage
import React, { useState } from "react";
import "@/app/globals.css"
import TitleBar from "@/components/title_bar";
import {VarietyShowsTypeInformation} from "@/data/type"
import {AllCategory, QueryMode, VarietyShowsCategory} from "@/data/category";
import Sub_title from "@/components/sub_title";
import ScrollToTopButton from "@/components/scroll_to_top_button";
import FilmList from "@/components/film_list";
import Footer from "@/components/footer";
import RightArrow from "@/svgs/right_arrow_black.svg";
import { useRouter } from "next/router";
import {OrderTypeList, OrderTypeUpdateTime } from "@/data/order_type";
import FilterContent from "@/components/filter_content";
import Link from "next/link";
import {AllLocation, VarietyShowsLocation} from "@/data/location";
import FilterBar from "@/components/filter_bar";
import Head from "next/head";
const VarietyShowsPage:React.FC=()=>{
    const router = useRouter();
    const { category,location,releaseYear,page } = router.query;
    const [orderType,setOrderType]=useState(OrderTypeUpdateTime.QUERY_ORDER_TYPE)
    return (
        <main>
            <Head>
                <title>{VarietyShowsTypeInformation.value}線上看首選 - Wei-Gimy 維劇迷</title>
            </Head>
            <TitleBar index={VarietyShowsTypeInformation.index}></TitleBar>
            <ScrollToTopButton></ScrollToTopButton>
            <FilterBar base_url={VarietyShowsTypeInformation.route} category={VarietyShowsCategory} chosen_category={category===undefined?AllCategory.QUERY_CATEGORY:String(category)} location={VarietyShowsLocation} chosen_location={location===undefined?AllLocation.QUERY_LOCATION:String(location)} releaseYear={releaseYear===undefined?"":String(releaseYear)}></FilterBar>
            <Sub_title title={"今日熱播"}></Sub_title>
            <FilmList query_mode={QueryMode.TYPE} value={VarietyShowsTypeInformation.QUERY_TYPE}></FilmList>
            { category===undefined && location===undefined && releaseYear===undefined &&(
                <div className={"mt-2 mb-2"}>
                    {VarietyShowsCategory.map((item,index)=>{
                        if (index===0){
                            return
                        }
                        return (
                            <div key={index}>
                                <div className={"w-full flex justify-between items-center"}>
                                    <Sub_title title={item.value}></Sub_title>
                                    <Link href={VarietyShowsTypeInformation.route+"?category="+item.QUERY_CATEGORY} className={"flex items-center text-sm hover:text-primary-color text-plain-color"}>
                                        <p className={"pr-1"}>更多</p>
                                        <RightArrow className={"h-5 w-5"}></RightArrow>
                                    </Link>
                                </div>
                                <FilmList query_mode={QueryMode.CATEGORY} value={item.QUERY_CATEGORY}></FilmList>
                            </div>
                        );
                    })}
                </div>
            )}

            { (category!==undefined || location!==undefined || releaseYear!==undefined) &&(
                <div className={"flex flex-col"}>
                    <div className={"border-b-4 mb-1 p-3"}>
                        {OrderTypeList.map((item,index)=>{
                            if (item.QUERY_ORDER_TYPE===orderType){
                                return (
                                    <button className={"mr-4 border-b-4 rounded text-md border-primary-color"} key={index}>{item.value}</button>
                                )
                            }
                            return (
                                <button className={"mr-4 rounded text-md transition-all duration-300 ease-in-out"}  key={index} onClick={()=>{setOrderType(item.QUERY_ORDER_TYPE)}}>{item.value}</button>
                            )
                        })}
                    </div>
                    <FilterContent film_type={VarietyShowsTypeInformation.QUERY_TYPE} category={category} location={location} release_year={releaseYear} order_type={orderType} page={page===undefined?1:Number(page)}></FilterContent>
                </div>
            )}
            <Footer></Footer>
        </main>
    )
}

export default VarietyShowsPage
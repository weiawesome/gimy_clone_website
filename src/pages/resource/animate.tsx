import React, {useState} from "react";
import "@/app/globals.css"
import TitleBar from "@/components/title_bar";
import SubTitle from "@/components/sub_title";
import {AnimateTypeInformation} from "@/data/type"
import {AllCategory,  AnimateCategory} from "@/data/category"
import ScrollToTopButton from "@/components/scroll_to_top_button";
import FilmList from "@/components/film_list";
import "@/app/globals.css"
import Footer from "@/components/footer";
import Sub_title from "@/components/sub_title";
import Link from "next/link";
import RightArrow from "@/svgs/right_arrow_black.svg";
import {OrderTypeList, OrderTypeUpdateTime} from "@/data/order_type";
import FilterContent from "@/components/filter_content";
import {useRouter} from "next/router";
import FilterBar from "@/components/filter_bar";
import {AllLocation, AnimateLocation} from "@/data/location";
import Head from "next/head";
import {GetServerSideProps} from 'next';
import {GetPopularCategoryFilms, GetPopularTypeFilms} from "@/service/get_popular_films";
import {AllFilmListProps, CategoryFilmList } from "@/data/utils";


export const getServerSideProps: GetServerSideProps = async () => {
    const  typeList= await GetPopularTypeFilms(AnimateTypeInformation.QUERY_TYPE)
    if (!typeList) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    let categoryList:CategoryFilmList[]=[]
    for (const item of AnimateCategory) {
        const list = await GetPopularCategoryFilms(item.QUERY_CATEGORY)
        if (!list) {
            return {
                redirect: {
                    destination: '/',
                        permanent
                :
                    false,
                }
            ,
            }
        }
        categoryList.push({Category:item,FilmList:list})
    }
    return {props: {typeList,categoryList}};
};
const AnimatePage:React.FC<AllFilmListProps>=({typeList,categoryList})=>{
    const router = useRouter();
    const { category,location,releaseYear,page } = router.query;
    const [orderType,setOrderType]=useState(OrderTypeUpdateTime.QUERY_ORDER_TYPE)
    return (
        <main>
            <Head>
                <title>{AnimateTypeInformation.value}線上看首選 - Wei-Gimy 維劇迷</title>
            </Head>
            <TitleBar index={AnimateTypeInformation.index}></TitleBar>
            <ScrollToTopButton></ScrollToTopButton>
            <FilterBar base_url={AnimateTypeInformation.route} category={AnimateCategory} chosen_category={category===undefined?AllCategory.QUERY_CATEGORY:String(category)} location={AnimateLocation} chosen_location={location===undefined?AllLocation.QUERY_LOCATION:String(location)} releaseYear={releaseYear===undefined?"":String(releaseYear)}></FilterBar>
            <SubTitle title={"今日熱播"}></SubTitle>
            {category===undefined ?
                <FilmList list={typeList}></FilmList>:
                categoryList.map((item,index)=>{
                    if (item.Category.QUERY_CATEGORY===category){
                        return(<FilmList list={item.FilmList} key={index}/>)
                    } else{
                        return
                    }
                })
            }

            { category===undefined && location===undefined && releaseYear===undefined &&(
                <div className={"mt-2 mb-2"}>
                    {categoryList.map((item: { Category: { value: string; QUERY_CATEGORY: string; }; FilmList: ResponseFilmList; }, index: React.Key | null | undefined)=>{
                        if (index===0){
                            return
                        }
                        return (
                            <div key={index}>
                                <div className={"w-full flex justify-between items-center"}>
                                    <Sub_title title={item.Category.value}></Sub_title>
                                    <Link href={AnimateTypeInformation.route+"?category="+item.Category.QUERY_CATEGORY} className={"flex items-center text-sm hover:text-primary-color text-plain-color"}>
                                        <p className={"pr-1"}>更多</p>
                                        <RightArrow className={"h-5 w-5"}></RightArrow>
                                    </Link>
                                </div>
                                <FilmList list={item.FilmList}></FilmList>
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
                    <FilterContent film_type={AnimateTypeInformation.QUERY_TYPE} category={category} location={location} release_year={releaseYear} order_type={orderType} page={page===undefined?1:Number(page)}></FilterContent>
                </div>
            )}
            <Footer></Footer>
        </main>
    )
}
export default AnimatePage
"use client"
import TitleBar from "@/components/title_bar";
import ScrollToTopButton from "@/components/scroll_to_top_button";
import Sub_title from "@/components/sub_title";
import Footer from '@/components/footer';
import {HomeTypeInformation, RankingsTypeInformation, TypeList} from "@/data/type";
import FilmList from "@/components/film_list";
import React from "react";
import Link from "next/link";
import RightArrow from "@/svgs/right_arrow_black.svg";
import {GetRecommendFilms} from "@/service/get_recommend_films";
import {HomeFilmListProps, TypeFilmList} from "@/data/utils";
import {GetPopularTypeFilms} from "@/service/get_popular_films";
import {GetServerSideProps} from 'next';
export const getServerSideProps: GetServerSideProps = async () => {
    const  homeList= await GetRecommendFilms()
    if (!homeList) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    let todayList:ResponseFilmList={films:[]}
    let typeList:TypeFilmList[]=[]
    for (const item of TypeList) {
        if (item===RankingsTypeInformation){
            break
        }
        const list = await GetPopularTypeFilms(item.QUERY_TYPE)
        if (!list) {
            return {
                redirect: {
                    destination: '/',
                    permanent
                        :
                        false,
                }
            }
        }
        if (item===HomeTypeInformation){
            todayList=list
        } else{
            typeList.push({FilmType:item,FilmList:list})
        }
    }
    return {props: {homeList,todayList,typeList}};
};
const App:React.FC<HomeFilmListProps>=({homeList,todayList,typeList})=> {
  return (
      <main>
          <TitleBar index={HomeTypeInformation.index}></TitleBar>
          <ScrollToTopButton></ScrollToTopButton>
          <FilmList list={homeList}></FilmList>

          <div className={"w-full flex justify-between items-center mt-2.5"}>
              <Sub_title title={"Wei-Gimy 維劇迷 今日熱播"}></Sub_title>
          </div>
          <FilmList list={todayList}></FilmList>

          {typeList.map((item,index)=>{
              if (item.FilmType===RankingsTypeInformation){
                  return
              }
              return (
                  <div key={index} className={"mt-2.5"}>
                      <div className={"w-full flex justify-between items-center"}>
                            <Sub_title title={"熱播"+item.FilmType.value}></Sub_title>
                            <Link href={item.FilmType.route} className={"flex items-center text-sm hover:text-primary-color text-plain-color"}>
                                  <p className={"pr-1"}>更多</p>
                                  <RightArrow className={"h-5 w-5"}></RightArrow>
                              </Link>
                      </div>
                      <FilmList list={item.FilmList}></FilmList>
                  </div>
              )
          })}
          <Footer></Footer>
      </main>
  );
}
export default App;

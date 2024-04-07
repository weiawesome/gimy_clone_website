"use client"
import TitleBar from "@/components/title_bar";
import ScrollToTopButton from "@/components/scroll_to_top_button";
import Sub_title from "@/components/sub_title";
import Footer from '@/components/footer';
import {HomeTypeInformation, TypeList} from "@/data/type";
import {QueryMode} from "@/data/category";
import FilmList from "@/components/film_list";
import React from "react";
import Link from "next/link";
import RightArrow from "@/svgs/right_arrow_black.svg";
function App() {
  return (
      <main>
          <TitleBar index={HomeTypeInformation.index}></TitleBar>
          <ScrollToTopButton></ScrollToTopButton>
          <FilmList query_mode={QueryMode.RECOMMEND} value={""}></FilmList>
          {TypeList.map((item,index)=>{
              return (
                  <div key={index}>
                      <div className={"w-full flex justify-between items-center"}>
                          <Sub_title title={index===0?"今日熱播":"熱播"+item.value}></Sub_title>
                          <Link href={item.route} className={"flex items-center text-sm hover:text-primary-color text-plain-color"}>
                              <p className={"pr-1"}>更多</p>
                              <RightArrow className={"h-5 w-5"}></RightArrow>
                          </Link>
                      </div>
                      <FilmList query_mode={QueryMode.TYPE} value={item.QUERY_TYPE}></FilmList>
                  </div>
              )
          })}
          <Footer></Footer>
      </main>
  );
}
export default App;

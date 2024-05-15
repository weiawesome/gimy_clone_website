import React from "react";
import "@/app/globals.css"
import TitleBar from "@/components/title_bar";
import {HomeTypeInformation} from "@/data/type"
import ScrollToTopButton from "@/components/scroll_to_top_button";
import "@/app/globals.css"
import Footer from "@/components/footer";
import SearchContent from "@/components/search_content";
import Head from "next/head";
import {GetServerSideProps} from "next";
import {GetSearchFilms} from "@/service/get_search_films";
import {ResponseFilmsSearch} from "@/model/repsonse/films_search";

interface SearchProps{
    content:string
    pageNumber:number
    search_celebrity:boolean
    searchResult:ResponseFilmsSearch
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { query } = context;
    const content = query.content;
    const page = query.page;
    const is_celebrity = query.is_celebrity;
    if(typeof content!=='string'){
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    const pageNumber:number=page===undefined?1:Number(page)
    const search_celebrity:boolean=is_celebrity===undefined?false:Boolean(is_celebrity)
    const searchResult=await GetSearchFilms(search_celebrity,content,pageNumber)
    if (!searchResult){
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    return {props:{content,pageNumber,search_celebrity,searchResult}};
};
const SearchContentPage:React.FC<SearchProps>=({content,pageNumber,search_celebrity,searchResult})=>{
    return (
        <main>
            <Head>
                <title>關鍵字: {content} - Wei-Gimy 維劇迷</title>
            </Head>
            <TitleBar index={HomeTypeInformation.index}></TitleBar>
            <ScrollToTopButton></ScrollToTopButton>
            <p className={"font-bold text-xl m-3 text-normal-color"}>搜尋關鍵字&nbsp;{content}</p>
            <SearchContent celebrity_search={search_celebrity} content={String(content)} pageNumber={pageNumber} searchResult={searchResult}></SearchContent>
            <Footer></Footer>
        </main>
    )
}

export default SearchContentPage
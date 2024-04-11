import React from "react";
import "@/app/globals.css"
import TitleBar from "@/components/title_bar";
import {HomeTypeInformation} from "@/data/type"
import ScrollToTopButton from "@/components/scroll_to_top_button";
import "@/app/globals.css"
import Footer from "@/components/footer";
import {useRouter} from "next/router";
import SearchContent from "@/components/search_content";
import Head from "next/head";
const SearchCelebrityPage:React.FC=()=>{
    const router=useRouter();
    const {content,page}=router.query
    return (
        <main>
            <Head>
                <title>關鍵字: {content} - Wei-Gimy 維劇迷</title>
            </Head>
            <TitleBar index={HomeTypeInformation.index}></TitleBar>
            <ScrollToTopButton></ScrollToTopButton>
            <p className={"font-bold text-xl m-3 text-normal-color"}>搜尋關鍵字&nbsp;{content}</p>
            <SearchContent celebrity_search={true} content={String(content)} page={page===undefined?1:Number(page)}></SearchContent>
            <Footer></Footer>
        </main>
    )
}

export default SearchCelebrityPage
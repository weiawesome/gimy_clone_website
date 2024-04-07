import React from "react";
import "@/app/globals.css"
import TitleBar from "@/components/title_bar";
import {HomeTypeInformation} from "@/data/type"
import ScrollToTopButton from "@/components/scroll_to_top_button";
import "@/app/globals.css"
import Footer from "@/components/footer";
import {useRouter} from "next/router";
import SearchContent from "@/components/search_content";
const SearchContentPage:React.FC=()=>{
    const router=useRouter();
    const {content,page}=router.query
    return (
        <main>
            <TitleBar index={HomeTypeInformation.index}></TitleBar>
            <ScrollToTopButton></ScrollToTopButton>
            <p className={"font-bold text-xl m-3 text-normal-color"}>搜尋關鍵字&nbsp;{content}</p>
            <SearchContent celebrity_search={false} content={String(content)} page={page===undefined?1:Number(page)}></SearchContent>
            <Footer></Footer>
        </main>
    )
}

export default SearchContentPage
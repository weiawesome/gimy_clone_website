import React from "react";
import "@/app/globals.css"
import SearchResultCard from "@/components/search_result_card";
import { ResponseFilmsSearch } from "@/model/repsonse/films_search";
import Link from "next/link";

interface SearchContentProps{
    celebrity_search:boolean
    content:string
    pageNumber:number
    searchResult:ResponseFilmsSearch
}

const SearchContent:React.FC<SearchContentProps>=({celebrity_search,content,pageNumber,searchResult})=>{
    return (
        <div className={"mb-5"}>
            {searchResult?.search_films.map((item,index)=>{
                return (
                    <SearchResultCard key={index} id={item.id} resource={item.resource} title={item.title} state={item.state} category={item.category} actors={item.actors} directors={item.directors} location={item.location} language={item.language} releaseYear={item.release_year} updateTime={item.update_time} introduction={item.introduction}></SearchResultCard>
                )
            })}
            <div className={"flex flex-row justify-evenly mt-10 mb-5"}>
                { pageNumber===1?
                    <div className={"bg-plain-color text-reverse-color pl-5 pr-5 pt-1 pb-1 rounded text-sm"}>上一頁</div>
                    :
                    <Link href={"/resource/search?is_celebrity="+celebrity_search+"&content="+content+"&page="+(pageNumber-1)} className={"bg-primary-color pl-5 pr-5 pt-1 pb-1 rounded text-reverse-color text-sm hover:font-bold"}>上一頁</Link>
                }
                <p>第&nbsp;{pageNumber}&nbsp;頁</p>
                {(searchResult===undefined || searchResult?.search_films.length===0) ?
                    <div className={"bg-plain-color text-reverse-color pl-5 pr-5 pt-1 pb-1 rounded text-sm"}>下一頁</div>
                    :
                    <Link href={"/resource/search?is_celebrity="+celebrity_search+"&content="+content+"&page="+(pageNumber+1)} className={"bg-primary-color pl-5 pr-5 pt-1 pb-1 rounded text-reverse-color text-sm hover:font-bold"}>下一頁</Link>
                }
            </div>
        </div>
    )
}
export default SearchContent
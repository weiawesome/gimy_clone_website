import React from "react";
import {AllCategory, Category} from "@/data/category"
import "@/data/location"
import "@/app/globals.css"
import {AllLocation, LocationInformation} from "@/data/location";
import Link from "next/link";

interface FilterBarProps{
    base_url:string
    category:Category[]
    chosen_category:string
    location:LocationInformation[]
    chosen_location:string
    releaseYear:string
}


const FilterBar:React.FC<FilterBarProps>=({base_url,category,chosen_category,location,chosen_location,releaseYear})=>{
    const year= Array.from({ length: 20 }, (_, i) => new Date().getFullYear()-i);

    const getUrl=(filter_category:string,filter_location:string,filter_year:string)=>{
        if (filter_category===AllCategory.QUERY_CATEGORY && filter_location===AllLocation.QUERY_LOCATION && filter_year===""){
            return base_url
        }
        let url=base_url+"?"
        if (filter_category!==AllCategory.QUERY_CATEGORY){
            url+="category="+filter_category+"&"
        }
        if (filter_location!==AllLocation.QUERY_LOCATION){
            url+="location="+filter_location+"&"
        }
        if (filter_year!==""){
            url+="releaseYear="+filter_year+"&"
        }
        return url.substring(0,url.length-1)
    }
    return (
        <div className={"m-5 mb-7"}>
            <div className={"overflow-x-scroll w-full flex flex-row text-sm"}>
                <div className={"text-plain-color text-md whitespace-nowrap mr-6"}>按分類</div>
                { category.map((item,index)=>{
                    const itemUrl=getUrl(item.QUERY_CATEGORY,chosen_location,releaseYear)
                    if (item.QUERY_CATEGORY===chosen_category){
                        return (
                            <Link href={itemUrl} key={index} className={"mr-3 whitespace-nowrap text-primary-color"}>{item.value}</Link>
                        )
                    }
                    return(
                        <Link href={itemUrl} key={index} className={"mr-3 whitespace-nowrap text-normal-color hover:text-primary-color"}>{item.value}</Link>
                    )
                })}
            </div>
            <div className={"overflow-x-scroll w-full flex flex-row text-sm mt-3.5"}>
                <div className={"text-plain-color text-md whitespace-nowrap mr-6"}>按地區</div>
                { location.map((item,index)=>{
                    const itemUrl=getUrl(chosen_category,item.QUERY_LOCATION,releaseYear)
                    if (item.QUERY_LOCATION===chosen_location){
                        return (
                            <Link href={itemUrl} key={index} className={"mr-3 whitespace-nowrap text-primary-color"}>{item.value}</Link>
                        )
                    }
                    return(
                        <Link href={itemUrl} key={index} className={"mr-3 whitespace-nowrap text-normal-color hover:text-primary-color"}>{item.value}</Link>
                    )
                })}
            </div>
            <div className={"overflow-x-scroll w-full flex flex-row text-sm mt-3.5"}>
                <div className={"text-plain-color text-md whitespace-nowrap mr-6"}>按年份</div>
                {releaseYear===""?
                    <Link href={getUrl(chosen_category,chosen_location,"")} className={"text-primary-color mr-3 whitespace-nowrap hover:text-primary-color"}>全部</Link>
                    :
                    <Link href={getUrl(chosen_category,chosen_location,"")} className={"text-normal-color mr-3 whitespace-nowrap hover:text-primary-color"}>全部</Link>
                }
                { year.map((item,index)=>{
                    const itemUrl=getUrl(chosen_category,chosen_location,String(item))
                    if (String(item)===releaseYear){
                        return (
                            <Link href={itemUrl} key={index} className={"mr-3 whitespace-nowrap text-primary-color hover:text-primary-color"}>{item}</Link>
                        )
                    }
                    return(
                        <Link href={itemUrl} key={index} className={"mr-3 whitespace-nowrap text-normal-color hover:text-primary-color"}>{item}</Link>
                    )
                })}
            </div>
        </div>
    )
}
export default FilterBar
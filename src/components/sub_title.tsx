import React from "react";
import "@/app/globals.css"
import Icon from "@/svgs/sub_title_icon.svg"
interface SubTitleProps{
    title:string
}

const Sub_title:React.FC<SubTitleProps>=({title})=>{
    return (
        <div className={"flex flex-row m-3 items-center text-center"}>
            <div className={"w-4 h-4"}>
                <Icon className={"w-full h-full"}></Icon>
            </div>
            <p className={"ml-2.5 text-md font-bold text-normal-color"}>{title}</p>
        </div>

    )
}
export default Sub_title
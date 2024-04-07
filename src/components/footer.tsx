import Link from "next/link";
import React from "react";
import {HomeTypeInformation} from "@/data/type";

const Footer:React.FC=()=>{
    return (
        <div className={"bg-reverse-color items-center text-center mt-10 m-5 text-plain-color text-sm font-bold"}>
            <Link href={HomeTypeInformation.route}>Wei-Gimy 維劇迷</Link>
        </div>
    )
}
export default Footer
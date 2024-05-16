import React from 'react';
import "@/app/globals.css"
import Image from "next/image";

const LoadError: React.FC = () => {
    return (
        <div className={"absolute h-full w-full flex justify-center"}>
            <div className="relative flex flex-col justify-around self-center items-center w-1/2 h-1/2">
                <Image priority={false} src={"/icon.png"} alt={"icon"} width={200} height={200}/>
                <p className={"text-reverse-color text-xl font-bold"}>載入出現些許錯誤 請稍後再嘗試</p>
            </div>
        </div>

    );
};

export default LoadError;


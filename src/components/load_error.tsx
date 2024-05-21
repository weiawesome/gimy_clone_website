import React from 'react';
import "@/app/globals.css"

const LoadError: React.FC = () => {
    return (
        <div className={"absolute h-full w-full flex justify-center"}>
            <div className="relative flex self-center items-center">
                <p className={"text-reverse-color lg:text-3xl text-xl font-bold"}>載入出現些許錯誤 請稍後再嘗試</p>
            </div>
        </div>

    );
};

export default LoadError;


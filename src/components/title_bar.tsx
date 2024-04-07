'use client'
import {RankingsTypeInformation, TypeList} from "@/data/type"
import React, {useState} from "react";
import Image from "next/image";
import "@/app/globals.css"
import Search from '@/svgs/search.svg'
import Fire from "@/svgs/fire.svg"
import Link from "next/link";
import {useRouter} from "next/navigation"

interface TitleBarProps{
    index:number
}
const TitleBar:React.FC<TitleBarProps>=({index})=>{
    const [searchTerm, setSearchTerm] = useState('');
    const [searchState,setSearchState]=useState(false);
    const router=useRouter()
    const search=()=>{
        router.push("/resource/search/content?content="+searchTerm)
    }
    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        search();
    };

    return (
        <div className={"h-24 lg:h-16"}>
            <div className={"h-24 lg:h-16 fixed top-0 left-0 z-50 w-full bg-reverse-color"}>
                <div className={"relative flex flex-row justify-between pl-3 pr-3 h-16 items-center"}>
                    <Link href={"/"}>
                        <Image priority={false} src={"/icon.png"} alt={"icon"} width={100} height={30}></Image>
                    </Link>
                    {
                        TypeList.map((item,i)=>{
                            if (i===index){
                                return (
                                    <Link className={"hidden lg:flex"} key={i} href={item.route}>
                                        <p className={"text-lg font-bold text-primary-color"}>{item.value}</p>
                                    </Link>
                                );
                            }
                            return(
                                <Link className={"hidden lg:flex"} key={i} href={item.route}>
                                    <p className={"text-lg text-normal-color font-bold transition duration-300 ease-in-out hover:text-primary-color"}>{item.value}</p>
                                </Link>
                            );})
                    }
                    <div className="hidden justify-center items-center lg:flex">
                        <div className="relative">
                            <form onSubmit={formSubmit}>
                                <input
                                    type="text"
                                    placeholder="輸入關鍵詞..."
                                    className="bg-white h-10 px-5 shadow-xl pr-16 rounded text-sm focus:shadow-blue-100 focus:outline-none"
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    value={searchTerm}
                                />
                            </form>
                            <button type="submit" className="absolute right-0 top-0 mt-2 mr-4" onClick={search}>
                                <div className={"relative w-5 h-5"}>
                                    <Search className={"relative w-full h-full"}></Search>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className={"flex lg:hidden"}>
                        <Link href={RankingsTypeInformation.route} className={"relative w-5 h-5 mr-2"}>
                            <Fire className={"relative w-full h-full"}></Fire>
                        </Link>
                        <button className={"relative w-5 h-5"} onClick={()=>{setSearchState(!searchState)}}>
                            <Search className={"relative w-full h-full"}></Search>
                        </button>
                    </div>
                </div>
                {searchState?
                    <div className={"flex lg:hidden flex-row h-4 w-full items-center pl-3 pr-3 "}>
                        <form className={"w-full"} onSubmit={formSubmit}>
                            <input
                                type="text"
                                placeholder="輸入關鍵詞..."
                                className="w-full bg-white h-10 px-5 shadow-xl pr-16 rounded text-sm focus:shadow-blue-100 focus:outline-none"
                                onChange={(e) => setSearchTerm(e.target.value)}
                                value={searchTerm}
                            />
                        </form>
                        <button type="submit" className="absolute right-0 bottom-0 mb-3.5 mr-7" onClick={search}>
                            <div className={"relative w-5 h-5"}>
                                <Search className={"relative w-full h-full"}></Search>
                            </div>
                        </button>
                    </div>
                    :
                    <div className={"flex lg:hidden flex-row h-4 items-center pl-3 pr-3"}>
                        {

                            TypeList.map((item,i)=>{
                                if (i===index){
                                    return (
                                        <Link className={"flex mr-3"} key={i} href={item.route}>
                                            <p className={"text-lg font-bold text-primary-color"}>{item.value}</p>
                                        </Link>
                                    );
                                }
                                return(
                                    <Link className={"flex mr-3"} key={i} href={item.route}>
                                        <p className={"text-lg text-normal-color font-bold transition duration-300 ease-in-out hover:text-primary-color"}>{item.value}</p>
                                    </Link>
                                );})
                        }
                    </div>
                }

            </div>
        </div>
    )
}
export default TitleBar
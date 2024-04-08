import React, {useRef, useState} from "react";
import "@/app/globals.css";
import TitleBar from "@/components/title_bar";
import Footer from "@/components/footer";
import {HomeTypeInformation, TypeInformation, TypeList} from "@/data/type";
import ScrollToTopButton from "@/components/scroll_to_top_button";
import {ToastContainer, toast} from "react-toastify";
import "@/app/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import {RequestCreateFilm} from "@/model/request/film_create";
import {CreateFilm} from "@/service/create_film";
import {UploadToSearchEngine} from "@/service/upload_to_search_engine";

const CreateFilmMedia: React.FC = () => {
    const [chooseType,setChooseType]=useState<TypeInformation|undefined>(undefined)
    const titleRef=useRef<HTMLInputElement|null>(null)
    const categoryRef=useRef<HTMLSelectElement|null>(null)
    const stateRef=useRef<HTMLInputElement|null>(null)
    const actorRef=useRef<HTMLInputElement|null>(null)
    const directorRef=useRef<HTMLInputElement|null>(null)
    const releaseYearRef=useRef<HTMLInputElement|null>(null)
    const introductionRef=useRef<HTMLInputElement|null>(null)
    const locationRef=useRef<HTMLSelectElement|null>(null)
    const languageRef=useRef<HTMLInputElement|null>(null)
    const thisYear =new Date().getFullYear()
    const [submitEnable,setSubmitEnable]=useState(true);
    const [resultInformation,setResultInformation]=useState("")

    const uploadToSearchEngine=(film_id:string)=>{
        toast.promise(
            UploadToSearchEngine(film_id),
            {
                pending: {
                    render() {
                        return `上傳至搜索引擎中......`
                    },
                    icon: false,
                },
                success: {
                    render() {
                        return `成功上傳至搜索引擎`
                    },
                },
                error: {
                    render({data}) {
                        return `上傳失敗 ${data}`
                    },
                }
            }
        ).then().catch((e)=>{console.log(e)})
    }

    const create=()=>{
        if (titleRef.current===null || titleRef.current?.value===""){
            toast.error("請填入名稱")
            return;
        }
        if (chooseType===undefined || chooseType===HomeTypeInformation){
            toast.error("請選擇正確種類")
            return
        }
        if (categoryRef.current===null || categoryRef.current?.value===""){
            toast.error("請選擇正確分類")
            return;
        }
        if (locationRef.current===null || locationRef.current?.value===""){
            toast.error("請選擇正確地區/國家")
            return;
        }


        const Request:RequestCreateFilm={
            title:titleRef.current!.value,
            state:stateRef.current!.value,
            type:chooseType!.QUERY_TYPE,
            category:categoryRef.current!.value,
            actors:actorRef.current!.value.split(","),
            directors:directorRef.current!.value.split(","),
            location:locationRef.current!.value,
            releaseYear:Number(releaseYearRef.current!.value),
            introduction:introductionRef.current!.value,
            language:languageRef.current!.value
        }
        setSubmitEnable(false)
        toast.promise(
            CreateFilm(Request),
            {
                pending: {
                    render() {
                        return `上傳中......`
                    },
                    icon: false,
                },
                success: {
                    render({data}) {
                        setResultInformation(data.id);
                        setSubmitEnable(true)
                        return `上傳成功 影片 ID ${data.id}`
                    },
                },
                error: {
                    render({data}) {
                        setSubmitEnable(true)
                        return `上傳失敗 ${data}`
                    },
                }
            }
        ).then().catch((e)=>{console.log(e)})
    }
    return (
        <main>
            <TitleBar index={HomeTypeInformation.index}></TitleBar>
            <ScrollToTopButton></ScrollToTopButton>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"/>
            <p className={"mt-3 text-3xl text-center font-bold"}>創立影片項目</p>
            { submitEnable && resultInformation==="" &&(
                <div className={"mt-5 mb-16 w-full items-center flex justify-center"}>
                    <div className={"w-3/4 text-sm"}>
                        <div className={"mb-3 flex flex-row w-full items-center justify-between"}>
                            <p className={"font-bold"}>影片名稱</p>
                            <input ref={titleRef} className={"focus:outline-none text-reverse-color rounded bg-plain-color bg-opacity-40 p-1 pl-2 pr-2 text-right"} type={"text"}/>
                        </div>
                        <div className={"mb-3 flex flex-row w-full items-center justify-between"}>
                            <p className={"font-bold"}>影片種類</p>
                            <select onChange={(e)=>{
                                // @ts-ignore
                                setChooseType(TypeList[e.target.value])
                            }} className={"pt-1 pb-1 p-5 bg-primary-color rounded-lg text-reverse-color border-none bg-opacity-50"}>
                                {TypeList.map((item,index)=>{
                                    if (index===TypeList.length-1){
                                        return
                                    }
                                    return(
                                        <option key={index} value={index}>{index===0?"":item.value}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className={"mb-3 flex flex-row w-full items-center justify-between"}>
                            <p className={"font-bold"}>影片分類</p>
                            <select ref={categoryRef} className={"pt-1 pb-1 p-5 bg-primary-color rounded-lg text-reverse-color border-none bg-opacity-50"}>
                                {chooseType?.category!==undefined && chooseType.category?.map((item, index)=>{
                                    return(
                                        <option key={index} value={index===0?undefined:item.QUERY_CATEGORY}>{index===0?"":item.value}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className={"mb-3 flex flex-row w-full items-center justify-between"}>
                            <p className={"font-bold"}>演員(以逗號區隔 如 actor1,actor2)</p>
                            <input ref={actorRef} className={"focus:outline-none text-reverse-color rounded bg-plain-color bg-opacity-40 p-1 pl-2 pr-2 text-right"} type={"text"}/>
                        </div>
                        <div className={"mb-3 flex flex-row w-full items-center justify-between"}>
                            <p className={"font-bold"}>導演(以逗號區隔 如 director1,director2)</p>
                            <input ref={directorRef} className={"focus:outline-none text-reverse-color rounded bg-plain-color bg-opacity-40 p-1 pl-2 pr-2 text-right"} type={"text"}/>
                        </div>
                        <div className={"mb-3 flex flex-row w-full items-center justify-between"}>
                            <p className={"font-bold"}>上映年份(西元)</p>
                            <input ref={releaseYearRef} defaultValue={thisYear} className={"focus:outline-none text-reverse-color rounded bg-plain-color bg-opacity-40 p-1 pl-2 pr-2 text-right"} type={"number"}/>
                        </div>
                        <div className={"mb-3 flex flex-row w-full items-center justify-between"}>
                            <p className={"font-bold"}>影片簡介</p>
                            <input ref={introductionRef} className={"focus:outline-none text-reverse-color rounded bg-plain-color bg-opacity-40 p-1 pl-2 pr-2 text-right"} type={"text"}/>
                        </div>
                        <div className={"mb-3 flex flex-row w-full items-center justify-between"}>
                            <p className={"font-bold"}>影片狀態</p>
                            <input ref={stateRef} className={"focus:outline-none text-reverse-color rounded bg-plain-color bg-opacity-40 p-1 pl-2 pr-2 text-right"} type={"text"}/>
                        </div>
                        <div className={"mb-3 flex flex-row w-full items-center justify-between"}>
                            <p className={"font-bold"}>國家/地區</p>
                            <select ref={locationRef} className={"pt-1 pb-1 p-5 bg-primary-color rounded-lg text-reverse-color border-none bg-opacity-50"}>
                                {chooseType?.location!==undefined && chooseType.location?.map((item, index)=>{
                                    return(
                                        <option key={index} value={index===0?undefined:item.QUERY_LOCATION}>{index===0?"":item.value}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className={"mb-3 flex flex-row w-full items-center justify-between"}>
                            <p className={"font-bold"}>影片語言</p>
                            <input ref={languageRef} className={"focus:outline-none text-reverse-color rounded bg-plain-color bg-opacity-40 p-1 pl-2 pr-2 text-right"} type={"text"}/>
                        </div>
                        <div className={"mt-10 justify-center flex flex-row items-center"}>
                            <button onClick={create} className={"text-lg font-bold rounded-xl bg-primary-color pl-10 pr-10 p-2 text-reverse-color"}>送出</button>
                        </div>
                    </div>

                </div>
            )}
            {resultInformation!=="" &&(
                <div className={"text-md text-normal-color mt-10 items-center flex justify-evenly flex-col"}>
                    <p className={"text-2xl text-normal-color"}>電影 - ID : {resultInformation}</p>
                    <button onClick={()=>{uploadToSearchEngine(resultInformation);setResultInformation("");}} className={"mt-8 font-bold p-5 w-1/2 rounded-lg bg-primary-color"}>繼續上傳</button>
                </div>
            )}
            <Footer></Footer>
        </main>
    );
};

export default CreateFilmMedia;
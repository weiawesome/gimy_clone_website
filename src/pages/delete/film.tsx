import React, {useRef, useState} from "react";
import "@/app/globals.css";
import TitleBar from "@/components/title_bar";
import Footer from "@/components/footer";
import {HomeTypeInformation} from "@/data/type";
import ScrollToTopButton from "@/components/scroll_to_top_button";
import {toast, ToastContainer} from "react-toastify";
import "@/app/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import Head from "next/head";
import {DeleteFilm, DeleteFilmEpisode} from "@/service/delete_resource";

const FilmDelete: React.FC = () => {
    const idRef=useRef<HTMLInputElement|null>(null)
    const idEpisodeRef=useRef<HTMLInputElement|null>(null)
    const routeRef=useRef<HTMLInputElement|null>(null)
    const episodeRef=useRef<HTMLInputElement|null>(null)
    const stateRef=useRef<HTMLInputElement|null>(null)
    const [submitEnable,setSubmitEnable]=useState(true)

    const deleteFilmEpisode=()=>{
        if (idEpisodeRef.current!.value===""){
            toast.warn("影片 ID 不得為空")
            return
        }
        if (routeRef.current!.value===""){
            toast.warn("路線 不得為空")
            return
        }
        if (routeRef.current!.value.toString()!==routeRef.current!.value.toString().toLowerCase()){
            toast.warn("路線 需全為小寫")
            return
        }
        if (episodeRef.current!.value===""){
            toast.warn("集數 不得為空")
            return
        }
        setSubmitEnable(false)
        toast.promise(
            DeleteFilmEpisode(routeRef.current!.value,idEpisodeRef.current!.value,episodeRef.current!.value,stateRef.current!.value),
            {
                pending: {
                    render() {
                        return `刪除中......`
                    },
                    icon: false,
                },
                success: {
                    render() {
                        setSubmitEnable(true)
                        return `刪除成功`
                    },
                },
                error: {
                    render({data}) {
                        setSubmitEnable(true)
                        return `刪除失敗 ${data}`
                    },
                }
            }
        ).then().catch((e)=>{console.log(e)})
    }
    const deleteFilm=()=>{
        if (idRef.current!.value===""){
            toast.warn("影片 ID 不得為空")
            return
        }
        setSubmitEnable(false)
        toast.promise(
            DeleteFilm(idRef.current!.value),
            {
                pending: {
                    render() {
                        return `刪除中......`
                    },
                    icon: false,
                },
                success: {
                    render() {
                        setSubmitEnable(true)
                        return `刪除成功`
                    },
                },
                error: {
                    render({data}) {
                        setSubmitEnable(true)
                        return `刪除失敗 ${data}`
                    },
                }
            }
        ).then().catch((e)=>{console.log(e)})
    }
    return (
        <main>
            <Head>
                <title>刪除資源 - Wei-Gimy 維劇迷</title>
            </Head>
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
            {submitEnable ?
                <div className={"flex lg:flex-row flex-col mb-16"}>
                    <div className={"lg:w-2/3 w-full mb-10 lg:mb-0"}>
                        <p className={"mt-3 text-3xl text-center font-bold"}>刪除指定集數</p>
                        <div className={"mt-5 w-full items-center flex justify-center"}>
                            <div className={"w-3/4 text-sm"}>
                                <div className={"mb-3 flex flex-row w-full items-center justify-between"}>
                                    <p className={"font-bold"}>影片 ID </p>
                                    <input ref={idEpisodeRef} className={"focus:outline-none text-reverse-color rounded bg-plain-color bg-opacity-40 p-1 pl-2 pr-2 text-right"} type={"text"}/>
                                </div>
                                <div className={"mb-3 flex flex-row w-full items-center justify-between"}>
                                    <p className={"font-bold"}>路線</p>
                                    <input ref={routeRef} className={"focus:outline-none text-reverse-color rounded bg-plain-color bg-opacity-40 p-1 pl-2 pr-2 text-right"} type={"text"}/>
                                </div>
                                <div className={"mb-3 flex flex-row w-full items-center justify-between"}>
                                    <p className={"font-bold"}>影片集數</p>
                                    <input ref={episodeRef} className={"focus:outline-none text-reverse-color rounded bg-plain-color bg-opacity-40 p-1 pl-2 pr-2 text-right"} type={"text"}/>
                                </div>
                                <div className={"mb-3 flex flex-row w-full items-center justify-between"}>
                                    <p className={"font-bold"}>影片新狀態</p>
                                    <input ref={stateRef} className={"focus:outline-none text-reverse-color rounded bg-plain-color bg-opacity-40 p-1 pl-2 pr-2 text-right"} type={"text"}/>
                                </div>
                                <div className={"mt-10 justify-center flex flex-row items-center"}>
                                    <button onClick={deleteFilmEpisode} className={"text-lg font-bold rounded-xl bg-primary-color pl-10 pr-10 p-2 text-reverse-color"}>送出</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"w-full lg:w-1/3"}>
                        <p className={"mt-3 text-3xl text-center font-bold"}>刪除整部資源</p>
                        <div className={"mt-5 w-full items-center flex justify-center"}>
                            <div className={"w-3/4 text-sm"}>
                                <div className={"mb-3 flex flex-row w-full items-center justify-between"}>
                                    <p className={"font-bold"}>影片 ID </p>
                                    <input ref={idRef} className={"focus:outline-none text-reverse-color rounded bg-plain-color bg-opacity-40 p-1 pl-2 pr-2 text-right"} type={"text"}/>
                                </div>
                                <div className={"mt-10 justify-center flex flex-row items-center"}>
                                    <button onClick={deleteFilm} className={"text-lg font-bold rounded-xl bg-primary-color pl-10 pr-10 p-2 text-reverse-color"}>送出</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                :
                <div className={"mt-3 text-3xl text-center font-bold"}>刪除中......</div>
            }

            <Footer></Footer>
        </main>
    );
};

export default FilmDelete;
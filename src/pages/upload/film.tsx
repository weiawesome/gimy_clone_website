import React, {useRef, useState} from "react";
import "@/app/globals.css";
import TitleBar from "@/components/title_bar";
import Footer from "@/components/footer";
import {HomeTypeInformation} from "@/data/type";
import ScrollToTopButton from "@/components/scroll_to_top_button";
import {toast, ToastContainer} from "react-toastify";
import "@/app/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import {UploadFilmResource, UploadImageResource} from "@/service/upload_resource";
import {UploadToSearchEngine} from "@/service/upload_to_search_engine";
import Head from "next/head";

const FilmMedia: React.FC = () => {
    const [file, setFile] = useState<File|null>(null);
    const [imageFile, setImageFile] = useState<File|null>(null);
    const idRef=useRef<HTMLInputElement|null>(null)
    const idImageRef=useRef<HTMLInputElement|null>(null)
    const idSearchEngineRef=useRef<HTMLInputElement|null>(null)
    const routeRef=useRef<HTMLInputElement|null>(null)
    const episodeRef=useRef<HTMLInputElement|null>(null)
    const stateRef=useRef<HTMLInputElement|null>(null)
    const [submitEnable,setSubmitEnable]=useState(true);

    const uploadSearchEngine=()=>{
        if (idSearchEngineRef.current!.value===""){
            toast.warn("影片 ID 不得為空")
            return
        }
        setSubmitEnable(false)
        toast.promise(
            UploadToSearchEngine(idSearchEngineRef.current!.value),
            {
                pending: {
                    render() {
                        return `上傳中......`
                    },
                    icon: false,
                },
                success: {
                    render() {
                        setSubmitEnable(true)
                        setFile(null)
                        return `上傳成功`
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
    const uploadFilmResource=()=>{
        if (idRef.current!.value===""){
            toast.warn("影片 ID 不得為空")
            return
        }
        if (routeRef.current!.value===""){
            toast.warn("上傳路線 不得為空")
            return
        }
        if (routeRef.current!.value.toString()!==routeRef.current!.value.toString().toLowerCase()){
            toast.warn("路線不得出現大寫")
            return
        }
        if (episodeRef.current!.value===""){
            toast.warn("集數 不得為空")
            return
        }
        if (file===null){
            toast.warn("影片資源 不得為空")
            return
        }
        setSubmitEnable(false)
        toast.promise(
            UploadFilmResource(routeRef.current!.value,idRef.current!.value,episodeRef.current!.value,stateRef.current!.value,file!),
            {
                pending: {
                    render() {
                        return `上傳中......`
                    },
                    icon: false,
                },
                success: {
                    render() {
                        setSubmitEnable(true)
                        setFile(null)
                        return `上傳成功`
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
    const uploadImageResource=()=>{
        if (idImageRef.current!.value===""){
            toast.warn("影片 ID 不得為空")
            return
        }
        if (imageFile===null){
            toast.warn("影片資源 不得為空")
            return
        }
        setSubmitEnable(false)
        toast.promise(
            UploadImageResource(idImageRef.current!.value,imageFile!),
            {
                pending: {
                    render() {
                        return `上傳中......`
                    },
                    icon: false,
                },
                success: {
                    render() {
                        setImageFile(null)
                        setSubmitEnable(true)
                        return `上傳成功`
                    },
                },
                error: {
                    render({data}) {
                        setSubmitEnable(true)
                        return `上傳失敗 ${data}`
                    },
                }
            }
        ).then().catch((e)=>console.log(e))
    }
    return (
        <main>
            <Head>
                <title>上傳與修改影片資訊 - Wei-Gimy 維劇迷</title>
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
                        <p className={"mt-3 text-3xl text-center font-bold"}>上傳影片資源</p>
                        <div className={"mt-5 w-full items-center flex justify-center"}>
                            <div className={"w-3/4 text-sm"}>
                                <div className={"mb-3 flex flex-row w-full items-center justify-between"}>
                                    <p className={"font-bold"}>影片 ID </p>
                                    <input ref={idRef} className={"focus:outline-none text-reverse-color rounded bg-plain-color bg-opacity-40 p-1 pl-2 pr-2 text-right"} type={"text"}/>
                                </div>
                                <div className={"mb-3 flex flex-row w-full items-center justify-between"}>
                                    <p className={"font-bold"}>上傳線路(需均為小寫)</p>
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
                                <div className={"mt-3 justify-between flex flex-row items-center"}>
                                    <p className={"font-bold"}>影片資源(單一檔案)</p>
                                    {file!==null&& <p className={"truncate w-1/4 font-bold"}>檔案&nbsp;:&nbsp;{file.name}</p>}
                                    <div className={"relative mt-0.5 pt-1.5 pb-1.5 p-3 bg-primary-color rounded-lg text-reverse-color border-none bg-opacity-50 overflow-hidden"}>
                                        <input onChange={(e)=>setFile(e.target.files!.item(0))} accept={"video/mp4"} multiple={false} type={"file"} className={"absolute opacity-0 w-full h-full"}/>
                                        選擇檔案
                                    </div>
                                </div>
                                <div className={"mt-10 justify-center flex flex-row items-center"}>
                                    <button onClick={uploadFilmResource} className={"text-lg font-bold rounded-xl bg-primary-color pl-10 pr-10 p-2 text-reverse-color"}>送出</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"w-full lg:w-1/3"}>
                        <div className={"w-full"}>
                            <p className={"mt-3 text-3xl text-center font-bold"}>上傳影片封面</p>
                            <div className={"mt-5 w-full items-center flex justify-center"}>
                                <div className={"w-3/4 text-sm"}>
                                    <div className={"mb-3 flex flex-row w-full items-center justify-between"}>
                                        <p className={"font-bold"}>影片 ID </p>
                                        <input ref={idImageRef} className={"focus:outline-none text-reverse-color rounded bg-plain-color bg-opacity-40 p-1 pl-2 pr-2 text-right"} type={"text"}/>
                                    </div>
                                    <div className={"mt-3 justify-between flex flex-row items-center"}>
                                        <p className={"font-bold"}>影片資源(單一檔案)</p>
                                        {imageFile!==null&& <p className={"truncate w-1/4 font-bold"}>檔案&nbsp;:&nbsp;{imageFile.name}</p>}
                                        <div className={"relative mt-0.5 p-3 pt-1.5 pb-1.5 bg-primary-color rounded-lg text-reverse-color border-none bg-opacity-50 overflow-hidden"}>
                                            <input onChange={(e)=>setImageFile(e.target.files!.item(0))} accept={"image/png,image/jpeg"} multiple={false} type={"file"} className={"absolute opacity-0 w-full h-full"}/>
                                            選擇檔案
                                        </div>
                                    </div>
                                    <div className={"mt-10 justify-center flex flex-row items-center"}>
                                        <button onClick={uploadImageResource} className={"text-lg font-bold rounded-xl bg-primary-color pl-10 pr-10 p-2 text-reverse-color"}>送出</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className={"w-full mt-10"}>
                            <p className={"mt-3 text-3xl text-center font-bold"}>補傳至搜索引擎</p>
                            <div className={"mt-5 w-full items-center flex justify-center"}>
                                <div className={"w-3/4 text-sm"}>
                                    <div className={"mb-3 flex flex-row w-full items-center justify-between"}>
                                        <p className={"font-bold"}>影片 ID </p>
                                        <input ref={idSearchEngineRef} className={"focus:outline-none text-reverse-color rounded bg-plain-color bg-opacity-40 p-1 pl-2 pr-2 text-right"} type={"text"}/>
                                    </div>
                                    <div className={"mt-10 justify-center flex flex-row items-center"}>
                                        <button onClick={uploadSearchEngine} className={"text-lg font-bold rounded-xl bg-primary-color pl-10 pr-10 p-2 text-reverse-color"}>送出</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
                :
                <div className={"mt-3 text-3xl text-center font-bold"}>上傳中......</div>
            }

            <Footer></Footer>
        </main>
    );
};

export default FilmMedia;
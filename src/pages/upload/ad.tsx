import React, {useState} from "react";
import "@/app/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import {AdType, AdTypeList} from "@/model/repsonse/ad_information";
import TitleBar from "@/components/title_bar";
import Footer from "@/components/footer";
import {HomeTypeInformation} from "@/data/type";
import {UploadAd} from "@/service/upload_ad";
import { ToastContainer, toast } from "react-toastify";
import ScrollToTopButton from "@/components/scroll_to_top_button";

const AdMedia: React.FC = () => {
    const [adType, setAdType] = useState<AdType>(AdType.UNKNOWN);
    const [file, setFile] = useState<File|null>(null);
    const [expiredTime,setExpiredTime]=useState("")
    const [submitEnable,setSubmitEnable]=useState(true);
    const refreshTime=()=>{
        const now = new Date();
        setExpiredTime(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}T${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
    }

    const uploadAd=()=>{
        if (adType===AdType.UNKNOWN){
            toast.warn("廣告型態不正確");
            return
        }
        if (file===null){
            toast.warn("未選擇檔案");
            return;
        }
        const now=new Date().getTime()
        const parseTime=Date.parse(expiredTime)
        if (expiredTime==="" || now>=parseTime){
            toast.warn("廣告過期時間不正確 須高於現在時間");
            return;
        }
        setSubmitEnable(false)
        toast.promise(
            UploadAd(file, adType, expiredTime + ":00.000Z"),
            {
                pending: {
                    render() {
                        return `上傳中......`
                    },
                    icon: false,
                },
                success: {
                    render() {
                        return `上傳成功`
                    },
                },
                error: {
                    render({data}) {
                        return `上傳失敗 ${data}`
                    },
                }
            }
        ).then(()=>setSubmitEnable(true))
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
            <ToastContainer />
            <p className={"mt-3 text-3xl text-center font-bold"}>上傳廣告</p>
            {submitEnable &&
                <div className={"mt-10 mb-20 w-full items-center flex justify-center"}>
                    <div className={"w-2/3 text-sm"}>
                        <div className={"flex flex-row w-full items-center justify-between"}>
                            <p className={"font-bold"}>投遞廣告型態</p>
                            <select onChange={(e)=>{
                                // @ts-ignore
                                setAdType(e.target.value)
                                refreshTime()
                                setFile(null)
                            }} className={"pt-1 pb-1 p-5 bg-primary-color rounded-lg text-reverse-color border-none bg-opacity-50"}>
                                {AdTypeList.map((item,index)=>{
                                    return(
                                        <option key={index} value={item.type}>{item.information}</option>
                                    )
                                })}
                            </select>
                        </div>
                        {adType!==AdType.UNKNOWN &&(
                            <div className={"mt-5"}>
                                <div className={"mt-5 justify-between flex flex-row items-center"}>
                                    <p className={"font-bold"}>廣告有效期限</p>
                                    <input defaultValue={expiredTime} onChange={(e)=>setExpiredTime(e.target.value)} type={"datetime-local"} className={"p-5 pt-1 pb-1 bg-primary-color rounded-lg text-reverse-color border-none bg-opacity-50"}/>
                                </div>
                                {adType ===AdType.FILM && (
                                    <div className={"mt-5 justify-between flex flex-row items-center"}>
                                        <p className={"font-bold"}>廣告資源(單一檔案)</p>
                                        {file!==null&& <p className={"font-bold"}>檔案&nbsp;:&nbsp;{file.name}</p>}
                                        <div className={"relative p-5 pt-1 pb-1 bg-primary-color rounded-lg text-reverse-color border-none bg-opacity-50 overflow-hidden"}>
                                            <input onChange={(e)=>setFile(e.target.files!.item(0))} accept={"video/mp4"} multiple={false} type={"file"} className={"absolute opacity-0 w-full h-full"}/>
                                            選擇檔案
                                        </div>
                                    </div>
                                )}
                                {adType ===AdType.WEB_BAR && (
                                    <div className={"mt-5 justify-between flex flex-row items-center"}>
                                        <p className={"font-bold"}>廣告資源(單一檔案)</p>
                                        {file!==null&& <p className={"font-bold"}>檔案&nbsp;:&nbsp;{file.name}</p>}
                                        <div className={"relative p-5 pt-1 pb-1 bg-primary-color rounded-lg text-reverse-color border-none bg-opacity-50 overflow-hidden"}>
                                            <input onChange={(e)=>setFile(e.target.files!.item(0))} accept={"image/gif"} multiple={false} type={"file"} className={"absolute opacity-0 w-full h-full"}/>
                                            選擇檔案
                                        </div>
                                    </div>
                                )}
                                {(adType ===AdType.WEB || adType===AdType.WEB_CORNER) && (
                                    <div className={"mt-5 justify-between flex flex-row items-center"}>
                                        <p className={"font-bold"}>廣告資源(單一檔案)</p>
                                        {file!==null&& <p className={"font-bold truncate"}>檔案&nbsp;:&nbsp;{file.name}</p>}
                                        <div className={"relative p-5 pt-1 pb-1 bg-primary-color rounded-lg text-reverse-color border-none bg-opacity-50 overflow-hidden"}>
                                            <input onChange={(e)=>setFile(e.target.files!.item(0))} accept={"image/jpeg,image/png"} multiple={false} type={"file"} className={"absolute opacity-0 w-full h-full"}/>
                                            選擇檔案
                                        </div>
                                    </div>
                                )}
                                <div className={"mt-16 justify-center flex flex-row items-center"}>
                                    <button onClick={uploadAd} className={"text-lg font-bold rounded-xl bg-primary-color pl-10 pr-10 p-2 text-reverse-color"}>送出</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            }
            <Footer></Footer>
        </main>
    );
};

export default AdMedia;
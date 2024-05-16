import React, {useEffect, useRef, useState} from "react";
import Hls from "hls.js";
import Play from "@/svgs/play.svg"
import Pause from "@/svgs/pause.svg"
import FullScreen from "@/svgs/full_screen.svg"
import Setting from "@/svgs/setting.svg"
import SoundOff from "@/svgs/sound_off.svg"
import SoundLow from "@/svgs/sound_low.svg"
import SoundFull from "@/svgs/sound_full.svg"
import UnChosen from "@/svgs/switch_left.svg"
import Chosen from "@/svgs/switch_right.svg"
import RightArrow from "@/svgs/right_arrow.svg"
import "@/app/globals.css"
import LoadingWave from "@/components/loading_wave";
import LoadError from "@/components/load_error";
interface HLSVideoPlayerProps {
    src: string;
}

const HLSVideoPlayer: React.FC<HLSVideoPlayerProps> = ({ src}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [hoverTime, setHoverTime] = useState<string | null>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
    const [showVolume,setShowVolume]=useState(false)
    const [showSetting,setShowSetting]=useState(false)
    const [showControlBar,setShowControlBar]=useState(true)
    const [showSpeedControl,setShowSpeedControl]=useState(false);
    const [timeoutId, setTimeoutId] = useState<number|null>(null);
    const [volume, setVolume] = useState<number>(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [showIcon, setShowIcon] = useState(false);
    const [forwardRewind,setForwardRewind] = useState<string|null>(null);
    const updateProgress = () => {
        const video = videoRef.current;
        if (video) {
            const value = (video.currentTime / video.duration) * 100;
            if (progressRef.current) {
                progressRef.current.style.width = `${value}%`;
            }
        }
    };
    const seek = (e: React.MouseEvent<HTMLDivElement>) => {
        const video = videoRef.current;
        const progressBar = progressBarRef.current;
        if (video && progressBar) {
            video.currentTime = (e.nativeEvent.offsetX / progressBar.offsetWidth) * video.duration;
        }
    };
    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const video = videoRef.current;
        video!.controls=false
        if (!video || !video.duration) return;

        const progressBar = event.currentTarget;
        const progressWidth = progressBar.offsetWidth;
        const offsetX = event.nativeEvent.offsetX;
        const hoverTimeSec = (offsetX / progressWidth) * video.duration;

        setHoverTime(formatTime(hoverTimeSec));
        setHoverPosition({ x: event.clientX, y: event.clientY });
    };
    const handleMouseLeave = () => {
        setHoverTime(null);
    };
    const formatTime = (time:number) => {
        if (isNaN(time)){
            return "0:00"
        }
        const hours = Math.floor(time / 60/60)<10?"0"+Math.floor(time / 60/60):String(Math.floor(time / 60/60));
        const minutes = Math.floor(time / 60%60)<10?"0"+Math.floor(time / 60%60):String(Math.floor(time / 60%60));
        const seconds = Math.floor(time % 60)<10?"0"+Math.floor(time % 60):String(Math.floor(time % 60));

        return hours==="00"?minutes+":"+seconds:hours+":"+minutes+":"+seconds
    };
    const togglePlayPause = () => {
        if (!videoRef.current) return;
        if (videoRef.current.paused || videoRef.current.ended) {
            videoRef.current.play().then();
            resetTimer();
        } else {
            videoRef.current.pause();
        }
        setShowIcon(true);
        setTimeout(() => setShowIcon(false), 700);
    };
    const handleFastForward = () => {
        if (videoRef.current) videoRef.current.currentTime += 10;
        setForwardRewind("快進 10 秒")
        setTimeout(() => setForwardRewind(null), 1000);
    };
    const handleRewind = () => {
        if (videoRef.current) videoRef.current.currentTime -= 10;
        setForwardRewind("快退 10 秒")
        setTimeout(() => setForwardRewind(null), 1000);
    };
    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(Number(event.target.value));
    };
    const resetTimer = () => {
        setShowControlBar(true);
        if (timeoutId) clearTimeout(timeoutId);
        const id = setTimeout(() => {
            if (videoRef===undefined || videoRef.current?.paused || videoRef.current?.ended){
                return
            } else{
                setShowSpeedControl(false);
                setShowSetting(false);
                setShowControlBar(false);
            }
        }, 3000);
        setTimeoutId(Number(id));
    };
    const controlSpeed=(value:number)=>{
        videoRef.current!.playbackRate=value;
        setShowSpeedControl(false);
        setShowSetting(false);
    }

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = volume;
        }
    }, [volume]);
    useEffect(() => {
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [timeoutId]);
    useEffect(() => {
        if (Hls.isSupported() && videoRef.current) {
            const hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(videoRef.current);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                videoRef.current?.play().then(() => {setLoading(false);setError(false)}).catch((_) => setError(true));
            });
            hls.on(Hls.Events.ERROR, (event, data) => {
                if (data.fatal) {
                    switch (data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            console.log("Network Error:", data);
                            setError(true);
                            break;
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            console.log("Media Error:", data);
                            setError(true);
                            break;
                        default:
                            setError(true);
                            hls.destroy();
                            break;
                    }
                }
            });
        } else if (videoRef.current && videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
            videoRef.current.src = src;
            videoRef.current.addEventListener('loadedmetadata', () => {
                videoRef.current?.play().then(() => {setLoading(false);setError(false)}).catch((_) => setError(true));
            });
        }
        const handleKeyDown = (event: KeyboardEvent) => {
            if (videoRef.current) {
                if (event.key === "ArrowRight") {
                    resetTimer();
                    handleFastForward();
                } else if (event.key === "ArrowLeft") {
                    resetTimer();
                    handleRewind();
                } else if (event.code === 'Space' ) {
                    resetTimer();
                    event.preventDefault();
                    togglePlayPause();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        const video = videoRef.current;
        const handleTimeUpdate = () => {
            setCurrentTime(video!.currentTime);
            setDuration(video!.duration);
            updateProgress()
        };

        video!.addEventListener('timeupdate',handleTimeUpdate);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            video!.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [src]);

    return (
        <div ref={containerRef} className={"relative w-full min-h-3.5 items-center content-center"} onMouseMove={resetTimer}>
            {loading && <LoadingWave/>}
            {error && <LoadError/>}
            {showIcon && (
                <div className={`absolute inset-0 flex justify-center items-center transition-opacity duration-700 ${showIcon ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="text-white text-6xl animate-scale-fade">
                        {videoRef===null || videoRef.current?.paused || videoRef.current?.ended ?
                            <div className={"w-20 h-20 p-5 bg-normal-color bg-opacity-30 rounded-full"}>
                                <Pause className={"w-full h-full"}/>
                            </div>
                            :
                            <div className={"w-20 h-20 p-5 bg-normal-color bg-opacity-30 rounded-full"}>
                                <Play className={"w-full h-full"}/>
                            </div>
                        }
                    </div>
                </div>
            )}
            {forwardRewind && <div className="absolute bg-plain-color bg-opacity-20 text-reverse-color font-bold rounded p-1.5 text-sm text-center"  style={{left: `0.5rem`, bottom: `3rem`}}>{forwardRewind}</div>}
            <video ref={videoRef} className={"w-full min-h-3.5"} onClick={()=> {
                if (showSetting) {
                    setShowSpeedControl(false);
                    setShowSetting(false);
                } else {
                    togglePlayPause();
                }
            }}/>
            <div style={{height:showControlBar?"auto":"0",overflow:showControlBar?"initial":"hidden"}} className={"absolute transition-all duration-500 bottom-0 left-0 w-full bg-normal-color bg-opacity-50"}>
                <div className="relative pb-1">
                    {hoverTime && <div className="absolute bg-plain-color bg-opacity-20 text-reverse-color font-bold rounded p-1.5 text-sm text-center"  style={{ width:"50px",left: `${hoverPosition.x-25}px`, bottom: `40px` }}>{hoverTime}</div>}
                    <div ref={progressBarRef} onClick={seek} className="h-0.5 hover:h-2 rounded w-full bg-gray-200 cursor-pointer" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                        <div ref={progressRef} className="bg-primary-color h-full"></div>
                    </div>
                    <div className={"relative w-full flex flex-row justify-between mt-1 p-1 pl-3 pr-3"}>
                        <div className={"flex flex-row justify-start items-center"}>
                            <button onClick={togglePlayPause}>
                                {videoRef===null || videoRef.current?.paused || videoRef.current?.ended ? (
                                    <Play className={"w-5 h-5"}></Play>
                                ):(
                                    <Pause className={"w-5 h-5"}></Pause>
                                )}
                            </button>
                            <div className={"ml-3 h-full w-10 hover:w-40 items-center flex flex-row"} onMouseMove={()=>{setShowVolume(true)}} onMouseLeave={()=>{setShowVolume(false)}}>
                                {volume===1?(
                                    <button className={"ml-3"} onClick={()=>{setVolume(0)}}>
                                        <SoundFull className={"w-5 h-5"}></SoundFull>
                                    </button>
                                ):volume===0?(
                                    <button className={"ml-3"} onClick={()=>{setVolume(1)}}>
                                        <SoundOff className={"w-5 h-5"}></SoundOff>
                                    </button>
                                ):(
                                    <button className={"ml-3"} onClick={()=>{setVolume(0)}}>
                                        <SoundLow className={"w-5 h-5"}></SoundLow>
                                    </button>
                                )}
                                { showVolume && (
                                    <input className={"relative ml-3 appearance-none h-1 w-full"} id="volume-control" type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange}/>
                                )}
                            </div>
                            <div className={"text-reverse-color text-sm ml-3"}>{formatTime(currentTime)} / {formatTime(duration)}</div>
                        </div>
                        <div className={"flex flex-1 items-center justify-end"}>
                            <button className={"mr-5"} onClick={()=>{
                                setShowSpeedControl(false);
                                setShowSetting(!showSetting);
                            }}>
                                <Setting style={{ transform: (showSetting || showSpeedControl)?"rotate(90deg)":"none" }} className={"transition-all duration-500 ease-in-out w-5 h-5"}></Setting>
                            </button>
                            {showSetting && (
                                <div className={"absolute bottom-10 bg-normal-color rounded p-1 bg-opacity-80 right-10 pl-2 pr-2"}>
                                    {showSpeedControl?
                                        <div className={"relative flex flex-col items-start text-reverse-color text-sm pl-2 pr-2"}>
                                            <button className={"w-full text-center mt-2"} onClick={()=>{controlSpeed(0.5);}}>0.5</button>
                                            <button className={"w-full text-center mt-2"} onClick={()=>{controlSpeed(0.75);}}>0.75</button>
                                            <button className={"w-full text-center mt-2"} onClick={()=>{controlSpeed(1);}}>正常</button>
                                            <button className={"w-full text-center mt-2"} onClick={()=>{controlSpeed(1.25);}}>1.25</button>
                                            <button className={"w-full text-center mt-2"} onClick={()=>{controlSpeed(1.5);}}>1.5</button>
                                            <button className={"w-full text-center mt-2 mb-2"} onClick={()=>{controlSpeed(2);}}>2</button>
                                        </div>
                                        :
                                        <div className={"relative flex flex-col items-start text-reverse-color text-sm w-32"}>
                                            <button className={"flex w-full flex-row justify-between pl-2 pr-2 items-center"} onClick={()=>{setShowSpeedControl(true)}}>
                                                <p>速度</p>
                                                <RightArrow className={"w-8 h-8"}></RightArrow>
                                            </button>
                                            <button onClick={()=>{videoRef.current!.loop=!videoRef.current!.loop;setShowSetting(false)}} className={"flex w-full flex-row justify-between pl-2 pr-2 items-center"}>
                                                <p>循環撥放</p>
                                                {videoRef.current!.loop? <Chosen className={"w-8 h-8"}></Chosen>:<UnChosen className={"w-8 h-8"}></UnChosen>}
                                            </button>
                                        </div>
                                    }
                                </div>
                            )}
                            <button onClick={()=>{
                                if (document.fullscreenElement) {
                                    document.exitFullscreen().then();
                                } else if (containerRef.current) {
                                    containerRef.current.requestFullscreen().then();
                                }
                            }}>
                                <FullScreen className={"w-5 h-5"}></FullScreen>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HLSVideoPlayer;
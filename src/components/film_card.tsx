import React, {useState} from "react";
import PlaySvg from '@/svgs/play.svg'
import Link from "next/link";
import "@/app/globals.css"
import Image from 'next/image';

interface FilmCardProps{
    id:string
    resource :string
    state:string
    title:string
    actors:string[]
}

const FilmCard:React.FC<FilmCardProps>=({id,resource,state,title,actors})=>{
    const [loadError,setLoadError]=useState(false);
    return(
        <div className={"flex flex-1 flex-col justify-start"}>
            <Link className={"relative m-1 group items-center"} aria-label={title} href={"/resource/"+id}>
                <Image width={200} height={250} src={loadError?"/icon.png":resource} alt={"image"} className={"bg-reverse-color shadow-lg rounded-lg w-full aspect-2/3"} onError={()=>{setLoadError(true)}}></Image>
                <div className="absolute bottom-0 right-0 text-reverse-color p-1 text-sm">
                    {state}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                    <span className="w-10 h-10 flex items-center justify-center">
                        <PlaySvg className="w-full h-full" />
                    </span>
                </div>
            </Link>
            <Link href={"/resource/"+id} className={"mt-1 text-md text-normal-color hover:text-primary-color truncate"}>{title}</Link>
            <p className={"text-md hidden lg:block truncate text-plain-color"}>{actors.join(', ')}</p>
        </div>
    );
}
export default FilmCard;
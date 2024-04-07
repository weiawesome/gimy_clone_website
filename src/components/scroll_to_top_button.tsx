'use client'
import Up from '@/svgs/up.svg'
import "@/app/globals.css"
import React, {useEffect, useState} from "react";
const ScrollToTopButton = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowButton(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    if (!showButton){
        return (
            <div className={"absolute"}/>
        )
    }
    return (
        <button onClick={scrollToTop} className="fixed bottom-4 right-4 bg-normal-color bg-opacity-60 text-white rounded z-50">
            <span className="w-10 h-10 flex items-center justify-center">
                <Up className={'w-full h-full '}></Up>
            </span>
        </button>
    );
};
export default ScrollToTopButton
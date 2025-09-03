'use client'

import styles from '@/app/ui/animations.module.css';
import Marquee from "react-fast-marquee";

export function LoadingAnim() {
    return (
        <>
            <div className={`${styles.spinnerbox} mx-auto`}>
                <div className={`${styles.configureborder1} bg-foreground`}>
                    <div className={`${styles.configurecore} bg-background`}></div>
                </div>
                <div className={`${styles.configureborder2} bg-foreground`}>
                    <div className={`${styles.configurecore} bg-background`}></div>
                </div>
            </div>
        </>);
}

export function PageBorder() {
    function gen(){
        const i=[];
        for(let a = 0; a < 50 ; a++){
            i.push((
                <svg key={a} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                </svg>
        ))}
        return i;
    }
    return (<>
        <div className="fixed origin-top-left rotate-90 left-5 sm:left-10 w-dvh bg-transparent">
            <Marquee pauseOnHover speed={1} className="flex h-2 items-center text-foreground overflow-hidden">
                {gen()}
            </Marquee>
        </div>
        <div className="fixed origin-top-right -rotate-90 right-5 sm:right-10 w-dvh bg-transparent">
            <Marquee pauseOnHover speed={1} className="flex h-2 items-center text-foreground overflow-hidden">
                {gen()}
            </Marquee>
        </div>
    </>
    )
}
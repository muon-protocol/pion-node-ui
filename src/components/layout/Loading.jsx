'use client'
import Lottie from "lottie-react";
import loading from "@/jsons/lottie/loading-primary.json";
export function Loading() {
    
    return (<div className="w-full justify-center flex">
        <Lottie animationData={loading} />
    </div>)
}
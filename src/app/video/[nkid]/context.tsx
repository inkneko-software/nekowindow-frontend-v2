'use client'
import { VideoPostDetailVO } from "@api/codegen/video";
import { createContext, useContext } from "react";
export const VideoPostDetailContext = createContext<{ nkid: number; currentPart: number; videoPostDetail: VideoPostDetailVO } | null>(null);

export const VideoPostDetailProvider = ({ children, value }: { children: React.ReactNode, value: { nkid: number, currentPart: number, videoPostDetail: VideoPostDetailVO } }) => {
    return <VideoPostDetailContext.Provider value={value}>{children}</VideoPostDetailContext.Provider>
}

export const useVideoPostDetailContext = () => {
    const context = useContext(VideoPostDetailContext);
    if (context === undefined) {
        throw new Error("useVideoPostDetail must be used within a VideoPostDetailProvider");
    }
    return context;
}

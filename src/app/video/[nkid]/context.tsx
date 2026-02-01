'use client'
import { VideoPostDetailVO } from "@api/codegen/video";
import { createContext, useContext, useState } from "react";

interface VideoPostDetailContextType{
    nkid: number;
    currentPart: number;
    videoPostDetail: VideoPostDetailVO,
    // 用于投币后更新视频投币数量
    handleUpdateVideoPostCoin: (coin: number) => void
}

interface VideoPostDetailContextProviderProps {
    nkid: number;
    currentPart: number;
    videoPostDetail: VideoPostDetailVO,
}

export const VideoPostDetailContext = createContext< VideoPostDetailContextType | null>(null);

export const VideoPostDetailProvider = ({ children, value }: { children: React.ReactNode, value: VideoPostDetailContextProviderProps }) => {
    const [videoPostDetail, setVideoPostDetail] = useState<VideoPostDetailVO>(value.videoPostDetail);
    const handleUpdateVideoPostCoin = (coin: number) => {
        setVideoPostDetail((prev) => ({
            ...prev,
            coin: prev.coin + coin,
            postedCoins: prev.postedCoins + coin
        }));
    }
    return <VideoPostDetailContext.Provider value={
        {
            nkid: value.nkid,
            currentPart: value.currentPart,
            videoPostDetail: videoPostDetail,
            handleUpdateVideoPostCoin: handleUpdateVideoPostCoin
        }
    }>{children}</VideoPostDetailContext.Provider>
}

export const useVideoPostDetailContext = () => {
    const context = useContext(VideoPostDetailContext);
    if (context === undefined) {
        throw new Error("useVideoPostDetail must be used within a VideoPostDetailProvider");
    }
    return context;
}

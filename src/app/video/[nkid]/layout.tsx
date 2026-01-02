import { VideoPostDetailProvider } from "./context";
import { VideoControllerApi, Configuration } from "@api/codegen/video";

export default async function VideoLayout({ children, params }: { children: React.ReactNode, params: { nkid: number } }) {
    const videoapi = new VideoControllerApi(new Configuration({ credentials: 'include', basePath: process.env.NEXT_PUBLIC_API_SERVER }));

    const resp = await (videoapi.getVideoPostDetail({ nkid: params.nkid }));
    if (resp.code !== 0 || resp.data === undefined) {
        return <div>视频不存在</div>;
    }

    const videoPostDetailVO = resp.data;

    return (
        <VideoPostDetailProvider value={{ nkid: params.nkid, currentPart: 0, videoPostDetail: videoPostDetailVO }}>
            {children}
        </VideoPostDetailProvider>

    )
};
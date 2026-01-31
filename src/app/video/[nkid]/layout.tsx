import { cookies } from "next/headers";
import { VideoPostDetailProvider } from "./context";
import { VideoControllerApi, Configuration } from "@api/codegen/video";

export default async function VideoLayout({ children, params }: { children: React.ReactNode, params: { nkid: number } }) {
    const videoapi = new VideoControllerApi(new Configuration({ credentials: 'include', basePath: process.env.NEXT_PUBLIC_API_SERVER }));

    let resp;

    var cookie = cookies()
    var userId = cookie.get("userId");
    var sessionToken = cookie.get('sessionToken');

    var headers = {}

    if (userId !== undefined && sessionToken !== undefined) {
        headers = {
            "Cookie": `userId=${userId.value}; sessionToken=${sessionToken.value}`
        }
    }

    console.log(headers)

    try{
        resp = await (videoapi.getVideoPostDetail({ nkid: params.nkid }, {cache: 'no-cache', headers: headers}));
        if (resp === undefined || resp.code !== 0 || resp.data === undefined) {
            return <div>视频不存在</div>;
        }

    }catch(e){
        return <div>视频不存在</div>;
    }

    const videoPostDetailVO = resp.data;

    return (
        <VideoPostDetailProvider value={{ nkid: params.nkid, currentPart: 0, videoPostDetail: videoPostDetailVO }}>
            {children}
        </VideoPostDetailProvider>

    )
};
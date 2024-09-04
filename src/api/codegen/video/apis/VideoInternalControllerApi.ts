/* tslint:disable */
/* eslint-disable */
/**
 * service-video
 * 视频服务API接口说明
 *
 * The version of the OpenAPI document: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';

export interface UpdateVideoResourceRequest {
    videoId: number;
    dashMpdUrl: number;
}

/**
 * 
 */
export class VideoInternalControllerApi extends runtime.BaseAPI {

    /**
     * 更新视频资源信息
     */
    async updateVideoResourceRaw(requestParameters: UpdateVideoResourceRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.videoId === null || requestParameters.videoId === undefined) {
            throw new runtime.RequiredError('videoId','Required parameter requestParameters.videoId was null or undefined when calling updateVideoResource.');
        }

        if (requestParameters.dashMpdUrl === null || requestParameters.dashMpdUrl === undefined) {
            throw new runtime.RequiredError('dashMpdUrl','Required parameter requestParameters.dashMpdUrl was null or undefined when calling updateVideoResource.');
        }

        const queryParameters: any = {};

        if (requestParameters.videoId !== undefined) {
            queryParameters['videoId'] = requestParameters.videoId;
        }

        if (requestParameters.dashMpdUrl !== undefined) {
            queryParameters['dashMpdUrl'] = requestParameters.dashMpdUrl;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/internal/video/updateVideoResource`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * 更新视频资源信息
     */
    async updateVideoResource(requestParameters: UpdateVideoResourceRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.updateVideoResourceRaw(requestParameters, initOverrides);
    }

}

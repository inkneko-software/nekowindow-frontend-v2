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

import { exists, mapValues } from '../runtime';
import type { VideoPostBriefVO } from './VideoPostBriefVO';
import {
    VideoPostBriefVOFromJSON,
    VideoPostBriefVOFromJSONTyped,
    VideoPostBriefVOToJSON,
} from './VideoPostBriefVO';

/**
 * 
 * @export
 * @interface ResponseListVideoPostBriefVO
 */
export interface ResponseListVideoPostBriefVO {
    /**
     * 
     * @type {number}
     * @memberof ResponseListVideoPostBriefVO
     */
    code?: number;
    /**
     * 
     * @type {string}
     * @memberof ResponseListVideoPostBriefVO
     */
    message?: string;
    /**
     * 
     * @type {Array<VideoPostBriefVO>}
     * @memberof ResponseListVideoPostBriefVO
     */
    data?: Array<VideoPostBriefVO>;
}

/**
 * Check if a given object implements the ResponseListVideoPostBriefVO interface.
 */
export function instanceOfResponseListVideoPostBriefVO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ResponseListVideoPostBriefVOFromJSON(json: any): ResponseListVideoPostBriefVO {
    return ResponseListVideoPostBriefVOFromJSONTyped(json, false);
}

export function ResponseListVideoPostBriefVOFromJSONTyped(json: any, ignoreDiscriminator: boolean): ResponseListVideoPostBriefVO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'code': !exists(json, 'code') ? undefined : json['code'],
        'message': !exists(json, 'message') ? undefined : json['message'],
        'data': !exists(json, 'data') ? undefined : ((json['data'] as Array<any>).map(VideoPostBriefVOFromJSON)),
    };
}

export function ResponseListVideoPostBriefVOToJSON(value?: ResponseListVideoPostBriefVO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'code': value.code,
        'message': value.message,
        'data': value.data === undefined ? undefined : ((value.data as Array<any>).map(VideoPostBriefVOToJSON)),
    };
}


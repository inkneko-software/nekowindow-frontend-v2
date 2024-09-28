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
import type { VideoHelloWorldCardVO } from './VideoHelloWorldCardVO';
import {
    VideoHelloWorldCardVOFromJSON,
    VideoHelloWorldCardVOFromJSONTyped,
    VideoHelloWorldCardVOToJSON,
} from './VideoHelloWorldCardVO';

/**
 * 
 * @export
 * @interface ResponseListVideoHelloWorldCardVO
 */
export interface ResponseListVideoHelloWorldCardVO {
    /**
     * 
     * @type {number}
     * @memberof ResponseListVideoHelloWorldCardVO
     */
    code?: number;
    /**
     * 
     * @type {string}
     * @memberof ResponseListVideoHelloWorldCardVO
     */
    message?: string;
    /**
     * 
     * @type {Array<VideoHelloWorldCardVO>}
     * @memberof ResponseListVideoHelloWorldCardVO
     */
    data?: Array<VideoHelloWorldCardVO>;
}

/**
 * Check if a given object implements the ResponseListVideoHelloWorldCardVO interface.
 */
export function instanceOfResponseListVideoHelloWorldCardVO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ResponseListVideoHelloWorldCardVOFromJSON(json: any): ResponseListVideoHelloWorldCardVO {
    return ResponseListVideoHelloWorldCardVOFromJSONTyped(json, false);
}

export function ResponseListVideoHelloWorldCardVOFromJSONTyped(json: any, ignoreDiscriminator: boolean): ResponseListVideoHelloWorldCardVO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'code': !exists(json, 'code') ? undefined : json['code'],
        'message': !exists(json, 'message') ? undefined : json['message'],
        'data': !exists(json, 'data') ? undefined : ((json['data'] as Array<any>).map(VideoHelloWorldCardVOFromJSON)),
    };
}

export function ResponseListVideoHelloWorldCardVOToJSON(value?: ResponseListVideoHelloWorldCardVO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'code': value.code,
        'message': value.message,
        'data': value.data === undefined ? undefined : ((value.data as Array<any>).map(VideoHelloWorldCardVOToJSON)),
    };
}

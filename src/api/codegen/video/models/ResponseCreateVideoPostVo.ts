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
import type { CreateVideoPostVO } from './CreateVideoPostVO';
import {
    CreateVideoPostVOFromJSON,
    CreateVideoPostVOFromJSONTyped,
    CreateVideoPostVOToJSON,
} from './CreateVideoPostVO';

/**
 * 
 * @export
 * @interface ResponseCreateVideoPostVO
 */
export interface ResponseCreateVideoPostVO {
    /**
     * 
     * @type {number}
     * @memberof ResponseCreateVideoPostVO
     */
    code?: number;
    /**
     * 
     * @type {string}
     * @memberof ResponseCreateVideoPostVO
     */
    message?: string;
    /**
     * 
     * @type {CreateVideoPostVO}
     * @memberof ResponseCreateVideoPostVO
     */
    data?: CreateVideoPostVO;
}

/**
 * Check if a given object implements the ResponseCreateVideoPostVO interface.
 */
export function instanceOfResponseCreateVideoPostVO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ResponseCreateVideoPostVOFromJSON(json: any): ResponseCreateVideoPostVO {
    return ResponseCreateVideoPostVOFromJSONTyped(json, false);
}

export function ResponseCreateVideoPostVOFromJSONTyped(json: any, ignoreDiscriminator: boolean): ResponseCreateVideoPostVO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'code': !exists(json, 'code') ? undefined : json['code'],
        'message': !exists(json, 'message') ? undefined : json['message'],
        'data': !exists(json, 'data') ? undefined : CreateVideoPostVOFromJSON(json['data']),
    };
}

export function ResponseCreateVideoPostVOToJSON(value?: ResponseCreateVideoPostVO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'code': value.code,
        'message': value.message,
        'data': CreateVideoPostVOToJSON(value.data),
    };
}


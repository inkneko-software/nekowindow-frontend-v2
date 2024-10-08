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
/**
 * 
 * @export
 * @interface ResponseString
 */
export interface ResponseString {
    /**
     * 
     * @type {number}
     * @memberof ResponseString
     */
    code?: number;
    /**
     * 
     * @type {string}
     * @memberof ResponseString
     */
    message?: string;
    /**
     * 
     * @type {string}
     * @memberof ResponseString
     */
    data?: string;
}

/**
 * Check if a given object implements the ResponseString interface.
 */
export function instanceOfResponseString(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ResponseStringFromJSON(json: any): ResponseString {
    return ResponseStringFromJSONTyped(json, false);
}

export function ResponseStringFromJSONTyped(json: any, ignoreDiscriminator: boolean): ResponseString {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'code': !exists(json, 'code') ? undefined : json['code'],
        'message': !exists(json, 'message') ? undefined : json['message'],
        'data': !exists(json, 'data') ? undefined : json['data'],
    };
}

export function ResponseStringToJSON(value?: ResponseString | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'code': value.code,
        'message': value.message,
        'data': value.data,
    };
}


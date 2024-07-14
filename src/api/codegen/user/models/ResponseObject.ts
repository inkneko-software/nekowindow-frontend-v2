/* tslint:disable */
/* eslint-disable */
/**
 * service-user
 * 用户服务API接口说明
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
 * @interface ResponseObject
 */
export interface ResponseObject {
    /**
     * 
     * @type {number}
     * @memberof ResponseObject
     */
    code?: number;
    /**
     * 
     * @type {string}
     * @memberof ResponseObject
     */
    message?: string;
    /**
     * 
     * @type {object}
     * @memberof ResponseObject
     */
    data?: object;
}

/**
 * Check if a given object implements the ResponseObject interface.
 */
export function instanceOfResponseObject(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ResponseObjectFromJSON(json: any): ResponseObject {
    return ResponseObjectFromJSONTyped(json, false);
}

export function ResponseObjectFromJSONTyped(json: any, ignoreDiscriminator: boolean): ResponseObject {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'code': !exists(json, 'code') ? undefined : json['code'],
        'message': !exists(json, 'message') ? undefined : json['message'],
        'data': !exists(json, 'data') ? undefined : json['data'],
    };
}

export function ResponseObjectToJSON(value?: ResponseObject | null): any {
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


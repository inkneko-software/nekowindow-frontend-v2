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
import type { MyUserDetailVO } from './MyUserDetailVO';
import {
    MyUserDetailVOFromJSON,
    MyUserDetailVOFromJSONTyped,
    MyUserDetailVOToJSON,
} from './MyUserDetailVO';

/**
 * 
 * @export
 * @interface ResponseMyUserDetailVO
 */
export interface ResponseMyUserDetailVO {
    /**
     * 
     * @type {number}
     * @memberof ResponseMyUserDetailVO
     */
    code?: number;
    /**
     * 
     * @type {string}
     * @memberof ResponseMyUserDetailVO
     */
    message?: string;
    /**
     * 
     * @type {MyUserDetailVO}
     * @memberof ResponseMyUserDetailVO
     */
    data?: MyUserDetailVO;
}

/**
 * Check if a given object implements the ResponseMyUserDetailVO interface.
 */
export function instanceOfResponseMyUserDetailVO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ResponseMyUserDetailVOFromJSON(json: any): ResponseMyUserDetailVO {
    return ResponseMyUserDetailVOFromJSONTyped(json, false);
}

export function ResponseMyUserDetailVOFromJSONTyped(json: any, ignoreDiscriminator: boolean): ResponseMyUserDetailVO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'code': !exists(json, 'code') ? undefined : json['code'],
        'message': !exists(json, 'message') ? undefined : json['message'],
        'data': !exists(json, 'data') ? undefined : MyUserDetailVOFromJSON(json['data']),
    };
}

export function ResponseMyUserDetailVOToJSON(value?: ResponseMyUserDetailVO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'code': value.code,
        'message': value.message,
        'data': MyUserDetailVOToJSON(value.data),
    };
}

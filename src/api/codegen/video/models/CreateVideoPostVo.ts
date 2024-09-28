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
 * @interface CreateVideoPostVO
 */
export interface CreateVideoPostVO {
    /**
     * 
     * @type {number}
     * @memberof CreateVideoPostVO
     */
    nkid: number;
}

/**
 * Check if a given object implements the CreateVideoPostVO interface.
 */
export function instanceOfCreateVideoPostVO(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "nkid" in value;

    return isInstance;
}

export function CreateVideoPostVOFromJSON(json: any): CreateVideoPostVO {
    return CreateVideoPostVOFromJSONTyped(json, false);
}

export function CreateVideoPostVOFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateVideoPostVO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'nkid': json['nkid'],
    };
}

export function CreateVideoPostVOToJSON(value?: CreateVideoPostVO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'nkid': value.nkid,
    };
}


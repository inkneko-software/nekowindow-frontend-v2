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
 * @interface Tag
 */
export interface Tag {
    /**
     * 
     * @type {number}
     * @memberof Tag
     */
    tagId?: number;
    /**
     * 
     * @type {number}
     * @memberof Tag
     */
    partitionId?: number;
    /**
     * 
     * @type {string}
     * @memberof Tag
     */
    name?: string;
}

/**
 * Check if a given object implements the Tag interface.
 */
export function instanceOfTag(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function TagFromJSON(json: any): Tag {
    return TagFromJSONTyped(json, false);
}

export function TagFromJSONTyped(json: any, ignoreDiscriminator: boolean): Tag {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'tagId': !exists(json, 'tagId') ? undefined : json['tagId'],
        'partitionId': !exists(json, 'partitionId') ? undefined : json['partitionId'],
        'name': !exists(json, 'name') ? undefined : json['name'],
    };
}

export function TagToJSON(value?: Tag | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'tagId': value.tagId,
        'partitionId': value.partitionId,
        'name': value.name,
    };
}

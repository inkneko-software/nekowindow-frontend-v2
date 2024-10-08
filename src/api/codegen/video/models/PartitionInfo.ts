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
 * @interface PartitionInfo
 */
export interface PartitionInfo {
    /**
     * 
     * @type {number}
     * @memberof PartitionInfo
     */
    partitionId?: number;
    /**
     * 
     * @type {string}
     * @memberof PartitionInfo
     */
    partitionName?: string;
    /**
     * 
     * @type {string}
     * @memberof PartitionInfo
     */
    description?: string;
}

/**
 * Check if a given object implements the PartitionInfo interface.
 */
export function instanceOfPartitionInfo(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PartitionInfoFromJSON(json: any): PartitionInfo {
    return PartitionInfoFromJSONTyped(json, false);
}

export function PartitionInfoFromJSONTyped(json: any, ignoreDiscriminator: boolean): PartitionInfo {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'partitionId': !exists(json, 'partitionId') ? undefined : json['partitionId'],
        'partitionName': !exists(json, 'partitionName') ? undefined : json['partitionName'],
        'description': !exists(json, 'description') ? undefined : json['description'],
    };
}

export function PartitionInfoToJSON(value?: PartitionInfo | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'partitionId': value.partitionId,
        'partitionName': value.partitionName,
        'description': value.description,
    };
}


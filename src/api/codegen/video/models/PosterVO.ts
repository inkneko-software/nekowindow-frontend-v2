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
 * 海报列表
 * @export
 * @interface PosterVO
 */
export interface PosterVO {
    /**
     * 海报描述
     * @type {string}
     * @memberof PosterVO
     */
    description: string;
    /**
     * 海报图片
     * @type {string}
     * @memberof PosterVO
     */
    imageURL: string;
    /**
     * 活动跳转链接
     * @type {string}
     * @memberof PosterVO
     */
    activityURL: string;
}

/**
 * Check if a given object implements the PosterVO interface.
 */
export function instanceOfPosterVO(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "description" in value;
    isInstance = isInstance && "imageURL" in value;
    isInstance = isInstance && "activityURL" in value;

    return isInstance;
}

export function PosterVOFromJSON(json: any): PosterVO {
    return PosterVOFromJSONTyped(json, false);
}

export function PosterVOFromJSONTyped(json: any, ignoreDiscriminator: boolean): PosterVO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'description': json['description'],
        'imageURL': json['imageURL'],
        'activityURL': json['activityURL'],
    };
}

export function PosterVOToJSON(value?: PosterVO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'description': value.description,
        'imageURL': value.imageURL,
        'activityURL': value.activityURL,
    };
}


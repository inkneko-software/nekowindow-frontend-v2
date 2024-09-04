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
 * @interface VideoPostResourceVo
 */
export interface VideoPostResourceVo {
    /**
     * 
     * @type {number}
     * @memberof VideoPostResourceVo
     */
    videoId?: number;
    /**
     * 
     * @type {string}
     * @memberof VideoPostResourceVo
     */
    title?: string;
    /**
     * 
     * @type {number}
     * @memberof VideoPostResourceVo
     */
    visit?: number;
    /**
     * 
     * @type {string}
     * @memberof VideoPostResourceVo
     */
    dashMpdUrl?: string;
}

/**
 * Check if a given object implements the VideoPostResourceVo interface.
 */
export function instanceOfVideoPostResourceVo(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function VideoPostResourceVoFromJSON(json: any): VideoPostResourceVo {
    return VideoPostResourceVoFromJSONTyped(json, false);
}

export function VideoPostResourceVoFromJSONTyped(json: any, ignoreDiscriminator: boolean): VideoPostResourceVo {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'videoId': !exists(json, 'videoId') ? undefined : json['videoId'],
        'title': !exists(json, 'title') ? undefined : json['title'],
        'visit': !exists(json, 'visit') ? undefined : json['visit'],
        'dashMpdUrl': !exists(json, 'dashMpdUrl') ? undefined : json['dashMpdUrl'],
    };
}

export function VideoPostResourceVoToJSON(value?: VideoPostResourceVo | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'videoId': value.videoId,
        'title': value.title,
        'visit': value.visit,
        'dashMpdUrl': value.dashMpdUrl,
    };
}


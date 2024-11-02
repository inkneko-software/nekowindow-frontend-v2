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
 * @interface UpdateUserDetailDTO
 */
export interface UpdateUserDetailDTO {
    /**
     * 
     * @type {string}
     * @memberof UpdateUserDetailDTO
     */
    username?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateUserDetailDTO
     */
    sign?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateUserDetailDTO
     */
    gender?: string;
    /**
     * 
     * @type {Date}
     * @memberof UpdateUserDetailDTO
     */
    birth?: Date;
    /**
     * 
     * @type {string}
     * @memberof UpdateUserDetailDTO
     */
    avatarUrl?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateUserDetailDTO
     */
    bannerUrl?: string;
}

/**
 * Check if a given object implements the UpdateUserDetailDTO interface.
 */
export function instanceOfUpdateUserDetailDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function UpdateUserDetailDTOFromJSON(json: any): UpdateUserDetailDTO {
    return UpdateUserDetailDTOFromJSONTyped(json, false);
}

export function UpdateUserDetailDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateUserDetailDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'username': !exists(json, 'username') ? undefined : json['username'],
        'sign': !exists(json, 'sign') ? undefined : json['sign'],
        'gender': !exists(json, 'gender') ? undefined : json['gender'],
        'birth': !exists(json, 'birth') ? undefined : (new Date(json['birth'])),
        'avatarUrl': !exists(json, 'avatarUrl') ? undefined : json['avatarUrl'],
        'bannerUrl': !exists(json, 'bannerUrl') ? undefined : json['bannerUrl'],
    };
}

export function UpdateUserDetailDTOToJSON(value?: UpdateUserDetailDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'username': value.username,
        'sign': value.sign,
        'gender': value.gender,
        'birth': value.birth === undefined ? undefined : (value.birth.toISOString()),
        'avatarUrl': value.avatarUrl,
        'bannerUrl': value.bannerUrl,
    };
}


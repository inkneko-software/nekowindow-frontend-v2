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
 * @interface UserDetailVO
 */
export interface UserDetailVO {
    /**
     * 
     * @type {number}
     * @memberof UserDetailVO
     */
    uid?: number;
    /**
     * 
     * @type {string}
     * @memberof UserDetailVO
     */
    username?: string;
    /**
     * 
     * @type {string}
     * @memberof UserDetailVO
     */
    sign?: string;
    /**
     * 
     * @type {number}
     * @memberof UserDetailVO
     */
    exp?: number;
    /**
     * 
     * @type {string}
     * @memberof UserDetailVO
     */
    gender?: string;
    /**
     * 
     * @type {Date}
     * @memberof UserDetailVO
     */
    birth?: Date;
    /**
     * 
     * @type {string}
     * @memberof UserDetailVO
     */
    avatarUrl?: string;
    /**
     * 
     * @type {string}
     * @memberof UserDetailVO
     */
    bannerUrl?: string;
    /**
     * 
     * @type {number}
     * @memberof UserDetailVO
     */
    fans?: number;
    /**
     * 
     * @type {number}
     * @memberof UserDetailVO
     */
    subscribes?: number;
}

/**
 * Check if a given object implements the UserDetailVO interface.
 */
export function instanceOfUserDetailVO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function UserDetailVOFromJSON(json: any): UserDetailVO {
    return UserDetailVOFromJSONTyped(json, false);
}

export function UserDetailVOFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserDetailVO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'uid': !exists(json, 'uid') ? undefined : json['uid'],
        'username': !exists(json, 'username') ? undefined : json['username'],
        'sign': !exists(json, 'sign') ? undefined : json['sign'],
        'exp': !exists(json, 'exp') ? undefined : json['exp'],
        'gender': !exists(json, 'gender') ? undefined : json['gender'],
        'birth': !exists(json, 'birth') ? undefined : (new Date(json['birth'])),
        'avatarUrl': !exists(json, 'avatarUrl') ? undefined : json['avatarUrl'],
        'bannerUrl': !exists(json, 'bannerUrl') ? undefined : json['bannerUrl'],
        'fans': !exists(json, 'fans') ? undefined : json['fans'],
        'subscribes': !exists(json, 'subscribes') ? undefined : json['subscribes'],
    };
}

export function UserDetailVOToJSON(value?: UserDetailVO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'uid': value.uid,
        'username': value.username,
        'sign': value.sign,
        'exp': value.exp,
        'gender': value.gender,
        'birth': value.birth === undefined ? undefined : (value.birth.toISOString()),
        'avatarUrl': value.avatarUrl,
        'bannerUrl': value.bannerUrl,
        'fans': value.fans,
        'subscribes': value.subscribes,
    };
}


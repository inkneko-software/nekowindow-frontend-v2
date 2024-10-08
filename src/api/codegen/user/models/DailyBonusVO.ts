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
 * @interface DailyBonusVO
 */
export interface DailyBonusVO {
    /**
     * 用户id
     * @type {number}
     * @memberof DailyBonusVO
     */
    userId: number;
    /**
     * 是否成功获得了登录奖励。若当天已获得奖励，该值为false
     * @type {boolean}
     * @memberof DailyBonusVO
     */
    isGotBonus: boolean;
    /**
     * 当前硬币数
     * @type {number}
     * @memberof DailyBonusVO
     */
    currentCoins: number;
}

/**
 * Check if a given object implements the DailyBonusVO interface.
 */
export function instanceOfDailyBonusVO(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "userId" in value;
    isInstance = isInstance && "isGotBonus" in value;
    isInstance = isInstance && "currentCoins" in value;

    return isInstance;
}

export function DailyBonusVOFromJSON(json: any): DailyBonusVO {
    return DailyBonusVOFromJSONTyped(json, false);
}

export function DailyBonusVOFromJSONTyped(json: any, ignoreDiscriminator: boolean): DailyBonusVO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'userId': json['userId'],
        'isGotBonus': json['isGotBonus'],
        'currentCoins': json['currentCoins'],
    };
}

export function DailyBonusVOToJSON(value?: DailyBonusVO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'userId': value.userId,
        'isGotBonus': value.isGotBonus,
        'currentCoins': value.currentCoins,
    };
}


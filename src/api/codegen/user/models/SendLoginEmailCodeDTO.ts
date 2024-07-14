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
 * @interface SendLoginEmailCodeDTO
 */
export interface SendLoginEmailCodeDTO {
    /**
     * 
     * @type {string}
     * @memberof SendLoginEmailCodeDTO
     */
    email?: string;
}

/**
 * Check if a given object implements the SendLoginEmailCodeDTO interface.
 */
export function instanceOfSendLoginEmailCodeDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function SendLoginEmailCodeDTOFromJSON(json: any): SendLoginEmailCodeDTO {
    return SendLoginEmailCodeDTOFromJSONTyped(json, false);
}

export function SendLoginEmailCodeDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): SendLoginEmailCodeDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'email': !exists(json, 'email') ? undefined : json['email'],
    };
}

export function SendLoginEmailCodeDTOToJSON(value?: SendLoginEmailCodeDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'email': value.email,
    };
}


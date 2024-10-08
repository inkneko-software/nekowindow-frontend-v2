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
import type { PartitionInfo } from './PartitionInfo';
import {
    PartitionInfoFromJSON,
    PartitionInfoFromJSONTyped,
    PartitionInfoToJSON,
} from './PartitionInfo';
import type { PosterVO } from './PosterVO';
import {
    PosterVOFromJSON,
    PosterVOFromJSONTyped,
    PosterVOToJSON,
} from './PosterVO';
import type { VideoPostBriefVO } from './VideoPostBriefVO';
import {
    VideoPostBriefVOFromJSON,
    VideoPostBriefVOFromJSONTyped,
    VideoPostBriefVOToJSON,
} from './VideoPostBriefVO';

/**
 * 
 * @export
 * @interface HomeRecommendVO
 */
export interface HomeRecommendVO {
    /**
     * 海报列表
     * @type {Array<PosterVO>}
     * @memberof HomeRecommendVO
     */
    posters: Array<PosterVO>;
    /**
     * 全站视频推荐
     * @type {Array<VideoPostBriefVO>}
     * @memberof HomeRecommendVO
     */
    recommendVideos: Array<VideoPostBriefVO>;
    /**
     * 热销商品列表
     * @type {Array<string>}
     * @memberof HomeRecommendVO
     */
    popularMerchants: Array<string>;
    /**
     * 分区列表
     * @type {Array<PartitionInfo>}
     * @memberof HomeRecommendVO
     */
    partitions: Array<PartitionInfo>;
    /**
     * 对应分区的热门视频推荐列表（每个分区最多10个推荐视频）
     * @type {Array<Array<VideoPostBriefVO>>}
     * @memberof HomeRecommendVO
     */
    partitionVideos: Array<Array<VideoPostBriefVO>>;
}

/**
 * Check if a given object implements the HomeRecommendVO interface.
 */
export function instanceOfHomeRecommendVO(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "posters" in value;
    isInstance = isInstance && "recommendVideos" in value;
    isInstance = isInstance && "popularMerchants" in value;
    isInstance = isInstance && "partitions" in value;
    isInstance = isInstance && "partitionVideos" in value;

    return isInstance;
}

export function HomeRecommendVOFromJSON(json: any): HomeRecommendVO {
    return HomeRecommendVOFromJSONTyped(json, false);
}

export function HomeRecommendVOFromJSONTyped(json: any, ignoreDiscriminator: boolean): HomeRecommendVO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'posters': ((json['posters'] as Array<any>).map(PosterVOFromJSON)),
        'recommendVideos': ((json['recommendVideos'] as Array<any>).map(VideoPostBriefVOFromJSON)),
        'popularMerchants': json['popularMerchants'],
        'partitions': ((json['partitions'] as Array<any>).map(PartitionInfoFromJSON)),
        'partitionVideos': json['partitionVideos'],
    };
}

export function HomeRecommendVOToJSON(value?: HomeRecommendVO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'posters': ((value.posters as Array<any>).map(PosterVOToJSON)),
        'recommendVideos': ((value.recommendVideos as Array<any>).map(VideoPostBriefVOToJSON)),
        'popularMerchants': value.popularMerchants,
        'partitions': ((value.partitions as Array<any>).map(PartitionInfoToJSON)),
        'partitionVideos': value.partitionVideos,
    };
}


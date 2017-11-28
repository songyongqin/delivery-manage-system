import request from 'utils/request';
import ApiConfig from 'configs/ApiConfig';
import commonRequestCreator from 'utils/commonRequestCreator';

const httpApi = ApiConfig.http;
export const query = commonRequestCreator.get(httpApi.OVERVIEW_LAST_EVENT)


export const queryStatistics = commonRequestCreator.get(httpApi.ANALYSE_EVENT_STATISTICS)

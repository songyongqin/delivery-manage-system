import request from '../../utils/request';
import ApiConfig from '../../configs/ApiConfig';
import * as tools from '../../utils/tools';

import commonRequestCreator from '../../utils/commonRequestCreator';

const httpApi = ApiConfig.http;

export const get = payload => {
  return commonRequestCreator.get(httpApi.ANALYSE_RANKING + payload.option)(payload, true)
};

export const getRankingOption = commonRequestCreator.get(httpApi.ANALYSE_RANKING_OPTION)


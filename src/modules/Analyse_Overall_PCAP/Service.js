import request from '../../utils/request';
import ApiConfig from '../../configs/ApiConfig';
import * as tools from '../../utils/tools';

import commonRequestCreator from '../../utils/commonRequestCreator';

const httpApi = ApiConfig.http;

export const get = commonRequestCreator.get(httpApi.ANALYSE_OVERALL_PCAP);
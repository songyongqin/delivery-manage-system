import request from '../../utils/request';
import ApiConfig from '../../configs/ApiConfig';
import * as tools from '../../utils/tools';
const httpApi = ApiConfig.http;
import commonRequestCreator from 'utils/commonRequestCreator'

export const query = commonRequestCreator.get(httpApi.ANALYSE_ATTACK_CHAIN)


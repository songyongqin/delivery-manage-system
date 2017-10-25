import { routerRedux } from 'dva/router';
import moment from 'moment';
import * as service from './Service';
import { queryModelGenerator } from '../../utils/dvaModelGenerator';
import { commonCallConfig } from '../../configs/ExtraEffectsOptions';
import {
    NAMESPACE,
    MODULE_LIST_DATA_INDEX,
    MONITOR_PERIOD_DATA_INDEX
} from './ConstConfig'
moment.locale('zh-cn');

const callConfig = {
    withStatusHandle: true,
    withTime: true,
}

export default ({ type, namespace }) => {
    const baseModel = {
        namespace,
        state: {
            queryFilters: {
                limit: 10,
                page: 1,
                type
            },
            queryResults: {
                config: {
                    [MODULE_LIST_DATA_INDEX]: {},
                    [MONITOR_PERIOD_DATA_INDEX]: 0
                },
                total: 0,
                data: []
            }
        },
        reducers: {
            setSetting: (preState, { payload }) => {
                return {
                    ...preState,
                    queryResults: {
                        ...preState.queryResults,
                        config: payload
                    }
                }
            }
        },
        effects: {
            getSetting: [function* ({ resolve }, { callWithExtra, put }) {
                const res = yield callWithExtra(
                    service.getSetting,
                    {
                        type
                    },
                    callConfig
                )

                if (res.status === 1) {
                    yield put({
                        type: `setSetting`,
                        payload: res.payload
                    })
                    resolve && resolve(res.payload);
                }
            }, { type: 'takeLatest' }, { type: "withTime" }],
            putSetting: [function* ({ resolve, payload }, { callWithExtra, put }) {
                const res = yield callWithExtra(
                    service.putSetting,
                    {
                        type,
                        payload
                    },
                    callConfig
                )
                if (res.status === 1) {
                    resolve && resolve(res.payload);
                }
            }, { type: 'takeLatest' }]
        },

    };

    const payloadFilter = (payload) => {
        return {
            total: payload.total,
            data: payload.data,
        }
    };

    const queryService = service.getLog;


    return queryModelGenerator({
        model: baseModel,
        payloadFilter,
        callConfig: commonCallConfig,
        queryService,
    });
}
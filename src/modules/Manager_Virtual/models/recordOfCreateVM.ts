import { RECORD_OF_CREATE_VM_NAMESPACE, MANAGER_VM_NAMESPACE } from 'constants/model'
import {
  fetchVMCreateStatus
} from '../services'
import isSuccess from 'domainUtils/isSuccess'
import delay from 'utils/delay'
import { setTemp, getTemp } from 'utils'
import { notification } from 'antd'
import { omit } from 'utils'

notification.config({
  placement: 'bottomRight',
  bottom: 50,
  duration: 3,
})

const CREATING_VM_ID_LIST_CACHE_NAMESPACE = "@@__CREATING_VM_ID_LIST_CACHE_NAMESPACE__@@"


export default {
  namespace: RECORD_OF_CREATE_VM_NAMESPACE,
  state: {
    recordOfCreateVM: {},
    panelVisible: false
  },
  reducers: {
    updateRecordItem: (preState, { payload }) => {
      const { honeypotId } = payload
      const preRecordItem = preState.recordOfCreateVM[honeypotId] || {}
      return {
        ...preState,
        recordOfCreateVM: {
          ...preState.recordOfCreateVM,
          [honeypotId]: {
            ...preRecordItem,
            ...payload
          }
        }
      }

    },
    changePanelVisible: (preState, { payload }) => {
      return {
        ...preState,
        panelVisible: payload
      }
    },
    _removeRecordItem: (preState, { payload }) => {
      return {
        ...preState,
        recordOfCreateVM: omit([payload], preState.recordOfCreateVM)
      }
    }
  },
  effects: {
    removeRecordItem: function* ({ payload }, { put, take }) {

      yield put({
        type: "_removeRecordItem",
        payload
      })

      yield put({
        type: "cacheRecordOfCreateVM"
      })

    },
    monitorVMCreate: function* ({ payload = {} }, { put }) {

      yield put({
        type: "updateRecordItem",
        payload: {
          status: 0,
          error: false,
          order: new Date().getTime(),
          ...payload
        }
      })

      yield put({
        type: "cacheRecordOfCreateVM"
      })

      yield put({
        type: "fetchVMCreateStatus",
        payload,
      })

    },
    fetchVMCreateStatus:
      function* ({ payload = { restFailedAllowTime: 4, honeypotId: null }, resolve, reject }, { call, put, select }) {

        const CREATE_SUCCESS = 4

        const { restFailedAllowTime = 4, honeypotId } = payload

        const res = yield call(fetchVMCreateStatus, payload)

        const success = isSuccess(res)

        const createStatus = res.payload
        //請求成功 更新狀態
        if (success) {
          yield put({
            type: "updateRecordItem",
            payload: {
              honeypotId,
              status: createStatus,
              error: false
            }
          })
          resolve && resolve(createStatus)
        }

        //創建蜜罐尚未成功 繼續請求 
        if (success && createStatus !== CREATE_SUCCESS) {
          yield delay(2000)
          yield put({
            type: "fetchVMCreateStatus",
            payload: {
              restFailedAllowTime,
              honeypotId,
            }
          })
        }

        //請求失敗 且 允許請求失敗的剩余次數不為0 繼續請求
        if (restFailedAllowTime !== 0 && !success) {
          yield delay(2000)
          yield put({
            type: "fetchVMCreateStatus",
            payload: {
              restFailedAllowTime: restFailedAllowTime - 1,
              honeypotId,
            }
          })
        }

        //請求失敗 且 允許請求失敗的剩余次數為0 標記為失敗
        if (restFailedAllowTime === 0 && !success) {
          yield put({
            type: "updateRecordItem",
            payload: {
              honeypotId,
              error: true,
            }
          })
        }

        //緩存創建中的蜜罐信息
        yield put({
          type: "cacheRecordOfCreateVM"
        })

        //
        yield put({
          type: "handleCreateVMResult",
          payload: {
            success,
            res,
            restFailedAllowTime,
            honeypotId
          }
        })


      },

    cacheRecordOfCreateVM: function* (_, { put, select }) {
      const CREATE_SUCCESS = 4

      const { recordOfCreateVM } = yield select(state => state[RECORD_OF_CREATE_VM_NAMESPACE])

      const shouldCacheList = Object.entries(recordOfCreateVM).reduce((shouldCacheIdList, [honeypotId, value]) => {

        const { status, error } = value as any

        if (status !== CREATE_SUCCESS && !error) {
          shouldCacheIdList.push(value)
        }
        return shouldCacheIdList
      }, [])

      setTemp(CREATING_VM_ID_LIST_CACHE_NAMESPACE, shouldCacheList)


    },
    handleCreateVMResult: function* ({ payload }, { call, put, select }) {
      const CREATE_SUCCESS = 4
      const { success, restFailedAllowTime, honeypotId, res } = payload
      const createStatus = res.payload
      const { panelVisible, recordOfCreateVM } = yield select(state => state[RECORD_OF_CREATE_VM_NAMESPACE])
      const record = recordOfCreateVM[honeypotId]


      if (success && createStatus === CREATE_SUCCESS && !panelVisible) {
        notification.success({
          message: '蜜罐虛擬機創建成功',
          description: `蜜罐 ${record.honeypotName} 創建成功`,
          duration: 5,
        })
      }

      if (restFailedAllowTime === 0 && !success && !panelVisible) {
        notification.error({
          message: `蜜罐虛擬機創建失敗`,
          description: `蜜罐 ${record.honeypotName} 創建失敗，原因:${res.message}`,
          duration: 5,
        })
      }

      if (success && createStatus === CREATE_SUCCESS) {
        yield put({
          type: `${MANAGER_VM_NAMESPACE}/updateLastReqTime`
        })
      }
    }
  }
}
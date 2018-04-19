/**
 * Created by jojo on 2017/8/21.
 */
import { routerRedux, hashHistory } from 'dva/router'
import moment from 'moment'
import * as service from '../services'
import {
  MD5_DATA_INDEX,
  CURRENT_CHUNK_DATA_INDEX,
  CHUNK_DATA_INDEX,
  UPLOAD_STATUS,
  MERGE_STATUS,
  COMMON_STATUS,
  INIT_STATUS,
  REMOTE_METHOD,
  LOCAL_METHOD,
} from '../ConstConfig'

import { delay, setTemp, getTemp, } from 'utils'
import { splitFileToChunk } from 'utils/fileSplitUpload'
import { getFileMD5 } from 'utils/md5'
import { getUploadTask } from '../services'
import { MANAGER_MIRROR_OPERATION_NAMESPACE } from 'constants/model'

moment.locale('zh-cn');

const CHUNK_SIZE = 1024 * 1024 * 2

const callConfig = {
  withArgsCombiner: true,
  withStatusHandle: true,
  withTime: true,
}

const initLocalUploadInfo = {
  status: COMMON_STATUS,
  md5: null,
  file: null,
  fileSize: 0,
  fileName: null,
  progress: 0,
  chunkCount: 0,
  currentChunk: -1,
  remoteTask: {},
  chunkList: [],
  mergeResult: {}
}

const baseModel = {
  namespace: MANAGER_MIRROR_OPERATION_NAMESPACE,
  state: {
    queryFilters: {

    },
    queryResults: {

    },
    localUploadInfo: initLocalUploadInfo,
    shouldReload: false,
    activePanel: REMOTE_METHOD,
    panelVisible: true,
    updateLoading: false
  },
  reducers: {
    changeUpdateLoadingStatus: (preState, { payload }) => {
      return {
        ...preState,
        updateLoading: payload,
      }
    },
    changePanelVisible: (preState, { payload }) => {
      return {
        ...preState,
        panelVisible: payload,
      }
    },
    changeActivePanel: (preState, { payload }) => {
      return {
        ...preState,
        activePanel: payload
      }
    },
    changeReloadStatus: (preState, { payload }) => {
      return {
        ...preState,
        shouldReload: payload
      }
    },
    saveLocalUploadInfo: (preState, { payload }) => {
      return {
        ...preState,
        localUploadInfo: {
          ...preState.localUploadInfo,
          ...payload
        }
      }
    },
    initLocalUploadInfo: (preState, { payload }) => {
      return {
        ...preState,
        localUploadInfo: initLocalUploadInfo
      }
    }
  },
  effects: {
    *initUploadTask({ resolve, payload }, { call, put, select }) {

      const { file } = payload;

      yield put({
        type: "saveLocalUploadInfo",
        payload: {
          status: INIT_STATUS,
          fileName: file.name,
          fileSize: file.size,
        }
      })

      const [md5, res] = yield [
        call(getFileMD5, file),
        call(service.getUploadTask, {})
      ]

      if (res.status !== 1) {
        return yield put({
          type: "saveLocalUploadInfo",
          payload: {
            status: COMMON_STATUS,
          }
        })
      }

      const target = res.payload.find(i => i.md5 === md5)

      const chunkList = splitFileToChunk(file, CHUNK_SIZE)

      const chunkCount = chunkList.length;

      const newUploadInfo = {
        md5,
        file,
        chunkList,
        fileName: file.name,
        fileSize: file.size,
        chunkCount,
        progress: 0,
        currentChunk: 0,
        status: INIT_STATUS
      }
      //服务器上存在任务，获取任务进度
      if (target) {
        const { currentChunk } = target
        newUploadInfo["currentChunk"] = currentChunk + 1;
        newUploadInfo["progress"] = currentChunk / chunkList.length

        yield put({
          type: "saveLocalUploadInfo",
          payload: newUploadInfo
        })
        resolve && resolve()

        return
      }
      //服务器上不存在任务，初始化任务
      const newTaskRes = yield call(service.createUploadTask, {
        md5,
        fileName: file.name,
        fileSize: file.size,
        chunkSize: CHUNK_SIZE,
        chunkCount
      })


      if (newTaskRes.status === 1) {

        yield put({
          type: "saveLocalUploadInfo",
          payload: newUploadInfo
        })

        resolve && resolve()
      }


    },

    *putFileChunk({ resolve, payload }, { call, put, select }) {

      const { chunkList, currentChunk, file, md5, chunkCount } = yield select(state => state[MANAGER_MIRROR_OPERATION_NAMESPACE].localUploadInfo)

      yield put({
        type: "saveLocalUploadInfo",
        payload: {
          status: UPLOAD_STATUS
        }
      })

      yield put({
        type: "changeUpdateLoadingStatus",
        payload: true
      })

      const res = yield call(service.putFileChunk, {
        chunk: chunkList[currentChunk].chunk,
        currentChunk,
        md5,
      })



      const lastCurrent = currentChunk + 1
      //上传成功，进行下一个chunk的上传
      if (res.status === 1 && lastCurrent < chunkList.length) {
        yield put({
          type: "saveLocalUploadInfo",
          payload: {
            currentChunk: currentChunk + 1,
            progress: currentChunk / chunkCount,
            status: UPLOAD_STATUS
          }
        })

        yield put({
          type: "putFileChunk"
        })
      }

      //上传失败，重新上传
      if (res.status !== 1 && currentChunk < chunkList.length) {

        yield delay(2000)

        yield put({
          type: "putFileChunk",
        })

      }

      //全部上传结束 ，发起合并请求
      if (res.status === 1 && lastCurrent >= chunkList.length) {

        yield put({
          type: "saveLocalUploadInfo",
          payload: {
            progress: 1,
            status: UPLOAD_STATUS
          }
        })

        yield put({
          type: "mergeUploadTask",
          payload: {
            md5
          }
        })

      }



    },
    //合并上传的任务
    *mergeUploadTask({ resolve, payload }, { call, put }) {

      yield put({
        type: "saveLocalUploadInfo",
        payload: {
          status: MERGE_STATUS
        }
      })

      const res = yield call(service.mergeUploadTask, payload)

      // if (res.status === 1) {

      yield put({
        type: "saveLocalUploadInfo",
        payload: {
          mergeResult: res
        }
      })

      yield put({
        type: "changeReloadStatus",
        payload: true,
      })

      yield put({
        type: "changeUpdateLoadingStatus",
        payload: false
      })

      resolve && resolve()
      // }
    },
    *updateRemote({ resolve, payload }, { call, put }) {
      const res = yield call(service.updateRemote, payload)

      // if (res.status === 1) {
      yield put({
        type: "changeReloadStatus",
        payload: true,
      })
      resolve && resolve(res)
      // }

    },
    *updateNodeMirror({ resolve, payload }, { call, put }) {
      const res = yield call(service.updateNodeMirror, payload)
      if (res.status === 1) {
        resolve && resolve(res.payload)
      }
    }
  },
}

export default baseModel
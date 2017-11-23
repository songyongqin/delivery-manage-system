/**
 * Created by jojo on 2017/8/21.
 */
import { routerRedux, hashHistory } from 'dva/router';
import moment from 'moment';
import * as service from '../Service';
import { queryModelGenerator } from 'utils/dvaModelGenerator';
import { commonCallConfig } from 'configs/ExtraEffectsOptions';
import {
  OPERATION_NAMESPACE,
  MD5_DATA_INDEX,
  CURRENT_CHUNK_DATA_INDEX,
  CHUNK_DATA_INDEX,
  UPLOAD_STATUS,
  MERGE_STATUS,
  COMMON_STATUS
} from '../ConstConfig';

import { delay, setTemp, getTemp, getFileMd5, splitFileToChunk } from 'utils/tools';
import { getUploadTask } from '../Service';

moment.locale('zh-cn');

const CHUNK_SIZE = 1024 * 1024 * 2

const callConfig = {
  withArgsCombiner: true,
  withStatusHandle: true,
  withTime: true,
}

const baseModel = {
  namespace: OPERATION_NAMESPACE,
  state: {
    queryFilters: {

    },

    queryResults: {

    },
    localUpdateStatus: COMMON_STATUS,
    uploadInfo: {
      md5: null,
      chunkCount: 0,
      chunkProgress: [],
      fileSize: 0,
      fileName: null,
      progress: 0,
      loading: false,
    },
    mergeInfo: {
      loading: false,
      isSuccess: false,
      isError: false,
      result: null
    }
  },
  reducers: {
    setLocalUpdateStatus: (preState, { payload }) => {
      return {
        ...preState,
        localUpdateStatus: payload,
      }
    },
    saveUploadProgress: (preState, { payload }) => {
      return {
        ...preState,
        uploadInfo: {
          ...preState.uploadInfo,
          ...payload
        }
      }
    },
    saveMergeInfo: (preState, { payload }) => {
      return {
        ...preState,
        mergeInfo: {
          ...preState.mergeInfo,
          ...payload,
        }
      }
    }
  },
  effects: {

    *createUploadTask({ resolve, payload }, { call, put, select, callWithExtra }) {

      const { file } = payload;

      yield put({
        type: "saveUploadProgress",
        payload: {
          loading: true,
        }
      })

      const md5 = yield call(getFileMd5, file)

      const uploadHistoryRes = yield callWithExtra(service.getUploadTask, {})

      let hasHistory = false;
      let target = null;

      if (uploadHistoryRes.status === 1) {
        target = uploadHistoryRes.payload[0]
        const currentMd5 = target.md5
        hasHistory = currentMd5 === md5
      }

      const chunkList = splitFileToChunk(file, CHUNK_SIZE)

      const chunkCount = chunkList.length;


      if (hasHistory) {

        const { uploadInfo } = yield select(state => state[OPERATION_NAMESPACE])

        const currentChunk = target.currentChunk + 1

        const newUploadInfo = {
          ...uploadInfo,
          md5,
          chunkCount,
          chunkProgress: new Array(currentChunk + 1).fill(1),
          fileSize: file.size,
          fileName: file.name,
          loading: true,
        }

        yield put({
          type: "saveUploadProgress",
          payload: newUploadInfo
        })

        yield delay(500)

        yield put({
          type: "putFileChunk",
          payload: {
            chunkList,
            currentChunk,
            file,
            md5,
          }
        })

      } else {


        yield put({
          type: `createNewTask`,
          payload: {
            md5,
            file,
            chunkSize: CHUNK_SIZE,
            chunkCount,
            chunkList,
          }
        })
      }



    },
    *createNewTask({ resolve, payload }, { call, put, callWithExtra, select }) {
      const { md5, file, chunkSize, chunkCount, chunkList } = payload;

      const res = yield callWithExtra(service.createUploadTask, {
        md5,
        fileName: file.name,
        fileSize: file.size,
        chunkSize: CHUNK_SIZE,
        chunkCount
      }, commonCallConfig)

      if (res.status === 1) {
        yield delay(500)

        const { uploadInfo } = yield select(state => state[OPERATION_NAMESPACE])

        const newUploadInfo = {
          ...uploadInfo,
          md5,
          chunkCount: chunkList.length,
          chunkProgress: [],
          fileSize: file.size,
          fileName: file.name,
          loading: true,
        }

        yield put({
          type: "saveUploadProgress",
          payload: newUploadInfo
        })

        yield put({
          type: "putFileChunk",
          payload: {
            chunkList,
            currentChunk: 0,
            file,
            md5,
          }
        })
      }

    },
    *putFileChunk({ resolve, payload }, { call, put, callWithExtra }) {

      const { chunkList, currentChunk, file, md5 } = payload;

      yield put({
        type: "setLocalUpdateStatus",
        payload: UPLOAD_STATUS
      })

      const res = yield callWithExtra(service.putFileChunk, {
        chunk: chunkList[currentChunk].chunk,
        currentChunk,
        md5,
      })

      const lastCurrent = currentChunk + 1
      //上传成功，进行下一个chunk的上传
      if (res.status === 1 && lastCurrent < chunkList.length) {

        yield put({
          type: "putFileChunk",
          payload: {
            chunkList,
            currentChunk: lastCurrent,
            file,
            md5,
          }
        })
      }
      //上传失败，重新上传
      if (res.status !== 1 && currentChunk < chunkList.length) {

        yield delay(2000)

        yield put({
          type: "putFileChunk",
          payload: {
            chunkList,
            currentChunk,
            file,
            md5,
          }
        })
      }
      //全部上传结束 ，发起合并请求
      if (res.status === 1 && lastCurrent >= chunkList.length) {

        yield put({
          type: "saveUploadProgress",
          payload: {
            loading: false,
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
    *updatePutProgress({ resolve, payload }, { call, put, callWithExtra, select }) {

      const md5 = payload[MD5_DATA_INDEX],
        currentChunk = payload[CURRENT_CHUNK_DATA_INDEX],
        { percent } = payload

      const { uploadInfo } = yield select(state => state[OPERATION_NAMESPACE])

      let { chunkProgress, chunkCount } = uploadInfo

      let newChunkProgress = [...chunkProgress]

      newChunkProgress[currentChunk] = newChunkProgress[currentChunk] > percent
        ?
        newChunkProgress[currentChunk]
        :
        percent


      yield put({
        type: "saveUploadProgress",
        payload: {
          ...uploadInfo,
          chunkProgress: newChunkProgress,
          progress: newChunkProgress.reduce((sum, item) => sum + item, 0) / chunkCount
        }
      })
      // console.info(currentChunk, percent)
      // console.info(newChunkProgress)
      // console.info(newChunkProgress.reduce((sum, item) => sum + item, 0) / chunkCount)
      // console.info("-------------------------")

    },
    *mergeUploadTask({ resolve, payload }, { callWithExtra, put }) {

      yield put({
        type: "setLocalUpdateStatus",
        payload: MERGE_STATUS
      })

      yield put({
        type: "saveMergeInfo",
        payload: {
          result: [],
          loading: true,
          isSuccess: false,
          isError: false,
        }
      })

      const res = yield callWithExtra(service.mergeUploadTask, payload, commonCallConfig)
      if (res.status === 1) {
        yield put({
          type: "saveMergeInfo",
          payload: {
            result: res.payload,
            loading: false,
            isSuccess: true,
          }
        })

        resolve && resolve()

      } else {

        yield put({
          type: "saveMergeInfo",
          payload: {
            loading: false,
            isSuccess: false,
          }
        })
      }
    }
  },
  subscriptions: {

  }
};

const payloadFilter = (payload) => {
  return {
    total: payload.total,
    data: payload.data,
    statistics: payload.statistics,
  }
};

// const queryService = service.query;

// export default queryModelGenerator({
//   model: baseModel,
//   payloadFilter,
//   callConfig: commonCallConfig,
//   queryService,
// });

export default baseModel
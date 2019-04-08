import { MANAGER_DEVICE_IDS_STANDALONE_NAMESPACE } from 'constants/model'
import {
  fetchDeviceIDSStandalone,
  fetchDeviceIDSStandaloneDisk,
  putDeviceIDSStandaloneDisk,
  postLicence,
  postDisk,
  fetchDeviceInfoSStandalone,
  updateByLocalIDS,
  fetchVersionInfoByLocalIDS,
  updateByRemoteIDS,
  fetchVersionInfoByRemoteIDS,
  updateRemoteProgress,
  getupdateByRemote,
  getUploadTask,
  createUploadTask,
  putFileChunk,
  mergeUploadTask,
  getUploadResult
} from '../services'
import commonEffectCreator from 'domainUtils/commonEffectCreator'
import isSuccess from 'domainUtils/isSuccess'
import { delay } from 'utils'
import { INIT_STATUS, COMMON_STATUS, UPLOAD_STATUS, MERGE_STATUS } from '../constants'
import { getFileMD5 } from 'utils/md5'
import { splitFileToChunk } from 'utils/fileSplitUpload'
const CHUNK_SIZE = 1024 * 1024 * 2//切割文件块的大小
const initLocalUploadInfo = {
  formatError: null,
  status: COMMON_STATUS,//上传镜像文件任务的状态
  md5: null,//镜像文件的md5
  file: null,//镜像文件
  fileSize: 0,//文件大小 k
  fileName: null,//文件名
  progress: 0,//上传名字
  chunkCount: 0,//断点续传镜像所切割的块数
  currentChunk: -1,//当前正在上传的文件块索引
  remoteTask: {},//服务器上保存的任务信息
  chunkList: [],//按照一定大小切割后的文件块
  mergeResult: {}//所有块上传完毕后 服务端返回的结果
}
export default {
  namespace: MANAGER_DEVICE_IDS_STANDALONE_NAMESPACE,
  state: {
    localUploadInfo: initLocalUploadInfo,
    percent: 0,
    progressState: -1,
  },
  effects: {
    fetch: commonEffectCreator(fetchDeviceIDSStandalone),
    fetchDeviceInfo: commonEffectCreator(fetchDeviceInfoSStandalone),
    fetchDeviceDisk: commonEffectCreator(fetchDeviceIDSStandaloneDisk),
    putDeviceDisk: commonEffectCreator(putDeviceIDSStandaloneDisk, 500),
    postLicence: commonEffectCreator(postLicence, 500),

    postDisk: commonEffectCreator(postDisk, 500),

    fetchVersionInfoByLocal: commonEffectCreator(fetchVersionInfoByLocalIDS),
    updateByLocal: commonEffectCreator(updateByLocalIDS),
    fetchVersionInfoByRemote: commonEffectCreator(fetchVersionInfoByRemoteIDS),
    updateByRemote: commonEffectCreator(updateByRemoteIDS),
    getupdateByRemote: commonEffectCreator(getupdateByRemote),
    getUploadResult: commonEffectCreator(getUploadResult),

    updateRemoteProgress: function* ({ resolve, reject, payload }, { call, put }) {
      const res = yield call(updateRemoteProgress, payload)

      yield delay(0)

      if (isSuccess(res)) {

        yield put({
          type: "savePercent",
          payload: {
            percent: res.payload.percent,
            progressState: res.payload.progressState
          }
        });
        resolve && resolve(res.payload)
      }
      else {
        reject && reject(res.message)
      }
    },
    initUploadTask: function* ({ resolve, payload, reject }, { call, put }) {
      const { file } = payload;
      /**
       * 保存文件基础信息到state当中  
       */
      yield put({
        type: "saveLocalUploadInfo",
        payload: {
          status: INIT_STATUS,
          fileName: file.name,
          fileSize: file.size,
        }
      })
      /**
       * 计算文件的md5 同时检查服务端是否有未上传完成的任务
       */
      const [md5, res] = yield [
        call(getFileMD5, file),
        call(getUploadTask, {})
      ]
      /**
       *请求返回结果异常 直接退出初始化任务函数 
       */

      if (res.status !== 1) {
        return yield put({
          type: "saveLocalUploadInfo",
          payload: {
            status: COMMON_STATUS,
          }
        })
      }
      /**
       * 请求成功 在返回的结果中查找是否存在该文件一致的md5
       */
      const target = res.payload.find(i => i.md5 === md5)
      /**
       * 对文件进行切片处理
       */
      const chunkList = splitFileToChunk(file, CHUNK_SIZE)

      const chunkCount = chunkList.length;
      /**
       * 根据结果创建新的文件任务信息
       */
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
      /**
       *若服务器上存在文件md5一致的上传任务
       *则同步上传进度信息于服务端一致 
       *结束函数
       */
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
      /**
       *若服务端不存在该文件上传任务
       *发起一个创建上传任务的请求 
       */
      const newTaskRes = yield call(createUploadTask, {
        md5,
        fileName: file.name,
        fileSize: file.size,
        chunkSize: CHUNK_SIZE,
        chunkCount
      })

      /**
       * 创建上传任务成功 保存初始化任务信息
       */

      if (newTaskRes.status === 1) {

        yield put({
          type: "saveLocalUploadInfo",
          payload: newUploadInfo
        })

        resolve && resolve()
      } else {
        yield put({
          type: "saveLocalUploadInfo",
          payload: {
            formatError: newTaskRes.message,
          }
        })
        reject && reject(newTaskRes.message)
      }



    },
    putFileChunk: function* ({ resolve, payload }, { call, put, select }) {
      const { chunkList, currentChunk, file, md5, chunkCount } = yield select(state => state[MANAGER_DEVICE_IDS_STANDALONE_NAMESPACE].localUploadInfo)
      /**
       * 将任务状态改为上传中
       */

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
      /**
       * 将对应索引的文件块及信息上传到服务器
       */


      const res = yield call(putFileChunk, {
        chunk: chunkList[currentChunk].chunk,
        currentChunk,
        md5,
      })

      /**
       *上传成功 将索引指向下一个 ，保存信息后 进行下一块的上传 
       */
      const lastCurrent = currentChunk + 1

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

      //上传失败，2000毫秒后 重新上传
      if (res.status !== 1 && currentChunk < chunkList.length) {

        yield delay(2000)

        yield put({
          type: "putFileChunk",
        })

      }

      //所有的文件块上传结束 ，向服务端发起请求，合并所有的块 
      if (res.status === 1 && lastCurrent >= chunkList.length) {
        yield put({
          type: "saveLocalUploadInfo",
          payload: {
            progress: 1,
            status: UPLOAD_STATUS
          }
        })
        yield put({
          type: "saveLocalUploadInfo",
          payload: {
            status: MERGE_STATUS
          }
        })
        const payload_ = {
          ...payload,
          md5
        }
        const res_ = yield call(mergeUploadTask, payload_)
        if (res_.status === 1) {
          /**
           * 获取合并结果信息 保存到state中 
           */
          yield put({
            type: "saveLocalUploadInfo",
            payload: {
              mergeResult: res_
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

          resolve && resolve(res_.status)
        }
      }



    },
  },
  reducers: {
    savePercent: (preState, { payload }) => {
      return {
        ...preState,
        percent: payload.percent,
        progressState: payload.progressState
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
  }
}
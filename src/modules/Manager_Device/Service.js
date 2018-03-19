import request from '../../utils/request';
import ApiConfig from '../../configs/ApiConfig';
import * as tools from '../../utils/tools';
import commonRequestCreator from '../../utils/commonRequestCreator';
const httpApi = ApiConfig.http;
import { IDS } from 'configs/ConstConfig'

export const query = commonRequestCreator.get(httpApi.DEVICE_NODE)


export const postLicence = ({ data }) => {
  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(data || [])
  };
  return request(httpApi.DEVICE_LICENCE, options);
}




export const clean = commonRequestCreator.post(httpApi.DEVICE_DISK)











export const getUpdateServiceHandle = (productType) => {

  return {
    getVersionInfoLocal: payload => {
      const fd = new FormData();

      fd.append("file", payload.file)
      fd.append("idList", payload.idList.join(","))

      const options = {
        method: "POST",
        headers: {
        },
        body: fd
      }

      try {
        if (process.env.NODE_ENV === "development") {
          options.headers.idList = payload.idList.join(",")
        }
      } catch (e) {
        console.info(e)
      }

      return request(
        productType !== IDS ? httpApi.DEVICE_UPDATE_INFO_LOCAL : httpApi.DEVICE_UPDATE_INFO_LOCAL_IDS,
        options
      )
    },
    getVersionInfoRemote: payload => {

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(payload)
      }

      return request(
        productType !== IDS ? httpApi.DEVICE_UPDATE_INFO_ONLINE : httpApi.DEVICE_UPDATE_INFO_ONLINE_IDS,
        options
      )
    },
    updateLocal: payload => {

      const fd = new FormData();
      fd.append("file", payload.file)
      fd.append("idList", payload.idList.join(","))

      const options = {
        method: "POST",
        headers: {
        },
        body: fd,
      }

      try {
        if (process.env.NODE_ENV === "development") {
          options.headers.idList = payload.idList.join(",")
        }
      } catch (e) {
        console.info(e)
      }
      return request(
        productType !== IDS ? httpApi.DEVICE_UPDATE_LOCAL : httpApi.DEVICE_UPDATE_LOCAL_IDS,
        options
      )
    },
    updateRemote: payload => {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(payload)
      }
      return request(
        productType !== IDS ? httpApi.DEVICE_UPDATE_ONLINE : httpApi.DEVICE_UPDATE_ONLINE_IDS,
        options)
    }
  }







}

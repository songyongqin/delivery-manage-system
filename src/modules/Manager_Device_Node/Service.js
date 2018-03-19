import request from '../../utils/request';
import ApiConfig from '../../configs/ApiConfig';
import * as tools from '../../utils/tools';
const httpApi = ApiConfig.http;
import commonRequestCreator from 'utils/commonRequestCreator'

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


export const getVersionInfoLocal = payload => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    }
  }

  if (process.env.NODE_ENV !== "development") {
    const fd = new FormData();
    fd.append("file", payload.file)
    fd.append("deviceList", payload.deviceList.join(","))
    options.body = fd;
  } else {
    options.headers.deviceList = payload.deviceList.join(",")
  }

  return request(httpApi.DEVICE_UPDATE_INFO_LOCAL, options)
}

export const getVersionInfoRemote = payload => {



  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(payload)
  }

  return request(httpApi.DEVICE_UPDATE_INFO_ONLINE, options)
}

export const updateLocal = payload => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    }
  }
  if (process.env.NODE_ENV !== "development") {
    const fd = new FormData();
    fd.append("file", payload.file)
    fd.append("deviceList", payload.deviceList.join(","))
    options.body = fd;
  } else {
    options.headers.deviceList = payload.deviceList.join(",")
  }
  return request(httpApi.DEVICE_UPDATE_LOCAL, options)
}

export const updateRemote = payload => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(payload)
  }
  return request(httpApi.DEVICE_UPDATE_ONLINE, options)
}

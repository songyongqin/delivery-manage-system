import request from '../../utils/request';
import ApiConfig from '../../configs/ApiConfig';
import * as tools from '../../utils/tools';
import commonRequestCreator from '../../utils/commonRequestCreator';
const httpApi = ApiConfig.http;

export async function query(payload) {

  const options = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    }
  };

  return request(httpApi.DEVICE_NODE + tools.jsonToQueryString(payload), options);
}


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

  const fd = new FormData();
  fd.append("file", payload.file)
  fd.append("idList", payload.idList.join(","))

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    }
  }

  try {
    if (process.env.NODE_ENV === "development") {
      options.headers.idList = payload.idList.join(",")
    }
  } catch (e) {
    console.info(e)
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

  const fd = new FormData();
  fd.append("file", payload.file)
  fd.append("idList", payload.idList.join(","))

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    }
  }

  try {
    if (process.env.NODE_ENV === "development") {
      options.headers.idList = payload.idList.join(",")
    }
  } catch (e) {
    console.info(e)
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

export const clean = commonRequestCreator.post(httpApi.DEVICE_DISK)
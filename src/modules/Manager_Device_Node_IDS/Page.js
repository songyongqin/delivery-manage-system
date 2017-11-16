import React from 'react';
import {
  NAMESPACE,
  MANAGER_DEVICE_NAMESPACE,
  MANAGER_DEVICE_NODE_DISK_NAMESPACE,
  IDS
} from './ConstConfig'
import { createMapDispatchWithPromise } from '../../utils/dvaExtraDispatch'
import NodeDisk from '../Manager_Device_Node_IDS_Disk/Page'
import DeviceManagerGenerator from 'domainComponents/DeviceManager'

function mapStateToProps(state) {
  const { commonLayout } = state.layout;
  const effectsLoading = state.loading.effects;
  return {
    commonLayout,
    versionColExpanded: state[MANAGER_DEVICE_NAMESPACE].versionColExpanded,
    userData: state.user.userData,
    productType: state.user.productType,

    loading: effectsLoading[`${NAMESPACE}/query`]
      || effectsLoading[`${MANAGER_DEVICE_NODE_DISK_NAMESPACE}/put`]
      || effectsLoading[`${MANAGER_DEVICE_NODE_DISK_NAMESPACE}/query`],

    postLicenceLoading: effectsLoading[`${MANAGER_DEVICE_NAMESPACE}/postLicence`],

    updateLoading: effectsLoading[`${MANAGER_DEVICE_NAMESPACE}/getUpdateInfoLocal`]
      || effectsLoading[`${MANAGER_DEVICE_NAMESPACE}/getUpdateInfoRemote`]
      || effectsLoading[`${MANAGER_DEVICE_NAMESPACE}/updateRemote`]
      || effectsLoading[`${MANAGER_DEVICE_NAMESPACE}/updateLocal`]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    get: payload => dispatch({
      type: `${NAMESPACE}/query`,
      payload,
    }),
    postLicence: payload => dispatch({
      type: `${MANAGER_DEVICE_NAMESPACE}/postLicence`,
      payload
    }),
    getUpdateInfoLocal: payload => dispatch({
      type: `${MANAGER_DEVICE_NAMESPACE}/getUpdateInfoLocal`,
      payload
    }),
    getUpdateInfoRemote: payload => dispatch({
      type: `${MANAGER_DEVICE_NAMESPACE}/getUpdateInfoRemote`,
      payload
    }),
    updateRemote: payload => dispatch({
      type: `${MANAGER_DEVICE_NAMESPACE}/updateRemote`,
      payload
    }),
    updateLocal: payload => dispatch({
      type: `${MANAGER_DEVICE_NAMESPACE}/updateLocal`,
      payload,
    })
  }
}

export default DeviceManagerGenerator({
  namespace: NAMESPACE,
  mapStateToProps,
  mapDispatchToProps,
  title: "流量监测设备",
  productType: IDS,
  getNodeDiskComponent: () => {
    return <NodeDisk></NodeDisk>
  }
})


import React from 'react';
import {
  NAMESPACE,
  MANAGER_DEVICE_NAMESPACE,
  MANAGER_DEVICE_NODE_DISK_NAMESPACE,
  NODE
} from './ConstConfig'
import { createMapDispatchWithPromise } from '../../utils/dvaExtraDispatch'
import NodeDisk from '../Manager_Device_Node_Disk/Page'
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
      || effectsLoading[`${MANAGER_DEVICE_NAMESPACE}/updateLocal`],


    cleanLoading: effectsLoading[`${MANAGER_DEVICE_NAMESPACE}/clean`]
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
    }),
    clean: payload => dispatch({
      type: `${MANAGER_DEVICE_NAMESPACE}/clean`,
      payload,
    })
  }
}

export default DeviceManagerGenerator({
  namespace: NAMESPACE,
  mapStateToProps,
  mapDispatchToProps,
  title: "蜜罐节点设备",
  productType: NODE,
  getNodeDiskComponent: () => {
    return <NodeDisk></NodeDisk>
  }
})


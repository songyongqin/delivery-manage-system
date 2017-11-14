import React from 'react';
import { 
  NAMESPACE, 
  MANAGER_DEVICE_NAMESPACE,
  MANAGER_DEVICE_NODE_CONTROL_NAMESPACE
} from './ConstConfig'
import ControlDisk from '../Manager_Device_Control_Disk/Page'
import { createMapDispatchWithPromise } from '../../utils/dvaExtraDispatch'
import DeviceManagerGenerator from 'domainComponents/DeviceManager'


function mapStateToProps(state) {
  const { commonLayout } = state.layout;
  const effectsLoading=state.loading.effects;
  return {
    commonLayout,
    versionColExpanded: state[MANAGER_DEVICE_NAMESPACE].versionColExpanded,
    userData: state.user.userData,
    productType: state.user.productType,

    loading: effectsLoading[`${NAMESPACE}/query`]
    || effectsLoading[`${MANAGER_DEVICE_NODE_CONTROL_NAMESPACE}/put`]
    || effectsLoading[`${MANAGER_DEVICE_NODE_CONTROL_NAMESPACE}/query`],
  
    postLicenceLoading: state.loading.effects[`${NAMESPACE}/postLicence`], 

    updateLoading: effectsLoading[`${MANAGER_DEVICE_NAMESPACE}/getUpdateInfoLocal`]
    || effectsLoading[`${MANAGER_DEVICE_NAMESPACE}/getUpdateInfoRemote`]
    || effectsLoading[`${MANAGER_DEVICE_NAMESPACE}/updateRemote`]
    || effectsLoading[`${MANAGER_DEVICE_NAMESPACE}/updateLocal`]
  }
}

const mapDispatchToProps = dispatch => ({
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
})

export default DeviceManagerGenerator({
  namespace:NAMESPACE,
  mapStateToProps,
  mapDispatchToProps,
  isNode:false,
  title:"控制中心",
  getNodeDiskComponent:()=>{
    return <ControlDisk></ControlDisk>
  }
})


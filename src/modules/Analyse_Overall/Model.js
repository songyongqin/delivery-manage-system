/**
 * Created by jojo on 2017/8/21.
 */
import { routerRedux } from 'dva/router';
import moment from 'moment';
import * as service from './Service';
import { queryModelGenerator } from '../../utils/dvaModelGenerator';
import { commonCallConfig } from '../../configs/ExtraEffectsOptions';
import {
  NAMESPACE
} from './ConstConfig'
import {
  NAMESPACE as OVERALL_NET_BASIC_NAMESPACE,
} from '../Analyse_Overall_NetBasic/ConstConfig'
import {
  NAMESPACE as OVERALL_NET_NAMESPACE,
} from '../Analyse_Overall_Net/ConstConfig'
import {
  NAMESPACE as OVERALL_SYSTEM_NAMESPACE,
} from '../Analyse_Overall_System/ConstConfig'
import {
  NAMESPACE as OVERALL_CAPTURE_NAMESPACE,
} from '../Analyse_Overall_Capture/ConstConfig'
import {
  NAMESPACE as OVERALL_PCAP_NAMESPACE
} from '../Analyse_Overall_PCAP/ConstConfig'

moment.locale('zh-cn');

const baseModel = {
  namespace: NAMESPACE,
  state: {
    timestampRange: [],
    lastTime: 0,
    panelLastTime: {
      [OVERALL_NET_BASIC_NAMESPACE]: -1,
      [OVERALL_NET_NAMESPACE]: -1,
      [OVERALL_SYSTEM_NAMESPACE]: -1,
      [OVERALL_CAPTURE_NAMESPACE]: -1,
      [OVERALL_PCAP_NAMESPACE]: -1
    }
  },
  reducers: {
    setTimestampRange: (preState, { payload }) => {
      const { timestampRange, lastTime } = payload
      return {
        ...preState,
        timestampRange,
        lastTime
      }
    },
    setPanelLastTime: (preState, { payload }) => {
      return {
        ...preState,
        panelLastTime: {
          ...preState.panelLastTime,
          ...payload
        }
      }
    }
  },
  effects: {

  }
};




export default baseModel;

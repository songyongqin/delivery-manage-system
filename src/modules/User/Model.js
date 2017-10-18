/**
 * Created by jojo on 2017/8/21.
 */
import moment from 'moment';
import * as service from './Service';
import { routerRedux } from 'dva/router';
import {commonCallConfig} from '../../configs/ExtraEffectsOptions';
import * as tools from '../../utils/tools';
import {
  ADMIN_ROLE,
  ROLE_DATAINDEX,
  USERACCOUNT_DATAINDEX,
  IDS,
  NODE,
} from '../../configs/ConstConfig';
moment.locale('zh-cn');

const NAMESPACE="user";

const callConfig={
  withArgsCombiner:true,
  withStatusHandle:true,
  withLoading:true,
}

const baseModel={
  namespace: NAMESPACE,
  state: {
    signin:!!tools.getTemp("userData"),
    userData:tools.getTemp("userData")||{},
    productType:tools.getTemp("productType")||{standalone:0,type:"distribution"}
  },
  reducers:{
    setUserData(preState,{payload}) {
      return {
        ...preState,
        signin:true,
        userData:{
          ...preState.userData,
          ...payload||{}
        }
      }
    }
  },
  effects:{

    *putPassword({payload,resolve},{callWithExtra}) {

        const res=yield callWithExtra(
          service.putPassowrd,
          {...payload||{}},
          callConfig
        );

        if(res.status===1){
          resolve&&resolve();
        }

    },
    *postSign({payload,resolve},{callWithExtra,put,take}) {
        const res=yield callWithExtra(
          service.postSign,
          {...payload||{}},
          commonCallConfig
        );

        if(res.status===1){

          const userData={
            ...res.payload,
            userAccount:payload[USERACCOUNT_DATAINDEX],
            isAdmin:res.payload[ROLE_DATAINDEX]===ADMIN_ROLE
          }

          tools.setTemp("userData",userData);

          yield put({
            type:"setUserData",
            payload:{
              ...userData
            }
          })

          const productTypeRes=yield callWithExtra(
            service.getProductType,
            {},
            {
              withStatusHandle:true,
            }
          )

          if(productTypeRes.status===1){
            tools.setTemp("productType",productTypeRes.payload);
          }

          resolve&&resolve();
        }

    },
    *deleteSign({payload,resolve},{callWithExtra,put}) {
        window.sessionStorage.clear();
        window.location.reload();
    },
    *redirect({payload},{call,put,select}){
      const user=yield select(state=>state.user);
      if(user.signin){
        yield put(routerRedux.push('/'));
      }

    },
    *redirectMain({payload},{call,put,select}){
        yield put(routerRedux.push('/'));
    },
    /*
     *
     * */
    *checkLogin({payload},{call,put,select}){
      const user=yield select(state=>state.user);

      if(!user.signin){
        yield put(routerRedux.push('/login'));
      }

    },
    *checkAdmin({payload},{call,put,select}){
      const user=yield select(state=>state.user);

      if(!user.userData.isAdmin){
        yield put(routerRedux.push('/'));
      }

    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      // 监听 history 变化，当进入 `/` 时触发 `load` action

      const adminOnlyRoutes=["/sys-config","/user-manager"];

      const idsRouteBlackList=[
        "/honeypot-manager/mirror",
        "/honeypot-manager/virtual-machine",
        "/sys-config/strategy",
        "/sys-config/white-list",
        "/report",
        // "/analyse/ranking",
        // "/analyse/threat-distribution",
        "/early-warning",
      ];

      const nodeRouteBlackList=[
        "/analyse/ranking",
        "/analyse/threat-distribution",
        "/early-warning",
        "/report",
        "/sys-config/strategy",
        "/sys-config/white-list",
        "/user-manager",
      ];

      const producType=(tools.getTemp("productType")||{}).type

      return history.listen(({ pathname }) => {

        if(pathname==="/login"){
          return dispatch({
            type:"redirect"
          });
        }

        if(nodeRouteBlackList.includes(pathname)&&producType===NODE){
          return dispatch({
            type:"redirectMain"
          });
        }

        if(idsRouteBlackList.includes(pathname)&&producType===IDS){
          return dispatch({
            type:"redirectMain"
          });
        }

        if(adminOnlyRoutes.includes(pathname)){
          return dispatch({
            type:"checkAdmin"
          })
        }


        dispatch({
          type:"checkLogin"
        });

      });
    },
  },
};




export default baseModel;

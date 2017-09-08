/**
 * Created by jojo on 2017/8/21.
 */
import moment from 'moment';
import * as service from './Service';
import { routerRedux } from 'dva/router';
import {commonCallConfig} from '../../configs/ExtraEffectsOptions';
import * as tools from '../../utils/tools';
import {ADMIN_ROLE,ROLE_DATAINDEX,USERACCOUNT_DATAINDEX} from '../../configs/ConstConfig';
moment.locale('zh-cn');

const NAMESPACE="user";

const baseModel={
  namespace: NAMESPACE,
  state: {
    signin:!!tools.getTemp("userData"),
    userData:tools.getTemp("userData")||{}
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
    *postSign({payload,resolve},{callWithExtra,put}) {
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
      return history.listen(({ pathname }) => {

        if(pathname==="/login"){
          return dispatch({
            type:"redirect"
          });
        }

        if(pathname==="/sys-config"){
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

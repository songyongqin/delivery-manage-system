/**
 * Created by jojo on 2017/8/21.
 */
import moment from 'moment';
import * as service from './Service';
import { routerRedux } from 'dva/router';
import {commonCallConfig} from '../../configs/ExtraEffectsOptions';
import * as tools from '../../utils/tools';
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

          tools.setTemp("userData",res.payload);

          yield put({
            type:"setUserData",
            payload:{
              ...res.payload||{}
            }
          })
          // yield put(routerRedux.push('/'));
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

  },
  subscriptions: {
    setup({ history, dispatch }) {
      // 监听 history 变化，当进入 `/` 时触发 `load` action
      return history.listen(({ pathname }) => {
        if(pathname==="/login"){
          dispatch({
            type:"redirect"
          });
        }else{
          dispatch({
            type:"checkLogin"
          });
        }


      });
    },
  },
};




export default baseModel;

/**
 * Created by jojo on 2017/8/24.
 */
import * as tools from '../utils/tools';
import languageConfig from '../configs/LanguageConfig';
import RouteConfig from '../configs/RouteConfig';
import LayoutConfig from '../configs/LayoutConfig';

let commonLayout=tools.getCache("commonLayout");

commonLayout=commonLayout||{
  darkTheme:false,
  navMini:false,
  language:"zh-cn",
};


export default {
  namespace:"layout",
  state:{
    commonLayout:commonLayout,
    languageConfig:languageConfig,
    routeConfig:RouteConfig,
    layoutConfig:LayoutConfig
  },
  reducers:{
    setCommonLayout(preState,{payload}){

      const newCommonLayout={
        ...preState.commonLayout,
        ...payload||{},
      };

      tools.setCache("commonLayout",newCommonLayout);

      return {
        ...preState,
        commonLayout:newCommonLayout
      }
    }
  },
  effects:{

  }
}

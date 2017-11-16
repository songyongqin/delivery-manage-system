/**
 * Created by jojo on 2017/8/24.
 */
import * as tools from '../utils/tools';
import languageConfig from '../configs/LanguageConfig';
import RouteConfig from '../configs/RouteConfig';
import LayoutConfig from '../configs/LayoutConfig';

const SHOULD_EXPANDED_WIDTH_DIVIDE = 1400;

let commonLayout = tools.getCache("commonLayout");

commonLayout = commonLayout
  ?
  {
    ...commonLayout,
    language: "zh-cn"
  }
  :
  {
    darkTheme: false,
    navMini: false,
    language: "zh-cn",
  };


export default {
  namespace: "layout",
  state: {
    commonLayout: commonLayout,
    languageConfig: languageConfig,
    routeConfig: RouteConfig,
    layoutConfig: LayoutConfig
  },
  reducers: {
    setCommonLayout(preState, { payload }) {

      const newCommonLayout = {
        ...preState.commonLayout,
        ...payload || {},
      };

      tools.setCache("commonLayout", newCommonLayout);
      return {
        ...preState,
        commonLayout: newCommonLayout
      }
    }
  },
  effects: {
    throttleChangeNavExpanded: function* ({ payload }, { select, put }) {
      const navExpanded = yield select(state => !state.layout.commonLayout.navMini);
      if (navExpanded === payload) {
        return;
      }
      yield put({
        type: "setCommonLayout",
        payload: {
          navMini: !payload
        }
      })
    },
  },
  subscriptions: {
    setup: ({ history, dispatch }) => {

      dispatch({
        type: "throttleChangeNavExpanded",
        payload: window.innerWidth > SHOULD_EXPANDED_WIDTH_DIVIDE
      })

      window.addEventListener("resize", () => {
        dispatch({
          type: "throttleChangeNavExpanded",
          payload: window.innerWidth > SHOULD_EXPANDED_WIDTH_DIVIDE
        })
      })
    }
  }
}

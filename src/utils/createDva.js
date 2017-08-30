/**
 * Created by jojo on 2017/8/18.
 */
import createHistory from 'history/createBrowserHistory'
import {
  ConnectedRouter,
  routerMiddleware,
  routerReducer as routing,
} from 'react-router-redux';

import createDva from 'dva/lib/createDva';

const history = createHistory();

export default createDva({
  mobile: false,
  initialReducer: {
    routing,
  },
  defaultHistory: history,
  routerMiddleware,
  setupHistory(history) {
    this._history = history;
  },
});

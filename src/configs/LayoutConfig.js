/**
 * Created by 13944 on 2017/8/1.
 */
import React from 'react';
import JoIcon from '../components/JoIcon';

export default {
  filters:{
    "analyseEvent":{
      attackStage:["scan","invade","install","control"],
      action:["one","two","three"],
      actionStatus:[1,0,-1],
      level:["low","middle","high"]
    }
  },
  color:{
    primaryColor:"#108ee9",
    light:{
      level1:"white",
      level2:"white",
      level3:"#F1F1F1"
    },
    dark:{
      level1:"rgb(37,45,71)",
      level2:"rgb(31,38,61)",
      level3:"rgb(28,35,59)"
    }
  },
  icons:{
    analyseEvent:{
      statistics:{
        counts: <JoIcon type="hacker"/>,
        highEvents: <JoIcon type="exclamationcircleo"/>,
        exploits: <JoIcon type="bug"/>,
        tools: <JoIcon type="eyedropper"/>,
        threatInfos: <JoIcon type="filetext1"/>,
        fallHosts: <JoIcon type="iconfontdesktop"/>
      }
    }
  }
}

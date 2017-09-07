/**
 * Created by jojo on 2017/9/5.
 */

import React from 'react';
import JoIcon from '../../components/JoIcon';


export const NAMESPACE="sysConfig";

export const SYS_CONFIG_USER_MANAGER="userManager";
export const SYS_CONFIG_MONITOR="monitor";
export const SYS_CONFIG_STRATEGY="strategy";
export const SYS_CONFIG_WHITE_LIST="whiteList"


export const sysConfigKeys=[
  SYS_CONFIG_USER_MANAGER,
  SYS_CONFIG_MONITOR,
  SYS_CONFIG_STRATEGY,
  SYS_CONFIG_WHITE_LIST
];


export const sysConfigTextConfig={
  title:{
    [SYS_CONFIG_USER_MANAGER]:<span><JoIcon type="team"/>&nbsp;用户管理</span> ,
    [SYS_CONFIG_MONITOR]:<span><JoIcon type="scan1"/>&nbsp;自我监控</span>,
    [SYS_CONFIG_STRATEGY]:<span><JoIcon type="setting"/>&nbsp;策略配置</span>,
    [SYS_CONFIG_WHITE_LIST]:<span><JoIcon type="filter2"/>&nbsp;白名单策略配置</span>
  },
};





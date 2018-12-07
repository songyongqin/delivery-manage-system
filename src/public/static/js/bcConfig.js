
require.config({
  paths: {
    jquery: 'libs/jquery-2.0.2.min',
  }
});
define(['jquery'], function ($) {
  //动态是1，静态是0
  let conf = 0;
  let data;
  if (conf == 0) {
    data = {
      status: 0,



      //设备信息
      deviceInfo: "data/deviceInfo.json",
      //弹出框

      /* 
          三维接口
      */
      'topo': {
        //拓扑结构
        "topoStructure": "data/topo_taishi.json",
        //刷新接口
        "refresh": "data/refresh.json",
        //刷新时间间隔
        "refreshtime": 55000,
        //循环延迟时间
        circularDelay: 10000    
      },
      resourceConfig: 'data/resourceConfig.json',
      process: 'data/process.json',
      assetSuffered: 'data/assetSuffered.json',
      refreshInterval: 55000,   // 攻击请求数据间隔
      refreshInterval_process: 7000,    // 页面底部攻击过程,每一步时间间隔
      refreshInterval_assetSuffered: 55000    // 受害资产时间间隔
      
    } 
  } else {
    data = {
      status: 1,

      //设备信息
      deviceInfo: "/api/oceanLotusdevice/deviceInfo",
      // deviceInfo: "data/deviceInfo.json",

      /* 
          三维接口
      */
      'topo': {
        //拓扑结构
        "topoStructure": "/api/oceanLotusdevice/topologicalStructure",           
        //刷新接口
        "refresh": "/api/oceanLotusdevice/topologicalEvent",
        //刷新时间间隔
        "refreshtime": 55000,
        //循环延迟时间
        circularDelay: 10000 
      },
      resourceConfig: '/api/oceanLotusdevice/resourceAllocation',
      process: '/api/oceanLotusdevice/phaseAttack',
      assetSuffered: '/api/oceanLotusdevice/victimizedAssetsStatistics',
      refreshInterval: 55000,
      refreshInterval_process: 7000,    // 页面底部攻击过程,每一步时间间隔
      refreshInterval_assetSuffered: 55000,    // 受害资产时间间隔
      circularDelay: 10000 //循环延迟时间
    }
  }

  return data;
});
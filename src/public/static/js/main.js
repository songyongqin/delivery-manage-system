/* 
 * @Author: qlq
 * @Date:   2016-10-25 16:23:14
 * @summary:组件进入模块 js文件
 * @Last Modified by:   anchen
 * @Last Modified time: 2017-11-23 13:48:17
 */
require.config({
  baseUrl: './js',
  paths: {
    jquery: 'libs/jquery-2.0.2',
    // d3: 'libs/d3.min',
    //配置项文件
    bcConfig: 'bcConfig',
    //引用3维模块
    space3d: 'module/bc.module.space3d/svtcharts.advance.assets.space3d',
    //设备信息模块
    moduleDeviceInfo: 'module/bc.module.deviceInfo/bc.module.deviceInfo',
    moduleLeftInfo: 'module/bc.module.leftInfo/bc.module.leftInfo',
    moduleWholeAttackProcess: 'module/bc.module.wholeAttackProcess/bc.module.wholeAttackProcess',
    moduleAssetSuffered: 'module/bc.module.assetSuffered/bc.module.assetSuffered',
    moduleNav: 'module/bc.module.nav/bc.module.nav'
  }
})
require(['jquery',
  // 'd3',
  'space3d',
  'moduleDeviceInfo',
  'bcConfig',
  'moduleLeftInfo',
  'moduleWholeAttackProcess',
  'moduleAssetSuffered',
  'moduleNav'
], function (jquery,
  // d3,
  space3d,
  moduleDeviceInfo,
  bcConfig,
  moduleLeftInfo,
  moduleWholeAttackProcess,
  moduleAssetSuffered,
  moduleNav
  ) {
    // $('body').css({
    //   'width': $(document).width(),
    //   'height': $(document).height()
    // })
    $(window).resize(function () {
      $('.bc2dTop').css({
        'width': $(document).width(),
      })
    })
    var re = space3d(bcConfig.topo);

    window.bcShowConfig = {
      //三维操作对象
      space3d: re,
      //动静态数据判断标识符
      status: bcConfig.status,
      data: bcConfig
    }
    moduleNav.render();
    moduleDeviceInfo.render();
    moduleLeftInfo.render();
    moduleWholeAttackProcess.render();
    moduleAssetSuffered.render();

    /* let type;
     if(bcConfig.status==0){
         type='get'
     }else{
         type='post'
     }
     var update = setInterval(function() {
         $.ajax({
             url: bcConfig.duration,
             type: type,
             dataType: 'json',
             data:{
                 eid:1,
                 pid:1
             }
         }).done(function(json) {
            
         })
     }, 1000);*/
  });
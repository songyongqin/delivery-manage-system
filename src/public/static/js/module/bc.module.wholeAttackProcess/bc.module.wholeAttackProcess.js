/* 
 * @Author: QLQ
 * @summary:计时器模块文件
 * @Date:   2017-11-03 13:53:29
 * @Last Modified by:   anchen
 * @Last Modified time: 2017-11-23 14:00:06
 */
require.config({
  baseUrl: './js',
  paths: {
    jquery: 'libs/jquery-2.0.2',
  }
})
define([], function () {
  let config;
  let space3d;
  let status;
  let processEle;
  let timerId;
  var element,
    chartEle;
  function render() {
    config = window.bcShowConfig.data;
    space3d = window.bcShowConfig.space3d;
    status = window.bcShowConfig.status;
    //加载界面部分的html内容，并绑定事件
    $.ajax({
      url: "js/module/bc.module.wholeAttackProcess/bc.module.wholeAttackProcess.html",
      type: "get",
      dataType: "text",
      async: false,
      success: function (msg) {
        $('body').append(msg);
        var imgSrcArr = [
          'images/process/check.png',
          'images/process/unknown.png',
          'images/process/process-bg.png',
        ];
        var imgWrap = [];
        function preloadImg(arr) {
          for (var i = 0; i < arr.length; i++) {
            imgWrap[i] = new Image();
            imgWrap[i].src = arr[i];
          }
        }
        preloadImg(imgSrcArr);

        processEle = $('div.wholeProcess > div')
        // 更新数据
        data()
        setInterval(() => {
          data()
        }, config.refreshInterval)
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.info(XMLHttpRequest.status);
        console.info(XMLHttpRequest.readyState);
        console.info(textStatus);
      }
    });
  }

  function data(e) {
    const getting = {
      url: config.process,
      type: 'get',
      dataType: 'json',
      success: function (json) {
        if (json.status == 'success') {
          if (json.data.length > 0) {
            
            if (timerId) clearInterval(timerId);
            $('div.wholeProcess > div').removeClass('highlight');
            const rawData = json.data;
            let i = -1
            //$('div.wholeProcess > div').css('filter', 'brightness(0.5)');
            // $('div.wholeProcess > div').eq(rawData[++i]).css('filter', 'brightness(1)').addClass('highlight').siblings().removeClass('highlight')
            // timerId = setInterval(() => {
            //   // $('div.wholeProcess > div').css('filter', 'brightness(0.5)');
            //   $('div.wholeProcess > div').eq(rawData[++i]).css('filter', 'brightness(1)').addClass('highlight').siblings().removeClass('highlight')
            //   if (i >= rawData.length) $('div.wholeProcess > div').removeClass('highlight'), clearInterval(timerId);
            // }, config.refreshInterval_process)
          }
        }
      },
      complete: function (XHR) {
        XHR = null;
      }
    }
    $.ajax(getting);

    // processMain(++supStep, subStep);

    // let processTimerId = setInterval(() => {
    //   supChildEleLen = $('.process-listContent').eq(supStep).find('p').length
    //   // ++subStep;
    //   processMain(supStep, ++subStep)
    //   // 前一步骤的最后一步完成，马上激活下一步骤
    //   if (subStep >= supChildEleLen - 1) supStep++ , subStep = -1, processMain(supStep, subStep);
    //   // 超出设定的总步骤，清空定时器
    //   if (supStep >= 6) clearInterval(processTimerId);
    //   console.log('x');
    // }, config.refreshInterval_process)       // 5s

    // function processMain(father, child) {
    //   $('div.wholeProcess > div').eq(father).css({
    //     filter: 'brightness(1)',
    //     'background-position': 'left 0  top -324px'
    //   })
    //   const preEleNum = father - 1;
    //   if (preEleNum >= 0) {
    //     $('div.wholeProcess > div').eq(preEleNum).css({
    //       'background-position': 'left 0 top 0'
    //     })
    //   }
    //   if (child >= 0) $('div.wholeProcess > div').eq(father).find('.process-listContent > p').eq(child).addClass('step_success');
    // }
  }
  return {
    render,
    data
  };
});
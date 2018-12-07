/* 
 * @Author: QLQ
 * @summary:计时器模块文件
 * @Date:   2017-11-03 13:53:29
 * @Last Modified by:   anchen
 * @Last Modified time: 2017-11-23 14:00:06
 */
require.config({
  paths: {
    jquery: 'libs/jquery-2.0.2',
  }
})
define(['jquery'], function ($) {
  let config;
  let space3d;
  let status;

  function render() {
    config = window.bcShowConfig.data;
    space3d = window.bcShowConfig.space3d;
    status = window.bcShowConfig.status;
    //加载界面部分的html内容，并绑定事件
    $.ajax({
      url: "js/module/bc.module.leftInfo/bc.module.leftInfo.html",
      type: "get",
      dataType: "text",
      async: false,
      success: function (msg) {
        $('body').append(msg);
        data()
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.info(XMLHttpRequest.status);
        console.info(XMLHttpRequest.readyState);
        console.info(textStatus);
      }
    });
  }

  function data(e) {
    $.getJSON(config.resourceConfig, {}, function (json) {
      d3.select('.l-info-center-blueInfo .host')
        .append('span')
        .attr('class', 'blueInfo-count')
        .html(json.data.host ? json.data.host : '')
      d3.select('.l-info-center-blueInfo .server')
        .append('span')
        .attr('class', 'blueInfo-count')
        .html(json.data.server ? json.data.server : '')
      d3.select('.l-info-center-blueInfo .router')
        .append('span')
        .attr('class', 'blueInfo-count')
        .html(json.data.router ? json.data.router : '')
      d3.select('.l-info-center-blueInfo .interchanger')
        .append('span')
        .attr('class', 'blueInfo-count')
        .html(json.data.interchanger ? json.data.interchanger : '')
      d3.select('.l-info-center-blueInfo .wall')
        .append('span')
        .attr('class', 'blueInfo-count')
        .html(json.data.wall ? json.data.wall : '')
      d3.select('.l-info-center-blueInfo .IDS')
        .append('span')
        .attr('class', 'blueInfo-count')
        .html(json.data.IDS ? json.data.IDS : '')
    });
    // const getting = {
    //   url: config.resourceRedStep,
    //   type: 'get',
    //   dataType: 'json',
    //   success: function (json) {
    //     if (json.status == 'success') {
    //       $('div.l-info-center-redInfo > div').eq(++json.data[0].step - 1).addClass('moving').siblings().removeClass('moving');
    //     }
    //   }
    // }
    // $.ajax(getting);
    
    /************************************ 资源小组-红方 *****************/
    // let redStep = 0;
    // function gotoStep(step) {
    //   $('div.l-info-center-redInfo > div').eq(step).addClass('moving').siblings().removeClass('moving');
    // }
    // let timerId = setInterval(() => { 
    //   gotoStep(++redStep);
    //   if (redStep >= 2) clearInterval(timerId); 
    // }, config.refreshInterval_redGroup)
  }
  return {
    render,
    data
  };
});
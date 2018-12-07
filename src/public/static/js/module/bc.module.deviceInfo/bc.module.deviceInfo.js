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
    tooltip: 'svtcharts.base.tooltipAll/svtcharts.base.tooltipAll'
  }
})
define(['jquery', 'libs/d3.min', 'tooltip'], function (jquery, d3, tooltip) {
  let config, space3d, status, svg, rectGroup;
  let navDetail = [];
  const navTitles = ['进程启停信息', '文件操作信息', '网络开放端口实时信息', '网络连接信息']
  const colors = ['#ff6e45', '#33efb6', '#0084ff', '#9250ff']
  function render() {
    config = window.bcShowConfig.data;
    space3d = window.bcShowConfig.space3d;
    status = window.bcShowConfig.status;
    //加载界面部分的html内容，并绑定事件
    $.ajax({
      url: "js/module/bc.module.deviceInfo/bc.module.deviceInfo.html",
      type: "get",
      dataType: "text",
      async: false,
      success: function (msg) {
        $('body').append(msg);
        tooltip('dd', 'right-bottom')
        // 图片预加载
        // const imgSrc = [
        //   'images/node-info/online.png',
        //   'images/node-info/outline.png',
        //   'images/node-info/close.png',
        // ]
        // let imgArr = [];
        // function preloadImg(arr) {
        //   for (let i = 0; i < arr.length; i++) {
        //     imgArr[i] = new Image();
        //     imgArr[i].src = arr[i];
        //   }
        // }
        // preloadImg(imgSrc);
        let eid;
        $('.equipmentInfoWapper').css({
          'display': 'none'
        })
        $('#closeBtn').click(function (event) {
          $('.equipmentInfoWapper').stop();
          $('.equipmentInfoWapper').fadeOut(200);
        });

        $('body').on('click', '.left-infoDetail-wormDetail', function () {
          if ($(this).attr('data-disable') === 'true') return;
          window.open(`skippage/index.html?${eid}`);
        })

        $('body').on('click', '.left-infoBtn', function () {
          leftInfoDisplay('open')
        })
        $('body').on('click', '.left-infoDetail-closeBtn', function () {
          leftInfoDisplay('close')
        })
        $('body').on('click', '.right-infoDetail-closeBtn', function () {
          rightInfoDisplay('close')
        })
        $('body').on('click', '.right-nav', function () {
          if ($(this).attr('data-disable') === 'true') {
            rightInfoDisplay('open')
            const index = $(this).index();
            $('div.right-infoDetail-title').text(navTitles[index])
            navDetailDraw(navDetail[index]);
          }
        })



        svg = d3.select('.rectSvgWrap').append('svg').attr('width', 228).attr('height', 79)

        space3d.clickHandler = function (e) {
          if (e == undefined) {
            $('.equipmentInfoWapper').stop();
            $('.equipmentInfoWapper').fadeOut(200);
            leftInfoDisplay('close');
            rightInfoDisplay('close');
          } else {
            $('.equipmentInfoWapper').stop();
            $('.equipmentInfoWapper').fadeIn(200);
            leftInfoDisplay('close');
            rightInfoDisplay('close');
            eid = e;
            data(e);

          }
        }
        // data()
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.info(XMLHttpRequest.status);
        console.info(XMLHttpRequest.readyState);
        console.info(textStatus);
      }
    });

    // 左侧信息显隐
    function leftInfoDisplay(mode) {
      if (mode === 'open') $('div.left-infoDetail-wrap').fadeIn(200), rectDraw(rectGroup)
      else if (mode === 'close') $('div.left-infoDetail-wrap').fadeOut(200)
    }
    // 右侧信息显隐
    function rightInfoDisplay(mode) {
      // if (mode === 'open') $('div.right-infoDetail-wrap').css('display', 'block')
      // else if (mode === 'close') $('div.right-infoDetail-wrap').css('display', 'none')
      if (mode === 'open') $('div.right-infoDetail-wrap').fadeIn(200)
      else if (mode === 'close') $('div.right-infoDetail-wrap').fadeOut(200)
    }
    // 左侧横向条形图
    function rectDraw(data) {
      d3.select('.gSub').remove();
      d3.select('.gSup').remove();
      const gSub = svg.append('g')
        .attr('class', 'gSub')
        .attr('transform', 'translate(0, 4)')
      const gSup = svg.append('g')
        .attr('class', 'gSup')
        .attr('transform', 'translate(0, 4)')

      gSub.selectAll('.rectSub')
        .data(data).enter()
        .append('rect')
        .attr('class', 'rectSub')
        .attr('x', 0)
        .attr('y', function (d, i) { return i * 21 })
        .attr('rx', 5)
        .attr('ry', 5)
        .style('width', '157px')
        .style('height', '9px')
        .style('fill', 'rgba(255, 255, 255, .1)')
      gSub.selectAll('.rectLabel')
        .data(data).enter()
        .append('text')
        .attr('class', 'rectLabel')
        .attr('x', 178)
        .attr('y', function (d, i) { return 10 + i * 21 })
        .attr('fill', function (d, i) { return colors[i] })
        .text(function (d) { return d })
      gSup.selectAll('.rectSup')
        .data(data).enter()
        .append('rect')
        .attr('class', 'rectSup')
        .attr('x', 0)
        .attr('y', function (d, i) { return i * 21 })
        .attr('rx', 5)
        .attr('ry', 5)
        .style('height', '9px')
        .style('fill', function (d, i) { return colors[i] })
        .style('width', '0')
        .transition().delay(200).duration(500)
        .style('width', function (d) {
          return parseFloat(d) / 100 * 157 + 'px'
        })
    }
    // 右侧nav详细信息
    function navDetailDraw(data) {
      let i = -1,
        html = '';
      while (++i < data.length) {
        html += `<dl><dt>${data[i].time}</dt><dd>${data[i].info}</dd></dl>`
      }
      $('div.right-infoDetail-list').html(html);
    }

  }

  function data(e) {
    let type = 'get';
    if (status == 0) {
      type = 'get';
    } else {
      type = 'get';
    }
    $.ajax({
      url: config.deviceInfo,
      type: type,
      dataType: "text",
      data: {
        "IP": e
      },
      async: true,
      success: function (json) {
        if (typeof json == 'string') {
          json = JSON.parse(json);
        }
        // console.info(JSON.stringify(json))
        if (json.status == 'success') {

          if (json.data.worm_num == undefined || json.data.worm_num == 0) {
            $('a.left-infoDetail-wormDetail').css({ 'opacity': .5, 'cursor': 'not-allowed' }).attr('data-disable', 'true')
            json.data.worm_num = 0;
          } else {
            $('a.left-infoDetail-wormDetail').css({ 'opacity': 1, 'cursor': 'pointer' }).attr('data-disable', 'false')
          }

          rectGroup = (function (data) {
            const arr = [];
            arr.push(data.cpu_rate, data.RAM_rate, data.netflow_rate, data.IO_rate)
            return arr;
          })(json.data)

          navDetail.length = 0;

          if (isArrAndLength(json.data.process_info)) {
            $('li.right-nav-onoff').css({ 'opacity': 1, 'cursor': 'pointer' }).attr('data-disable', 'true')
            navDetail.push(json.data.process_info)
          } else {
            $('li.right-nav-onoff').css({ 'opacity': .5, 'cursor': 'not-allowed' }).attr('data-disable', 'false')
            navDetail.push([])
          }

          if (isArrAndLength(json.data.file_operation_info)) {
            $('li.right-nav-operation').css({ 'opacity': 1, 'cursor': 'pointer' }).attr('data-disable', 'true')
            navDetail.push(json.data.file_operation_info)
          } else {
            $('li.right-nav-operation').css({ 'opacity': .5, 'cursor': 'not-allowed' }).attr('data-disable', 'false')
            navDetail.push([])
          }

          if (isArrAndLength(json.data.open_port_info)) {
            $('li.right-nav-port').css({ 'opacity': 1, 'cursor': 'pointer' }).attr('data-disable', 'true')
            navDetail.push(json.data.open_port_info)
          } else {
            $('li.right-nav-port').css({ 'opacity': .5, 'cursor': 'not-allowed' }).attr('data-disable', 'false')
            navDetail.push([])
          }

          if (isArrAndLength(json.data.link_info)) {
            $('li.right-nav-link').css({ 'opacity': 1, 'cursor': 'pointer' }).attr('data-disable', 'true')
            navDetail.push(json.data.link_info)
          } else {
            $('li.right-nav-link').css({ 'opacity': .5, 'cursor': 'not-allowed' }).attr('data-disable', 'false')
            navDetail.push([])
          }

          function isArrAndLength(data) {
            return Object.prototype.toString.call(data) === "[object Array]" && data.length > 0
          }

          $('dd.leftInfo-nodeId').text(json.data.node_id == undefined ? '' : json.data.node_id)
          $('dd.leftInfo-nodeName').text(json.data.node_name == undefined ? '' : json.data.node_name)
          $('dd.leftInfo-nodeType').text(json.data.node_type == undefined ? '' : json.data.node_type)
          $('dd.leftInfo-os').text(json.data.os == undefined ? '' : json.data.os)
          $('dd.leftInfo-model').text(json.data.model == undefined ? '' : json.data.model)
          $('dd.leftInfo-ip').text(json.data.ip == undefined ? '' : json.data.ip)
          $('dd.leftInfo-mac').text(json.data.MAC == undefined ? '' : json.data.MAC)
          $('dd.leftInfo-bandwidth').text(json.data.bandwidth == undefined ? '' : json.data.bandwidth)
          $('dd.leftInfo-delay').text(json.data.delay == undefined ? '' : json.data.delay)
          $('dd.leftInfo-loseRate').text(json.data.lose_rate == undefined ? '' : json.data.lose_rate)
          $('dd.leftInfo-worm').text(json.data.worm_num == 0 ? 0 : json.data.worm_num + '个')

        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.info(XMLHttpRequest.status);
        console.info(XMLHttpRequest.readyState);
        console.info(textStatus);
      }
    });
  }
  return {
    render,
    data
  };
});
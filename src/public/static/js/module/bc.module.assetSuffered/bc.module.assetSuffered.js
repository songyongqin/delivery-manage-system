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
    tooltip: 'svtcharts.base.tooltipAll/svtcharts.base.tooltipAll'
  }
})
define(['libs/d3.min', 'tooltip'], function (d3, tooltip) {
  let config;
  let space3d;
  let status;
  // let dataSum = 0;  // 总条数 
  let wapper;
  let allData = [];     // 过程中所有的数据集合
  let pageCounter = 0;  // 页码 （第一页是0）
  const size = 9;       // 每一页最多显示‘size’个
  let firstLoading = true;     // 第一次加载的标志
  const lenCor = [['网页挂马', '#ff1f21']];
  // let noDataSufferListInfo = true;
  function render() {
    config = window.bcShowConfig.data;
    space3d = window.bcShowConfig.space3d;
    status = window.bcShowConfig.status;
    //加载界面部分的html内容，并绑定事件
    $.ajax({
      url: "js/module/bc.module.assetSuffered/bc.module.assetSuffered.html",
      type: "get",
      dataType: "text",
      async: false,
      success: function (msg) {
        $('body').append(msg);
        wapper = d3.select('div.asset-center-list-wapper');
        tooltip('.col', 'right-bottom');
        // setTimeout(() => {
        //   data()
        // }, 6000);
        // 加载数据
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
    // 传入数据格式是 -- 最新的数据在数组的首位,老数据在数组的末位
    const getting = {
      url: config.assetSuffered,
      type: 'get',
      dataType: 'json',
      success: function (json) {
        if (json.status == 'success') {
          if (json.data.length > 0) {
            if (d3.select('.noDataSufferListInfo')) d3.select('.noDataSufferListInfo').remove();
            let initData = (function (data) {
              let arrs = [];
              for (let val of data) {
                arrs.push([
                  val.IP,
                  val.terminal,
                  val.type,
                  // val.timeHMS + '<br/>' + val.timeYMD
                ])
              }
              return arrs;
            })(json.data)
            allData = initData.concat();    // 总数据集合
            if (!firstLoading) {
              pageCounter = 0;
              updateData(pageCounter * size);
              updateEle(pageCounter * size);
            }
            // 判断dom是不是超过九个
            if (!getCheck()) {
              let rawData = initData.concat();
              for (let v of rawData.reverse()) {
                const rowEle = wapper.insert('div', '.row').attr('class', 'row')
                  .style({
                    'margin-bottom': '12px',
                    height: '40px',
                    'line-height': '40px',
                    border: '1px solid rgba(118, 192, 233, 0.1)',
                    background: 'rgba(116, 187,238, 0.1)',
                    'font-size': '14px',
                    color: '#74bbee'
                  })
                for (let col of v) {
                  rowEle.append('div').attr('class', 'col')
                    .style({
                      height: '100%',
                      display: 'inline-block',
                      'text-overflow': 'ellipsis',
                      'white-space': 'nowrap',
                      overflow: 'hidden'
                    })
                    .style('color', renderFont(col))
                    .html(col)
                }
                if (document.querySelector('.asset-center-list-wapper').childNodes.length > size) {
                  firstLoading = false;
                  $('.row:last').remove();
                  // upDateBtn();
                }
              }
            }
            upDateBtn();
            // stat();
          } else {
            // noDataSufferListInfo = false;
            pageCounter = 0;
            allData.length = 0;
            wapper.html('');
            // stat()
            wapper.append('div')
              .attr('class', 'noDataSufferListInfo')
              .style({
                padding: '20px 0',
                'text-align': 'center',
                'font-size': '16px',
                color: '#fff'
              })
              .text('暂无相关数据')
            upDateBtn();
          }
        }
        
      },
      complete: function (XHR) {
        XHR = null
      }
    }
    $.ajax(getting);
    let timerId = setInterval(() => {
      $.ajax(getting);
    }, config.refreshInterval_assetSuffered) 
    function getCheck() {
      if (document.querySelector('.asset-center-list-wapper').childNodes.length >= size) {
        return true;
      }
    }
    // 特定字体颜色
    function renderFont(val) {
      for (let item of lenCor) {
        if (item[0] === val) {
          return item[1];
        }
      }
      return 'inherit';
    }
    // 数据总条数
    function stat() {   
      $('div.page-count').html(`共${dataSum += allData.length}条`);
    }
    // 按钮状态更新 (不可点击置灰处理)
    function upDateBtn() {
      if ((pageCounter + 1) * size < allData.length) {
        $('button.page-next').css({
          opacity: 1,
        })
      } else {
        $('button.page-next').css({
          opacity: 0.5,
        })
      }
      if (pageCounter > 0) {
        $('button.page-pre').css({
          opacity: 1,
        })
      } else {
        $('button.page-pre').css({
          opacity: 0.5,
        })
      }
    }
    // 数据更新
    function updateData(startIdx = 0) {
      let newData = allData.concat();
      // newData.reverse();
      let end = (startIdx + size) >= allData.length ? allData.length : startIdx + size;
      for (let i = startIdx; i < end; i++) {
        let idx = i >= 9 ? i - pageCounter * 9 : i 
        for (let j = 0; j < 4; j++) {
          $('.row').eq(idx).find('.col').eq(j).html(newData[i][j])
          if (j === 2) {
            // console.log(newData[i][j]);
            $('.row').eq(idx).find('.col').eq(j).css({
              color: renderFont(newData[i][j])
            })
          }
        }
      }
    }
    // 元素更新
    function updateEle(startIndex) {
      let end = startIndex + size;
      if (end > allData.length) {
        const num = size - (end - allData.length);
        for (let i = num; i < size; i++) {
          $('.row').eq(i).hide();
        }
      } else {
        $('.row').show();
      }
    }
    // 下一页 点击事件
    $('body').off('click', '.page-next');
    $('body').on('click', '.page-next', function(e) {
      pageCounter = (pageCounter + 1) * size > allData.length ? pageCounter : pageCounter + 1;
      updateEle(pageCounter * size);
      updateData(pageCounter * size);
      upDateBtn();
    })
    $('body').off('click', '.page-pre');
    $('body').on('click', '.page-pre', function(e) {
      pageCounter = (pageCounter - 1) >= 0 ? pageCounter - 1 : pageCounter;
      updateEle(pageCounter * size);
      updateData(pageCounter * size);
      upDateBtn();
    })
  }
  return {
    render,
    data
  };
});
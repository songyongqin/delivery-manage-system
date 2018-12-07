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
  let isOpen = true;
  let index = 0;
  const titleArr = ['APT海莲花', 'APT夜龙'];
  function render() {
    config = window.bcShowConfig.data;
    space3d = window.bcShowConfig.space3d;
    status = window.bcShowConfig.status;
    //加载界面部分的html内容，并绑定事件
    $.ajax({
      url: "js/module/bc.module.nav/bc.module.nav.html",
      type: "get",
      dataType: "text",
      async: false,
      success: function (msg) {
        $('body').append(msg);
        //  总菜单开关
        $('body').on('click', '.menuBtn', function (e) {
          if (isOpen) {
            $('.menu-item-detail').css('display', 'none')
            $('.nav-menu-wrap').css('display', 'none')
          } else {
            $('.nav-menu-wrap').css('display', 'block')
            $('.menu-item-title').removeClass('nav-active')
          }
          isOpen = !isOpen;
          index = -1;
        })
        // 一级菜单列表
        $('body').on('click', '.menu-item-title', function () {
          const targetIndex = $(this).attr('idx')
          if (targetIndex == index) {
            $('.menu-item-detail').css('display', 'none')
            $('.menu-item-title').removeClass('nav-active')
            index = -1;
          } else {
            $('.menu-item-detail').css('display', 'none')
            $('.menu-item-detail').eq(targetIndex).css('display', 'block')
            $('.menu-item-title').removeClass('nav-active')
            $('.menu-item-title').eq(targetIndex).addClass('nav-active')
            index = targetIndex;
          }
        })  
        // 二级菜单列表
        $('body').on('click', '.menu-item-detail-item', function (e) {
          let urlParam = null;
          const parentText = $(this).parent().siblings('a').text();
          $('.menu-item-detail-item').removeClass('menu-item-detail-item-active');
          $(this).addClass('menu-item-detail-item-active')
          switch (parentText) {
            case 'APT海莲花':
              window.location.href = "//192.168.3.40/hlh/release/index.html?hlh=true"
              break;
            case 'APT夜龙':
              window.location.href = "//192.168.3.40/yl/release/index.html?yl=true";
              break;

            default:
              break;
          }
        })
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
    const url = window.location.search.substring(1)
    const urlData = decodeUrl(url);
    if (urlData.hlh != 'true') {
      $('.nav-menu-wrap').remove();
      $('.menuBtn').remove();
      return
    }
    const nowTime = new Date();
    const str = nowTime.toLocaleDateString().split('/').join('.')
    
    // window.bcShowConfig.space3d.listSelect(urlData);
      let i = -1;
      let html = '';
      while (++i < 2) {
        html += `
        <li class="menu-item">
          <a class="menu-item-title ${i == 0 ? 'nav-active' : ''}" href="javascript:" idx="${i}"></a>
          <div class="menu-item-detail">
            <div class="menu-item-detail-item ${i == 0 ? 'menu-item-detail-item-active' : ''}">
              <div class="menu-item-detail-item-content"></div>
            </div>
            <div class="menu-item-detail-item">
              <div class="menu-item-detail-item-content"></div>
            </div>
            <div class="menu-item-detail-item">
              <div class="menu-item-detail-item-content"></div>
            </div>
          </div>
        </li>`
      $('.nav-menu').html(html);
      $('.menu-item-title').each(function (i, ele) {
        $(this).text(titleArr[i]).attr('title', titleArr[i])
        $(this).siblings().find('.menu-item-detail-item').each(function (j, ele) {
          const html = `<div class="menu-item-detail-item-content">
                          <p class="menu-item-detail-item-content-text" title="${i === 0 ? 'APT海莲花' : 'APT夜龙'}">${i === 0 ? 'APT海莲花' : 'APT夜龙'}</p>
                          <p class="menu-item-detail-item-content-date">${str}</p>
                          <p class="menu-item-detail-item-content-time">${formatTime(nowTime.getHours(), nowTime.getMinutes(), j)}</p>
                      </div>`
          $(this).html(html)
        })
      })
    }
    
    // 时间显示处理
    function formatTime(hour, min, i) {
      if (min - i * 3 < 0) hour -= 1, min = min + 60 - i * 3;
      min = min - i * 3 < 10 ? '0' + (min - i * 3) : min - i * 3;
      hour = hour < 10 ? '0' + hour : hour;
      return hour + ':' + min
    }
  }
  // 获取url参数并解码
  function decodeUrl(url) {
    if (url.indexOf('&') > 0) {
      const paraPair = url.split('&')
      let i = -1;
      const obj = Object.create(null);
      const len = paraPair.length;
      while (++i < len) {
        const key = decodeURIComponent(paraPair[i].split('=')[0]);
        const val = decodeURIComponent(paraPair[i].split('=')[1]);
        obj[key] = val;
      }
      return obj
    } else {
      const obj = Object.create(null)
      const arr = url.split('=');
      obj[arr[0]] = arr[1];
      return obj;
    }
    
  }

  return {
    render,
    data
  };
});
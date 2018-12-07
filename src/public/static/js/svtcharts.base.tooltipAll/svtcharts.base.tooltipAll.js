/* 
 * @Author: anchen
 * @Date:   2016-11-28 09:56:01
 * @summary:文字提示 js文件
 * @Last Modified by:   anchen
 * @Last Modified time: 2017-10-11 17:09:14
 */
require.config({
    paths: {
        jquery: 'libs/jquery-2.0.2.min'
    }
})
define(['jquery'], function($) {
    $('head').append('<link rel="stylesheet" type="text/css" href="js/svtcharts.base.tooltipAll/svtcharts.base.tooltipAll.css">')

    function tootip(element, direct = 'top') {
        //清除界面中已经存在的元素
        $('#svtcharts-base-tooltipAll').remove();
        //添加提示元素
        $('body').append('<div id="svtcharts-base-tooltipAll"></div>');
        //清楚绑定元素身上的事件
        $('body').off('mouseenter',element +'');
        $('body').off('mouseleave',element +'');
        $('body').off('mousemove',element +'');
        
        //绑定划入事件
        $('body').on('mouseenter',element +'',function(e) {
            apostropheAllInfo($(this)[0], $(this).html(), e);
        });
        $('body').on('mousemove',element+'', function(e) {
            if (direct == 'left-bottom' || direct == 'left-top' || direct == 'right-top' || direct == 'right-bottom') {
                apostropheAllInfo($(this)[0], $(this).html(), e);

            }

        });
        //绑定滑出事件
        $('body').on('mouseleave', element+'',function(e) {
            apostropheAllInfoOut()
        });
        //滑过执行函数
        function apostropheAllInfo(element, text, event) {

            //element是选择器调用之后的结果
            var rect = element.getBoundingClientRect();
            // $('#svtcharts-base-tooltipAll').html(removeHTMLTag(text));
            $('#svtcharts-base-tooltipAll').html(text);     // 不去掉 html 标签
            //console.info(text)
            let top, left;
            switch (direct) {
                case 'top':
                    //父元素的top值+滚动条的高度-提示框的高度-padding值
                    top = rect.top + $(window).scrollTop() - $('#svtcharts-base-tooltipAll').height() - 10;
                    //父元素的left值+滚动条的移动值-提示框的宽度的一半-padding值
                    left = rect.left + $(window).scrollLeft() + (rect.width - $('#svtcharts-base-tooltipAll').width()) / 2;
                    break;
                case 'bottom':
                    top = rect.top + $(window).scrollTop() + rect.height;
                    left = rect.left + $(window).scrollLeft() + (rect.width - $('#svtcharts-base-tooltipAll').width()) / 2;

                    break;
                case 'left-bottom':
                    top = event.clientY + $(window).scrollTop() + 10;
                    left = event.clientX + $(window).scrollLeft() - $('#svtcharts-base-tooltipAll').width() - 10;
                    break;
                case 'left-top':
                    top = event.clientY + $(window).scrollTop() - $('#svtcharts-base-tooltipAll').height() - 10;
                    left = event.clientX + $(window).scrollLeft() - $('#svtcharts-base-tooltipAll').width() - 10;
                    break;
                case 'right-top':
                    top = event.clientY + $(window).scrollTop() - $('#svtcharts-base-tooltipAll').height() - 10;
                    left = event.clientX + $(window).scrollLeft() + 10;
                    break;
                case 'right-bottom':
                    top = event.clientY + $(window).scrollTop() + 10;
                    left = event.clientX + $(window).scrollLeft() + 10;
                    break;

            }

            $('#svtcharts-base-tooltipAll').css({
                'top': top,
                'left': left,
            })
            $('#svtcharts-base-tooltipAll').stop();
            $('#svtcharts-base-tooltipAll').fadeIn(400);
        }
        //滑出执行函数
        function apostropheAllInfoOut() {
            $('#svtcharts-base-tooltipAll').stop();
            $('#svtcharts-base-tooltipAll').fadeOut(400);
        }
        //去除内容中的标签
        function removeHTMLTag(str) {
            str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
           // str = str.replace(/\s+/g, "") //去除行尾空白
            return str;
        }
    }
    return tootip;
});
/* 
 * @Author: anchen
 * @Date:   2017-11-08 10:29:10
 * @summary:间隔圆环模块 js文件
 * @Last Modified by:   anchen
 * @Last Modified time: 2017-11-10 22:11:32
 */
require.config({
    paths: {
        jquery: 'libs/jquery-2.0.2.min',
    }
})
define(['jquery', 'libs/d3.min'], function($, d3) {
    function intervalCircle(options) {
        let _ele = options.element;
        let width = $(_ele).width();
        let height = $(_ele).height();
        let svg = d3.select(_ele).append("svg").attr("class", "svg").attr("width", width).attr("height", height);
        //起始角度
        let startAngle = -Math.PI;
        //终止角度
        let endAngle = Math.PI;
        //外半径
        let outerRadius = (width - 16)/2;
        //内半径
        let innerRadius = outerRadius - 8;
        //圆心
        let centerX = width / 2;
        let centerY = height / 2;
        //目前所处的数字
        let now = options.now;
        let copies = options.copies;
        function ciclePath() {
            svg.selectAll('.svtcharts-base-intervalCircle-circle1').remove();
            svg.selectAll('.svtcharts-base-intervalCircle-circle2').remove();
            var radius1 = 0.5 * width;
            //计算第一个圆的起点和终点坐标
            var circleStartX = width / 2;
            var circleEndY = height;
            var circleStartY = 0;
            svg.append('circle').attr('class', 'svtcharts-base-intervalCircle-circle1').attr({
                'cx':centerX,
                'cy':centerY,
                'r':width/2-2,
                'stroke':options.border,
                'fill': 'none'
            });
             svg.append('circle').attr('class', 'svtcharts-base-intervalCircle-circle2').attr({
                'cx':centerX,
                'cy':centerY,
                'r':width/2-4,
                'stroke':options.border,
                'fill': 'none'
            })
            svg.select("g").remove();
        }
        //生成圆环函数
        function intervalCircle(){
            svg.selectAll('.svtcharts-base-intervalCircle').remove();
            let data = [];
            let color = [];
            let ma = (endAngle - startAngle) / 60;
            let use = Math.floor((now * 100) / 5);
            for (let i = 0; i < copies; i++) {
                let ob = new Object();
                ob.startAngle = startAngle + (3 * ma) * i;
                ob.endAngle = ob.startAngle + 2 * ma;
                data.push(ob);
                if (i < use) {
                    color.push(options.useColor);
                } else {
                    color.push(options.noColor);
                }
            }
            var arc = d3.svg.arc().outerRadius(outerRadius) // <-C
            .innerRadius(innerRadius);
            svg.append("g").attr('class', 'svtcharts-base-intervalCircle').attr("transform", "translate(" + centerX + "," + centerY + ")").selectAll("path.arc").data(data).enter().append("path").attr("class", "arc").attr("fill", function(d, i) {
                return color[i];
            }).attr("d", function(d, i) {
                return arc(d, i); // <-D
            });
        }
        this.init=function(){
            ciclePath();
            intervalCircle();
        }
        this.data=function(num){
            now=num;
            intervalCircle();
        }
        return this;
    }
    return intervalCircle;
});
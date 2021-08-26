/**

 @Name：layuiAdmin 主页示例
 @Author：star1029
 @Site：http://www.layui.com/admin/
 @License：GPL-2
    
 */


layui.define(function(exports){
  var admin = layui.admin;
  
  //区块轮播切换
  layui.use(['admin', 'carousel'], function(){
    var $ = layui.$
    ,admin = layui.admin
    ,carousel = layui.carousel
    ,element = layui.element
    ,device = layui.device();

    //轮播切换
    $('.layadmin-carousel').each(function(){
      var othis = $(this);
      carousel.render({
        elem: this
        ,width: '100%'
        ,arrow: 'none'
        ,interval: othis.data('interval')
        ,autoplay: othis.data('autoplay') === true
        ,trigger: (device.ios || device.android) ? 'click' : 'hover'
        ,anim: othis.data('anim')
      });
    });
    
    element.render('progress');
    
  });



  //访问量

  layui.use(['carousel', 'echarts'], function(){
    var $ = layui.$
    ,carousel = layui.carousel
    ,echarts = layui.echarts;
    
    var echartsApp = [], options = [
      {
        tooltip : {
          trigger: 'axis'
        },
        calculable : true,
        legend: {
          data:['加油量','加油笔数','进油量']
        },
        
        xAxis : [
          {
            type : 'category',
            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
          }
        ],
        yAxis : [
          {
            type : 'value',
            name : '加油量',
            axisLabel : {
              formatter: '{value} '
            }
          },
          {
            type : 'value',
            name : '加油笔数',
            axisLabel : {
                formatter: '{value} '
            }
          }
        ],
        series : [
          {
            name:'加油量',
            type:'line',
            data:[900, 850, 950, 1000, 1100, 1050, 1000, 1150, 1250, 1370, 1250, 1100]
          },
          {
            name:'加油笔数',
            type:'line',
            yAxisIndex: 1,
            data:[850, 850, 800, 950, 1000, 950, 950, 1150, 1100, 1240, 1000, 950]
          },
          {
            name:'进油量',
            type:'line',
            data:[870, 850, 850, 950, 1050, 1000, 980, 1150, 1000, 1300, 1150, 1000]
          }
        ]
      }
    ]
    ,elemDataView = $('#LAY-index-pagetwo').children('div')
    ,renderDataView = function(index){
      echartsApp[index] = echarts.init(elemDataView[index], layui.echartsTheme);
      echartsApp[index].setOption(options[index]);
      window.onresize = echartsApp[index].resize;
    };
    //没找到DOM，终止执行
    if(!elemDataView[0]) return;
    renderDataView(0);
    
  });

 
  
  //回复留言
  admin.events.replyNote = function(othis){
    var nid = othis.data('id');
    layer.prompt({
      title: '回复留言 ID:'+ nid
      ,formType: 2
    }, function(value, index){
      //这里可以请求 Ajax
      //…
      layer.msg('得到：'+ value);
      layer.close(index);
    });
  };

  exports('sample', {})
});
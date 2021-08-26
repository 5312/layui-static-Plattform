layui.define([
  'jquery',
], function (exports) {
  'use strict';
  let $ = layui.jquery;
  class ActiveElm {
    constructor() {
      this.fwidth = ''; // 父宽度
      this.lineWidth = 320 // 左边宽
      this.line = '';// 拖拽线DOM
    }
    config = {
      elem: '',
      minWidth: 200,
      maxWidth: 600,
    }
    objTable = {};
    render = (config) => {
      if (!!config) {
        this.config = $.extend(this.config, config);
      }

      this._init();
    }

    // 初始化
    _init() {
      this._setLine()
      this._onbind();
      this._onresize();
    }
    _setLine() {// 添加边界
      this.line = $('<div class="layui-active-after"></div>')
      $(this.config.elem).append(this.line)
    }
    _fluidWidth() { // 父元素宽度
      this.fwidth = $('.layui-active-fluid')[0].clientWidth;
      // 右边元素宽度
      $($('.layui-active-right')[0]).width(this.fwidth - this.lineWidth - 10);
    }
    _onbind() {
      const MINW = this.config.minWidth;
      const MAXW = this.config.maxWidth;
      const elem = $(this.config.elem);
      const moveElem = this.line;
      let that = this;
      // down
      $('body').on('mousedown', '.layui-active-after', function (e) {
        var tLeft = e.clientX - moveElem.offset().left; //鼠标按下时和选中元素的坐标偏移:x坐标
        // 移动
        $('body').on('mousemove', function (e) {
          var moveX = e.clientX - tLeft;
          // safe width
          if (moveX < MINW) { return }
          if (moveX > MAXW) { return }
          // line position
          moveElem.css('left', moveX + 'px');

          that.lineWidth = moveX
          // left width
          elem.width(moveX + 'px')
          // right width
          that._fluidWidth();
        })
      })
      // up
      $('body').on('mouseup', function (e) {
        $('body').off('mousemove')
      })
    }
    _onresize() {
      let that = this;
      window.onresize = function (e) {
        that._fluidWidth();
      }
    }
  }

  const activeElm = new ActiveElm();
  exports('activeElm', activeElm)
});
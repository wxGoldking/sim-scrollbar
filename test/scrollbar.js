// e为最外层提供滚动条定位的元素的选择器（position = 'relative'，定高或给定最大高度，overflow hidden）；
// 中间层为一个dom用来滚动,包裹滚动槽和滚动滑块
//最内层必须为一个dom元素包裹；
scrollbar = function(e, w) {
  // e - Element
  // w - scrollbar width
  if (w == undefined) {
    this.sbw = 5;
  } else {
    this.sbw = w;
  }


  var _this = this;
  this.element = document.querySelector(e);
  this.height = this.element.style.height;
  this.maxHeight = this.element.style.maxHeight;
  this.element.style.position = 'relative';
  this.orgPar = this.element.children[0];
  this.dirtion = '';
  this.preStatus = {};
  this.setOption = function ({dirtion}){
    _this.dirtion = dirtion;
  }
  this.init = function() {
    this.orgPar.style.cssText = `height:100%;overflow-y:auto;overflow-x:hidden;padding-right: ${
      this.sbw + 20
    }px;width:100%;box-sizing:content-box;-moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -khtml-user-select: none;
    user-select: none; `;
    this.scrollBarHolder = document.createElement("div");//滑动槽
    this.scrollBar = document.createElement("div");//滑块
    this.scrollBarHolder.className = "scrollbot-scrollbar-holder";
    this.showScrollBar = false;
    this.scrollBarHolder.style.cssText = `position:absolute;top:0;right:0px;height:100%;background:#222;width:${this.sbw}px;display:${
      this.showScrollBar ? "block" : "none"
    }`;
    this.scrollBar.className = "scrollbot-scrollbar";
    this.scrollBar.style.cssText = `position:absolute;top:0;right:0;height:20%;background:#666;width:${
      this.sbw
    }px;border-radius:2px`;

    this.scrollBarHolder.appendChild(this.scrollBar);
    this.orgPar.appendChild(this.scrollBarHolder);



    this.scrollBarHolder.onmousedown=function(e){
        let innerHeight = _this.orgPar.children[0].clientHeight, outerHeight = _this.orgPar.clientHeight;
        let topResult = e.offsetY / outerHeight *100;
        _this.orgPar.scrollTop = topResult/(100)*(innerHeight-outerHeight)
    }


    this.scrollBar.onmousedown=function(e){
        e.stopPropagation();
        let innerHeight = _this.orgPar.children[0].clientHeight, outerHeight = _this.orgPar.clientHeight;
        let scrollBarHeight = _this.scrollBar.clientHeight,
        orgParScrollTop = _this.orgPar.scrollTop;
        let y1=e.pageY;
        document.onmousemove=function(e){
            let y2=e.pageY;
            let eltaY=y2-y1;
            let percent = eltaY/(outerHeight-scrollBarHeight);
            _this.orgPar.scrollTop = orgParScrollTop + percent*(innerHeight-outerHeight)
        }
    }
    document.onmouseup=function(e){
        document.onmousemove = null;
    }
  };


  this.orgPar.addEventListener("scroll", function(e) {
    if(!_this.showScrollBar) return;
    let innerHeight = _this.orgPar.children[0].clientHeight, outerHeight = _this.orgPar.clientHeight;
    let scrollBarHeight = _this.scrollBar.clientHeight;
    let percent = _this.orgPar.scrollTop/(innerHeight-outerHeight);//滚动滑块位置百分比
    //存储滑动状态，位置
    _this.preStatus = {
      top: _this.orgPar.scrollTop,
      bottom: innerHeight - outerHeight - _this.orgPar.scrollTop,
      innerHeight: innerHeight,
      outerHeight: outerHeight
    }
    _this.scrollBar.style.top = percent*100*(outerHeight-scrollBarHeight)/(outerHeight) + "%";//滚动滑块位置

  });

//滚动条区域滚动至顶部和底部时阻止默认事件（阻止触发document页面滚动)
  function wheel(e){
    //获取滚动方向（考虑IE和FF兼容）
    var e=e||event, v=e.wheelDelta||-e.detail;
    //判断滚动方向和滚动条边界
    if(
        v>0 && _this.orgPar.scrollTop == 0 ||
        v<0 && _this.orgPar.scrollTop == _this.orgPar.scrollHeight - _this.orgPar.clientHeight
    ){
      //阻止默认行为（考虑IE兼容）
      e.preventDefault&&e.preventDefault();
      return false;
    };
  };
  // 绑定滚轮事件（考虑FF兼容）
  "onmousewheel" in this.orgPar ? this.orgPar.onmousewheel = wheel: this.orgPar.addEventListener("DOMMouseScroll",wheel);


  this.setStyle = function ({block, groove}) {
    for (const key in block) {
      if (block.hasOwnProperty(key) && key !== 'height') {
        _this.scrollBar.style[key] = block[key]
      }
    }
    for (const key in groove) {
      if (groove.hasOwnProperty(key) && key !== 'height') {
        _this.scrollBarHolder.style[key] = groove[key]
      }
    }
  }

  this.refresh = function(refreshDir) {
    if(!_this.height && _this.maxHeight) {
      _this.element.style.height = ''
      _this.element.style.height = _this.element.clientHeight > _this.maxHeight  ? _this.maxHeight + 'px' : _this.element.clientHeight + 'px';
    }

    let innerHeight = _this.orgPar.children[0].clientHeight, outerHeight = _this.orgPar.clientHeight;
    if(innerHeight <= outerHeight){
      _this.showScrollBar = false;
      _this.scrollBarHolder.style.display = `${_this.showScrollBar ? "block" : "none"}`;
      return;
    }
    _this.showScrollBar = true;
    _this.scrollBarHolder.style.display = `${_this.showScrollBar ? "block" : "none"}`;
    let scrollBarHeight = outerHeight/(innerHeight);
    _this.scrollBar.style.height = scrollBarHeight *100 + '%';

    //默认内容变化滚动到顶部
    let positionTop = 0;
    //内容变化滚动到底部
    if(_this.dirtion === 'bottom') positionTop = 9999999999;
    //内容变化不滚动
    if(_this.dirtion === 'none') {
      !refreshDir && (positionTop = _this.preStatus.top);// 内容从上部变化，
      refreshDir && (positionTop = innerHeight - _this.preStatus.innerHeight + _this.preStatus.top) // 内容从底部变化，
    }
    _this.orgPar.scrollTop = positionTop ;//滚动位置
    // _this.scrollBar.style.top = 0;//滑块
    // _this.scrollBarHolder.style.top = 0;//滑动槽位置

  };

    _this.init();
    _this.refresh()

};






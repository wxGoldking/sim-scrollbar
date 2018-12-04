# simulate-scrollbar
simulate beautify scrollbar
# description
A Simulate the beautification of the scroll bar plug-in

# install
npm install simulate-scrollbar
# usage
```
<div style="overflow: hidden; position: relative; height: 350px; width:300px" id="el">
    <div>
      <ul>
        <li>sgfdgdsfg</li>
        <li>sgfdgdsfg</li>
        <li>sgfdgdsfg</li>
        <li>sgfdgdsfg</li>
        <li>sgfdgdsfg</li>
        <li>sgfdgdsfg</li>
        <li>sgfdgdsfg</li>
        <li>sgfdgdsfg</li>
        <li>sgfdgdsfg</li>
        <li>sgfdgdsfg</li>
        <li>sgfdgdsfg</li>
        <li>sgfdgdsfg</li>
        <li>sgfdgdsfg</li>
        <li>sgfdgdsfg</li>
        <li>sgfdgdsfg</li>
        <li>sgfdgdsfg</li>
        <li>sgfdgdsfg</li>
        <li>sgfdgdsfg</li>
        <li>sgfdgdsfg</li>
        <li>sgfdgdsfg</li>
        <li>sgfdgdsfg</li>
        <li>sgfdgdsfg</li>
        <li>sgfdgdsfg</li>
        <li>sgfdgdsfg</li>
        <li>sgfdgdsfg</li>
      </ul>
    </div>
  </div>
const scrollbar = require('simulate-scrollbar')

//通过第一个参数选取dom(必填，且必须设置高度或最大高度(最大高度必须为行内样式)，同时设置时最大高度无效)，第二个参数设置滚动条宽度(可缺省，缺省时默认为5px)
let scroll = new scrollbar('#el', 10);
 ```
  ## setStyle
 ```
// 设置滚动条样式（样式不支持设置高度）
scroll.setStyle({
  block: {
    backgroundColor: '#222',
    borderRadius: '10px',
  },//滑块样式
  groove: {
    backgroundColor: '#aaa',
    borderRadius: '10px',
  }//滚动槽样式
})
 ```

 ## setOption
 set Option(设置属性api):
 ```
//dirtion bottom or top : refresh 时滚动的方向(底部或顶部) When refresh scrolling to the dirtion(bottom or top)
 scroll.setOption({
   dirtion: 'bottom',//bottom底部， 默认top, none表示绝对滚动位置不变 ('Bottom', default 'top', 'none' indicates that the absolute scrolling position is unchanged)
 })
 ```

 ## refresh
 if the length of the contents is changed(内容长度发生变化时调用):
 ```
 //The 'refresh' parameter is valid when dirtion is none, true means that the content is reduced or inserted from the top, false or not passed by default means that the content is reduced or inserted from the bottom('refresh' 参数在 dirtion为none 时有效，true表示内容由顶部减少或插入，false 或默认不传表示内容由底部减少或插入)

 scroll.refresh(refresh)
 ```

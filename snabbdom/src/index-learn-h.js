import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

const patch = init([
  // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
]);

// 创建虚拟节点
const myVnode = h('a',{props:{
  href:"http://www.atguigu.com",
  target:"_blank"
}},'尚硅谷')
console.log(myVnode)

const myVnode2=h('ul',{},[h('li',{},'苹果'),h('li',{},'香蕉')])
// 让虚拟节点上树
const container = document.getElementById("container")

patch(container,myVnode2)

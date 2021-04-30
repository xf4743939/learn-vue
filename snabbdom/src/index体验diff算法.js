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



const vnode1=h('div',{},[
  h('p',{
    key:'苹果'
  },'苹果'),
  h('p',{
      key:'香蕉'  
  },'香蕉')
])
// 让虚拟节点上树
const container = document.getElementById("container")
const btn = document.getElementById("btn");
patch(container,vnode1)

const vnode2= h('div',{},[
  h('p',{
      key:"番茄"
  },'番茄'),
  h('p',{
      key:'苹果'
  },'苹果'),
  h('p',{
    key:'香蕉'
  },'香蕉'),
  h('p',{
    key:'西瓜'
  },'西瓜'),
  h('p',{
    key:'菠萝'
  },'菠萝')
])
btn.addEventListener('click',()=>{
 patch(vnode1,vnode2)
},false)




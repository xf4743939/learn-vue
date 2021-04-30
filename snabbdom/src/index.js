import h from './mysnabbdom/h.js'
import patch from './mysnabbdom/patch.js'

const vnode1 = h('h1',{},
[
  h('p',{},[
    h('span',{},'哦哦'),
    h('span',{},'嗯嗯')
  ]),
  h('p',{},'嘻嘻'),
])

const container = document.getElementById("container")
const btn =document.getElementById('btn')

patch(container,vnode1)

const vnode2= h('section',{},[
  h('p',{},'ss'),
  h('p',{},'www')
])

btn.addEventListener('click',function(){
  patch(vnode1,vnode2)
},false)
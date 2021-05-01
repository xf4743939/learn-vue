import h from './mysnabbdom/h.js'
import patch from './mysnabbdom/patch.js'

const vnode1 = h('section',{
  key:'1'
},
[
    h('p',{key:"1"},'A'),
    h('p',{key:"2"},'B'),
    h('p',{key:"3"},'C')
 ])

const vnode2= h('section',{
  key:'1'
},[
  h('p',{key:'5'},'哈哈'),
])

const container = document.getElementById("container")
const btn =document.getElementById('btn')

patch(container,vnode1)



btn.addEventListener('click',function(){
  patch(vnode1,vnode2)
},false)
import createElement from './createElement.js';
import updateChildren from './updateChildren.js'

export default function patchVnode(oldVnode,newVnode){
       // 新旧节点相同 什么不做
       if(oldVnode === newVnode) return;
       // 新节点有text
       if(newVnode.text && (newVnode.children === undefined ||newVnode.children.length === 0)){
         if(newVnode.text !== oldVnode.text){
           oldVnode.elm.innerText = newVnode.text;
         }
       }else{
         // 两者都有children 要判断新增、删除、更新三种情况
          // 判读老的有没有children
          if(Array.isArray(oldVnode.children) && oldVnode.children.length){
            updateChildren(oldVnode.elm,oldVnode.children,newVnode.children)
          }else{
            // 旧节点没有children
            oldVnode.elm.innerHTML = '';
            for(let i=0,len=newVnode.children.length;i<len;i++){
              const dom= createElement(newVnode.children[i])
              oldVnode.elm.appendChild(dom)
            }
          }
     }
}
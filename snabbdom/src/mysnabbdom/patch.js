import vnode from './vnode';
import createElement from './createElement.js';

export default function (oldVnode,newVnode){
 
   // 判断传入的第一个参数，是DOM节点还是虚拟节点
   if(oldVnode.sel === '' || oldVnode.sel === undefined){
     oldVnode = vnode(oldVnode.tagName.toLowerCase(),{},[],undefined,oldVnode)
   }
 
   // 判断oldVnode 和 newVnode 是不是同一节点
  if(sameVnode(oldVnode,newVnode)){
     // 精细比较
  }else{
    // 暴力插入新节点,删除旧节点
    const newNodeElement = createElement(newVnode);
    if(oldVnode.elm.parentNode && newNodeElement){
      // 插入到老节点前
      oldVnode.elm.parentNode.insertBefore(newNodeElement,oldVnode.elm)
    }
    oldVnode.elm.parentNode.removeChild(oldVnode.elm)
  }
  
}

function sameVnode(oldVnode,newVnode){
  if(oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) return true;
  return false; 
}
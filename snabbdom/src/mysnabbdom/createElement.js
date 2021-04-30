// 真正创建节点,将vnode 创建为DOM,不进行插入
export default function createElement(vnode){
  let domNode =document.createElement(vnode.sel)
   // 没有子节点 还有文本
  if(vnode.text !== '' &&  (vnode.children === undefined || vnode.children.length === 0)){
     domNode.innerText = vnode.text;
     vnode.elm = domNode;
  }else if(Array.isArray(vnode.children) && vnode.children.length>0){

    //  const fragment = document.createDocumentFragment();
     for(let i =0,len=vnode.children.length;i<len;i++){
       let ch= vnode.children[i]
       // 创建出它的DOM,一旦调用createElement 就意味着；创建出DOM了,并且它的elm属性指向了创建出的DOM
       let chdom =createElement(ch)
       domNode.appendChild(chdom)
     }
     vnode.elm = domNode
    //  domNode.appendChild(fragment);
    //  pivot.parentNode.insertBefore(domNode,pivot)
  }
  return domNode
}
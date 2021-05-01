
import patchVnode from './patchVnode';
import createElement from './createElement.js';

function checkSameVnde(a,b){
  return a.sel === b.sel && a.key === b.key;
}

export default function updateChildren(parentElm,oldCh,newCh){
  console.log('updateChildren')
  // 旧前
  let oldStartIdx=0;
  // 新前
  let newStartIdx=0;
  // 旧后
  let oldEndIdx =oldCh.length-1;
  // 新后
  let newEndIdx = newCh.length -1;
  // 旧前节点
  let oldStartVnode = oldCh[0]
  // 新前节点
  let newStartVnode = newCh[0]
  // 旧后节点
  let oldEndVnode = oldCh[oldEndIdx]
  // 新后节点
  let newEndVnode =newCh[newEndIdx];
  let keyMap=null;

  while(oldStartIdx<=oldEndIdx && newStartIdx<=newEndIdx){
     // 首先不是判断指针有没有命中，而是要略过已经加undefined标记的东西
     if(oldStartVnode === null || oldCh[oldStartIdx] === undefined){
         oldStartVnode =oldCh[++oldStartIdx];
     }else if(oldEndVnode === null || oldCh[oldEndIdx] === undefined){
       oldEndVnode = oldCh[--oldEndIdx]
     }else if(newStartVnode === null || newCh[newStartIdx] ===undefined){
       newStartVnode = newCh[++newStartIdx]
     }else if(newEndVnode === null || newCh[newEndIdx] === undefined){
       newEndVnode = newCh[--newEndIdx]
     }else if(checkSameVnde(oldStartVnode,newStartVnode)){
       console.log('1命中')
         patchVnode(oldStartVnode,newStartVnode);
          oldStartVnode =oldCh[++oldStartIdx];
          newStartVnode = newCh[++newStartIdx];  
     }else if(checkSameVnde(oldEndVnode,newEndVnode)){
      console.log('2命中');
      patchVnode(oldEndVnode,newEndVnode);
       oldEndVnode=oldCh[--oldEndIdx];
       newEndVnode= newCh[--newEndIdx];
     }else if(checkSameVnde(oldStartVnode,newEndVnode)){
        // 新后与旧前
        console.log('3命中');
         patchVnode(oldStartVnode,newEndVnode);
         parentElm.insertBefore(oldStartVnode.elm,oldEndVnode.elm.nextSibling)
         oldStartVnode=oldCh[++oldStartIdx];
         newEndVnode= newCh[--newEndIdx];
     }else if(checkSameVnde(oldEndVnode,newStartVnode)){
        // 新前与旧后
        console.log('4命中');
        patchVnode(oldEndVnode,newStartVnode);
        parentElm.insertBefore(oldEndVnode.elm,oldStartVnode.elm)
        oldEndVnode=oldCh[--oldEndIdx];
        newStartVnode= newCh[++newEndIdx];
     }else{
        // 四种选项都没有命中
        if(!keyMap){
          // 把oldKey 和 i 进行映射
          keyMap =Object.create(null);
          for(let i=oldStartIdx;i<=oldEndIdx;i++){
            const key = oldCh[i].key;
            if(key){
              keyMap[key]=i;
            }
          }
        }
        // 寻找当前这项newStartIdx 在keyMap中映射的序号
        const idxInOld= keyMap[newStartVnode.key];
        if(idxInOld){  
          // 不是全新的项，要移动
          const elmToMove = oldCh[idxInOld]
          patchVnode(elmToMove,newStartVnode);
          oldCh[idxInOld] =undefined;
          // 调用insertBefore 也可以实现移动
          parentElm.insertBefore(elmToMove.elm,oldStartVnode.elm);
        }else{
            //这个是新增的项
          parentElm.insertBefore(createElement(newStartVnode),oldStartVnode.elm)
        }
        newStartVnode =newCh[++newStartIdx]
     }
  }

  // 继续看看有没有剩余的,循环结束了start 还是比end 小
  if(newStartIdx<=newEndIdx){
     console.log('还有剩余的')
     // 源码这么写的
  // 　 const before = newCh[newEndIdx+1] ? newCh[newEndIdx+1].elm: null;
     for(let i= newStartIdx;i<=newEndIdx;i++){
         parentElm.insertBefore(createElement(newCh[i]),oldCh[oldStartIdx].elm) 
     }　
  }else if(oldStartIdx<=oldEndIdx){
    console.log('old 删除还没有处理完')
    for(let i=oldStartIdx;i<=oldEndIdx;i++){
      if(oldCh[i]){
        parentElm.removeChild(oldCh[i].elm);
      }
    }
  }
}
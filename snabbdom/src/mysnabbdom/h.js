
import vnode from './vnode.js';

// 编写一个低配版h 函数，这个函数必须接受3和参数
// 形态1 h('div',{},'文字')
// 形态2 h('div',{},[])
// 形态3 h('div',{},h())
export default function (sel,data,c){
  if(arguments.length !== 3){
    throw new Error('h函数必须是三个参数,是低配版h 函数')
  }
  if(typeof c === 'string' || typeof c === 'number'){
    return vnode(sel,data,undefined,c,undefined)
  }else if(Array.isArray(c)){
    let children=[]
     for(let i =0,len=c.length;i<len;i++){
       if(!(typeof c[i] === "object" && c[i].hasOwnProperty('sel'))){
          throw new Error('你传入的数组中有项不是h函数')
       }
       children.push(c[i])
     }
     return vnode(sel,data,children,undefined,undefined)
  }else if(typeof c === 'object' && c.hasOwnProperty('sel')){
    let children = [c]
    return vnode(sel,data,children,undefined,undefined)
  }else{
    throw new Error("传入的参数不对")
  }
}

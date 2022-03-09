// 实现 new Proxy(target,handler)

// 是不是仅读,仅读的属性set时会报异常
// 是不是深度的
import {extend, hasChanged, hasOwn, isArray, isIntegerKey, isObject} from '@vue/shared'
import { track,trigger } from './effect';
import { TrackOpTypes, TriggerOpTypes } from './operations';
import { reactive, readonly } from './reactive';

const get =createrGetter();
const shallowGet = createrGetter(false,true)
const readonlyGet = createrGetter(true);
const shallowReadonlyGet = createrGetter(true,true);

const set = createSetter();
const shallowSet =createSetter(true);

export const mutableHandlers ={
  get,
  set
}; 
export const shallowReactiveHandlers={
  get:shallowGet,
  set:shallowSet
};

const readonlyObj ={
  set:(target,key)=>{
   console.warn(`set on key ${key} failed`)
   return false
  }
}

export const readonlyHandlers= extend({
  get:readonlyGet
},readonlyObj);

export const shallowReadonlyHandlers =extend({
  get:shallowReadonlyGet
},readonlyObj);


function createrGetter(isReadonly=false,shallow =false){
  return function get(target,key,receiver){
     const res=  Reflect.get(target,key,receiver);
     
     if(!isReadonly){
         // 收集依赖,等会数据变化后更新对应视图
         track(target,TrackOpTypes.GET,key)
     }
      // 如果是浅对象就可以直接返回原对象，不需要proxy 包裹
     if(shallow){
       return res;
     }

     if(isObject(res)){ // vue2 是一上来就递归代理，vue3是取值时会进行代理，vue3的代理是懒代理
        return isReadonly ? readonly(res) :reactive(res);
     }
     return res;
  }
}

function createSetter(shallow =false){
  return function set(target,key,value,receiver){

    const oldVal = target[key] // 获取老值
    let hasKey = isArray(target) && isIntegerKey(key) ? Number(key)<target.length:
    hasOwn(target,key)
   
    if(!hasKey){
       // 没有这个key 就是新增
       trigger(target,TriggerOpTypes.ADD,key,value)
    }else if(hasChanged(oldVal,value)){
       // 修改
       trigger(target,TriggerOpTypes.SET,key,value,oldVal)
    }

   const res=  Reflect.set(target,key,value,receiver);
   return res;
  }
}




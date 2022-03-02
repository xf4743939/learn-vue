import { isArray, isIntegerKey } from '@vue/shared';
import {TrackOpTypes, TriggerOpTypes} from './operations' 

export function effect(fn,options:any =[]){
   // 需要让effect变成响应式effect，可以做到数据变化重新执行
   const effect = createReactiveEffect(fn,options);

  if(!options.lazy){ // 默认的effect会先执行
    effect(fn,options);
  }
 return effect
}

let uid = 0;
let activeEffect; // 存储当前effect;
const effectStack = []; // 存储当前effect

function createReactiveEffect(fn,options){
  // 渲染更新函数
  const effect=function reactiveEffect (fn,options){
    // 当前栈里有就不添加
    if(!effectStack.includes(effect)){
      try { 
        effectStack.push(effect);
        activeEffect = effect;
        fn();
      } finally{
        effectStack.pop();
        activeEffect = effectStack[effectStack.length-1]
      }
    }
  }
  effect.id = uid++  // 制作唯一标识effect,用于区分effect
  effect._isEffect = true // 用于标识这个是响应式effect;
  effect.raw = fn;
  effect.options = options
  return effect;
}

// 让某个对象中属性 收集当前对应的effect函数
const targetMap  = new WeakMap();

export function track(target,type:TrackOpTypes,key){
   if(activeEffect === undefined){ //此属性不用收集依赖，因为没在effect中使用
     return;
   }
   let depsMap = targetMap.get(target);
   if(!depsMap){
     targetMap.set(target,(depsMap=new Map)) 
   }
   let dep = depsMap.get(key);
   if(!dep){
     depsMap.set(key,(dep = new Set))
   }
   if(!dep.has(activeEffect)){
      dep.add(activeEffect)
   }
   console.log(targetMap,'targetMap===')
}

// 找属性对应的effect,让其执行
export function trigger(target,type:TriggerOpTypes,key?,value?,oldValue?:any){
  // 如果这个属性没有收集过,那不需要做任何操作
  const  depsMap = targetMap.get(target);
  if(!depsMap) return;

  // 我要将所有要执行的effect全部存到set集合中，最终一起执行
  const effects = new Set();
  const add =(effectsToAdd)=>{
    if(effectsToAdd){
      effectsToAdd.forEach(effect=>effects.add(effect))
    }
  }
  // 1.看修改的是不是数组的长度，因为修改长度影响比较大
  if(key === 'length' && isArray(target)){
    depsMap.forEach((dep,key)=>{
      if(key === 'length' || key>value){
        add(dep)
      }
    })
  }else{
     // 可能是对象
     if(key !== undefined){
       add(depsMap.get(key))
     }
     // 如果修改数组中某一个索引 : arr[100] =1;
     switch(type){ // 如果添加一个索引,触发长度更新
       case TriggerOpTypes.ADD:
         if(isArray(target) && isIntegerKey(key)){
           add(depsMap.get('length'))
         }
     }

  }

  effects.forEach((effect:any)=>effect())

}
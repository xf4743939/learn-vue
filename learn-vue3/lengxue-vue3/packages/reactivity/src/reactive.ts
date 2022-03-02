import {isObject} from '@vue/shared'
import { mutableHandlers, readonlyHandlers, shallowReactiveHandlers, shallowReadonlyHandlers } from './baseHandlers'

export enum ReactiveFlags{
  SKIP = '__v_skip',
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
  IS_SHALLOW = '__v_isShallow',
  RAW = '__v_raw'
}



export interface Target{
  [ReactiveFlags.SKIP]?: boolean
  [ReactiveFlags.IS_REACTIVE]?: boolean
  [ReactiveFlags.IS_READONLY]?: boolean
  [ReactiveFlags.IS_SHALLOW]?: boolean
  [ReactiveFlags.RAW]?: any
}



export function reactive(target){
  return createReactiveObject(target,false,mutableHandlers)
}

export function shallowReactive(target){
  return createReactiveObject(target,false,shallowReactiveHandlers)
}

export  function readonly(target){
  return createReactiveObject(target,true,readonlyHandlers)
}

export function shallowReadonly(target){
  return createReactiveObject(target,true,shallowReadonlyHandlers)
}

// 会自动垃圾回收，不会造成内存泄漏,存储的key 必须为对象
export const reactiveMap = new WeakMap()
export const shallowReactiveMap = new WeakMap()
export const readonlyMap = new WeakMap()
export const shallowReadonlyMap = new WeakMap()

export function createReactiveObject(target,isReadonly:boolean,baseHandlers:ProxyHandler<any>){
  // 如果目标不是对象，无法拦截，reactive 只能拦截对象
  if(!isObject(target)){
   return target
  } 
  // 如果某个对象已经被代理过了,就不要再次被代理，可能一个对象，被深度代理又被仅读代理了。
  const proxyMap = isReadonly ? readonlyMap : reactiveMap;
  const existProxy = proxyMap.get(target);
  if(existProxy){
    return existProxy; // 如果已经被代理，直接返回
  }
  const proxy = new Proxy(target,baseHandlers);
  proxyMap.set(target,proxy) // 将要代理的对象，和对应代理结果缓存起来。

  return proxy;
}
import { hasChanged, isArray, isObject } from '@vue/shared';
import { reactive } from '.';
import { track, trigger } from './effect';
import { TrackOpTypes, TriggerOpTypes } from './operations';

export function ref(value){
 return createRef(value)
}

export function shallowRef(value){
  return createRef(value,true)
}

const convert =(val)=> isObject(val) ? reactive(val) :val

class RefImpl {
  public _value;
  public __v_isRef =true;
  constructor(public rawValue,public shallow){
    this._value =shallow ? rawValue : convert(rawValue) ;
  }
  get value(){
    track(this,TrackOpTypes.GET,'value');
    return this._value
  }
  set value(newValue){
    if(hasChanged(newValue,this.rawValue)){ // 判读新值和老值是否有变化
      this.rawValue = newValue;
      this._value = this.shallow ? newValue : convert(newValue);
      trigger(this,TriggerOpTypes.SET,'value',newValue)
    }
  }
}

function createRef(rawValue,shallow=false){
  return new RefImpl(rawValue,shallow)
}

class ObjectRefImpl{
  public __v_isRef = true;
  constructor(public target,public key){};
  get value(){
    return this.target[this.key]  // 如果原对象是响应式的就会依赖收集
  }
  set value(newValue){
    this.target[this.key] =newValue  // 如果原来对象是响应式的,那么就会触发更新
  }
}

export function toRef(target,key){
  return new ObjectRefImpl(target,key)
}

export function toRefs(object){ // object 可能是一个数组和对象
  const ret = isArray(object) ? new Array(object.length) : {};
  for(let key in object){
    ret[key] =toRef(object,key)
  }
}
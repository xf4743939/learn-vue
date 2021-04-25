# learn-vue

vue 源码全方位深入解析(2-14 章节)
vue 源码学习
http://caibaojian.com/vue-design/art/(vue技术内幕)

## new Vue 发生了什么

## mount

挂载的时候 new 一个渲染 Watcher

1. 先找 options 里 render 方法
2. 再判断 template ->template
3. el
4. el 或者 template 调取编译函数(compileToFunctions)转化成 render 函数
   **updateComponent 方法**

```js
new Watcher(vm,updateComponent,noop,{
  before(){
    if(vm._isMounted){
      callHook(vm,'beforeUpdate')
    }
  }
})
//updateComponent执行渲染  先执行render 生成vNode
updateComponent()=>{
 vm_update(vm_render(), hydrating);
}
```

```js
// 替换div 元素
  render(createElement){
        return createElement('div',{
            attrs:{
              id:"#app2"
            }
         },this.message)
      },
```

## Virtual Dom

虚拟 Dom 除了它的数据结构的定义,映射到真实的 DOM 实际上要经历 VNode 的 create、diff、patch 等过程

- createElement 函数

```js
 isReservedTag() 判断是不是HtML 原生标签
```

1. tag 可以是 string 和组件

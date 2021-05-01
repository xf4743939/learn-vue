# learn-vue

vue 源码全方位深入解析(3-4 章节 6-3 章节看完)
vue 源码学习
http://caibaojian.com/vue-design/art/(vue技术内幕)
B 站尚硅谷 25 章开始

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

## parse

编译过程首先对模板进行解析,生成 AST,它是一种抽象语法树,是对源代码的抽象语法结构的树状表现形式。

## 请简单介绍 diff 算法和虚拟 DOM

新虚拟 DOM 和老虚拟 DOM 进行 diff(精细化比较),算出应该如何最小量更新,最后反映到真正的 DOM 上.

- diff 算法四种命中查找
  经典 diff 算法优化策略
  四种按照顺序往下
  注意:命中一种就不再进行命中判断了

1. 新前与旧前
2. 新后与旧后
3. 新后与旧前(此种发生了,那么新前指向的节点,移动到旧后之后)
4. 新前与旧后(新前与旧后命中的时候,此时要移动节点.移动新前指向的这个节点到老节点的旧前的前面。)
   注意:如果都没命中要用循环来查找

- 新增情况

```js
// 新增情况
// 如果是旧节点先循环完毕,说明新节点中有要插入的节点
  while(新前<= 信后 && 旧前<=旧后>){

  }
  // 删除情况
  // 如果是新节点先循环完毕,如果老节点中还有剩余节点(取老节点旧前旧后指针)
```

- snabbdom 简介
  snabbdom 是著名的虚拟 DOM 库,是 diff 算法的鼻祖,vue 源码借鉴了 snabbdom

```js
// 真是dom
<div class="box">
  <h3>我是一个标题</h3>
  <ul>
    <li>牛奶</li>
  </ul>
</div>
```

```js
// 虚拟dom
{
  "sel":"div",
  "data":{
    "class":{
      "box":true
    }
  },
  "children":[
    {
      "sel":"h3",
       "data":{},
       "text":"我是一个标题"
    },
    {
      "sel":"ul",
      "data":{},
      "children":[
        {
          "sel":"li",
          "data":{},
          "text":"牛奶"
        }
      ]
    }
  ]
}
```

- 虚拟 DOM 如何被渲染函数(h 函数)产生?

1. h 函数用来产生虚拟节点(Vnode)

```js
{
  children:undefined,
  data:{},
  ele:undefined,
  key:undefined,
  sel:"div",
  text:"这是一个盒子"
}
```

```js
h('ul',{},[h('li',{},'苹果'),h('li',{},'香蕉')])
h("a", { props: { href: "http://www.baidu.com" } }, "百度");
{"sel":"a","data":{props:{href:"http://www.baidu.com"}},"text":"百度"}
```

- diff 算法原理？
  创建节点时,所有子节点需要递归出来的.
  patch 方法-> 先判断 OldVnode 是虚拟节点还是 DOM 节点
  1. 是虚拟 DOM
  2. 是 DOM 节点->将 OldVnode 包装为虚拟节点
  3. 判断 OldNode 和 newNode 是不是同一个虚拟节点
  4. 不是:暴力删除旧的,插入新的
  5. 是:精细化比较
  6. 判断是同一个对象:什么都不做
  7. 判断 newVnode 有没有 text 属性
  8. 有 text 属性 判断 oldVnode 和 newVnode 的 text 是不是相同
  9. 是相同就什么都不做
  10. 不相同就把 elm 中的 innerText 改变为 newVnode 的 text(即使 oldVnode 有 children 属性而没有 text 属性,那么也没事了,innerText 一旦改为新的 text,老的 children 就没了)
  11. 新节点没有 text 属性(新节点没有 text 就有 children);判断 oldVnode 有没有 Children
  12. 旧节点没有 children(没有 children 就意味这有 text)
  13. 清空 oldVnode 中 text,并且把 newVnode 中 children 添加到 Dom 中
  14. oldVnode 有 children(新老都有 children)

```js
// 如何定义是不是同一个节点
function someVnode(vnode1, vnode2) {
  return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}
```

1. 只有是同一个虚拟节点,才进行精细化比较,否则就是暴力删除旧的,插入新的。
   如何定义是一个节点? 选择器相同且 key 相同
2. key 很重要,key 是节点的唯一标识,告诉 diff 算法,在更改前后它们是同一个 DOM 节点
3. 只进行同层比较,不会进行跨层比较.精细化比较不 diff 你,而是暴力删除旧的,然后插入新的.

- 虚拟 DOM 如何变成真正 DOM 的？

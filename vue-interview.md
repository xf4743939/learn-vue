# vue 面试题整理

前端框架面试 vue/react(第三章看完)

## vue 初次渲染过程

- 解析模板为 render 函数
- 触发响应式,触发响应式,监听 data 属性 getter,setter
- 执行 render 函数(会触发 getter),生成 vnode,path(elem,vnode)

## 更新过程

- 修改 data,触发 setter
- 重新执行 render 函数,生产 newVnode
- patch(vnode,newVnode)

## 说说 SSR

vue.js 是构建客户端应用程序的框架.默认情况下，可以在浏览器中输出 Vue 组件，进行生成 DOM 和操作 DOM。
然而，也可以将同一个组件渲染为服务端的 HTML 字符串，将它们直接发送到浏览器，最后将这些静态标记"激活"为客户端上完全可交互的应用程序.
服务端渲染的优点:

1. 更好 SEO:因为 SPA 页面的内容是通过 Ajax 获取,而搜索引擎爬取工具并不会等待 Ajax 异步完成后再抓取页面内容,所以在 SPA 中抓取不到页面通过 Ajax 获取的内容;
   而 SSR 是服务端返回已经渲染好的页面(数据已经包含在页面中),所以搜索引擎爬取工具可以抓取渲染好的页面
2. 更快的内容到达时间(首屏加载更快);SPA 或等待所有 vue 编译后的 js 文件都下载完成后，才开始进行页面渲染,文件下载等需要一定的时间，所以首屏渲染需要一定的时间;
   SSR 直接由服务端渲染好页面直接返回显示，无需等待下载 js 文件及再去渲染等，所以 SSR 有更快的内容到达时间
   服务端渲染的缺点:
3. 更多开发条件限制：例如服务端只支持 beforeCreate 和 created 两个钩子函数,这会导致一些外部扩展库需要特殊处理，才能在服务端渲染应用程序中运行;
   并且与可以部署在任何静态文件服务器上的完全静态单页面应用程序 SPA 不同，服务端渲染应用程序，需要处于 Node.js server 运行环境
4. 更多的服务器负载:在 Node.js 中渲染完整的应用程序，显然会比仅仅提供静态文件的 server 更加大量占用 CPU 资源 (CPU-intensive - CPU 密集)，因此如果你预料在高流量环境 ( high traffic ) 下使用，
   请准备相应的服务器负载，并明智地采用缓存策略.

## 为什么组件中 data 必须是一个函数,然后 return 一个对象,而 new vue 实例里,data 可以直接是一个对象?

因为组件是用来复用的,并且 js 里对象是引用关系,如果组件是一个对象,那么这样作用域没有隔离，子组件中的 data 属性值会相互影响,如果组件中 data 选项是一个函数,每个实例可以维护一份被返回对象的独立拷贝,
组件实例之间 data 属性值不会相互影响;而 new Vue 的实例,是不会被复用,因此不存在引用对象问题

## vue 中 computer 和普通属性 method 的区别是什么?

computed 属性是 vue 计算属性,是数据层到视图层的数据转化映射;只要他的依赖没有发生变化，那么每次访问的时候计算属性都会立即返回之前的计算结果，不再执行函数

1. computed 是响应式的,methods 并非响应式.
2. 调用方式不一样，computed 的定义成员像属性一样访问，methods 定义的成员必须以函数形式调用
3. computed 是带缓存的，只有依赖数据发生改变，才会重新进行计算，而 methods 里的函数在每次调用时都要执行。
4. computed 中的成员可以只定义一个函数作为只读属性，也可以定义 get/set 变成可读写属性，这点是 methods 中的成员做不到的
5. computed 不支持异步，当 computed 内有异步操作时无效，无法监听数据的变化

## 说下 vue-router 的原理是什么?

实现原理:vue-router 的原理就是更新视图而不重新请求页面.
vue-router 可以通过 mode 参数设置为三种模式:hash 模式、history 模式、abstract 模式.

1. 默认 hash 模式,基于浏览器 history api,调用 window.addEventListener('hashChange',callback,false)对浏览器地址进行监听.当调用 push 时,把新路由添加到浏览器访问历史栈顶;
   使用 replace 时,把浏览器访问历史的栈顶路由替换成新路由 hash 的值等于 url 中#及其以后的内容.浏览器根据 hash 值变化,将页面加载到相应 DOM 位置.锚点变化只是浏览器的行为,每次锚点变化后依然会在浏览器中留下
   一条历史记录,可以通过浏览器的后腿按钮回到上一个位置
2. history 模式,基于浏览器 history api,使用 window.onpopstate 对浏览器地址进行监听,对浏览器 history api 中的 pushState()、replaceState()进行封装,当方法调用,会对浏览器历史栈进行修改.
   从而实现 url 的跳转而无需加载页面,但是他的问题在于当刷新页面的时候会走后端路由，所以需要服务端的辅助来兜底，避免 URL 无法匹配到资源时能返回页面

## vuex 和 localStorage 的区别是什么?

- 最重要区别
  vuex 存储在内存;localstorage 已文件的方式储存在本地
  localstorage 只能存储字符串类型的数据,存储对象需要 Json 的 stringify 和 parse 方法进行处理,读取内存比读取硬盘速度要快
  刷新页面是 vuex 储存的值会丢失,localStorage 不会丢失
- 应用场景

1. vuex 能做到数据的响应式，localstorage 不能做到
2. localstorage 是本地存储，是将数据存储到浏览器的方法，一般是在跨页面传递数据时使用的
3. vuex 是一个转为为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。vuex 用域组件之间的传值

## 虚拟 Dom

- 什么是虚拟 DOM
  虚拟 DOM 是一个 js 对象,通过对象的方式来表示 DOM 结构.将页面的状态抽象为 js 对象的形式,配合不同的渲染工具，使跨平台渲染成为可能.通过事务处理机制，将多次 DOM 修改的结果一次性的更新到页面上，
  从而有效的减少页面渲染的次数，减少修改 DOM 的重绘重排次数，提高渲染性能
- 为什么要用虚拟 DOM

1. 保证性能下限，再不进行手动优化的情况下，提供能过得去的性能
2. 跨平台

- Virtual Dom 真的比真实 DOM 性能好么?

1. 首次渲染大量 DOM 时,由于多了一层虚拟 DOM 的计算,比 innerHtml 插入慢
2. 正如它能保证性能下限，在真实 DOM 操作的时候进行针对性的优化时，还是更快的

## vue 的 keep-alive 是如何实现的,具体缓存的是什么

主要流程

1. 判断组件 name,不在 include 或者在 exclude,直接返回 vnode,说明该组件不被缓存
2. 获取组件实例 key，如果由获取实例的 key，否则重新生成
3. key 生成规则，cid+"::"+tag，仅靠 cid 是不够的，因为相同的构造函数可以注册为不同的本地组件
4. 如果缓存对象内存在，则直接从缓存对象中获取组件实例给 vnode，不存在则添加到缓存对象中
5. 大缓存数量，当缓存数量超过 max 值时，清楚 keys 数组内的第一个组件

## 阐述一下你所理解的 MVVM 响应式原理

vue 是采用数据劫持配合发布者-订阅者模式的方式,通过 Object.defineProperty()来劫持各个属性的 getter 和 setter,在数据变动时,发布消息给依赖收集者,去通知观察者,做出对应的回调函数,去更新视图。

Mvvm 作为绑定的入口,整合 Observer,compile 和 watcher 三者,通过 Observer 来监听 model 数据变化, 通过 compile 来解析编译模板指令,最终利用 Watcher 搭起 Observer 和 Compile 之间通信桥梁,达到数据变化->视图更新;视图交互变化->数据 Model 变更的双向绑定效果

## keep-alive 原理

在 created 函数调用的时候将需要缓存的 vnode 节点放到 this.cache 中在 render(页面渲染)的时候。如果 Vnode 中 name 符合缓存条件(可以用 include 以及 exclude 控制),则会从 this.cache 中取出之前缓存的 Vnode 实列进行渲染
max 定义缓存组件上限,超出上限使用 LRU 的策略置换缓存数据
内存管理的一种页面置换算法,对于在内存中但又不用的数据快(内存快)叫做 LRU,操作系统会根据哪些数据属于 LRU 而将其移除内存而腾出空间而加载另外的数据。

```js
  // render 函数
  render(){}
```

## nextTick 原理

## vue-router 原理

- hash 特点(onhashchange)
  - hash 变化出触发网页跳转,即浏览器的前进、后退
  - hash 变化不会刷新页面,SPA 必需的特点
  - hash 永远不会提交到 server 端(前端自身自灭)
- history(onpopstate)
  - history.pushState

## vuex 原理

## mustache 模板引擎

## vue 源码解析之 AST 抽象语法树

## Vue 源码解析之指令和生命周期

## vue3 源码解析

## vue 高级特性

- 自定义 v-model
- $nextTick
- slot
- 动态、异步组件
- keep-alive
  频繁切换,不需要重复渲染
- mixin
  多个组件有相同的逻辑,抽离出来
  mixin 的问题

1. 变量来源不明确,不利于阅读
2. 多 mixin 可能造成命名冲突
3. mixin 和组件可能出现多不多的关系,复杂度较高

## vue3 与 vue2 对比

- 性能比 vue2.x 快 1.2 倍
- 按需编译,体积比 vue2.x 更小
- 组合 api
- 更好支持 TS
- 暴露了自定义渲染 API
- Fragment、Teleport、suspense 更先进的组件
- diff 方法优化
  vue2 虚拟 dom 是进行全量的对比;vue3 新增了静态标记(patchFlag)
- hoistStatic 静态提升
  - vue2 中无论元素是否参与更新,每次都会重新创建,然后在渲染
  - vue3 中对于不参与更新的元素,会做静态提升,只会被创建一次,在渲染时直接复用即可
- 事件侦听器缓存
- vue2 defineProperty 缺点
  - 深度监听,需要递归到底,一次性计算量大
  - 无法监听新增属性/删除属性(vue.set、vue.delete)
  - 无法原生监听数组,需要特殊处理

## 如何理解 MVC MVVM MPP

- MVC
  - 分层架构,职责清晰,代码易维护
  - 前端页面开发效率不高;前后端职责不清
- MVP
  MVP 和 MVC 很接近,p 只 Presenter,它负责 view 和 model 直接的数据流动,防止 view 和 Model 直接直接交流。可以看出 presenter 负责 model 进行双向交互,还和 view 进行双向交互,随着应用程序体积增大,导致 presenter 体积增大,难以维护.
- MVVM
  viewModel 通过一套数据响应式机制自动响应 Model 中数据变化;同时 viewModel 会实现一套更新策略自动化将数据变化转换为视图更新;通过事件监听响应 view 用户交互修改 Model 中数据.这样在 viewModel 中减少了大量 DOM 操作代码。MVVM 保持 view 和 Model 松耦合的同时,还减少维护它们关系的代码,使用户专注于业务逻辑，兼顾开发效率和可维护性。

## vue 组件化理解

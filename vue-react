# Vue 和 react 区别对比
## 监听数据变化的原理不同
1. vue 通过getter/setter对数据劫持，能准确知道数据变化，不需要特别就能达到很好的性能
2. React 默认是通过比较引用的方式进行的,如果不优化(PureComponent/shoundComponentUpdate)可能导致大量不必要的VDOM的重新渲染
为什么React不准确监听数据变化?vue 和 react 设计理念不同,vue 使用时可变数据,而React更强调数据的不可变.
## HoC 和mixins
1. mixins 带来隐私依赖
2. mixins 与mixins 直接,mixins与组件组件之间容易导致命名冲突
3. 由于mixins是侵入式的,它改变了原组件,所以修改mixins等于修改原组件,随着需求的增长 mixins 将变得复杂，导致滚雪球的复杂性。其观点是：使用普通组件配合 render prop 可以做任何 HOC 能做的事情
为什么vue 不采用Hoc的方式来实现呢?
高阶组件本质就是高阶函数,react的组件是一个纯粹的函数,所以高阶函数对React来说非常简单; 但是vue 就不行，vue中组件是一个被包装的函数,并不简单的就是我们定义组件的时候传入的对象或者函数。
高阶组件有已下几个特点:
1. 高阶组件HOC应该是无副作用的纯函数,且不应该修改原组件
2. 高阶组件(HOC) 不关心你传递的数据(props)是什么，并且被包装的组件不关心数据来源
3. 高阶组件(HOC) 接收到props 应该透传给包装组件

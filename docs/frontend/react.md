# React

## React 最新的⽣命周期是怎样的?

::: tip
暂时不考虑
:::
**挂载阶段**:  
**更新阶段**:  
**卸载阶段**:

## setState 到底是异步还是同步?

**答案**: 有时表现出异步,有时表现出同步

- setState 只在合成事件和钩⼦函数中是“异步”的，在原⽣事件和 setTimeout 中都是同步的。

- setState 的“异步”并不是说内部由异步代码实现，其实本身执⾏的过程和代码都是同步的，只是合成事件和钩⼦ 函数的调⽤顺序在更新之前，导致在合成事件和钩⼦函数中没法⽴⻢拿到更新后的值，形成了所谓的“异步”，当然 可以通过第⼆个参数 setState(partialState, callback) 中的 callback 拿到更新后的结果。

- setState 的批量更新优化也是建⽴在“异步”（合成事件、钩⼦函数）之上的，在原⽣事件和 setTimeout 中不会 批量更新，在“异步”中如果对同⼀个值进⾏多次 setState ， setState 的批量更新策略会对其进⾏覆盖，取最后⼀ 次的执⾏，如果是同时 setState 多个不同的值，在更新时会对其进⾏合并批量更新。

## hooks 为什么不能放在条件判断里

以 useState 为例，在 react 内部，每个组件(Fiber)的 hooks 都是以链表的形式，按顺序存在。重点“顺序”，update 阶段，每次调用 useState，链表就会执行 next 向后移动一步。如果将 useState 写在条件判断中，假设条件判断不成立，没有执行里面的 useState 方法，会导致接下来所有的 useState 的取值出现偏移，从而导致异常发生。

## 调用 setState 之后发生了什么？

在 setState 的时候，React 会为当前节点创建一个 updateQueue 的更新列队。

然后会触发 reconciliation 过程，在这个过程中，会使用名为 Fiber 的调度算法，开始生成新的 Fiber 树， Fiber 算法的最大特点是可以做到异步可中断的执行。

然后 React Scheduler 会根据优先级高低，先执行优先级高的节点，具体是执行 doWork 方法。

在 doWork 方法中，React 会执行一遍 updateQueue 中的方法，以获得新的节点。然后对比新旧节点，为老节点打上 更新、插入、替换 等 Tag。

当前节点 doWork 完成后，会执行 performUnitOfWork 方法获得新节点，然后再重复上面的过程。

当所有节点都 doWork 完成后，会触发 commitRoot 方法，React 进入 commit 阶段。

在 commit 阶段中，React 会根据前面为各个节点打的 Tag，一次性更新整个 dom 元素。

## React有哪些优化性能的手段?

**类组件中的优化手段**  
1、使用纯组件 PureComponent 作为基类。

2、使用 React.memo 高阶函数包装组件。

3、使用 shouldComponentUpdate 生命周期函数来自定义渲染逻辑。

**函数Hooks组件中的优化手段**  
1、使用 useMemo。

2、使用 useCallBack。

**其他方式**  
1、在列表需要频繁变动时，使用唯一 id 作为 key，而不是数组下标。

2、必要时通过改变 CSS 样式隐藏显示组件，而不是通过条件判断显示隐藏组件。

3、使用 Suspense 和 lazy 进行懒加载，例如：

## React组件通信如何实现?

React组件间通信⽅式:  

- ⽗组件向⼦组件通讯: ⽗组件可以向⼦组件通过传 props 的⽅式，向⼦组件进⾏通讯
- ⼦组件向⽗组件通讯: props+回调的⽅式,⽗组件向⼦组件传递props进⾏通讯，此props为作⽤域为⽗组件⾃身的函 数，⼦组件调⽤该函数，将⼦组件想要传递的信息，作为参数，传递到⽗组件的作⽤域中
- 兄弟组件通信: 找到这两个兄弟节点共同的⽗节点,结合上⾯两种⽅式由⽗节点转发信息进⾏通信
- 跨层级通信: Context 设计⽬的是为了共享那些对于⼀个组件树⽽⾔是“全局”的数据，例如当前认证的⽤户、主题 或⾸选语⾔,对于跨越多层的全局数据通过 Context 通信再适合不过
- 发布订阅模式: 发布者发布事件，订阅者监听事件并做出反应,我们可以通过引⼊event模块进⾏通信
- 全局状态管理⼯具: 借助Redux或者Mobx等全局状态管理⼯具进⾏通信,这种⼯具会维护⼀个全局状态中⼼Store,并 根据不同的事件产⽣新的状态

## 你是如何理解fiber的?

React Fiber 是⼀种基于浏览器的单线程调度算法.解决在页面元素很多，且需要频繁刷新的场景下，会出现掉帧的现象。React Fiber 用类似 requestIdleCallback 的机制来做异步 diff。但是之前数据结构不支持这样的实现异步 diff，于是 React 实现了一个类似链表的数据结构，将原来的 递归diff 变成了现在的 遍历diff，这样就能做到异步可更新了。

React 16之前 ， reconcilation 算法实际上是递归，想要中断递归是很困难的，React 16 开始使⽤了循环来代替之前 的递归.  

Fiber ：⼀种将 recocilation （递归 diff），拆分成⽆数个⼩任务的算法；依据时间分片的思想（**Time Slice**），它随时能够停⽌，恢复。停⽌恢复的时机 取决于当前的⼀帧（16ms，60HZ）内，还有没有⾜够的时间允许计算。  

旧版 React 通过递归的方式进行渲染，使用的是 JS 引擎自身的函数调用栈，它会一直执行到栈空为止。而Fiber实现了自己的组件调用栈，它以链表的形式遍历组件树，可以灵活的暂停、继续和丢弃执行的任务。实现方式依赖于浏览器对 requestIdleCallback和requestAnimationFrame这两个API的支持。

整个页面更新并重渲染过程分为两个阶段。

**Reconcile阶段**：此阶段中，进行 Diff 计算的时候，会生成一棵 Fiber 树。这棵树是在 Virtual DOM 树的基础上增加额外的信息来生成的，它本质来说是一个链表。这一步是一个渐进的过程，可以被打断。

**Commit阶段**：根据在Reconcile阶段生成的数组，遍历更新DOM，这个阶段需要一次性执行完。如果是在其他的渲染环境--Native，硬件，就会更新对应的元素。 将需要更新的节点一次过批量更新，这个过程不能被打断。

Fiber Reconciler 在阶段一进行 Diff 计算的时候，会生成一棵 Fiber 树。这棵树是在 Virtual DOM 树的基础上增加额外的信息来生成的，它本质来说是一个链表。  
![An image](/3.jpeg)

链表节点类型

```js
const fiber = {
    stateNode,    // 节点实例
    child,        // 子节点
    sibling,      // 兄弟节点
    return,       // 父节点
}
```

Fiber 树在首次渲染的时候会一次过生成。在后续需要 Diff 的时候，会根据已有树和最新 Virtual DOM 的信息，生成一棵新的树。这颗新树每生成一个新的节点，都会将控制权交回给主线程，去检查有没有优先级更高的任务需要执行。

如果过程中有优先级更高的任务需要进行，则 Fiber Reconciler 会丢弃正在生成的树，在空闲的时候再重新执行一遍。

在构造 Fiber 树的过程中，Fiber Reconciler 会将需要更新的节点信息保存在Effect List当中，在阶段二执行的时候，会批量更新相应的节点。

**总结**：从Stack Reconciler到Fiber Reconciler，源码层面其实就是干了一件递归改循环的事情，

## diff算法

**传统Diff**：传统 diff 算法的时间复杂度是 O(n^3)，这在前端 render 中是不可接受的。为了降低时间复杂度，react 的 diff 算法做了一些妥协，放弃了最优解，最终将时间复杂度降低到了 O(n)。

**React Diff**: 结合Web界面的特点做出了两个简单的假设，使得Diff算法复杂度直接降低到O(n)

- 两个相同组件产生类似的DOM结构，不同的组件产生不同的DOM结构
- 对于同一层次的一组子节点，它们可以通过唯一的id进行区分

**Diff策略**: 基于以上假设有三个策略

- **Tree Diff**  
  - 只对比同一层的 dom 节点，忽略 dom 节点的跨层级移动

- **Component Diff**  
  - 如果不是同一类型的组件，会删除旧的组件，创建新的组件

- **Element Diff**。  
  - 对于同一层级的一组子节点，需要通过唯一 id 进行来区分
  - 依照头头，尾尾，头尾，尾头原则，不满足index < lastIndex

**diff算法的不足**  
如果没有 id 来进行区分，一旦有插入动作，会导致插入位置之后的列表全部重新渲染。
这也是为什么渲染列表时为什么要使用唯一的 key。

没有key，setState仅仅只是将最后一个元素置顶，  
比如： old：A，B，C，D，new： D，A，B，C。  
理想状况是只移动D,不移动A,B,C。但是按照 头头，尾尾，头尾，尾头对比后，A,B,C都要去移。因此，在开发过程中，尽量减少类似将最后一个节点移动到列表首部的操作，当节点数量过大或更新操作过于频繁时，会影响React的渲染性能，所以一定要加key

**优化**  
参考Snabbdom.js优化，会计算出相同的最长递增子序列，批量处理，Vuex参考了参考Snabbdom的优化

## React中key的作用

结合Diff 策略中的，Element Diff，对于列表节点提供唯一的key属性可以帮助React定位到正确的节点进行比较，从而大幅减少DOM操作次数，提高了性能。React在遇到列表时却又找不到key时提示的警告。虽然无视这条警告大部分界面也会正确工作，但这通常意味着潜在的性能问题。

## React 18 三大特性

**Automatic batching**：React 并发新特性，自动批处理

在 React 18 以前，异步函数中的 setState 并不会进行合并，无法做合并处理，所以每次 setState 调用都会立即触发一次重渲染；React 18 带来的优化就是可以在任何情况下进行渲染优化了（异步回调函数，promise，定时器）的回调函数中调用多次的 setState 也会进行合并渲染

当然如果你非要 setState 调用后立即重渲染也行，只需要用 flushSync 包裹：

**新的 ReactDOM Render API**

```js
const container = document.getElementById("app");

// 旧 render API
ReactDOM.render(<App tab="home" />, container);

// 新 createRoot API
const root = ReactDOM.createRoot(container);
root.render(<App tab="home" />);
```

**startTransition**：

可以用来降低渲染优先级，所有在 startTransition 回调中更新的都会被认为是非紧急处理，如果一旦出现更紧急的处理（比如这里的用户输入），startTransition 就会中断之前的更新

**SSR for Suspense**

其他：  
1.新增了useId，startTransition，useTransition，useDeferredValue，useSyncExternalStore，useInsertionEffect等新的 hook API
2.针对浏览器和服务端渲染的 React DOM API 都有新的变化，诸如:

React DOM Client 新增 createRoot 和 hydrateRoot 方法。
React DOM Server 新增 renderToPipeableStream 和 renderToReadableStream 方法
render允许返回一个 undefined

.部分弃用特性。
ReactDOM.render 已被弃用。使用它会警告：在 React 17 模式下运行您的应用程序。 -

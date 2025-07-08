# Java Script

## 谈谈你对原型链的理解？

**原型对象**：绝⼤部分的函数(少数内置函数除外)都有⼀个 prototype 属性,这个属性指针指向原型对象，来创建新对象实例的,⽽所有被创建的 对象都会共享原型对象,因此这些对象便可以访问原型对象的属性。

**原型链**：原因是每个对象都有 **proto** 属性，此属性指向该对象的构造函数的原型。对象可以通过 **proto** 与上游的构造函数的原型对象连接起来，⽽上游的原型对象也有⼀个 **proto** ，这样就形成 了原型链。

**判断构造函数与实例关系** instanceof 操作符和 isPrototypeOf()方法

- instanceof 操作符左侧是一个普通对象，右侧是一个函数。eg: o instanceof Foo，instanceof 关键字做的事情是：判断 o 的原型链上是否有 Foo.prototype 指向的对象。
- isPrototypeOf()不关心构造函数，它只需要一个可以用来判断的对象就行。以 Foo.prototype.isPrototypeOf(o)为例，isPrototypeOf()做的事情是：判断在 a 的原型链中是否出现过 Foo.prototype

**new 过程**：  
1、创建一个细新的 javaScript 对象（即 {} ）  
2、为步骤 1 新创建的对象添加属性 proto ，将该属性链接至构造函数的原型对象  
3、将 this 指向这个新对象
4、执行构造函数内部的代码（例如给新对象添加属性）  
5、如果构造函数返回非空对象，则返回该对象，否则返回刚创建的新对象。
::: tip
构造函数必须返回对象，否则报错
:::

```js
function _new(/* 构造函数 */ constructor, /* 构造函数参数 */ params) {
  // 将 arguments 对象转为数组
  var args = [].slice.call(arguments);
  // 取出构造函数
  var constructor = args.shift();
  // 创建一个空对象，继承构造函数的 prototype 属性
  var context = Object.create(constructor.prototype);
  // 执行构造函数
  var result = constructor.apply(context, args);
  // 如果返回结果是对象，就直接返回，否则返回 context 对象
  return typeof result === "object" && result != null ? result : context;
}
```

## 谈谈你对作用域的理解

**作用域**： 是在运行时代码中的某些特定部分中变量，函数和对象的可访问性。换句话说，作用域决定了代码区块中变量和其他资源的可见性（即可达性）。  
 简单的说作用域就是一个独立的地盘，让变量不会外泄、暴露出去。也就是说作用域最大的用处就是隔离变量，不同作用域下同名变量不会有冲突  
 es6 之前有 全局作用域和函数作用域，es6 之后有块级作用域(let/const)  
::: tip  
 作用域是分层的，内层作用域可以访问外层作用域的变量，反之则不行  
:::  
**自由变量**:当前作用域没有定义的变量  
**作用域链**: 当前作用域没找打，一层一层向上寻找，直到找到全局作用域还是没找到，就宣布放弃。这种一层一层的关系就是 作用域链  
**自由变量的取值**： 要到"创建这个函数的那个域" -> 作用域中取值,这里强调的是“创建”，而不是“调用”\*\*，切记切记——其实这就是所谓的"静态作用域"

## javascript 执行阶段

1、解释阶段：  
 词法分析、
语法分析、
作用域规则确定  
2、执行阶段：  
 创建执行上下文、
执行函数代码、
垃圾回收  
::: tip  
 执行上下文在运行时确定，随时可能改变；作用域在定义时就确定，并且不会改变  
 一个作用域下可能包含若干个上下文环境。有可能从来没有过上下文环境（函数从来就没有被调用过）；有可能有过，现在函数被调用完毕后，上下文环境被销毁了；有可能同时存在一个或多个（闭包）。同一个作用域下，不同的调用会产生不同的执行上下文环境，继而产生不同的变量的值  
:::

## 谈谈你对闭包的理解？

**MDN 的解释**：闭包是函数和声明该函数的词法环境的组合。

**个人理解**：闭包 =『函数』和『函数体内可访问的变量总和』

```js
(function () {
  var a = 1;
  function add() {
    var b = 2;

    var sum = b + a;
    console.log(sum); // 3
  }
  add();
})();
```

**闭包的作用**:  
闭包最大的作用就是隐藏变量，闭包的一大特性就是内部函数总是可以访问其所在的外部函数中声明的参数和变量，即使在其外部函数被返回（寿命终结）了之后

基于此特性，JavaScript 可以实现私有变量、特权变量、储存变量、React Hooks

我们就以私有变量举例，私有变量的实现方法很多，有靠约定的（变量名前加\_）,有靠 Proxy 代理的，也有靠 Symbol 这种新数据类型的。

但是真正广泛流行的其实是使用闭包。

```js
function Person() {
  var name = "cxk";
  this.getName = function () {
    return name;
  };
  this.setName = function (value) {
    name = value;
  };
}

const cxk = new Person();

console.log(cxk.getName()); //cxk
cxk.setName("jntm");
console.log(cxk.getName()); //jntm
console.log(name); //name is not defined
```

## 前端有⼏种储存的⽅式？

- cookies： 在 HTML5 标准前本地储存的主要⽅式，优点是兼容性好，请求头⾃带 cookie ⽅便，缺点是⼤⼩只有 4k， ⾃动请求头加⼊ cookie 浪费流量，每个 domain 限制 20 个 cookie，使⽤起来麻烦需要⾃⾏封装

- localStorage：HTML5 加⼊的以键值对(Key-Value)为标准的⽅式，优点是操作⽅便，永久性储存（除⾮⼿动删 除），⼤⼩为 5M，兼容 IE8+

- sessionStorage：与 localStorage 基本类似，区别是 sessionStorage 当⻚⾯关闭后会被清理，⽽且与 cookie、 localStorage 不同，他不能在所有同源窗⼝中共享，是会话级别的储存⽅式

- Web SQL：2010 年被 W3C 废弃的本地数据库数据存储⽅案，但是主流浏览器（⽕狐除外）都已经有了相关的实 现，web sql 类似于 SQLite，是真正意义上的关系型数据库，⽤ sql 进⾏操作，当我们⽤ JavaScript 时要进⾏转换， 较为繁琐。

- IndexedDB： 是被正式纳⼊ HTML5 标准的数据库储存⽅案，它是 NoSQL 数据库，⽤键值对进⾏储存，可以进⾏快 速读取操作，⾮常适合 web 场景，同时⽤ JavaScript 进⾏操作会⾮常⽅便。

## 类型转换的规则有哪些？

**原理**：类型转换指的是将⼀种类型转换为另⼀种类型，例如:

```js
var b = 2;
var a = String(b);
console.log(typeof a); //string
```

类型转换分为显式和隐式,但是不管是隐式转换还是显式转换,都会遵循⼀定的原理,遵循 ECMA-262 中提到的转换规则。  
这是 JavaScript 种类型转换可以从原始类型转为引⽤类型,同样可以将引⽤类型转为原始类型,转为原始类型的抽象操作 为 ToPrimitive ,⽽后续更加细分的操作为: ToNumber ToString ToBoolean 。  
TODO：
![An image](/1.jpeg)

## JavaScript 垃圾回收(内存管理)是怎么做的？

**原理**  
其实很简单，就是找出那些不再继续使用的值，然后释放其占用的内存。垃圾收集器会每隔固定的时间段就执行一次释放操作。

V8 引擎对堆内存中的 JAVASCRIPT 对象基于时代假说机制进行分代管理。

这个假说有两个特点，一个是 新生的对象容易早死，另一个是 不死的对象会活得更久。

新生代：新生代即存活周期较短的 JAVASCRIPT 对象，如临时变量、字符串等

老生代：老生代则为经过多次垃圾回收仍然存活，存活周期较长的对象，如主控制器、服务器对象等。

**垃圾回收算法**

引用计数法  
标记清除算法

## 1px 像素问题

todo

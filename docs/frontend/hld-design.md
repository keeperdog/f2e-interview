# 方案设计

## 如何在 JavaScript 中实现不可变对象？

todo：

## 命令模式 模拟Undo，Redo操作

**命令模式**： 将一个动作封装成一个对象，从而使您可以用不同的请求对客户进行参数化。

``` js
class CommandManager {
  undoStack = [];
  redoStack = [];

  constructor(store) {
    this.store = store;
  }
  

  execute = (params) => {
    const command = { ...params }

    if (command) {
      this.undoStack.push(this.store);
      this.store={ ...params };
      this.redoStack = [];
    }
  };

  undo = () => {
    const command = this.undoStack.pop();
    if (command) {
      this.redoStack.push(this.store);
      this.store={ ...command };
    }
  };

  redo = () => {
    const command = this.redoStack.pop();
    if (command) {
      this.undoStack.push(this.store);
      this.store={ ...command };
    }
  }
}
```

**跟策略模式的配合**

```html
<html>
<head>
    <meta charset="utf-8">
</head>
<body>
<button id="replay">播放录像</button>

</body>
<script>
    var Ryu = {
        attack: function(){
            console.log( '攻击' );
        },
        defense: function(){
            console.log( '防御' );
        },
        jump: function(){
            console.log( '跳跃' );
        },
        crouch: function(){
            console.log( '蹲下' );
        }
    };

    // ----------------正常思路用法------------------------
    // //  需要以此类推写四个命令
    // var AttackCommand = function(reciver){
    //     this.reciver = reciver
    // }
    // AttackCommand.prototype.execute = function(){
    //     this.reciver.attack()
    // }
    // // invoker 调用者
    // var setCommand = function(command){
    //     command.execute()
    // }
    // --------------------------------------------------
    // 利用策略模式配合 解决需要写四个 命令
    var makeCommand = function( receiver, state ){ // 创建命令
        return function(){
            receiver[ state ]();
        }
    };

    var commands = {
        "119": "jump", // W
        "115": "crouch", // S
        "97": "defense", // A
        "100": "attack" // D
    };
    var commandStack = []; // 保存命令的堆栈
    document.onkeypress = function( ev ){
        var keyCode = ev.keyCode,
            command = makeCommand( Ryu, commands[ keyCode ] );
        if ( command ){
            command(); // 执行命令
            commandStack.push( command ); // 将刚刚执行过的命令保存进数组队列中
        }
    };

    document.getElementById( 'replay' ).onclick = function(){ // 点击播放录像
        var command;
        while( command = commandStack.shift() ){ // 从队列里依次取出命令并执行
            command();
        }
    };
</script>

</html>
```

## 单例模式

**定义**： 保证一个类有且仅有一个实例，并提供一个访问它的全局访问点。  
**实现**： 用闭包来实现，这样我们可以使用new来实例化

```js
const createSingleton = (function () {
  let instance = null;
  return function () {
    if (instance) {
      return instance;
    }
    // 你的业务逻辑 todo

    return (instance = this);
  };
})();

// test
const a = new Singleton();
const b = new Singleton();

console.log(a === b); // true
```

## 多重继承

JavaScript 不提供多重继承功能，即不允许一个对象同时继承多个对象。但是，可以通过变通方法，实现这个功能。

```javascript
function M1() {
  this.hello = 'hello';
}

function M2() {
  this.world = 'world';
}

function S() {
  M1.call(this);
  M2.call(this);
}

// 继承 M1
S.prototype = Object.create(M1.prototype);
// 继承链上加入 M2
Object.assign(S.prototype, M2.prototype);

// 指定构造函数
S.prototype.constructor = S;

var s = new S();
s.hello // 'hello'
s.world // 'world'
```

## flex布局实现九宫格

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
     .wrapper {
      width: 50vw;
      height: 50vh;
      box-shadow: 0 0 10px rgb(31 55 153 / 10%);
      background: #FFF;
      padding: 20px;
    }
    .father {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      height: 100%;
    }
    .father > div {
      border: 1px solid purple;
      margin: -1px;
      width: 33.33%;
      height: 33.33%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="father">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
      <div>8</div>
      <div>9</div>
      <div>10</div>
    </div>
  </div>
</body>
</html>
```

## 实现两栏布局

- N多种方法： <https://www.jb51.net/css/784590.html>

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
   .box {
     display: flex;
     height: 100px;
    }
  .left {
    flex:0 1 100px;
    background: yellow;
  }
  .right {
    flex:1;
    background: #09c;
  }
  </style>
</head>
<body>
  <div class="box">
    <div class="left">左侧定宽</div>
    <div class="right">右侧自适应</div>
</div>
</body>
</html>
```

## 圣杯（双飞翼）布局flex简易实现

- 圣杯布局和双飞翼布局基本上是一致的，都是两边固定宽度，中间自适应的三栏布局，双飞翼布局是在
- 中间栏的div中嵌套一个div，内容写在嵌套的div里，然后对嵌套的div设置margin-left和margin-right，
- 效果上表现为左右两栏在中间栏的上面，中间栏还是100%宽度，只不过中间栏的内容通过margin的值显示在中间

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    * {
        margin: 0;
        padding: 0;
    }
    .header,.footer {
        height: 100px;
        background: #000;
        color:seashell;
    }
    .main {
        height: calc(100vh - 200px);
        background: #ccc;
        display: flex;
    }
    .left {
        height: calc(100vh - 200px);
        background: purple;
        flex: 0 1 300px;
    }
    .content {
        height: calc(100vh - 200px);
        background: #f90;
        flex: 1;
    }
    .right {
        height: calc(100vh - 200px);
        background: seagreen;
        flex: 0 1 300px;
    }
  </style>
</head>
<body>
  <div class="header">header</div>
  <div class="main">
    <div class="left">left</div>
    <div class="content">content</div>
    <div class="right">right</div>
  </div>
  <div class="footer">footer</div>
</body>
</html>

```

## 跨浏览器tab页的通信解决方案尝试

- Tab页间有依赖关系

方法：通过window.postMessage onMessage进行通信。
postMessage函数是绑定在window全局对象上的，因此必须有一个页面（比如A）可以获取另一个页面（比如B）的window。

这样在B中，可以监听message事件，并通过回调函数参数的source获取A的window对象

```js
B页面

window.addEventListner('message',(e)=>{
    let {data,source,origin} = e;
    source.postMessage('message echo','/');
});

```

postMessage的第一个参数为消息实体，它是一个结构化对象，即可以通过“JSON.stringify和JSON.parse”函数还原的对象；第二个参数为消息发送范围选择器，设置为“/”意味着只发送消息给同源的页面，设置为“*”则发送全部页面。

- 两个打开的页面属于同源范畴。

对于互不相关的同源页面，可以对localStorage进行读写来实现通信（类似IPC中的共享内存方式）。

为了监听另一个页面对于localStorage的改变，可以监听window的storage事件。不能用setTimeout

优化：broadcastchannel吧，这个在同域场景下非常优雅
它与postMessage的区别就是：BroadcastChannel只能用于同源的页面之间进行通信，而postMessage却可以用于任何的页面之间的通信，换句话说，BroadcastChannel可以认为是postMessage的一个实例，它承担了postMessage的一个方面的功能。

```js
A 页面

window.addEventListener("storage", function(ev){
    if (ev.key == 'message') {
        // removeItem同样触发storage事件，此时ev.newValue为空
        if(!ev.newValue)
            return;
        var message = JSON.parse(ev.newValue);
        console.log(message);
    }
});

function sendMessage(message){
    localStorage.setItem('message',JSON.stringify(message));
    localStorage.removeItem('message');
}

// 发送消息给B页面
sendMessage('this is message from A');
```

```js
B 页面

window.addEventListener("storage", function(ev){
    if (ev.key == 'message') {
        // removeItem同样触发storage事件，此时ev.newValue为空
        if(!ev.newValue)
            return;
        var message = JSON.parse(ev.newValue);
        // 发送消息给A页面
        sendMessage('message echo from B');
    }
});

function sendMessage(message){
    localStorage.setItem('message',JSON.stringify(message));
    localStorage.removeItem('message');
}


```

- Tab间完全无关且非同源，e.g.: Revit插件端登录，sku插件登录，品牌区分：主域相同，子域不同，即非同源。window.name可以，但无法通信

引入一个bridge.html用于桥接：

A和B分别通过iframe引入bridge.html，即可通过postMessage向该页面发送消息或接收消息
两个bridge.html间通过localStorage进行通信

参考：传送门[菜鸟教程](https://zhuanlan.zhihu.com/p/63422027)

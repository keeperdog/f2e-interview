# Webpack

## Babel的原理是什么?

babel 的转译过程也分为三个阶段，这三步具体是：

* 解析 Parse: 将代码解析⽣成抽象语法树( 即AST )，即词法分析与语法分析的过程
* 转换 Transform: 对于 AST 进⾏变换⼀系列的操作，babel 接受得到 AST 并通过 babel-traverse 对其进⾏遍历，在 此过程中进⾏添加、更新及移除等操作
* ⽣成 Generate: 将变换后的 AST 再转换为 JS 代码, 使⽤到的模块是 babel-generator

## Tree Shaking及其工作原理

**Tree Shaking**：Tree shaking 是一种通过程序流分析清除多余代码方式来优化项目打包体积的技术。最早是由Rollup实现。

**原理**：在ES6以前，我们可以使用CommonJS引入模块：require()，这种引入是动态的，也意味着我们可以基于条件来导入需要的代码，在 ES6 中，引入了完全静态的导入语法：import。因为tree shaking只能在静态modules下工作。ECMAScript 6 模块加载是静态的,因此整个依赖树可以被静态地推导出解析语法树。所以在 ES6 中使用 tree shaking 是非常容易的。

* ES6 Module引入进行静态分析，故而编译的时候正确判断到底加载了那些模块
* 静态分析程序流，判断那些模块和变量未被使用或者引用，进而删除对应代码

## CommonJS 和 ES6 中模块引入的区别？

CJS 是一种模块规范，最初被应用于 Nodejs，成为 Nodejs 的模块规范。运行在浏览器端的 JavaScript 由于也缺少类似的规范，在 ES6 出来之前，前端也实现了一套相同的模块规范 (例如: AMD)，用来对前端模块进行管理。自 ES6 起，引入了一套新的 ES6 Module 规范，在语言标准的层面上实现了模块功能，而且实现得相当简单，有望成为浏览器和服务器通用的模块解决方案。但目前浏览器对 ES6 Module 兼容还不太好，我们平时在 Webpack 中使用的 export 和 import，会经过 Babel 转换为 CJS 规范。在使用上的差别主要有

* CJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。

* CJS 模块是运行时加载，ES6 模块是编译时输出接口。

* CJS 是单个值导出，ES6 Module可以导出多个

* CJS 是动态语法可以写在判断里，ES6 Module 静态语法只能写在顶层

* CJS 的 this 是当前模块，ES6 Module的 this 是 undefined

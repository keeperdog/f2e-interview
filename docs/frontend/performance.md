# 性能优化

## 加载篇

**首屏加载优化**

- loading 提示
  - webpack 插件叫 html-webpack-plugin ,在其中配置 html 就可以在文件中插入 loading
- 开启 HTTP2
  - 浏览器并发一次性请求 6 次的限制，配置 nginx 也要支持 http2 模块
- 开启浏览器缓存
  - Expires & Cache-Control
  - Etag 和 If-None-Match
  - If-Modified-Since 和 Last-Modified
  - SplitChunksPlugin 插件取代了 CommonsChunkPlugin 插件来进行公共模块抽取，我们可以对 SplitChunksPlugin 进行配置进行 拆包 操作

**_坑 1_**：webpack4.x 会给每个 chunk 搭上 id,这个 id 是自增的,比如 chunk 0 中的 id 为 0,一旦我们引入新的依赖,chunk 的自增会被打乱这个问题我们需要额外引入一个插件

HashedModuleIdsPlugin,他用非自增的方式进行 chunk id 的命名,可以解决这个问题,虽然 webpack 号称 0 配置了,但是这个常用功能没有内置。webpack5.x 已经实现

- Tree Shaking
  - 依赖 es6 的 module 模块的静态特性，通过程序流分析找出你代码中无用的代码并剔除
- 动态加载 ES6 代码
  - `<script type="module">`这个标签来判断浏览器是否支持 es6
- 路由级别拆解代码

  - Code Splitting 技术进行代码分割，plugin-syntax-dynamic-import 这个动态 import 的插件,然后就可以就函数体内使用 import 了.
  - 对于 react,其内置的 React.lazy() 就可以动态加载路由和组件
    **组件懒加载**

- 组件懒加载
  - Code Splitting 不仅可以进行路由分割,甚至可以进行组件级别的代码分割
  - Lazy + Suspense 的方法进行组件懒加载，原理**componentDidCatch**
- 组件预加载
  - 是在用户的鼠标还处于 hover 或初始化结束后，总之找到一个合适的契机，的时候就开始触发图表资源的加载,通常情况下当用户点击结束之后
- keep-alive
  - 在页面已经跳转后依然不销毁组件,保存组件对应的实例在内存中,当此页面再次需要渲染的时候就可以利用已经缓存的组件实例了。
  - react-keep-alive 在一定程度上解决这个问题,它的原理是利用 React 的 Portals API 将缓存组件挂载到根节点以外的 dom 上,在需要恢复的时候再将缓存组件挂在到相应节点上

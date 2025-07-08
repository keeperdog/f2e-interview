# HTTP

## 聊⼀聊HTTP的部⾸有哪些？

通⽤⾸部字段（General Header Fields）：请求报⽂和响应报⽂两⽅都会使⽤的⾸部

* Cache-Control 控制缓存 ✨
* Connection 连接管理、逐条⾸部 ✨

请求⾸部字段（Reauest Header Fields）:客户端向服务器发送请求的报⽂时使⽤的⾸部

* Accept 客户端或者代理能够处理的媒体类型 ✨
* If-Match ⽐较实体标记（ETage） ✨
* If-None-Match ⽐较实体标记（ETage）与 If-Match相反 ✨
* If-Modified-Since ⽐较资源更新时间（Last-Modified）✨
* If-Unmodified-Since⽐较资源更新时间（Last-Modified），与 If-Modified-Since相反 ✨  
* Host 请求资源所在服务器 ✨

响应⾸部字段（Response Header Fields）:从服务器向客户端响应时使⽤的字段

* Location 令客户端重定向的URI ✨
* ETag 能够表示资源唯⼀资源的字符串 ✨
* Server 服务器的信息 ✨
* Content-Type 实体媒体类型
* Last-Modified 资源最后的修改资源 ✨
* Expires 实体主体的过期资源 ✨

## 聊⼀聊HTTP的状态码有哪些？

2XX 成功

* 200 OK，表示从客户端发来的请求在服务器端被正确处理 ✨
* 201 Created 请求已经被实现，⽽且有⼀个新的资源已经依据
* 202 Accepted 请求已接受，但是还没执⾏，不保证完成请求
* 204 No content，表示请求成功，但响应报⽂不含实体的主体部分
* 206 Partial Content，进⾏范围请求 ✨

3XX 重定向

* 301 moved permanently，永久性重定向，表示资源已被分配了新的 URL
* 302 found，临时性重定向，表示资源临时被分配了新的 URL ✨
* 303 see other，表示资源存在着另⼀个 URL，应使⽤ GET ⽅法丁⾹获取资源
* 304 not modified，表示服务器允许访问资源，但因发⽣请求未满⾜条件的情况
* 307 temporary redirect，临时重定向，和302含义相同

4XX 客户端错误

* 400 bad request，请求报⽂存在语法错误 ✨
* 401 unauthorized，表示发送的请求需要有通过 HTTP 认证的认证信息 ✨
* 403 forbidden，表示对请求资源的访问被服务器拒绝 ✨
* 404 not found，表示在服务器上没有找到请求的资源 ✨
* 408 Request timeout, 客户端请求超时
* 409 Confict, 请求的资源可能引起冲突

5XX 服务器错误

* 500 internal sever error，表示服务器端在执⾏请求时发⽣了错误 ✨
* 501 Not Implemented 请求超出服务器能⼒范围，例如服务器不⽀持当前请求所需要的某个功能，或者请求是服务 器不⽀持的某个⽅法
* 503 service unavailable，表明服务器暂时处于超负载或正在停机维护，⽆法处理请求
* 505 http version not supported 服务器不⽀持，或者拒绝⽀持在请求中使⽤的 HTTP 版本

## 同样是重定向307，303，302的区别？

302是http1.0的协议状态码，在http1.1版本的时候为了细化302状态码⼜出来了两个303和307。

303明确表示客户端应当采⽤get⽅法获取资源，他会把POST请求变为GET请求进⾏重定向。 307会遵照浏览器标准， 不会从post变为get。

## HTTP的keep-alive是⼲什么的？

在早期的HTTP/1.0中，每次http请求都要创建⼀个连接，⽽创建连接的过程需要消耗资源和时间，为了减少资源消耗， 缩短响应时间，就需要重⽤连接。在后来的HTTP/1.0中以及HTTP/1.1中，引⼊了重⽤连接的机制，就是在http请求头中 加⼊Connection: keep-alive来告诉对⽅这个请求响应完成后不要关闭，下⼀次咱们还⽤这个请求继续交流。

HTTP/1.0如果想要保持⻓连接，需要在请求头中加上Connection: keep-alive。

## HTTP2相对于HTTP1.x有什么优势和特点？

**⼆进制分帧**  
帧：HTTP/2 数据通信的最⼩单位消息：指 HTTP/2 中逻辑上的 HTTP 消息。例如请求和响应等，消息由⼀个或多个帧 组成。

流：存在于连接中的⼀个虚拟通道。流可以承载双向消息，每个流都有⼀个唯⼀的整数ID HTTP/2 采⽤⼆进制格式传输数据，⽽⾮ HTTP 1.x 的⽂本格式，⼆进制协议解析起来更⾼效。

**头部压缩**  
HTTP/1.x会在请求和响应中中重复地携带不常改变的、冗⻓的头部数据，给⽹络带来额外的负担。

**服务器推送**  
服务端可以在发送⻚⾯HTML时主动推送其它资源，⽽不⽤等到浏览器解析到相应位置，发起请求再响应。例如服务端 可以主动把JS和CSS⽂件推送给客户端，⽽不需要客户端解析HTML时再发送这些请求。

服务端可以主动推送，客户端也有权利选择是否接收。如果服务端推送的资源已经被浏览器缓存过，浏览器可以通过发 送RST_STREAM帧来拒收。主动推送也遵守同源策略，服务器不会随便推送第三⽅资源给客户端。

**多路复⽤**.  
HTTP 1.x 中，如果想并发多个请求，必须使⽤多个 TCP 链接，且浏览器为了控制资源，还会对单个域名有 6-8个的 TCP链接请求限制。

## HTTP(浏览器缓存机制)的缓存的过程是怎样的？

**强缓存**  
Expires服务器端设置，表示该资源的过期时间，会有弊端，客户端时间和服务器时间不一致的问题。

Cache-Control：max-age表示缓存资源的最大生命周期，单位是秒

所以Expires  结合 Cache-Control 一起使用，大型网站中一般比较适用

**协商缓存**  
Etag：表示资源内容的唯一标识，即资源的消息摘要

If-None-Match：服务器通过比较请求头中的If-None-Match与当前资源的Etag是否一致来判断资源是否在两次请求期间有过修改

Last-Modified：值为资源的最后更新时间，随服务器response返回

If-Modified-Since：通过比较两个时间来判断资源在两次请求期间是否有过修改，如果没有，则命中协商缓存

![An image](/4.jpeg)

图示解析

a：浏览器会先检测强缓存类型（Cache-Control 或者 Expires）是否有效；命中直接浏览器本地获取缓存资源

b：未命中。服务器会根据请求头Request Header验证这个资源是否命中协商缓存，称之为HTTP二次验证，命中，服务器返回请求，但返回资源，而是告诉客户端直接中直接从浏览器缓存中获取

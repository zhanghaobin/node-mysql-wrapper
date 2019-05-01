## 介绍
用Node.js操作MYSQL时用到了[mysql](https://www.npmjs.com/package/mysql)这个NPM包, 但是用法是回调式，个人觉得使用起来有点头皮发麻，尤其是执行多个查询时，因此封装了一下一些mysql包中的常用方法，使其返回一个Promise对象，从而可以使用 .then() .catch()进行链式调用。当然更好的选择是使用ES2017引入的async/await语法糖，这个就看个人喜好了。
## 用法
详见example.js。
## 其他
我的博客：https://www.binzone.cn
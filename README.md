# FE工程框架

运行流程
--------
使用此框架需要安装`nodejs`,`express`,`grunt`.框架使用`express`做web框架进行静态输出或动态输出.`grunt`执行js,css的合并压缩.

[[安装文档]]

进入工程后需要加载所有程序依赖的node库,运行一下命令后,此框架就可使用
```terminal
npm install
```

加载常见库
---------
使用GIT管理常见库,进入工程后后运行

```git
git submodule update
```
将会加载jQuery,默认对所有依赖库进行合并为.base和.base.min,项目无需的库可在grunt.js中注释.


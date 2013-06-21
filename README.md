# FE工程框架

### 运行流程
- 安装最新版本需要~0.8.18版本以上的nodejs
- npm运行 
```terminal
npm install -g bai
```

### 命令详解
`new` 新建工程  
`run` 开启静态资源自动实时编译  
`build` 压缩编译后的代码到\dist文件夹  
`clean` 清除`\dist`,`\js\lib` 里的编译产物

### 工程控制
####Bai可以按照项目需求的不同,提供前后台整个工程架构,或只提供前端工程架构.  

- 整个工程架构时,默认的模版语言为ejs或者jade,server提供为了MVC化改造过的Express
- 前端工程架构时,默认只提供静态资源的编译合并压缩,以及前端工程架构,view层的模版语言请按照项目的具体要求自行选择  

####前端资源类架构的详解(以`v0.4.0`为例)
#####`public`文件夹(静态资源源码和编译后输出的目的地)
- `css`目录
less文件安放处.编译规则按照目录下的一级less文件进行,此文件一般是对于相应子文件夹的less模块的引入文件,子模块按照less函数进行封装,并在引入文件中调用响应函数,说起来比较抽象,请在项目生成后查看例子,非常一模了然.

- `img\` 图片类静态资源存放处.
- `js\` 
javascript资源存放处,可以开启使用coffee,编译规则按照子文件夹进行合并压缩,生成相应名称的min.js文件在目录`dist\`
- `lib\` 
`lib\js\` js库如`jquery,underscore`,运行`uglify:lib`时每个文件生成相应压缩文件`*.min.js`在这个目录,`lib\`下的其他目录不进行压缩,你可以自由在此处组织UI库等超大型类库,而不必将其打散在进行复杂的配置.
- `dist\`  编译后的产物输出地,有css,js两个相应的子目录.
- `route\` server的Module,controller目录.

### 版本变化
- `v0.4.0` 
  - 版本开始原本项目中的`\app`文件资源文件夹被替换成为`\public`
  -  `\views` 从`\app(v0.4.0的\public)`提出到了根目录下
  - 添加了深度clone工具cloneExtend
  - 对于引擎的编译速度进行了优化

### 目录结构
- 当运行`bai new app`时 

![app](https://raw.github.com/Tiankui/node-server-proxy/master/app/img/app.png "app")

#### 贡献者
[Tiankui](https://github.com/Tiankui "Tiankui")

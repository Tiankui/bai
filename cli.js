#!/usr/bin/env node
/*
 * Author: zhouweiping(Tiankui)
 * Email: eric.prototype@gmail.com
 * Data: 2013-04-28
 * It's distributed under the MIT license(http://mit-license.org).
 */

var Bai = require('./lib/commander'),
    createProject = require('./lib/createProject'),
    colors = require('colors'),
    grunt = require('grunt'),
    cli = require('grunt/lib/grunt/cli'),
    path = require('path');

//colors 全局设置所处可用
colors.setTheme({silly:"rainbow",input:'grey',verbose:'cyan',prompt:'grey',info:'green',data:'grey',help:'cyan',warn:'yellow',debug:'blue',error:'red'});
// 初始化项目信息
Bai.command('new')
   .description(' - 新建一个项目,需要参数为新项目名称')
   .option('-s,--server','是否需要建立后台支持')
   .action(createProject);

Bai.command("run")
   .description(" - 监控less.coffee文件实时,并编译.可以配置是否需要开启自带server在" + "http://localhost:1217".warn)
   .action(function () {
     cli.tasks = ["common","dev"];
     grunt.cli();
   });

Bai.command('build')
   .description(" - 打包压缩所有文件到 /dist 文件夹")
   .action(function () {
     cli.tasks = ["common","dist"];
     grunt.cli();
   });

Bai.command('clean')
   .description(" - 清除缓存和压缩后的文件(方便测试)" + "\n" + "uglify (js|lib)\nconcat (css|js)\nless (development|production)\n".info +"等其他非常用命令请参看源码config/app.js")
   .action(function () {
     cli.tasks = ["clean"];
     grunt.cli();
   });

Bai.command('*')
   .description('分开执行内部定义的grunt命令')
   .action(function(){
     //watch插件是基于再次调用grunt任务来进行继续.so...
     //run 不能重复执行
     cli.tasks = grunt.util._(arguments).chain().toArray().initial().without('run').value();
     grunt.cli();
   });

Bai.version(require('./package').version);
Bai.parse(process.argv);


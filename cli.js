#!/usr/bin/env node

var Bai, grunt, cli, files, npm, pkg, colors, express, baiLogo, path, put;

Bai = require(__dirname + '/lib/commander.js');
grunt = require('grunt');
cli = require('grunt/lib/grunt/cli');
files = require(__dirname + '/lib/file-utils.js');
npm = require(__dirname + '/lib/npm-utils.js');
pkg = require(__dirname + '/package');
colors = require('colors');
express = require('express');
baiLogo = require(__dirname + '/lib/bai-logo.js');
path = require('path');
put = console.log;

//colors 全局设置所处可用
colors.setTheme({
  silly:"rainbow",
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});
// 初始化项目信息
Bai.name = pkg.name;
Bai.description = pkg.description;
Bai.version(pkg.version);

Bai
  .command('new')
  .description(' - 新建一个项目,需要参数为新项目名称')
  .action(function (project_name) {
    var src = __dirname + "/tpl/" + "base",
        dest = process.cwd() + "/" + project_name,
        ignore_path = process.cwd();

    //todo 项目初始化描述

    baiLogo();
    put("  项目路径:  " + dest + "\n\n  项目生成中...\n");

    files.copyDir(src,dest,ignore_path);
    //为模版生成新的PKG文件
    files.overwritePackageJson(dest + "/package.json", project_name);
    npm.installFrom(dest,function (error,stdout) {
      if (error) {
        put("出错了.请把错误信息记录下来并联系伟平.".error);
      }else{
        put("  cd `" + project_name + '` 开始编写您的项目。' + "\n" +
            "  帮助请运行 `bai -h`");
      }
    });
  });
  
Bai
  .command('express')
  .description(' - 新建一个项目,需要参数为新项目名称')
  .action(function (project_name) {
    var src = __dirname + "/tpl/" + "express",
        dest = process.cwd() + "/" + project_name,
        ignore_path = process.cwd();

    //todo 项目初始化描述

    baiLogo();
    put("  项目路径:  " + dest + "\n\n  项目生成中...\n");

    files.copyDir(src,dest,ignore_path);
    //为模版生成新的PKG文件
    files.overwritePackageJson(dest + "/package.json", project_name);
    npm.installFrom(dest,function (error,stdout) {
      if (error) {
        put("出错了.请把错误信息记录下来并联系伟平.".error);
      }else{
        put("  cd `" + project_name + '` 开始编写您的项目。' + "\n" +
            "  帮助请运行 `bai -h`");
      }
    });
  });

Bai
  .command("run")
  .description(" - 监控less，coffee文件实时编译。开启服务器在" + "http://localhost:1217".warn)
  .action(function () {
    cli.tasks = ["common","dev"];
    grunt.cli();
  });

Bai
  .command('build')
  .description(" - 打包压缩所有文件到 /dist 文件夹")
  .action(function () {
    cli.tasks = ["common","dist"];
    grunt.cli();
  });

Bai
  .command('clean')
  .description(" - 清除缓存和压缩后的文件(方便测试)")
  .action(function () {
    cli.tasks = ["clean"];
    grunt.cli();
  });

Bai
    .command('*')
    .description('分开执行内部定义的grunt命令')
    .action(function(){
        //watch插件是基于再次调用grunt任务来进行继续.so...
        cli.tasks = grunt.util._(arguments).
            chain().toArray().
            initial().
            without('run'). //run 不能重复运行
            value();

        grunt.cli();
    });

Bai.parse(process.argv);

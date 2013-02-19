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
        put("  - Bai 为您创建了新的工程: " + project_name + '\n' +
            "  - 开始新的工程:\n" +
            "      - 进入工程目录 \n" +
            "          - `cd " +  project_name + "`\n" +
            "      - 开始您的工程\n" +
            "          - `Bai run` 开启您的静态服务器 地址为: " + "`http://localhost:1217`\n".warn.bold +
            "          - `Bai build` 生成合并后的css和js文件.位置在 " + ("`../" + project_name + "/dest`").warn.bold + "\n\n" +
            "  更多功能在不断添加之中,期待您的反馈.谢谢使用!\n\n"
           );
      }
    });
  });

Bai
  .command("run")
  .description(" - 运行开发服务器,监控less文件,根据请求实时更新")
  .action(function () {
    cli.tasks = ["common","dev"];
    grunt.cli();
  });

Bai
  .command('build')
  .description(" - 合并所有assets内css,js文件,输出到 /dist 文件夹")
  .action(function () {
    cli.tasks = ["common","dist"];
    grunt.cli();
  });

Bai
  .command('clean')
  .description(" - 清除build文件(方便测试)")
  .action(function () {
    cli.tasks = ["clean"];
    grunt.cli();
  });

Bai
  .command('*')
  .action(function () {
    baiLogo();
    put("  请运行 %s, 查看帮助文档\n", "`bai -h`".warn.bold);
  });

Bai.parse(process.argv);

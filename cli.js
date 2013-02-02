#!/usr/bin/env node

var Bai = require('commander'),
    grunt = require('grunt'),
    cli = require('grunt/lib/grunt/cli'),
    put = console.log;
    
Bai
  .command('new')
  .description('- 新建一个项目')
  .action(function (project_name) {
    var src = __dirname + "/app_lib",
        dest = process.cwd() + "/" + project_name;

    put("项目路径: " + dest + " 编译中...");


  });

vue-cli

![1569300349784](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1569300349784.png)

##### .editorconfig 编译器配置

```cmd
root = true

[*]
charset = utf-8
字符集编码
indent_style = space
缩进实现方法
indent_size = 2
缩进距离
end_of_line = lf
insert_final_newline = true
创建文件之后自动获取焦点
trim_trailing_whitespace = true
自动移除行尾多余空格
```

##### .eslintingnore忽略特定文件的语法检查

```js
/build/
/config/
/dist/
/*.js
```

##### .gitingnore忽略特定文件提交到git仓库

```cmd
.DS_Store
node_modules/
/dist/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
/test/e2e/reports/
selenium-debug.log

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
```


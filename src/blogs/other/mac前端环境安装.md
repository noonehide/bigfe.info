---
title: mac前端环境安装
date: 2020-05-15
tags:
  - other
categories:
  - other
---

## homebrew

包管理工具，可继续安装 nginx，make, wget

- 由于原版 github 被墙，换成国内源

```
curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh
```

## Sketch

下载安装包：https://www.sketchapp.com/
常用插件：sketch measure; style inventory

## Charles
下载地址: https://www.charles.ren/

## eZip

解压软件

## Vscode

```js
brew install visual-studio-code
```

### 安装插件

### 视图优化

-  Chinese: 中文插件
-  Markdown All in One: Markdown预览
-  vscode-icons: 漂亮的图标

### 代码提效与优化
- Visual Studio IntelliCode: 智能的代码提示
- Code Spell Checker: 检查错误单词
- Auto Close Tag: 字段关闭tag
- Highlight Matching Tag: 高亮匹配的tag
- Path Intellisense: 路径提示
### 语法糖
- HTML Snippets: HTML语法糖
- Vetur: Vue语法糖
- ES7 React/Redux/GraphQL/React-Native snippets: react语法糖
### 开发体验
- Code Runner: 运行代码
- Debugger for Chrome: debugger chrome
- Eslint: eslint
- GitLens: git工具
- Live Server: 快速打开本地服务
- Prettier: 优化代码

## chrome

下载地址: https://www.google.cn/chrome/

### 安装插件

### 工具
- FeHepler: 很多方便的工具:颜色转化，Json 格式化，二维码生成等
- EditThisCookie: 随心修改 cookie
- LastPass: 存储账号密码
- Smart Header: 任意修改 header 数据
  
### 框架
- React Devoleper Tools: react 开发者必备

### 代理
- Proxy SwitchyOmega: 代理神器
- 谷歌上网助手: 科学上网工具

## iterm2

- 直接安装

```js
brew cask install iterm2
```

- 权限错误解决

```js
chmod 755 /usr/local/share/zsh
chmod 755 /usr/local/share/zsh/site-functions
```

- 确认打开 Iterm2 快捷键

打开 Profiles -> 选择 HotkeyWindow -> Configure Hotkey Window
![iterm1](https://tva1.sinaimg.cn/large/008i3skNly1gqglcojb8mj30rr0gxacm.jpg)

选择 Hotkey -> 记录快捷键 -> 我这里设置的是 command + i

![iterm2](https://tva1.sinaimg.cn/large/008i3skNly1gqgldlocd9j30fs09pmy7.jpg)

## nvm node 版本管理工具

```js
brew install nvm
// 安装node
nvm install vxx.xx.xx
```

## cnpm

```js
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

## 安装其他

```js
brew install git

```

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

```js
/bin/zsh -c "curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh"
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

#### Auto Close Tag

#### Chinese

#### Code Runner

#### Debugger for Chrome

#### Eslint

#### GitLens

#### Highlight Matching Tag

#### HTML Snippets

#### Live Server

#### Markdown All in One

#### Path Intellisense

#### Prettier

#### Vetur

#### Visual Studio IntelliCode

#### vscode-icons

#### Code Spell Checker

## chrome

下载地址: https://www.google.cn/chrome/

### 安装插件

#### FeHepler

很多方便的工具:颜色转化，Json 格式化，二维码生成等

#### EditThisCookie

随心修改 cookie

#### LastPass

存储账号密码

#### Smart Header

任意修改 header 数据

#### React Devoleper Tools

react 开发者必备

#### Proxy SwitchyOmega

代理神器

#### 谷歌上网助手

看名字

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

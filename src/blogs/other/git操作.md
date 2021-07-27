---
title: git操作
date: 2021-07-27
tags:
  - other
categories:
  - other
---

## 同步fork的仓库代码

```

git remote -v 
git remote add upstream git@github.com:xxx/xxx.git
git fetch upstream
git merge upstream/main
git push

```

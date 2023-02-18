---
title: "[아이템 69] 예외는 진짜 예외 상황에서만 사용하라"
date: 2021-06-02T10:11:42+09:00
tags: ["Java", "Effective Java 3E"]
categories: ["Effective Java 3E"]
series: ["Effective Java 3E"]
chapter: ["Effective Java 3E Chapter 09"]
author: ["Qutrits"]
showToc: true
showAsideToc: true
TocOpen: false
draft: false
hidemeta: false
comments: true
ShowReadingTime: true
showPostNavLinks: true
ShowCodeCopyButtons: true
ShowBreadCrumbs: true
showContentProgressbar: true
# cover:
#   hidden: true
#   image: "/logo/logo-effective-java-3e.png"
---
# [아이템 69] 예외는 진짜 예외 상황에서만 사용하라.

예외는 반드시 예외 상황에서만 사용해야한다. 일반적인 제어 흐름용으로 사용하면 안 됩니다.

``` java
try {
    int i = 0;
    while (true) {
        index[i++].doSomething();
    }
} catch (ArrayIndexOutOfBoundsException) {
    ..
}
```
코드가 장황하고 직관적이지 않습니다. 성능도 일반적인 제어 흐름보다 느립니다.
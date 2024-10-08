---
title: "[아이템 49] 매개변수가 유효한지 검사하라"
date: 2021-04-02T10:11:42+09:00
tags: ["Java", "Effective Java 3E"]
categories: ["Effective Java 3E"]
series: ["Effective Java 3E"]
chapter: ["Effective Java 3E Chapter 07"]
author: ["qubqub"]
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
# 매개변수가 유효한지 검사하라.

메서드와 생성자는 대부분 특정 조건의 입력 매개변수에 특정 조건을 만족하기를 바랍니다. 만일 잘못된 값이 들어올 경우 보통 예외를 던지거나 컴파일 오류를 잡아내긴 하지만, 오류는 가능한 빨리 잡아내는 게 좋습니다. 그렇지 않으면 감지하기 어려워지고 감지하더라도 찾아내기 힘들어지는 경우도 있습니다.</br>
이러한 경우를 방지하기 위해 매개변수를 미리 확인한다면 즉각적이고 깔끔한 방식으로 예외를 처리할 수 있습니다.
</br>
하지만 반드시 메서드를 실행하기 전에 매개변수 유효성 검사를 해야하는 것만은 아닙니다. 유효성 검사 비용이 지나치게 높거나 실용적이지 않을 때는 다시 고려를 해봐야 합니다.</br>
이번 아이템의 핵심은 "매개변수에 제약을 두는 게 좋다"라는 것이 아닙니다. 메서드는 최대한 범용적으로 설계해야 합니다. 메서드가 건네 받은 값으로 어떠한 제대로 된 일을 할 수 있다면 제약이 적을 수록 좋습니다. 이러한 요소들을 잘 고려해서 상황에 맞게 사용해야합니다.
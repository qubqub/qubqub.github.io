---
title: "[아이템 8] finalizer와 cleaner 사용을 피하라"
date: 2020-06-20T15:12:33+09:00
tags: ["Java", "Effective Java 3E"]
categories: ["Effective Java 3E"]
series: ["Effective Java 3E"]
chapter: ["Effective Java 3E Chapter 1"]
author: ["Kyungchul Shin"]
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
자바에서는 두 가지 객체 소멸자를 제공합니다. 바로 `finalizer`와 `cleaner`입니다. `finalizer`는 예측 불가능하며 일반적으로 불필요하며 오작동 낮은 성능과 같은 문제점들이 있습니다. `JAVA 9`부터는 사용 자제`deprecated` API로 지정했습니다.

`cleaner`는 `finalizer`보다 덜 위험하지만 이 역시 예측 불가능하고, 느리고 일반적으로 불필요합니다.
<br>

## 📌 언제 실행되는지 알 수가 없습니다.

`finalizer`와 `cleaner`는 즉시 실행된다는 보장이 없습니다. 즉 제때 실행되어야 하는 작업을 절대 할 수 없다는 뜻입니다.
<br>

## 📌 finalizer는 굉장히 lazy 합니다.

여기서 `lazy`하다는 뜻은 인스턴스의 자원 회수가 멋대로 지연될 수 있다는 뜻입니다. `finalizer`쓰레드는 우선 순위가 낮아서 실행될 기회를 제대로 얻지 못하는 경우들도 생깁니다.
<br>

## 📌 수행 여부가 보장되지 않습니다.

자바 언어 명세는 `finalizer`와 `cleaner`의 수행 시점과 수행 여부조차 보장하지 않습니다. 따라서 상태를 수정하는 작업에는 절대 `finalizer`나 `cleaner`에 의존해서는 안 됩니다.
<br>

## 📌 예외가 무시됩니다.

`finalizer`가 동작하면서 발생한 예외는 무시되며 처리할 작업이 남아있더라도 그 순간 종료됩니다. `finalizer`같은 경우 예외가 발생해도 추적을 할 수 없으며 이는 디버깅하는데 큰 문제가 됩니다.
<br>

## 📌 성능상 이슈

`Autocloseable` 객체를 만들고 가비지 컬렉터가 수거하기 전까지 `12ns`가 걸린 반면, `finalizer`를 사용하면 `550ns`가 소요 됐습니다. `finalizer`가 가비지 컬렉터의 효율을 떨어뜨리기 때문입니다.
뿐만 아니라 다양한 이슈들로 인해 `finalizer`와 `cleaner`의 사용을 추천하고 있지 않습니다.
<br>

## <i class="user-fa-av-new-releases" aria-hidden="true"></i> 정리
`cleaner`(`JAVA 8`까지는 `finalizer`)는 안전망 역할이나 중요하지 않은 네이티브 자원 회수용으로만 사용합시다. 물론 이런 경우라도 불확실성과 성능 저하에 주의해야 합니다.
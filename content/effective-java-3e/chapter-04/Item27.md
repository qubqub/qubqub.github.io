---
title: "[아이템 27] 비검사 경고를 제거하라"
date: 2020-07-08T13:16:11+09:00
tags: ["Java", "Effective Java 3E"]
categories: ["Effective Java 3E"]
series: ["Effective Java 3E"]
chapter: ["Effective Java 3E Chapter 04"]
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
## [아이템 27] 비검사 경고를 제거하라.

제네릭에 관련된 수 많은 컴파일 경고들이 있습니다. 비검사 형변환 경고, 비검사 메서드 호출 경고, 비검사 매개변수화 가변인수 타입 경고, 비검사 변환 경고 등이 있습니다.
제네릭에 익숙해질 수록 마주치는 경고 수는 줄어들겠지만 새로 작성한 코드가 한 번에 깨끗하게 컴파일되리라 기대하지는 맙시다.
대부분의 비검사 경고는 쉽게 제거할 수 있습니다. 코드를 다음처럼 잘못 작성했다고 예시를 들어봅시다.

``` java
Set<Fruits> fruits = new Hashset();
```

그러면 컴파일러는 무엇이 잘못 됐는지 설멸해 줄 것입니다.
(`javac` 명령줄 인수에 `-Xlint:unchecked` 옵션을 추가해야 합니다.)

컴파일러가 알려준 대로 수정하면 경고가 사라집니다. `JAVA 7`부터는 컴파일러가 알려준 타입 매개변수로 명시하지 않아도 타입 추론을 지원합니다.

``` java
Set<Fruits> fruits = new Hashset<>();
```

할 수 있는 한 모든 비검사 경고를 제거합시다. 모두 제거한다면 그 코드는 타입 안전성이 보장됩니다. 경고를 제거할 수는 없지만 타입이 안전하다고 확신이 들 때는 `@SuppressWarning("unchecked")` 애너테이션을 달아 경고를 숨깁시다. `@SuppressWarning` 애너테이션은 개별 지역번수 선언부터 클래스 전체까지 어떤 선언에도 달 수 있습니다. 하지만 가능한 좁은 범위에 적용하는 게 좋습니다.
자칫 심각한 경고를 놓칠 수 있으니 절대로 클래스 전체에 적용해서는 안 됩니다. `@SuppressWarning("unchecked")` 애너테이션을 사용할 때면 그 경고를 무시해도 안전한 이유를 항상 주석으로 남겨야 합니다.

## 정리
- 비검사 경고는 중요하니 무시하지 말자. 모든 비검사 경고는 런타임에 `ClassCastException`을 일으킬 수 있는 잠재적 가능성이 있습니다.
- 경고를 없앨 방법을 찾지 못했다면, 그 코드의 안전함을 증명하고 가능한 범위를 좁혀서 `@SuppressWarning("unchecked")` 애노테이션으로 경고를 숨깁시다.
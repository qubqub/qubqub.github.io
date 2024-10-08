---
title: "[아이템 15] 클래스와 멤버의 접근 권한을 최소화하라"
date: 2020-07-02T12:52:21+09:00
tags: ["Java", "Effective Java 3E"]
categories: ["Effective Java 3E"]
series: ["Effective Java 3E"]
chapter: ["Effective Java 3E Chapter 03"]
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
잘 설계된 컴포넌트와 그렇지 못한 컴포넌트의 가장 큰 차이는 클래스 내부 데이터와 내부 구현 정보를 외부 컴포넌트로부터 얼마나 잘 숨겼느냐입니다. 설계가 잘 된 컴포넌트는 모든 내부 구현을 숨겨, 구현과 API를 깔끔하게 **분리**합니다.
<br>

## 📌 정보 은닉(캡슐화)의 장점
- 시스템 개발 속도를 높입니다. (여러 컴포넌트를 병렬로 개발할 수 있기 때문에)
- 시스템 관리 비용을 낮춥니다. (각 컴포넌트를 더 빨리 파악하여 디버깅할 수 있고, 다른 컴포넌트로 교체하는 비용도 적기 때문에)
- 성능 최적화에 도움을 줍니다. (다른 컴포넌트에 영향을 주지 않고 특정 컴포넌트만 최적화 할 수 있어서)
- 재사용성을 높입니다. (독자적으로 동작하는 컴포넌트는 다른 환경에서도 쓰일 수 있기 때문에)
<br>

접근 제어자를 잘 활용하는 것이 정보 은닉의 핵심입니다. 기본 원칙은 모든 클래스와 멤버의 접근성을 가능한 좁혀야 합니다. 즉 애플리케이션이 제대로 동작하는 한 항상 가장 낮은 접근 수준을 부여해야 합니다.

톱레벨(가장 바깥) 클래스와 인터페이스에 부여할 수 있는 접근 제어자는 `public`과 `package-private`(`default`) 두 가지 입니다.

`public`으로 선언하면 공개 API가 되므로 패키지 외부에서 쓸 일이 없다면 `package-private`로 선언하는 걸 권장합니다. 한 클래스에서만 사용하는 `package-private` 톱레벨 클래스나 인터페이스는 이를 사용하는 클래스 안에 `private static`으로 중첩시켜봅시다. 이렇게 하면 바깥 클레스 하나에서만 접근할 수 있습니다.
<br>

**멤버**(필드, 메서드, 중첩 클래스, 중첩 인터페이스)에 사용할 수 있는 **접근제한자**

- `private`: 멤버를 선언한 톱레벨 클래스에서만 접근 가능합니다.
- `package-private`: 멤버가 소속된 패키지안에 모든 클래스에서 접근 가능합니다
- `protected`: `package-private` + 하위  클래스
- `public`: 모든 곳에서 접근할 수 있습니다.
<br>
<br>

## 📌 public 클래스의 인스턴스 필드는 가능한 public이 아니어야 합니다.

필드가 가변 객체를 참조하거나, `final`이 아닌 인스턴스필드를 `public`으로 선언하면 필드의 내용이 수정될 수 있으므로 불변을 보장할 수 없게 되므로 유의해야 합니다. 필드가 `final`이면서 불변 객체를 참조해도 문제는 있습니다. 내부 구현을 바꾸고 싶어도 `public`필드를 없애는 방식으로는 리팩토링 할 수 없게 됩니다.

정적 필드 같은 경우 추상 개념을 완성하는데 꼭 필요한 구성요소로써의 상수라면 `public static final`필드로 공개해도 좋으나 반드시 `primitive type`이나 **불변 객체**를 참조해야 합니다. **가변 객체**를 참조 한다면 참조는 변경하지 못하나 객체의 값은 수정될 수 있으므로 주의해야 합니다.
<br>
<br>

## <i class="user-fa-av-new-releases" aria-hidden="true"></i> 정리
프로그램의 접근 제어자는 가능한 **최소한**으로 합시다. 꼭 필요한 것만 `public` API를 설계하고 그 외에는 의도치 않게 API로 공개되는 일이 없도록 해야 합니다. `public`클래스는 `public static final` 필드 외에는 어떠한 `public` 메서드도 가져서는 안 됩니다. 또한 `public static final` 필드가 참조하는 객체가 **불변**인지 확인합시다.

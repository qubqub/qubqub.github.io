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
잘 설계된 컴포넌트와 그렇지 못한 컴포넌트의 가장 큰 차이는 **내부 데이터**와 **구현 정보**를 외부로부터 얼마나 잘 숨겼느냐에 있습니다. 잘 설계된 컴포넌트는 모든 내부 구현을 숨기고, 구현과 API를 깔끔하게 **분리**합니다.
<br>

## 1. 정보 은닉(캡슐화)의 장점
- **개발 속도 증가**: 여러 컴포넌트를 병렬로 개발할 수 있어 시스템 개발 속도가 빨라집니다.
- **관리 비용 절감**: 각 컴포넌트를 더 빨리 파악할 수 있어 디버깅과 교체 비용이 낮아집니다.
- **성능 최적화**: 특정 컴포넌트만 최적화할 수 있어 성능 향상에 도움이 됩니다.
- **재사용성 향상**: 독립적으로 동작하는 컴포넌트는 다른 환경에서도 재사용할 수 있습니다.
<br>
<br>

## 2. 접근 제어자의 중요성
접근 제어자는 정보 은닉의 핵심입니다. 기본 원칙은 모든 클래스와 멤버의 접근성을 가능한 좁혀야 하며, 애플리케이션이 제대로 동작하는 한 가장 낮은 접근 수준을 부여해야 합니다.
<br>

### 톱레벨 클래스와 인터페이스의 접근 제어자
톱레벨 클래스와 인터페이스에 사용할 수 있는 접근 제어자는 `public`과 `package-private`(기본값) 두 가지입니다.
- `public`: 공개 API가 되며, 외부에서 접근 가능합니다.
- `package-private`: 외부 패키지에서 접근할 수 없습니다.

`public`으로 선언하면 공개 API가 되므로 패키지 외부에서 쓸 일이 없다면 `package-private`로 선언하는 걸 권장합니다. 한 클래스에서만 사용하는 `package-private` 톱레벨 클래스나 인터페이스는 이를 사용하는 클래스 안에 `private static`으로 중첩시켜봅시다. 이렇게 하면 바깥 클래스 하나에서만 접근할 수 있습니다.
<br>

### 멤버에 대한 접근 제어자

**멤버**(필드, 메서드, 중첩 클래스, 중첩 인터페이스)에 사용할 수 있는 **접근제한자**

- **`private`**: 멤버를 선언한 톱레벨 클래스에서만 접근 가능.
- **`package-private`**: 소속된 패키지의 모든 클래스에서 접근 가능.
- **`protected`**: `package-private` + 하위 클래스에서 접근 가능.
- **`public`**: 모든 곳에서 접근 가능.
<br>
<br>

## 3. public 클래스의 인스턴스 필드
`public` 클래스의 인스턴스 필드는 가능한 한 `public`이 아니어야 합니다.
- 가변 객체를 참조하거나 `final`이 아닌 인스턴스 필드를 `public`으로 선언하면, 필드 내용이 수정될 수 있어 불변성을 보장할 수 없게 됩니다.
- `final`이면서 불변 객체를 참조해도 문제는 있습니다. 내부 구현을 변경하고 싶어도 `public`필드를 없애는 방식으로는 리팩토링 할 수 없게 됩니다.
<br>

### 정적 필드의 공개
정적 필드는 추상 개념을 완성하는데 꼭 필요한 구성 요소로, 다음과 같은 경우 `public static final`로 공개해도 좋습니다.
- 반드시 `primitive type`이나 **불변 객체**를 참조해야 합니다.
- **가변 객체**를 참조하는 경우, 참조는 변경하지 못하나 객체의 값을 수정할 수 있으므로 주의해야 합니다.
<br>
<br>

## 4. 정리
- 프로그램의 접근 제어자는 가능한 최소한으로 설정해야 합니다.
- 꼭 필요한 경우에만 `public` API를 설계하고, 그 외에는 의도치 않게 API로 공개되는 일이 없도록 해야 합니다.
- `public` 클래스는 `public static final` 필드 외에는 어떠한 `public` 메서드도 가져서는 안 됩니다.
- `public static final` 필드가 참조하는 객체가 **불변**인지 확인해야 합니다.
<br>
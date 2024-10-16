---
title: "[아이템 14] Comparable를 구현할지 고려하라"
date: 2020-06-27T17:11:39+09:00
tags: ["Java", "Effective Java 3E"]
categories: ["Effective Java 3E"]
series: ["Effective Java 3E"]
chapter: ["Effective Java 3E Chapter 02"]
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
자바에서는 `Comparable`과 `Comparator`라는 두 가지 정렬 인터페이스를 제공합니다. `Comparable`은 기본 정렬 기준을 구현하는 데 사용되고, `Comparator`는 다른 기준으로 정렬하고자 할 때 사용됩니다. 이번 포스트에서는 `Comparable` 인터페이스의 유일한 메서드인 `compareTo`에 대해 알아보겠습니다.

## 1. `Comparable`의 의미
`Comparable`을 구현했다는 것은 해당 클래스의 인스턴스들이 **natural order**를 갖는다는 것을 의미합니다. 이를 통해 `Comparable`을 구현한 객체들의 배열은 다음과 같이 정렬할 수 있습니다:
``` java
Arrays.sort(a);
```
<br>
<br>

## 2. `compareTo` 메서드의 규약
`compareTo` 메서드는 다음과 같은 규칙을 따릅니다:
- 이 객체가 주어진 객체(매개변수로 받는)보다 작으면 **음의 정수**를, 같으면 **0**을, 크면 **양의 정수**를 반환합니다.
- 이 객체와 비교할 수 없는 타입이면 `ClassCastException`을 던집니다.

여기서 **sgn(표현식)** 표기는 수학에서의 부호 함수를 뜻하며, 표현식의 값이 **음수, 0, 양수**일 때 각각 **-1, 0, 1**을 반환하도록 정의합니다.
<br>

### 1) 규약 요약
- `Comparable`을 구현한 클래스는 모든 `x`, `y`에 대해 다음을 만족해야 합니다.
**<center>{{< font family="cascadiacode" color-var="main-color" text="sgn(x.comparaTo(y)) == -sgn(y.comparaTo(x))" >}}</center>** 따라서 **{{< font family="cascadiacode" color-var="main-color" text="sgn(x.compareTo(y))" >}}**는 **{{< font family="cascadiacode" color-var="main-color" text="sgn(y.compareTo(x))" >}}**가 예외를 던질 때에만 예외를 던져야 합니다.
<br>

- `Comparable`을 구현한 클래스는 **추이성을 보장**해야 합니다.
**<center>{{< font family="cascadiacode" color-var="main-color" text="x.compareTo(y) > 0 and y.compareTo(z) > 0 ⟹ x.compareTo(z) > 0" >}}</center>**

- 모든 `z`에 대해:
**<center>{{< font family="cascadiacode" color-var="main-color" text="x.compareTo(y) == 0 ⟹ sgn(x.compareTo(z)) == sgn(y.compareTo(z))" >}}</center>**

- 권장 사항이지만 꼭 지켜야 하는 것은:
**<center>{{< font family="cascadiacode" color-var="main-color" text="(x.compareTo(y) == 0) == (x.equals(y))" >}}</center>**
<br>

이러한 규약을 지키지 않으면 `TreeSet`, `TreeMap`과 같이 비교를 활용하는 클래스에서 **오작동**이 발생할 수 있습니다.
<br>
<br>

## 3. `Comparable`과 제네릭
`Comparable` 인터페이스는 타입 인수를 받는 제네릭 인터페이스입니다. 따라서 `compareTo` 메서드의 매개변수 타입은 **컴파일 타임에 정해지므로**, 형변환이 필요하지 않습니다.
<br>
<br>

## 4. 객체 참조 필드 비교
객체의 참조 필드를 비교할 때는 `compareTo` 메서드를 재귀적으로 호출합니다. 만약 `Comparable`을 구현하지 않은 필드나 표준이 아닌 순서로 비교해야 한다면, `Comparator`를 사용하면 됩니다.

클래스의 핵심 필드가 여러 개일 경우, 가장 중요한 필드부터 비교하는 것이 좋습니다. 비교 결과가 `0`이 아니라면 그 지점에서 정렬 순서가 결정되기 때문입니다.
<br>
<br>

## 5. `JAVA 8`에서 `compareTo` 메서드 구현하기
``` java
List<Student> students = Arrays.asList(
    new Student(30, "kim"),
    new Student(50, "jake"),
    new Student(50, "foo")
);

students.sort(
    Comparator.comparingInt(Student::getAge)
        .thenComparing(Student::getName)
);
// 이뿐만 아니라 다양한 방식으로 정렬을 할 수 있습니다.
```

위와 같은 방식으로 코드를 간결하게 작성할 수 있습니다. 하지만 이 방식은 약간의 성능 저하가 있을 수 있습니다.
<br>
<br>

## 6. 정리
- `Comparable`을 구현하면 객체의 자연 순서를 정의할 수 있습니다. 이를 통해 `Arrays.sort()`와 같은 메서드에서 직접 정렬이 가능합니다.
- `compareTo` 메서드는 명확한 규약을 따르며, 이를 지키지 않으면 여러 데이터 구조에서 오류가 발생할 수 있습니다.
- 객체의 비교 기준이 복잡한 경우, `Comparator`를 사용하는 것이 더 적합할 수 있습니다.
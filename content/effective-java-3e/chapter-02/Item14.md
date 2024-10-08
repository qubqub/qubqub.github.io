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
자바에서는 `Comparable`과 `Comparator`라는 정렬 인터페이스를 제공합니다. `Comparable`은 기본 정렬기준을 구현하는 데 사용하고, `Comparator`은 기본 정렬기준 외에 다른 기준으로 정렬하고자 할 때 사용합니다. 여기서는 `Comparable`의 하나 밖에 없는 `compareTo`메서드에 대해서 알아봅시다.

`Comparable`을 구현했다는 것은 그 클래스의 인스턴스들에는 `natural order`가 있음을 의미합니다. 그래서 `Comparable`을 구현한 객체들의 배열은 다음과 같이 정렬할 수 있습니다.

```java
Arrays.sort(a);
```
<br>
<br>

## compareTo 메서드의 규약
이 객체가 주어진 객체(매개변수로 받는)보다 작으면 `음의 정수`를, 같으면 `0`을, 크면 `양의 정수`를 반환합니다. 이 객체와 비교할 수 없는 타입이면 `ClassCastException`을 던집니다.

다음 설명에서 sgn(표현식) 표기는 수학에서 말하는 부호 함수를 뜻하며, 표현식의 값이 `음수`, `0`, `양수`일 때 `-1`, `0`, `1`을 반환하도록 정의했습니다.

- `Comparable`을 구현한 클래스는 모든 `x`, `y`에 대해,
{{< font family="cascadiacode" size="1" color-var="main-color" weight="600" text="sgn(x.comparaTo(y)) == -sgn(y.comparaTo(x))" >}}여야 합니다.
따라서 {{< font family="cascadiacode" size="1" color-var="main-color" weight="600" text="sgn(x.comparaTo(y))" >}}는 {{< font family="cascadiacode" size="1" color-var="main-color" weight="600" text="-sgn(y.comparaTo(x))" >}}가 예외를 던질 때에 한해 예외를 던져야 합니다.

- `Comparable`을 구현한 클래스는 추이성을 보장해야 합니다.
{{< font family="cascadiacode" size="1" color-var="main-color" weight="600" text="x.comparaTo(y) > 0 && y.comparaTo(z) > 0" >}} 이면 {{< font family="cascadiacode" size="1" color-var="main-color" weight="600" text="x.compareTo(z) > 0" >}} 입니다.

- `Comparable`을 구현한 클래스는 모든 `z`에 대해,
{{< font family="cascadiacode" size="1" color-var="main-color" weight="600" text="x.compareTo(y) == 0" >}} 이면 {{< font family="cascadiacode" size="1" color-var="main-color" weight="600" text="sgn(x.compareTo(z)) == sgn(y.compareTo(z))" >}} 입니다.

- 이번 권고가 필수는 아니지만 꼭 지키는 게 좋습니다.
{{< font family="cascadiacode" size="1" color-var="main-color" weight="600" text="(x.compareTo(y) == 0) == (x.equals(y))" >}} 여야 합니다.
<br>
<br>

`hashCode` 규약을 지키지 못하면 해시를 사용하는 클래스에서 오작동이 일어날 수 있듯이 `compareTo` 규약을 지키지 못하면 `TreeSet`, `TreeMap`과 같이 비교를 활용하는 클래스에서 오작동이 일어날 수 있습니다.

`Compareble` 인터페이스은 타입 인수를 받는 제네릭 인터페이스므로 `compareTo` 메서드의 인수 타입은 컴파일타임에 정해집니다. 즉 매개변수 타입이 잘못 됐다면 컴파일 자체가 되지 않으므로 형변환 할 필요가 없다는 뜻입니다.

객체 참조 필드를 비교하려면 `compareTo` 메서드를 재귀적으로 호출합니다. `Compareble`을 구현하지 않은 필드나 표준이 아닌 순서로 비교해야 한다면 `Comparator`를 사용하면 됩니다.

클래스의 핵심 필드가 여러개라면 가장 핵심적인 필드부터 비교하는 것을 추천드립니다. 비교 결과가 `0`이 아니라면 순서는 거기서 설정되기 때문입니다.
<br>
<br>

`JAVA 8`에서 `compareTo` 메서드를 구현하기

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

위와 같이 코드를 간결하게 짤 수 있습니다. 대신 약간의 성능 저하가 있습니다.




---
title: "[아이템 10] equals는 일반 규약을 지켜 재정의하라"
date: 2020-06-27T11:42:54+09:00
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
`equals` 메서드를 재정의하는 이유는 **논리적 동치성**을 비교하기 위함입니다. 논리적 동치성이란 객체의 참조값이 아닌 **객체의 값이 같은지를 판단**하는 것입니다. `equals` 메서드를 올바르게 재정의하지 않으면 객체 비교에서 **예기치 않은 문제**가 발생할 수 있습니다.

`equals`메서드를 오버라이딩 할 때는 다음의 규약을 따라야 합니다.
<br>

## 1. equals 규약
### 1) 반사성 (Reflexivity)
- `null`이 아닌 모든 참조 값 `x`에 대해, {{< font family="cascadiacode" size="1" color-var="main-color" weight="600" text="x.equals(x)" >}}는 `true`입니다.
<br>

### 2) 대칭성 (Symmetry)
- `null`이 아닌 모든 참조 값 `x`, `y`에 대해 {{< font family="cascadiacode" size="1" color-var="main-color" weight="600" text="x.equals(y)" >}}는 {{< font family="cascadiacode" size="1" color-var="main-color" weight="600" text="y.equals(x)" >}}입니다.

#### ❌ 잘못된 코드 - 대칭성 위반
``` java
public class CaseInsensitiveString {

    private String str;

    ... 생략

    @Override
    public boolean equals(Object o) {
        if (o instanceof CaseInsensitiveString) {
            return str.equalsIgnoreCase(((CaseInsensitiveString) o).str);
        }
        if (o instanceof String) {
            return str.equalsIgnoreCase((String) o);
        }
        return false;
    }
}
```
``` java
CaseInsensitiveString cis = new CaseInsensitiveString("String");
String str = "string";
```

- {{< font family="cascadiacode" size="1" color-var="main-color" weight="600" text="cis.equals(str)" >}}는 `true`를 반환하고 {{< font family="cascadiacode" size="1" color-var="main-color" weight="600" text="str.equals(cis)" >}}는 `false`를 반환하게 되므로 대칭성에 위반됩니다.
<br>

### 3) 추이성 (Transitivity)
- `null`이 아닌 모든 참조 값 `x`, `y`, `z`에 대해 {{< font family="cascadiacode" size="1" color-var="main-color" weight="600" text="x.equals(y)" >}}가 `true`이고, {{< font family="cascadiacode" size="1" color-var="main-color" weight="600" text="y.equals(z)" >}}도 `true`라면, {{< font family="cascadiacode" size="1" color-var="main-color" weight="600" text="x.equals(z)" >}}도 **항상** `true`여야 합니다.
<br>

### 4) 일관성 (Consistency)
- `null`이 아닌 모든 참조 값 `x`, `y`에 대해 여러 번 {{< font family="cascadiacode" size="1" color-var="main-color" weight="600" text="x.equals(y)" >}}를 호출하더라도 **항상 동일한 결과**가 나와야 합니다.
<br>

### 5) null-아님
- `null`이 아닌 모든 참조 값 `x`에 대해 {{< font family="cascadiacode" size="1" color-var="main-color" weight="600" text="x.equals(null)" >}}은 항상 `false`여야 합니다.
<br>
<br>

## 2. 상속 시 발생할 수 있는 문제
상위 클래스의 `equals` 메서드를 하위 클래스에서 확장할 때, 올바른 비교를 위해 신중한 설계가 필요합니다. 상위 클래스 필드에 없는 새로운 필드를 추가하는 경우, `equals` 메서드에서 상속 구조와 일관된 비교를 하지 않으면 예기치 않은 결과가 나올 수 있습니다.

``` java
public class Point {

    private int x;
    private int y;

    ... 생략

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Point)) {
            return false;
        }
        Point p = (Point) o;
        return this.x == p.x && this.y == p.y;
    }

}
```
`Point`클래스를 확장해봅시다.
<br>

``` java
public class CirclePoint extends Point{

    private int x;
    private int y;
    private int z;

    public CirclePoint(int x, int y, int z) {
        super(x, y);
        this.z = z;
    }

    ... 생략
}
```
이대로 사용하면 `Point`의 구현이 상속되어 `x`, `y`만 비교하게 되므로 생각했던 결과랑 실제 결과값이 다르게 나오는 상황이 발생합니다.

객체 지향의 추상화의 이점을 포기하지 않는 이상 아쉽게도 이러한 문제점들을 모두 완전하게 해결할 수 있는 방법은 없습니다.
<br>
<br>

## 3. 올바른 equals 메서드 구현 단계

1.  **자기 자신의 참조인지 확인**: `==` 연산자로 객체가 자기 자신인지 확인합니다.
2.  **타입 체크**: `instanceof` 연산자를 사용하여 객체의 타입을 확인합니다.
3.  **형변환**: 입력된 객체를 올바른 타입으로 형변환합니다.
4.  **필드 비교**: 객체의 필드 값들을 비교하여 동치성을 확인합니다.
<br>

### 성능 최적화 팁
- 비교하는 필드 중 값이 다를 가능성이 높은 필드나 비교 비용이 적은 필드를 먼저 비교하면 성능을 향상시킬 수 있습니다.
<br>
<br>

## 4. 정리
- `equals`**를 재정의할 때는 꼭 필요할 경우에만** 하며, 재정의 시에는 반드시 **다섯 가지 규약**(**반사성**, **대칭성**, **추이성**, **일관성**, **null-아님**)을 지켜야 합니다.
- **핵심 필드** 모두를 빠짐없이 비교하고, 상속 구조에서의 동작도 주의 깊게 설계해야 합니다.
- 자주 실수할 수 있는 부분이므로, `Object`의 기본 `equals` 메서드가 이미 적합하다면 **재정의하지 않는 것이 좋습니다**.
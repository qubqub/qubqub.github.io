---
title: "[아이템 10] equals는 일반 규약을 지켜 재정의하라"
date: 2020-06-27T11:42:54+09:00
tags: ["Java", "Effective Java 3E"]
categories: ["Effective Java 3E"]
series: ["Effective Java 3E"]
chapter: ["Effective Java 3E Chapter 2"]
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
`equals`메서드를 오버라이딩 하는 경우는 논리적인 동치성을 확인하기 위해서입니다. 여기서 말하는 논리적 동치성은 쉽게 말하자면 참조값을 비교하는 게 아닌 객체의 값이 같은지 비교하기 위함이라고 할 수 있습니다.

`equals`메서드를 오버라아딩 할 때는 다음의 규약을 따라야 합니다.
<br>

## 📌 반사성 (Reflexivity)

- `null`이 아닌 모든 참조 값 `x`에 대해, {{< font family="cascadiacode" size="1" color-var="main-color" weight="600" text="x.equals(x)" >}}는 `true`입니다.
<br>
<br>

## 📌 대칭성 (Symmetry)

- `null`이 아닌 모든 참조 값 `x`, `y`에 대해 {{< font family="cascadiacode" size="1" color-var="main-color" weight="600" text="x.equals(y)" >}}는 {{< font family="cascadiacode" size="1" color-var="main-color" weight="600" text="y.equals(x)" >}}입니다.
<br>

### <i class="user-fa-alert-warning" aria-hidden="true"></i> 잘못된 코드 - 대칭성 위반

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
<br>

``` java
CaseInsensitiveString cis = new CaseInsensitiveString("String");
String str = "string";
```

{{< font family="cascadiacode" size="1" color-var="main-color" weight="600" text="cis.equals(str)" >}}는 `true`를 반환하고 {{< font family="cascadiacode" size="1" color-var="main-color" weight="600" text="str.equals(cis)" >}}는 `false`를 반환하게 되므로 대칭성에 위반됩니다.
<br>
<br>

## 📌 추이성 (Transitivity)

- `null`이 아닌 모든 참조 값 `x`, `y`, `z`에 대해 {{< font family="cascadiacode" size="1" color-var="main-color" weight="600" text="x.equals(y)" >}}가 `true`고 {{< font family="cascadiacode" size="1" color-var="main-color" weight="600" text="y.equals(z)" >}}도 `true`입니다.
<br>
<br>

## 📌 일관성 (Consistency)

- `null`이 아닌 모든 참조 값 `x`, `y`에 대해 {{< font family="cascadiacode" size="1" color-var="main-color" weight="600" text="x.equals(y)" >}}를 반복해서 호출하면 항상 `true`를 반환하거나 항상 `false`를 반환해야 합니다.
<br>
<br>

## 📌 null-아님

- `null`이 아닌 모든 참조 값 `x`에 대해 {{< font family="cascadiacode" size="1" color-var="main-color" weight="600" text="x.equals(null)" >}}은 `false`여야 합니다.
<br>

이제 상위 클래스에 없는 필드를 하위 클래스에 추가하는 상황을 생각해봅시다. 여기서부터 신경써야 할 부분들이 많아집니다.
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

## <i class="user-fa-action-done" aria-hidden="true"></i> 양질의 equals메서드 구현 단계

1.  `==` 연산자를 사용해 입력이 자기 자신의 참조인지 확인합니다.
2.  `insetanceof` 연산자로 입력이 올바른 타입인지 확인합니다.
3.  입력을 올바른 타입으로 형변환 합니다.
4.  입력받은 객체와 자기 자신의 대응되는 필드들이 모두 일치하는지 검사합니다.
<br>

어떤 필드를 먼저 비교하느냐에 따라 성능의 차이도 생깁니다. 값이 다를 가능성이 크거나 비교하는 비용이 싼 필드를 먼저 비교하면 성능상 이점을 얻을 수 있습니다.(틀리면 다음 로직을 실행하지 않기에)
<br>
<br>

## <i class="user-fa-av-new-releases" aria-hidden="true"></i> 정리
꼭 필요한 경우가 아니면 `equals`를 재정의하지 맙시다. 많은 경우에 `Object`의 `equals`가 우리들이 원하는 비교를 정확히 수행해줍니다. 재정의해야 할 때는 그 클래스의 핵심 필드 모두를 빠짐없이, 다섯 가지 규약을 확실히 지켜가며 비교해야 합니다.
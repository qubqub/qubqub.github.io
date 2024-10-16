---
title: "[아이템 13] clone 재정의는 주의해서 진행하라"
date: 2020-06-27T15:04:12+09:00
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
## 1. `clone`과 `Cloneable`의 문제점

`Cloneable` 인터페이스를 구현한 클래스는 `clone` 메서드를 `public`으로 제공하며, 사용자는 이를 통해 객체의 복제가 제대로 이루어지리라 기대합니다. 하지만 `clone` 메서드의 일반 규약은 몇 가지 허점이 있어, 이를 주의 깊게 다루지 않으면 의도치 않은 결과를 초래할 수 있습니다.

다음은 `Object` 클래스의 `clone` 메서드에 대한 명세입니다.

> 이 객체의 복사본을 생성해 반환합니다. **복사**의 정확한 의미는 그 객체를 구현한 클래스에 따라 달라질 수 있지만, 일반적인 의도는 다음과 같습니다. 어떤 객체 `x`에 대해 다음 조건을 만족해야 합니다
> - {{< font family="cascadiacode" size="1" color-var="main-color" weight="600" text="x.clone() != x" >}}
> - {{< font family="cascadiacode" size="1" color-var="main-color" weight="600" text="x.clone.getClass() == x.getClass()" >}}
> - {{< font family="cascadiacode" size="1" color-var="main-color" weight="600" text="x.clone().equals(x)" >}}

<br>
<br>

## 2. `clone` 메서드 구현하기
### 1) 단순한 불변 객체의 `clone`

`clone`을 사용하는 방법은 굉장히 간단합니다. `Cloneable`인터페이스를 구현하고 `super.clone`을 호출하면 됩니다. 이렇게 얻은 객체는 원본의 모든 필드와 동일한 값을 가지게 됩니다.
``` java
@Override
public PhoneNumber clone() {
    try{
        return (PhoneNumber) super.class();
    } catch (CloneNotSupportedException e) {
        throw new AssertionsError(); // 발생할 수 없는 예외
    }
}
```
<i class="user-fa-action-info-outline" aria-hidden="true"></i> _가변 상태를 참초하지 않는 클래스의 `clone` 메서드_

위 코드에서 `PhoneNumber` 클래스는 가변 상태를 참조하지 않으므로 간단히 `super.clone()`을 호출하여 복제할 수 있습니다. `super.clone()`은 기본적으로 `Object`의 `clone`을 호출하여, 객체의 필드 값들을 그대로 복제합니다. 여기서 중요한 점은, 반환 타입이 `PhoneNumber`로 명시되었으므로 클라이언트는 따로 형변환을 하지 않아도 된다는 것입니다.
<br>

### 2) 가변 객체를 참조하는 클래스의 문제

문제가 되는 것은 가변 객체를 참조하는 클래스입니다. 예를 들어, `Stack` 클래스가 있다고 가정해봅시다.
``` java
public class Stack {
    private Object[] elements;
    private int size = 0;
    private static final int DEFAULT_INITIAL_CAPACITY = 16;

    public Stack() {
        this.elements = new Object[DEFAULT_INITIAL_CAPACITY];
    }

    ... 생략
}
```
`clone`메서드가 단순히 `super.clone`의 결과를 그대로 반환하면 `Stack`인스턴스의 `size` 필드는 올바른 값을 갖겠지만, `elements`필드는 원본 `Stack` 인스턴스와 똑같은 배열을 참조하게 되는 상황이 발생합니다.
<br>

### 3) 가변 상태를 복제하는 clone 메서드

`clone` 메서드는 사실상 **생성자**와 같은 역할을 합니다. 원본 객체는 변경되지 않은 상태를 유지하면서, 복제된 객체의 **불변식**(invariant)이 보장되어야 합니다. 가변 객체를 참조하는 경우, 이 참조 또한 복사하여 새로운 객체가 독립적으로 동작할 수 있도록 해야 합니다.
``` java
@Override
public PhoneNumber clone() {
    try{
        Stack result = (Stack) super.clone();
        result.elements = elements.clone(); // 배열을 별도로 복제
        return result;
    } catch (CloneNotSupportedException e) {
        throw new AssertionsError(); // 발생할 수 없는 예외
    }
}
```
<i class="user-fa-action-info-outline" aria-hidden="true"></i> _가변 상태를 참조하는 클래스의 `clone` 메서드_

위 예시에서는 `elements` 배열도 복제해 `result`에 할당함으로써 원본과 복제본이 **서로 다른 배열**을 참조하도록 했습니다. 이 방식으로 복제된 객체는 독립적으로 동작하며, 원본 객체의 상태에 영향을 받지 않습니다.
<br>
<br>

## 3. 정리
- 불변 객체에서는 `clone` 메서드를 간단히 구현할 수 있지만, 가변 객체를 참조하는 경우에는 복사본이 원본과 독립적으로 동작할 수 있도록 조심해야 합니다.
- `clone`은 원본 객체의 상태를 변경하지 않으면서, 복제된 객체의 불변식이 깨지지 않도록 주의 깊게 설계해야 합니다.
- 또한 `clone`을 사용하기보다는, 복사 생성자나 정적 팩터리 메서드 같은 다른 복사 방식을 고려하는 것이 더 안전할 수 있습니다.
<br>
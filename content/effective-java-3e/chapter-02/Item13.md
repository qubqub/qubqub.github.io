---
title: "[아이템 13] clone 재정의는 주의해서 진행하라"
date: 2020-06-27T15:04:12+09:00
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
실무에서 `Cloneable`을 구현한 클래스는 `clone`메서드를 `public`으로 제공하며, 사용자는 당연히 복제가 제대로 이뤄지리라 기대합니다. 하지만 `clone`메서드의 일반 규약은 허술한 부분이 있습니다.

다음은 `Object` 명세에서 가져온 설명입니다.

이 객체의 복사본을 생성해 반환합니다. {{< font family="Roboto" size="1" color-var="main-color" weight="600" text="복사" >}}의 정확한 뜻은 그 객체를 구현한 클래스에 따라 다를 수 있지만 일반적인 의도는 다음과 같습니다. 어떤 객체 `x`에 대해 다음 식은 `true`입니다.
- {{< font family="cascadiacode" size="1" color-var="main-color" weight="600" text="x.clone() != x" >}}
- {{< font family="cascadiacode" size="1" color-var="main-color" weight="600" text="x.clone.getClass() == x.getClass()" >}}
- {{< font family="cascadiacode" size="1" color-var="main-color" weight="600" text="x.clone().equals(x)" >}}
<br>
<br>

`clone`을 사용하는 방법은 굉장히 쉽습니다. `Cloneable`인터페이스를 구현하고 `super.clone`을 호출하면 됩니다. 이렇게 얻은 객체는 원본의 모든 필드와 동일한 값을 가지게 됩니다.
``` java
@Override
public PhoneNumber clone() {
    try{
        return (PhoneNumber) super.class();
    } catch (CloneNotSupportedException e) {
        throw new AssertionsError(); // 일어날 수 없는 예외다.
    }
}
```
<i class="user-fa-action-info-outline" aria-hidden="true"></i> _가변 상태를 참초하지 않는 클래스용 `clone` 메서드_
<br>

`Object`의 `clone`은 `Object`를 반환하지만 공변 반환 타입을 이용해서 `PhoneNumber`로 반환했습니다. 이 방식으로 사용하는 클라이언트는 형변환을 따로 해줄 필요가 없습니다.
   
간단했던 앞서의 구현이 클래스가 가변 객체를 참조하는 순간 문제점이 발생합니다.
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

`clone`메서드는 사실상 생성자와 같은 효과를 냅니다. 즉 `clone`은 원본 객체에 아무런 변화가 없는 동시에 복제된 객체의 {{< font family="Roboto" size="1" color-var="main-color" weight="600" text="불변식" >}}을 보장해야 합니다.
``` java
@Override
public PhoneNumber clone() {
    try{
        Stack result = (Stack) super.clone();
        result.elements = elements.clone();
        return result;
    } catch (CloneNotSupportedException e) {
        throw new AssertionsError();
    }
}
```
<i class="user-fa-action-info-outline" aria-hidden="true"></i> _가변 상태를 참조하는 클래스용 `clone` 메서드_


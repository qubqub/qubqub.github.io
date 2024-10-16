---
title: "[아이템 7] 다 쓴 객체 참조를 해제하라"
date: 2020-06-20T12:15:43+09:00
tags: ["Java", "Effective Java 3E"]
categories: ["Effective Java 3E"]
series: ["Effective Java 3E"]
chapter: ["Effective Java 3E Chapter 01"]
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
## 1. 메모리 누수가 발생하는 예시 코드

``` java
public class Stack {
    private Object[] elements;
    private int size = 0;
    private static final int DEFAULT_INITIAL_CAPACITY = 16;

    public Stack() {
        elements = new Object[DEFAULT_INITIAL_CAPACITY];
    }

    public void push(Object e) {
        ensureCapacity();
        elements[size++] = e;
    }

    public Object pop() {
        if (size == 0)
            throw new EmptyStackException();
        return elements[--size]; // 메모리 누수 발생 가능
    }

    private void ensureCapacity() {
        if (elements.length == size)
            elements = Arrays.copyOf(elements, 2 * size + 1);
    }
}
```
이 코드는 `Stack` 자료구조를 구현한 예입니다. 여기서 **메모리 누수**가 발생할 수 있는 부분은 `pop()` 메서드입니다. `pop()`은 스택에서 요소를 제거하긴 하지만, 배열의 해당 인덱스에 남아있는 객체 참조를 제거하지 않기 때문에 여전히 **메모리에 객체 참조**가 남아 있어 **가비지 컬렉션이 수행되지 않습니다**.
<br>

### 1.1 해결 방법
``` java
public Object pop() {
    if (size == 0) {
        throw new EmptyStackException();
    }

    Object value = this.elements[--size];
    this.elements[size] = null;
    return value;
}
```

이 코드에서는 `size`를 감소시키는 것뿐만 아니라, 배열에서 해당 인덱스의 **참조를** `null`**로 처리하여 메모리 누수를 방지**합니다. 이 방식으로 **더 이상 필요 없는 객체**에 대한 참조를 제거하여, **가비지 컬렉터가 해당 객체를 수거**할 수 있게 됩니다.
> 참고: 하지만 참조를 null로 처리하는 것은 예외적인 경우여야 하며, 메모리 관리 문제는 코드 설계 시 신중하게 다루어야 합니다. 불필요한 참조를 자동으로 관리하는 것이 더 좋은 방법일 수 있습니다.

<br>
<br>

## 2. 캐시에서의 메모리 누수
**캐시**도 메모리 누수를 일으키는 대표적인 원인 중 하나입니다. 캐시에 저장된 객체가 계속 참조되어 있으면 **가비지 컬렉션이 이루어지지 않기 때문**입니다.
<br>

### 2.1 해결 방법
- 외부에서 키를 참조하는 동안에만 엔트리가 살아 있어야 한다면, `WeakHashMap`을 사용하여 **약한 참조**를 활용할 수 있습니다. 약한 참조는 **참조하고 있는 객체가 다른 곳에서 참조되지 않을 때 가비지 컬렉션의 대상이 될 수 있습니다**.
- 캐시 엔트리의 **유효 기간**을 명확하게 정의하기 어렵다면, **시간이 지나면 엔트리의 가치를 떨어뜨리는 방식**을 사용하는 것이 좋습니다. 예를 들어, **LRU(Least Recently Used)** 알고리즘을 적용하여 오랫동안 사용되지 않은 엔트리부터 제거하는 방법이 있습니다.
<br>
<br>

## 3. 메모리 누수 탐지 방법
메모리 누수는 일반적으로 **겉으로 잘 드러나지 않으며**, 시스템에 **오랜 시간 잠복**할 수 있습니다. 이러한 누수를 발견하기 위해서는 **코드 리뷰**나 **힙 프로파일러**와 같은 **디버깅 도구**를 사용하는 것이 필요합니다.
<br>
<br>

## <i class="user-fa-action-done" aria-hidden="true"></i> 정리
메모리 누수는 프로그램 성능에 **치명적인 영향을 미칠 수 있는 문제**입니다. 이러한 문제는 **조기 발견**이 어렵기 때문에, **예방적 차원**에서 **철저한 코드 리뷰**와 **좋은 설계**가 필수적입니다. 특히 **불필요한 객체 참조**를 제거하는 습관을 들이고, 필요할 때 **약한 참조**나 **적절한 캐싱 기법**을 사용하는 것이 중요합니다.
<br>
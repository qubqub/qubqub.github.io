---
title: "[아이템 7] 다 쓴 객체 참조를 해제하라"
date: 2020-06-20T12:15:43+09:00
tags: ["Java", "Effective Java 3E"]
categories: ["Effective Java 3E"]
series: ["Effective Java 3E"]
chapter: ["Effective Java 3E Chapter 1"]
author: ["Kyungchul Shin"]
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
## <i class="user-fa-alert-warning" aria-hidden="true"></i> 메모리 누수가 일어나는 예제 코드

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
        return elements[--size]; // 주의
    }

    private void ensureCapacity() {
        if (elements.length == size)
            elements = Arrays.copyOf(elements, 2 * size + 1);
    }
}
```
스택에서 `pop`을 실행해도 메모리는 줄어들지 않습니다. 이유는 `size`는 감소시키지만 배열에서 레퍼런스를 여전히 갖고 있기 때문입니다.
<br>

다음과 같이 코드를 수정할 수 있습니다.
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

`size`를 감소시킬 뿐만 아니라 실제로 해당 참조를 `null`로 처리한 방법입니다.
<br>

하지만 객체 처리를 `null`로 처리하는 건 예외적인 경우여야 합니다. 다 쓴 참조를 해제하는 가장 좋은 방법은 다 쓴 참조를 담은 변수를 특정한 스코프 안에서만 사용하는 것입니다.
<br>

캐시 역시 메모리 누수를 일으키는 주범이기 때문에 캐시를 사용할 때도 메모리 누수에 유의해야 합니다. 
- 외부에서 키를 참조하는 동안에만 엔트리가 살아있는 캐시가 필요하다면 `WeakHashMap`을 사용합니다.
- 캐시를 만들 때 보통은 캐시 엔트리의 유효 기간을 정확히 정의하기 어렵기 때문에 시간이 지날 수록 엔트리의 가치를 떨어뜨리는 방식을 흔히 사용합니다.
<br>

## <i class="user-fa-av-new-releases" aria-hidden="true"></i> 정리
메모리 누수는 겉으로 잘 드러나지 않아 시스템에 수년간 잠복하는 사례도 있습니다. 이런 누수는 철저한 코드 리뷰나 힙 프로파일러 같은 디버깅 도구를 동원해야만 발견되기도 합니다. 그래서 이런 종류의 문제는 예방법을 익혀두는 것이 매우 중요합니다.
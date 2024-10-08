---
title: "[아이템 31] 한정적 와일드카드를 사용해 API 유연성을 높여라"
date: 2020-07-09T13:42:19+09:00
tags: ["Java", "Effective Java 3E"]
categories: ["Effective Java 3E"]
series: ["Effective Java 3E"]
chapter: ["Effective Java 3E Chapter 04"]
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
## [아이템 31] 한정적 와일드카드를 사용해 API 유연성을 높여라.

때론 불공변 방식보다 유연한 무언가가 필요할 때가 있습니다.

[`아이템29`](/posts/effective-java-3e/chapter-04/item29/)의 Stack 클래스를 떠올려보면

``` java
public class Stack<T> {
    public Stack();
    public void push (E e);
    public E pop();
    public boolean isEmpty();
}
```

여기서 일련의 원소를 스택에 넣는 메서드를 추가한다고 하면

``` java
public void pushAll(Iterable<E> src) {
    for (E e : src) {
        push(e);
    }
}
```

Iterable src의 원소 타입의 스택의 원소 타입과 일치하면 잘 작동합니다. 하지만 `Stack<Number>`로 선언한 후 `pushAll(intVal)`을(`Iteger` 타입) 호출하면 오류가 뜹니다. 매개변수 타입이 불공변이기 떄문입니다.

이러한 상황에서는 한정된 와일드카드(unbounded wildcard)를 이용해서 해결할 수 있습니다. `pushAll`의 입력 매개변수 타입은 '`E`의 `iterable`'이 아니라 '`E`의 `하위타입 Iterable`'이어야 하며, 와일드 카드 `Iterable<? extends E>`가 정확히 이런뜻입니다.

``` java
public void pushAll(Iterable<? extends E> src) {
    for (E e : src) {
        push(e);
    }
}
```

위와 같이 수정할 수 있습니다. 이번에는 `popAll`메서드를 와일드카드 타입을 사용하지 않고 작성해 보겠습니다.

``` java
// 와일드카드 타입을 사용하지 않은 메서드 - 결함이 있습니다.
public void popAll(Collection<E> dst) {
    while (!isEmpty()) {
        dst.add(pop());
    }
}
```

``` java
Stack<Number> numberStack = new Stack<>();
Collection<Object> objects = ...;
numberStack.popAll(objects);
```

컴파일 하면 "`Collection<Object>`는 `Collection<Nummber>`의 하위 타입이 아니다" 라는 오류가 발생합니다. 이번에는 반대로 '`E`의 `Collection`' 이 아니라 '`E`의 `상위타입 Collection`' 이어야 합니다.

``` java
// 와을드카드 타입을 사용하지 않은 메서드 - 결함이 있습니다.
public void popAll(Collection<E super E> dst) {
    while (!isEmpty()) {
        dst.add(pop());
    }
}
```

위와 같이 수정할 수 있습니다. 메세지는 분명합니다. 유연성을 극대화하려면 원소의 생산자나 소비자용 매개변수에 와일드 카드를 사용합시다. 한편,입력 매개변수가 생상자와 소비자 역할을 동시에 한다면 와일드카드 타입을 써도 좋을 게 없습니다. 타입을 정확히 지정해야 하는 상황으로, 이때는 와일드카드 타입을 쓰지말아야합니다.

다음 공식을 외워두면 어떤 와일드 카드 타입을 써야 하는지 도움이 될 것입니다.
> PECS: producer-extends, consumer-super

즉 매개변수화 타입 `T`가 생성자라면 `<? extends T>`를 사용하고, `소비자`라면 `<?super T>`를 사용합시다.

**클래스 사용자가 와일드카드 타입을 신경 써야 한다면 그 API에 무슨 문제가 있을 가능성이 큽니다.**

``` java
// 아이템30 에서 사용했던 코드
public static <E extends Comparable<E>> E max(List<E> c);
```

[`아이템30`](/posts/effective-java-3e/chapter-04/item30/)

위 코드를 와일드카드 타입을 사용해 다듬은 모습입니다.

``` java
// 아이템30 에서 사용했던 코드
public static <E extends Comparable<? super E>> E max(List<? extends E> c);
```

위 코드는 `PECS` 공식을 두 번 적용했습니다. 입력 매개변수에서는 `E` 인스턴스를 생산하므로 원래의 `List<E>`를 `List<? extends E>`로 수정했습니다.

원래 선언에서는 `E`가 `Comparale<E>`를 확장한다고 정의했는데, 이때 `Comparable<E>`는 `E`인스턴스를 소비합니다. (그리고 선후 관계를 뜻하는 정수를 생산합니다) 그래서 매개변수화 타입 `Comparable<E>`는 `E` 한정적 와일드카드 타입 `Comparable<? super E>`로 대체 했습니다.
`Comparable`은 언제나 소비자이므로, 일반적으로 `Comparable`, `Comparable<E>`보다는 `Comparable<? super E>`를 사용하는 편이 낫습니다.
`Comparator`도 마찬가지입니다. 일반적으로 `Comparator<E>`보다는 `Comparator<? super E>`를 사용하는 편이 낫습니다.

와일드카드와 관련해 논의해야 할 주제가 더 있습니다. 타입 매개변수와 와일드카드에 공통되는 부분이 있어서, 메서드를 정의할 때 둘 중 어느것을 사용해도 괜찮을 때가 많습니다.

``` java
public static <E> void swap(List<E> list, int i, int j);
public static swap(List<?> list, int i, int j);
```

public API라면 간단한 두 번째가 낫습니다. 어떤 리스트든 이 메서드에 넘기면 명시한 인덱스의 원소들을 교환해 줄 것입니다. 신경 써야 할 타입 매개변수도 없습니다.

기본 규칙은 이렇습니다. **메서드에 선언에 타입 매개변수가 한 번만 나오면 와일드카드로 대체하라.** 이때 비한정적 타입 매개변수라면 비한정적 와일드카드로 바꾸고, 한정적 타입 매개변수라면 한정적 와일드카드로 바꾸면 됩니다.

하지만 두 번째 `swap` 선언에는 문제가 하나 있는데, 다음과 같이 직관적으로 구현한 코드가 컴파일 되지 않는다는 것입니다.

``` java
public static swap(List<?> list, int i, int j) {
    list.set(i, list.set(j, list.get(i)));
}
// 방금 꺼낸 원소를 리스트에 다시 넣을 수 없습니다.
```

원인 리스트의 타입이 `List<?>`인데, `List<?>`에는 `null` 외에는 어떤 값도 넣을 수 없기 때문입니다.

``` java
public static swap(List<?> list, int i, int j) {
    swapHelper(list, i, j);
}

// 와일드카드 타입을 실제 타입으로 바꿔주는 private 도우미 메서드
public static <E> void swapHelper(List<E> list, int i, int j) {
    list.set(i, list.set(j, list.get(i)));
}
```

`swapHelper` 메서드는 리스트가 `List<E>`임을 알고 있습니다. 즉, 이 리스트에서 꺼낸 값은 항상 `E`이고, `E` 타입의 값이라면 이 리스트에 넣어도 안전함을 알고 있습니다.

다소 복잡하지만 덕분에 외부에서는 와일드카드 기반의 멋진 선언을 유지할 수 있습니다. 즉 `swap` 메서드를 호출 하는 클라이언트는 복잡힌 `swapHelper`의 존재를 모른 채 그 혜택을 누리는 것입니다.
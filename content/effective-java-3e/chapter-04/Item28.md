---
title: "[아이템 28] 배열보다는 리스트를 사용하라"
date: 2020-07-08T14:21:51+09:00
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
## [아이템 28] 배열보다는 리스트를 사용하라.

### 배열과 제네릭 타입의 차이
첫번째 차이점. 배열은 공변 입니다. 어려워 보이는 단어지만 뜻은 간단합니다. `Sub`가 `Super`의 하위 타입이라면 배열 `Sub[]`는 배열 `Super[]`의 하위 타입이 됩니다.
반면, 제네릭은 불공변입니다. 즉 서로 다른 타입 `Type1`과 `Type2`가 있을 때, `List<Type1>`은 `List<Type2>`의 하위 타입도 아니고 상위 타입도 아닙니다.

이것만 보면 제네릭에 문제가 있다고 생각할 수 있지만, 사실 문제가 있는 건 배열 쪽입니다. 다음은 문법상 허용되는 코드입니다.

``` java
// 런타임 에러
Object[] objectArray = new Long[1];
objectArray[0] = "타입이 달라 넣을 수 없다."; // 런타임시 ArrayStoreException을 던진다
```

``` java
// 컴파일 에러
List<Object> ol = new ArrayList<Long>(); // 호환되지 않는 타입
```

어느 쪽이든 Long용 저장소에 String을 넣을 수 없습니다. 다만 배열 같은 경우 런타임에야 알 수 있고, 리스트는 컴파일 시에 알아챌 수 있어서 더 좋습니다.

두번째 차이점. 배열은 실체화(`reify`)됩니다. 무슨 뜻이냐면 배열은 런타임에도 자신이 담기로 한 원소의 타입을 인지하고 확인합니다. 그래서 위 코드에서 `Long`배열에 `String`을 넣으려 하면
`ArrayStoreException`이 발생합니다. 반면 제네릭은 타입 정보가 런타임에는 소거(`erasure`)됩니다.
원소 타입을 컴파일타임에만 검사하며 런타임에는 알 수 조차도 없다는 뜻입니다. 소거는 제네릭 지원되기 전의 레거시 코드와 제네릭 타입을 함께 사용할 수 있게 해주는 메커니즘으로, `JAVA 5`가 제네릭으로 순조롭게 전환될 수 있도록 해주었습니다.

이상의 주요 차이로 인해 배열과 제네릭은 잘 어울러지지 못합니다. 예컨대 배열은 제네릭 타입, 매개변수화 타입, 타입 매개변수로 사용할 수 없습니다. 즉 코드를 `new List<E>[]`, `new List<String>[]`, `new E[]` 식으로 작성하면 컴파일할 때 제네릭 배열 생성 오류를 일으킵니다.


### 제네릭 배열을 만들지 못하게 막은 이유
타입이 안전하지 않기 때문입니다. 이를 허용하면 컴파일러가 자동 생성한 형변환 코드에서 런타임에 `ClassCaseException`이 발생할 수 있습니다. 런타임에 `ClassCaseException`이 발생하는 일을 막아주겠다는 제네릭 타입 시스템의 취지에 어긋나는 것입니다.

``` java
// 컴파일 되지 않는다.
List<String>[] stingLists = new List<String>[1]; // (1)
List<Integer> intList = List.of(42);             // (2)
Object[] objects = stingLists;                   // (3)
Object[0] = intList;                             // (4)
String s = stingLists[0].get(0);                 // (5)
```

제네릭 배열을 생성하는 `(1)`이 허용된다고 가정해봅시다. `(2)`는 원소 하나인 `List<Integer>`를 생성합니다. `(3)`은 `(1)`에서 생성한 `List<String>`의 배열을 `Object` 배열에 할당합니다.
배열은 공변이니 아무 문제가 없습니다. `(4)`는 `(2)`에서 생성한 `List<Integer>`의 인스턴스를 `Object` 배열의 첫 원소로 저장합니다. 제네릭은 소거 방식으로 구현되어서 이 역시 성공합니다.
즉, 런타임에는 `List<Integer>` 소거 방식으로 이 역시 소거됩니다. 즉 런타임에는 `List<Integer>`인스턴스의 타입은 단순히 `List`가 되고, `List<Integer>[]` 인스턴스의 타입은 `List[]`가 됩니다. 따라서 `(4)`에서도 `ArrayStoreException`을 발생시키지 않습니다.

문제는 `List<String>`인스턴스만 담겠다고 선언한 `stingLists` 배열에는 지금 `List<Inrteger>` 인스턴스가 저장돼 있습니다. 결국 `(5)`에서 `ClassCaseExceptionn`이 발생하게 됩니다.
이런 일을 방지하려면 (제네릭 배열이 생성되지 않도록) `(1)`에서 컴파일 오류를 발생해야 합니다.

`E`, `List<E>`, `List<String>` 같은 타입을 실체화 불가 타입(`non-reifiable type`)이라 합니다. 쉽게 말하자면, 실체화되지 않아서 런타임에는 컴파일타임보다 타입 정보를 적게 가지는 타입입니다. 소거 메커니즘 때문에 매개변수화 타입 가운데 실체화될 수 있는  타입은 `List<?>`와 `Map<?, ?>`같은 비한정적 와일드카드 타입뿐입니다. 배열을 비한정적 와일드카드 타입으로 만들 수는 있지만, 유용하게 쓰일 일은 별로 없습니다.


## 정리
- 배열은 공변이고 실체화가 되지만 제네릭은 불공변이고 타입 정보가 소거됩니다.
- 배열은 런타임에는 타입 안전하지만 컴파일타임에는 그렇지 않습니다.


---
title: "[아이템 21] 인터페이스는 구현하는 쪽을 생각해 설계하라"
date: 2020-07-04T11:14:32+09:00
tags: ["Java", "Effective Java 3E"]
categories: ["Effective Java 3E"]
series: ["Effective Java 3E"]
chapter: ["Effective Java 3E Chapter 03"]
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
`JAVA 8`이전에는 기존 구현체를 깨뜨리지 않고 인터페이스에 새로운 메서드를 추가할 방법이 없었습니다. `JAVA 8`부터는 디폴트 메서드를 제공해서 이러한 문제점들을 해결해줬지만 위험이 완전히 사라진 것은 아닙니다.

`JAVA 8`이전까지는 인터페이스에 새로운 메소드가 추가될리 없다는 암묵적인 가정으로 작성되었습니다.

즉 디폴트 메서드는 구현한 클래스에 동의 없이 무작정 삽입되었습니다. `JAVA 8`에서는 핵심 컬렉션 인터페이스들에 다수의 디폴트 메서드가 추가되었습니다. 주로 `람다`를 활용하기 위해서입니다.
자바 라이브러리의 디폴트 메서드는 코드 품질이 높고 범용적이라 대부분 잘 작동하지만, **생각할 수 있는 모든 상황에서 불변식을 해치지 않는 디폴트 메서드를 작성하기란 어려운 법입니다.**
<br>

``` java
default boolean removeIf(Predicate<? super E> filter) {
    Objects.requireNonNull(filter);
    boolean removed = false;
    final Iterator<E> each = iterator();
    while (each.hasNext()) {
        if (filter.test(each.next())) {
            each.remove();
            removed = true;
        }
    }
    return removed;
}
```

`JAVA 8`의 `Collection` 인터페이스에 추가된 `removeIf` 메서드입니다.

이코드보다 더 범용적으로 구현하기도 어렵겠지만, 그렇다고 해서 현존하는 모든 `Collection` 구현체와 잘 어우러지는 것은 아닙니다.

대표적인 예가 `org.apache.commons.collections4.collection.SynchronizedCollection`입니다. 이 클래스는 `java.util.Collections.synchronizedCollction` 정적 팩터리 메서드가 반환하는 클래스와 비슷합니다. 아파치 버전은 클라이언트가 제공한 객체로 락을 거는 능력을 추가로 제공합니다. 즉, 모든 메서드에 주어진 락 객체로 동기화한 후 내부 컬렉션 객체에 기능을 위임하는 래퍼 클래스입니다.

아파치의 `SynchronizedCollection`는 `removieIf`메서드를 재정의하고 있지 않습니다. 이 책이 쓰여진 시점에는 `removeIf`를 재정의하고있지 않습니다. 이 클래스는 `removeIf`를 재정의 하고있지 않습니다. 그래서 이 클래스를 `JAVA 8`과 함께 사용하면 모든 메서드 호출을 알아서 동기화해주지 못합니다.

자바 플랫폼 라이브러리에서도 이런 문제를 예방하기 위해 조치를 취했습니다. 예를 들어 구현한 인터페이스의 디폴트 메서드를 재정의하고, 다른 메서드에서는 디폴트 메서드를 호출하기 전에 필요한 작업을 수행하도록 했습니다.

핵심은 인터페이스를 설계할 때는 세심한 주의를 기울여야 합니다. 디폴트 메서드로 기존 인터페이스에 새로운 메서드를 추가하면 커다란 위험도 딸려옵니다. 새로운 인터페이스라면 릴리즈 전에 반드시 테스트를 거쳐야 합니다.
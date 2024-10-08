---
title: "[아이템 20] 추상 클래스보다는 인터페이스를 우선하라"
date: 2020-07-03T14:21:15+09:00
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
자바가 제공하는 다중 구현 메커니즘은 인터페이스와 추상 클래스가 있습니다. `JAVA 8` 부터는 인터페이스에서 `defualt moethod`를 제공할 수 있게 되어서 두 메커니즘 모두 인스턴스 메서드를 구현 형태로 제공할 수 있습니다.

추상 클래스와 인터페이스의 큰 차이점은 추상 클래스의 정의한 타입을 구현 클래스는 반드시 서브클래스가 된다는 점입니다. 자바에서는 단일 상속만 지원하기 때문에 이런 제약은 새로운 타입을 정의하는데 커다란 제약이 됩니다.

반면 인터페이스의 준수 사항을 잘 지키고 모든 메서드를 구현한 클래스는 어느 계층에 있든 인터페이스를 구현할 수 있습니다. 기존 클래스에도 손쉽게 새로운 인터페이스를 구현해 넣을 수 있습니다. 그저 인터페이스가 요구하는 메서드를 (아직 없다면) 추가하고, 클래스 선언에 `implements` 구문을 추가하면 됩니다.

반면 일반적으로 기존 클래스에 새로운 추상 클래스를 끼워넣는 일은 매우 간단합니다. 만약 두 클래스로 하나의 추상 클래스를 상속하길 원한다면, 그 추상 클래스는 계층구조상 두 클래스의 공통 조상이어야합니다.
이러한 방식은 클래스 계층구조에 커다란 혼란을 야기할 수 있습니다. 적절하지 않은 상황에서도 강제로 새로 추가된 추상 클래스의 모든 자손이 이를 상속하게 되는 것입니다.

인터페이스는 `믹스인`(mixin) 정의에 안성맞춤입니다. `믹스인`이란 클래스가 구현할 수 있는 타입으로, `믹스인`을 구현한 클래스에 원래의 '주된 타입'외에도 특정 선택적 행위를 제공한다고 선언하는 효과를 줍니다.

예컨대 `Comparable`은 자신을 구현한 클래스의 인스턴스들끼리는 순서를 정할 수 있다고 선언하는 `믹스인` 인터페이스입니다. 이처럼 대상 타입의 주된 기능에 선택적 기능을 '혼합(mixed in)'한다고 해서 `믹스인`이라고 불립니다.

반면 추상 클래스로는 `믹스인`을 정의할 수 없습니다. 기존 클래스에 덧씌울 수 없기 때문입니다. 클래스는 두 부모를 섬길 수 없고, 클래스 계층구조에는 `믹스인`을 삽입하기엔 합리적인 위치가 없기 때문입니다.
<br>
<br>

## 인터페이스는 계층구조가 없는 타입 프레임워크 만들 수 있습니다.

``` java
public interface Singer {
    AudioClip sing(Song s);
}

public interface Songwriter {
    Song compose(int chartPosition);
}
```

현실에는 계층을 엄격히 구분하기 어려운 개념이 있습니다. 위 코드처럼 타입을 인터페이스로 정의하면 가수 클래스가 `Singer`와 `SongWriter` **모두**를 구현해도 전혀 문제가 되지 않습니다.
<br>

``` java
public interface SingerSongWriter extends Singer, Songwriter {
    AudioClip strum();
}
```
이런식으로 `Singer`와 `Songwriter`모두를 확장하고 새로운 메서드까지 추가한 제3의 인터페이스도 정의할 수 있습니다. 같은 구조를 클래스로 만드려면 속성이 n개라면 지원해야 할 조합의 수는 2<sup>n</sup>개가 됩니다 이러한 현상을 **조합 폭발**(combinatorial explosion)이라고 부릅니다.

인터페이스의 메서드 중 구현 방법이 명백한 것이 있다면, 그 구현을 디폴트 메서드로 제공하는 것도 방법입니다. 하지만 디폴트 메서드에도 제약이 있습니다. 많은 인터페이스가 `equals`와 `hashCode`같은 `Object`의 메서드를 정의하고 있지만, 이들은 디폴트 메서드로는 제공해서는 안 됩니다.

또한 인터페이스는 인스턴스 필드를 가질 수 없고 `public`이 아닌 정적멤버도 가질 수 없습니다. 마지막으로 여러분들이 만들지 않은 인터페이스에는 디폴트 메서드를 추가할 수 없습니다.
<br>
<br>

## <i class="user-fa-av-new-releases" aria-hidden="true"></i> 정리

- 일반적으로 다중 구현용 타입으로는 인터페이스가 적합합니다.
- 복잡한 인터페이스라면 구현하는 수고를 덜어주는 골격 구현을 함께 제공하는 방법도 고려하는걸 추천합니다.
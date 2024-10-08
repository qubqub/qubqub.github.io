---
title: "[아이템 22] 인터페이스는 타입을 정의하는 용도로만 사용하라"
date: 2020-07-04T13:21:14+09:00
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
인터페이스는 자신을 구현한 클래스의 인스턴스를 참조할 수 있는 타입 역할을 합니다. 그러므로 인터페이스를 구현한 클래스는 클라이언트에게 자신의 인스턴스로 무엇을 할 수 있는지 말해주는 것입니다. 인터페이스를 다른 용도로 사용하는 것은 부적절합니다.

이 지침에 맞지 않는 예로 소위 상수 인터페이스라는 것이 있습니다. 상수 인터페이스는 메서드가 없이, 상수를 뜻하는 `static final` 필드로만 가득 찬 인터페이스를 뜻합니다.
<br>

``` java
public interface PhysicalConstants {
    static final double AVOGADROS_NUMBER =  6.022_140_857e34;

    static final double BOLTZMANN_CONSTANT = 1.380_648_52e-23;

    static final double ELECTRON_MASS = 9.109_383_56e-31;
}
```

상수 인터페이스 안티패턴은 인터페이스를 잘못 사용한 예입니다. 클래스 내부에서 사용하는 상수는 외부 인터페이스가 아니라 내부 구현에 해당합니다. 따라서 상수 인터페이스를 구현하는 것은 이 내부 구현을 클래스의 API로 노출하는 행위입니다. 클래스가 어떤 상수 인터페이스를 사용하든 사용자에게는 아무런 의미가 없습니다. 오히려 혼란을 줄 수가 있으며, 더 심각하게는 클라이언트 코드가 내부 구현에 해당하는 이 상수들에게 종속되게 합니다.

그래서 다음 릴리즈에서 이 상수들을 더는 쓰지 않게 되더라도 바이너리 호환성을 위해 여전히 상수 인터페이스를 구현하고 있어야 합니다. `final`이 아닌 클래스가 상수 인터페이스를 구현한다면 모든 하위 클래스의 네임스페이스가 그 인터페이스가 정의한 상수들로 오염되어 버립니다.

`java.io.ObjectStreamConstants` 등, 자바 플랫폼 라이브러리에도 상수 인터페이스가 몇 개 있으나, 인터페이스를 잘못 활용한 예이니 따라 해서는 안 됩니다. 상수를 공개할 목적이라면 더 합당한 방법들이 있습니다.

특정 클래스나 인터페이스와 강하게 연관된 상수라면 그 클래스나 인터페이스 자체에 추가해야합니다. 대표적으로 `Integer`와 `Double`에 선언된 `MIN_VALUE`와 `MAX_VALUE` 상수가 이런 예입니다. 열거 타입으로 나타내기 적합한 상수라면 열거 타입으로 만들면 되고 그것도 아니라면 인스턴스화 할 수 없는 유틸클래스에 담아 공개하면 됩니다.

``` java
// 유틸리티 클래스
public class PhysicalConstants {
    private PhysicalConstants()

    static final double AVOGADROS_NUMBER =  6.022_140_857e34;

    ... 생략
}
```
<br>
<br>

## <i class="user-fa-av-new-releases" aria-hidden="true"></i> 정리

- 인터페이스는 타입을 정의하는 용도로만 사용해야 합니다, 실수 공개용 수단으로 사용하지 맙시다.
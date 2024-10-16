---
title: "[아이템 3] private 생성자나 열거 타입으로 싱글턴임을 보증하라"
date: 2020-06-18T19:09:20+09:00
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
{{< font color-var="main-color" weight="600" text="싱글턴" >}}(Singleton) 패턴은 클래스의 인스턴스를 오직 하나만 생성하여 공유하는 방식입니다. 객체를 호출할 때마다 새로운 인스턴스를 만들지 않고, 동일한 인스턴스를 반환하는 방식이므로 메모리 낭비를 방지하고, 동작의 일관성을 유지할 수 있습니다.

싱글턴을 구현하는 주요 방식은 다음과 같습니다.
<br>

## 📌 public static final 필드를 이용한 방식
``` java
public class Elvis {

    public static final Elvis INSTANCE = new Elvis(); // 유일한 인스턴스

    private void Elvis() { ... } // private 생성자

    private void leaveTheBuilding() { ... }

}
```
### 장점
1. **싱글턴임이 명확**: 클래스 API에서 싱글턴임이 명확하게 드러납니다. `Elvis.INSTANCE`로 해당 클래스가 싱글턴임을 쉽게 파악할 수 있습니다.
2. **간결함**: 코드가 매우 간결합니다. 별도의 메서드 없이 인스턴스를 호출할 수 있어 간편합니다.
### 단점
- **리플렉션을 통한 침해 가능성**: 리플렉션을 사용하면 `private` 생성자를 우회할 수 있어, 새로운 인스턴스를 생성할 수 있습니다. 이를 막기 위해서는 **생성자에서 예외를 던지도록 수정**해야 합니다.
``` java
private Elvis() {
    if (INSTANCE != null) {
        throw new IllegalStateException("Instance already exists");
    }
}
```
<br>
<br>

## 📌 정적 팩토리 메서드를 사용하는 방식
``` java
public class Elvis {

    private static final Elvis INSTANCE = new Elvis(); // 유일한 인스턴스

    private void Elvis() { ... } // private 생성자

    public static Elvis getInstance() { return INSTANCE; } // 정적 팩토리 메서드

    private void leaveTheBuilding() { ... }

}
```
### 장점
1. **유연성**: API를 바꾸지 않고 싱글턴에서 벗어날 수 있습니다. `getInstance()` 메서드의 반환 타입을 조정하면, 다중 인스턴스를 지원하는 클래스로 변경할 수 있습니다.
2. **서브클래싱과 인터페이스**: 정적 팩토리 메서드는 **Supplier 인터페이스**에 대응할 수 있어, 더 유연하게 활용할 수 있습니다.
3. **다중 인스턴스 지원**: 정적 팩토리 메서드를 통해 특정 조건에 따라 **스레드별**로 다른 인스턴스를 반환할 수도 있습니다.
### 단점
- 여전히 **리플렉션 문제**가 존재합니다.
<br>
<br>

## <i class="user-fa-action-done" aria-hidden="true"></i> 직렬화 문제 해결
앞에서 설명한 두 방식(정적 필드와 정적 팩토리 메서드)은 직렬화할 때마다 새로운 인스턴스가 생성될 수 있습니다. 이를 막기 위해서는 readResolve() 메서드를 구현하여, 역직렬화(Deserialization) 과정에서 동일한 인스턴스를 반환하도록 해야 합니다.
``` java
import java.io.Serializable;

public class Elvis implements Serializable {

    ...

    private Object readResolve() {
        returm INSTANCE;
    }
}
```
<br>
<br>

## 📌 열거 타입의 방식의 싱글턴
``` java
public enum Elvis {
    INSTANCE; // 유일한 인스턴스

    public void leaveTheBuilding() { ... }
}
```
### 장점
1. **리플렉션과 직렬화 공격에 안전**: 열거 타입은 **리플렉션을 통한 침해**와 **직렬화에 의한 새로운 인스턴스 생성**을 방지합니다.
2. **간결함**: 코드가 매우 간단하고 안전하며, 자바에서 기본적으로 제공하는 기능을 활용하기 때문에 확실한 싱글턴 보장이 가능합니다.

**대부분의 경우** 열거 타입을 사용한 싱글턴이 가장 적합한 방법입니다. 자바의 `Enum`은 **직렬화와 리플렉션 공격에 대한 보호 기능**을 기본적으로 제공하며, **인스턴스의 유일성**을 강력하게 보장합니다.

### 단점
- **다른 클래스를 상속할 수 없음**: 열거 타입은 상속이 불가능하므로, 싱글턴 클래스가 **다른 클래스를 상속해야 하는 경우**에는 사용할 수 없습니다. (열거 타입이 다른 인터페이스를 구현하도록 선언할 수는 있습니다)
<br>
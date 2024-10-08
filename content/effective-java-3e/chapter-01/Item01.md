---
title: "[아이템 1] 생성자 대신 정적 팩토리 메서드를 고려하라"
date: 2020-06-18T15:49:20+09:00
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
showReadingTime: true
showPostNavLinks: true
showCodeCopyButtons: true
ShowBreadCrumbs: true
showContentProgressbar: true
# cover:
#   hidden: true
#   image: "/logo/logo-effective-java-3e.png"
---
## 일반적으로 사용하는 public 생성자 대신, 별도로 정적 팩토리 메서드를 이용할 수 있다.
<br>

객체 생성 시 public 생성자 대신 정적 팩토리 메서드(static factory method) 를 사용하는 것을 고려할 수 있습니다. 이를 통해 다양한 이점을 얻을 수 있는데, Java에서 자주 사용되는 패턴 중 하나입니다.

``` java
public static Boolean valueOf(boolean b) {
    return b ? Boolean.TRUE : Booelan.FALSE;
}
```
_Boolean 클래스에서 발췌한 예제 코드_
<br>

## <i class="user-fa-action-done" aria-hidden="true"></i> 장점

### {{< font color-var="main-color" text="첫" >}} 번째, 이름을 가질 수 있다.

정적 팩토리 메서드는 이름을 가질 수 있어, 반환될 객체의 의미를 쉽게 설명할 수 있습니다. 반면 생성자는 이름을 가질 수 없고, 오직 클래스 이름을 따르며, 매개변수만으로 그 의미를 파악해야 합니다.

예를 들어, `Boolean.valueOf(boolean)` 메서드는 `true` 또는 `false` 값을 반환하므로 그 의미를 직관적으로 알 수 있습니다. 반면 생성자는 이름이 고정적이므로, 다양한 의미를 명확히 표현하기 어렵습니다.
<br>
<br>

### {{< font color-var="main-color" text="두" >}} 번째, 호출될 때마다 인스턴스를 새로 생성하지 않아도 된다.

정적 팩토리 메서드를 통해 동일한 인스턴스를 재사용할 수 있어, 객체 생성 비용을 줄일 수 있습니다. 특히, 불변 클래스(immutable class) 의 경우 객체를 캐싱하여 성능을 크게 향상시킬 수 있습니다.

예: `Boolean.valueOf(boolean)` 메서드는 이미 만들어진 `Boolean.TRUE` 또는 `Boolean.FALSE`를 반환합니다. 이처럼 동일한 객체를 여러 번 생성할 필요가 없기 때문에 메모리 사용이 줄어듭니다.
<br>
<br>

### {{< font color-var="main-color" text="세" >}} 번째, 반환 타입의 하위 타입 객체를 반환할 수 있는 능력이 있다.

정적 팩토리 메서드는 반환할 객체의 클래스를 유연하게 선택할 수 있습니다. 상위 타입을 반환하면서도, 필요에 따라 하위 타입의 객체를 반환할 수 있어 API 설계 시 유연함을 더해줍니다.

자바 컬렉션 프레임워크는 핵심 인터페이스들에 수정 불가나 동기화 등의 기능을 덧붙인 총 45개의 유틸리티 구현체를 제공하는데, 이 구현체는 대부분 단 하나의 인스턴스화 불가 클래스인`java.util.Collections`에서 정적 팩토리 메서드를 통해 얻도록 했습니다.

컬렉션 프레임워크는 이 45개의 클래스를 공개하지 않기 때문에 API의 외견을 훨씬 작게 만들 수 있었습니다.

여기서 API의 크기는 프로그래머가 API를 사용하기 위해 익혀야 하는 개념의 수와 난이도를 의미합니다. 클라이언트가 구현체가 아닌 인터페이스를 다루게 되므로 역할과 구현을 나눠 결합도를 낮출 수 있습니다.
<br>
<br>

### {{< font color-var="main-color" text="네" >}} 번째, 입력 매개변수에 따라 매번 다른 클래스의 객체를 반환할 수 있다.

정적 팩토리 메서드는 입력 매개변수에 따라 다른 클래스의 객체를 반환할 수 있습니다. 이 기능을 이용해, 같은 인터페이스를 구현한 여러 하위 클래스를 동적으로 반환할 수 있습니다.
<br>
```java
public static <E extends Enum<E>> EnumSet<E> noneOf(Class<E> elementType) {
    Enum<?>[] universe = getUniverse(elementType);
    if (universe == null)
        throw new ClassCastException(elementType + " not an enum");

    if (universe.length <= 64)
        return new RegularEnumSet<>(elementType, universe);
    else
        return new JumboEnumSet<>(elementType, universe);
}
```

예를 들어, EnumSet 클래스의 `noneOf` 메서드는 입력값에 따라 `RegularEnumSet` 또는 `JumboEnumSet` 인스턴스를 반환합니다. 이렇게 매개변수에 따라 유연하게 다른 클래스를 반환하는 기능은 생성자와 비교해 강력한 이점입니다.
<br>
<br>

### {{< font color-var="main-color" text="다섯" >}} 번째, 정적 팩토리 메서드를 작성할 때 반환할 객체의 클래스가 미리 존재하지 않아도 된다.
정적 팩토리 메서드는 서비스 제공자 프레임워크 와 같은 구조에서 특히 유용합니다. 프레임워크는 특정 조건에 따라 구현체를 선택하고, 이를 클라이언트에게 제공할 수 있습니다.

예: `JDBC`는 클라이언트가 특정 구현체를 알 필요 없이 인터페이스만으로 다양한 데이터베이스에 접근할 수 있게 해줍니다. 이처럼 정적 팩토리 메서드는 나중에 구현될 클래스를 미리 정의할 필요가 없다는 유연성을 제공합니다.

서비스 제공자 프레임워크는 3개의 핵심 컴포넌트로 이루어집니다. (제공자는 서비스의 구현체를 의미합니다)
- 서비스 인터페이스 `{{< font color-var="main-color" weight="600" text="구현체의 동작을 정의" >}}`
- 제공자 등록 API  `{{< font color-var="main-color" weight="600" text="제공자가 구현체를 등록할 때 사용" >}}`
- 서비스 접근 API  `{{< font color-var="main-color" weight="600" text="클라이언트가 서비스의 인스터스를 얻을 때 사용" >}}`

서비스 접근 API를 사용할 때 원하는 구현체의 조건을 명시할 수 있습니다. 조건을 명시하지 않으면 기본 구현체를 반환하거나 지원하는 구현체들을 하나씩 돌아가면서 반환합니다.
<br>
<br>

## <i class="user-fa-action-done" aria-hidden="true"></i> 단점

### {{< font color-var="main-color" text="첫" >}} 번째, 상속을 위해서는 public 또는 protected 생성자가 필요하다.
정적 팩토리 메서드만 제공할 경우 하위 클래스를 만들 수 없습니다. 따라서 상속을 사용하려면 여전히 `public` 또는 `protected` 생성자가 필요합니다. 하지만, 이는 **상속(is-a)** 대신 **컴포지션(has-a)** 을 권장하고, 불변 타입을 만들도록 유도하는 측면에서 오히려 장점일 수 있습니다.
<br>
<br>

### {{< font color-var="main-color" text="두" >}} 번째, 정적 팩토리 메서드는 찾기 어렵다.
정적 팩토리 메서드는 생성자처럼 API 문서에 명확히 드러나지 않기 때문에, 사용자가 해당 클래스를 인스턴스화하는 방법을 알아내기 어렵습니다. 따라서 API 문서에서 이를 명확하게 기술하고, 메서드 이름을 일관성 있게 지어야 합니다. 널리 알려진 명명 규칙을 따르는 것도 중요합니다.
<br>
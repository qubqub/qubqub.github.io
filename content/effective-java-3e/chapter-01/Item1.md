---
title: "[아이템 1] 생성자 대신 정적 팩토리 메서드를 고려하라"
date: 2020-06-18T15:49:20+09:00
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
showReadingTime: true
showPostNavLinks: true
showCodeCopyButtons: true
ShowBreadCrumbs: true
showContentProgressbar: true
# cover:
#   hidden: true
#   image: "/logo/logo-effective-java-3e.png"
---
클라이언트가 클래스의 인스턴스를 얻는 전통적인 수단은 `public` 생성자다. 하지만 모든 프로그래머가 꼭 알아둬야 할 기법이 하나 더 있다. 클래스는 생성자와 별도로 정적 팩터리 메서드`static factory method`를 제공할 수 있다. 그 클래스의 인스턴스를 반환하는 단순한 정적 메서드 말이다. 다음 코드는 `boolean` 기본 타입의 박싱 클래스`boxed class`인 `Boolean`에서 발췌한 간단한 예다. 이 메서드는 기본 타입인 `boolean` 값을 받아 `Boolean` 객체 참조로 변환해준다.

``` java
public static Boolean valueOf(boolean b) {
    return b ? Boolean.TRUE : Booelan.FALSE;
}
```
_Boolean 클래스에서 발췌한 예제 코드_
<br>
- - -
<i class="user-fa-action-info-outline" aria-hidden="true"></i> 지금 얘기하는 정적 팩터리 메서드는 _**팩토리 메서드 패턴[Gamma95] [^1]**_ 에서의 팩터리 메서드`Factory Method`와 다르다. 디자인 패턴 중에는 이와 일치하는 패턴은 없다.
[^1]: [Factory method pattern](https://ko.wikipedia.org/wiki/%ED%8C%A9%ED%86%A0%EB%A6%AC_%EB%A9%94%EC%84%9C%EB%93%9C_%ED%8C%A8%ED%84%B4) in [[GoF] Design Patterns](https://ko.wikipedia.org/wiki/%EB%94%94%EC%9E%90%EC%9D%B8_%ED%8C%A8%ED%84%B4_(%EC%B1%85))
- - -
<br>

클래스는 클라이언트에 `public` 생성자 대신 (혹은 생성자와 함께) 정적 팩터리 메서드를 제공할 수 있다. 이 방식에는 장점과 단점이 모두 존재한다. 먼저 정적 팩터리 메서드가 생성자보다 좋은 장점 다섯 가지를 알아보자.
<br>

## <i class="user-fa-action-done" aria-hidden="true"></i> 장점
<br>

### 첫 번째, 이름을 가질 수 있다.

생성자에 넘기는 매겨변수와 생성자 자체만으로는 반환될 객체의 특성을 제대로 설명하지 못한다. 반면 정적 팩터리는 이름만 잘 지으면 반환될 객체의 특성을 쉽게 묘사할 수 있다. 예컨대 생성자인 `BigInteger(int, int, Random)`과 정적 팩터리 메서드인 `BigInteger.probablePrime`중 어느 쪽이 _'값이 소수인 BigInteger를 반환한다'_ 는 의미를 더 잘 설명할 것 같은지 생각해 보라.
<i class="user-fa-action-info-outline" aria-hidden="true"></i> `BigInteger.probablePrime`은 `JAVA 4` 에서 추가됐다.

하나의 시그니처로는 생성자를 하나만 만들 수 있다. 입력 매개변수들의 순서를 다르게 한 생성자를 새로 추가하는 식으로 이 제한을 피해볼 수도 있지만, 좋지 않은 발상이다. 그런 API를 사용하는 개발자는 각 생성자가 어떤 역할을 하는지 정확히 기억하기 어려워 엉뚱한 것을 호출하는 실수를 할 수 있다. 코드를 읽는 사람도 클래스 설명 문서를 찾아보지 않고는 의미를 알지 못할 것이다.

이름을 가질 수 있는 정적 팩터리 메서드에는 이런 제약이 없다. 한 클래스에 시그니처가 같은 생성자가 여러 개 필요할 것 같으면, 생성자를 정적 택터리 메서드로 바꾸고 각각의 차이를 잘 드러내는 이름을 지어주자.
<br>
<br>

### 두 번째, 호출될 때마다 인스턴스를 새로 생성하지는 않아도 된다.

이 덕분에 불변 클래스`immutable class`; [`아이템 17`](/effective-java-3e/chapter-03/item17/)는 인스턴스를 미리 만들어 놓거나 새로 생성한 인스턴스를 캐싱하여 재활용하는 식으로 불필요한 객체 생성을 피할 수 있다. 대표적 예인 `Boolean.valueOf(boolean)` 메서드는 객체를 아예 생성하지 않는다. 따라서 (특히 생성 비용이 큰) 같은 객체가 자주 요청되는 상황이라면 성능을 상당히 끌어올려 준다.
_**플라이웨이트 패턴 [Gamma95] [^2]**_ 도 이와 비슷한 기법이라 할 수 있다.
[^2]: [Flyweight pattern](https://ko.wikipedia.org/wiki/%ED%94%8C%EB%9D%BC%EC%9D%B4%EC%9B%A8%EC%9D%B4%ED%8A%B8_%ED%8C%A8%ED%84%B4) in [[GoF] Design Patterns](https://ko.wikipedia.org/wiki/%EB%94%94%EC%9E%90%EC%9D%B8_%ED%8C%A8%ED%84%B4_(%EC%B1%85))

반복되는 요청에 같은 객체를 반환하는 식으로 정적 팩터리 방식의 클래스는 언제 어느 인스턴스를 살아 있게 할지를 철저히 통제할 수 있다. 이런 클래스를 인스턴스 통제`instance-controlled` 클래스라 한다. 그렇다면 인스턴스를 통제하는 이유는 무엇일까? 인스턴스를 통제하면 클래스를 싱글턴`singleton`; [`아이템 3`](/effective-java-3e/chapter-01/item3/)으로 만들 수도, 인스턴스화 불가`noninstantiable`; [`아이템 4`](/effective-java-3e/chapter-01/item4/)로 만들 수도 있다. 또한 불변 값 클래스[`아이템 17`](/effective-java-3e/chapter-03/item17/)에서 동치인 인스턴스가 단 하나뿐임을 보장할 수 있다.

　**a == b일 때만 a.equals(b)가 성립**

인스턴스 통제는 _**플라이웨이트 패턴[Gamma95] [^2]**_ 의 근간이 되며, 열거 타입[`아이템 34`](/effective-java-3e/chapter-05/item34/)은 인스턴스가 하나만 만들어짐을 보장한다.
<br>
<br>

### 세 번째, 반환 타입의 하위 타입 객체를 반환할 수 있는 능력이 있다.

이 능력은 반환할 객체의 클래스를 자유롭게 선택할 수 있게 하는 **'엄청난 유연성'** 을 선물한다. API를 만들 때 이 유연성을 응용하면 구현 클래스를 공개하지 않고도 그 객체를 반환할 수 있어 API를 작게 유지할 수 있다. 이는 인터페이스를 정적 팩터리 메서드의 반환 타입으로 사용하는 인터페이스 기반 프레임워크[`아이템 20`](/effective-java-3e/chapter-03/item20/)를 만드는 핵심 기술이기도 하다.

`JAVA 8` 전에는 인터페이스에 정적 메서드를 선언할 수 없었다. 그렇기 때문에 이름이 "Type" 인 인터페이스를 반환하는 정적 메서드가 필요하면, "Types"라는 (인스턴스화 불가인) 동반 클래스`companion class`를 만들어 그 안에 정의하는 것이 관례였다. 예컨대 자바 컬렉션 프레임워크는 핵심 인터페이스들에 수정 불가나 동시화 등의 기능을 덧붙인 총 45개의 유틸리티 구현체를 제공하는데, 이 구현체 대부분을 단 하나의 인스턴스화 불가 클래스인 `java.util.collections`에서 정적 팩터리 메서드를 통해 얻도록 했다.

컬렉션 프레임워크는 이 45개 클래스를 공개하지 않기 때문에 API 외견을 훨씬 작게 만들 수 있었다. API가 작아진 것은 물론 개념적인 무게, 즉 프로그래머가 API를 사용하기 위해 익혀야 하는 개념의 수와 난이도도 낮췄다. 프로그래머는 명시한 인터페이스대로 동작하는 객체를 얻을 것임을 알기에 굳이 별도 문서를 찾아가며 실제 구현 클래스가 무엇인지 알아보지 않아도 된다. 나아가 정적 팩터리 메서드를 사용하는 클라이언트는 얻은 객체를 (그 구현 클래스가 아닌) 인터페이스만으로 다루게 된다.[`아이템 64`](/effective-java-3e/chapter-08/item64/) 물론 이는 일반적으로 좋은 습관이다.

`JAVA 8`부터는 인터페이스가 정적 메서드를 가질 수 없다는 제한이 풀렸기 때문에 인스턴스화 불가 동반 클래스를 둘 이유가 별로 없다. 동반 클래스에 두었던 `public` 정적 멤버들 상당수를 그냥 인터페이스 자체에 두면 되는 것이다. 하지만 정적 메서드들을 구현하기 위한 코드 중 많은 부분은 여전히 별도의 `package-private` 클래스에 두어야 할 수 있다. `JAVA 8`에서도 인터페이스에는 `public` 정적 멤버만 허용하기 때문이다. `JAVA 9`에서는 `private` 정적 메서드까지 허락하지만 정적 필드와 정적 멤버 클래스는 여전히 `public`이어야 한다.
<br>
<br>

### 네 번째, 입력 매개변수에 따라 매번 다른 클래스의 객체를 반환할 수 있다.

반환 타입의 하위 타입이기만 하면 어떤 클래스의 객체를 반환하든 상관없다. 심지어 다음 릴리스에서는 또 다른 클래스의 객체를 반환해도 된다. 가령 `EnumSet` 클래스[`아이템 36`](/effective-java-3e/chapter-05/item36/)는 `public` 생성자 없이 오직 정적 팩터리만 제공하는데, `OpenJDK`에서는 원소의 수에 따라 두 가지 하위 클래스 중 하나의 인스턴스를 반환한다. (대다수에 해당하는) 원소가 64개 이하면 원소들을 `long`변수 하나로 관리하는 `RegularEnumSet`의 인스턴스를, 65개 이상이면 `long`배열로 관리하는 `JumboEnumSet`의 인스턴스를 반환한다.

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
<br>
클라이언트는 이 두 클래스의 존재를 모른다. 만약 원소가 적을 때 `RegularEnumSet`을 사용할 이점이 없어진다면 다음 릴리스 때는 이를 삭제해도 아무 문제가 없다. 비슷하게, 성능을 더 개선한 세 번때, 네 번째 클래스를 다음 릴리스에 추가할 수도 있다. 클라이언트는 팩터리가 건네주는 객체가 어느 클래스의 인스턴스인지 알 수도 없고 알 필요도 없다. `EnumSet`의 하위 클래스이기만 하면 되는 것이다.
<br>
<br>

### 다섯 번째, 정적 팩터리 메서드를 작성하는 시점에는 반환할 객체의 클래스가 존재하지 않아도 된다.

이런 유연함은 서비스 제공자 프레임워크`service provider framework`를 만드는 근간이 된다. 대표적인 서비스 제공자 프레임워크로는 `JDBC`[^3] 가 있다. 서비스 제공자 프레임워크에서의 제공자`provider`는 서비스의 구현체다. 그리고 이 구현체들을 클라이언트에 제공하는 역할을 프레임워크가 통제하여, 클라이언트를 구현체로부터 분리해준다.
[^3]: [Java Database Connectivity](https://ko.wikipedia.org/wiki/JDBC)

서비스 제공자 프레임워크는 3개의 핵심 컴포넌트로 이뤄진다. 구현체의 동작을 정의하는 서비스 인터페이스`service interface`, 제공자가 구현체를 등록할 때 사용하는 제공자 등록 API`provider registration API`, 클라이언트가 서비스의 인스턴스를 얻을 때 사용하는 서비스 접근 API`service access API`가 그 주인공이다. 클라이언트는 서비스 접근 API를 사용할 때 원하는 구현체의 조건을 명시할 수 있다. 조건을 명시하지 않으면 기본 구현체를 반환하거나 지원하는 구현체들을 하나씩 돌아가며 반환한다. 이 서비스 접근 API가 바로 서비스 제공자 프레임워크의 근간이라고 한 _'유연한 정적 팩터리'_ 의 실체다.

3개의 핵심 컴포넌트와 더불어 종종 서비스 제공자 인터페이스`service provider interface`라는 네 번째 컴포넌트가 쓰이기도 한다. 이 컴포넌트는 서비스 인터페이스의 인스턴스를 생성하는 팩터리 객체를 설명해준다. 서비스 제공자 인터페이스가 없다면 각 구현체를 인스턴스로 만들 때 리플렉션[`아이템 65`](/effective-java-3e/chapter-08/item65/)을 사용해야 한다. `JDBC`[^3] 에서는 `Connection`이 서비스 인터페이스 역할을, `DriverManager.registerDriver`가 제공자 등록 API 역할을, `DriverManager.getConnection`이 서비스 접근 API 역할을, `Driver`가 서비스 제공자 인터페이스 역할을 수행한다.

서비스 제공자 프레임워크 패턴에는 여러 변형이 있다. 예컨대 서비스 접근 API는 공급자가 제공하는 것보다 더 풍부한 서비스 인터페이스를 클라이언트에 반환할 수 있다. _**브리지 패턴[Gamma95] [^4]**_ 이라 알려진 것이다. 의존 객체 주입`dependency injection` 프레임워크[`아이템 5`](/effective-java-3e/chapter-01/item5/)도 강력한 서비스 제공자라고 생각할 수 있다. `JAVA 6`부터는 `java.util.ServiceLoader`라는 범용 서비스 제공자 프레임워크가 제공되어 프레임워크를 직접 만들 필요가 거의 없어졌다.[`아이템 59`](/effective-java-3e/chapter-08/item59/) 한편, `JDBC`[^3]는 `JAVA 6` 전에 등장한 개념이라 `ServiceLoader`를 사용하지 않는다.
[^4]: [Bridge pattern](https://ko.wikipedia.org/wiki/%EB%B8%8C%EB%A6%AC%EC%A7%80_%ED%8C%A8%ED%84%B4) in [[GoF] Design Patterns](https://ko.wikipedia.org/wiki/%EB%94%94%EC%9E%90%EC%9D%B8_%ED%8C%A8%ED%84%B4_(%EC%B1%85))

<br>
이제 단점을 알아볼 차례다.

## <i class="user-fa-action-done" aria-hidden="true"></i> 단점
<br>

### 첫 번째, 상속을 하려면 `public`이나 `protected` 생성자가 필요하니 정적 팩터리 메서드만 제공하면 하위 클래스를 만들 수 없다.

앞서 이야기한 컬렉션 프레임워크의 유틸리티 구현 클래스들은 상속할 수 없다는 이야기다. 어찌 보면 이 제약은 상속`is-a`보다 컴포지션`has-a`을 사용[`아이템 18`](/effective-java-3e/chapter-03/item18/)하도록 유도하고 불변 타입[`아이템 17`](/effective-java-3e/chapter-03/item17/)으로 만들려면 이 제약을 지켜야 한다는 점에서 오히려 장점으로 받아들일 수도 있다.
<br>
<br>

### 두 번째, 정적 팩터리 메서드는 프로그래머가 찾기 어렵다.

생성자처럼 API 설명에 명확히 드러나지 않으니 사용자는 정적 팩터리 메서드 방식 클래스를 인스턴스화할 방법을 알아내야 한다. 이 일을 언젠가 자바독이 알아서 처리해 줬으면 좋겠으나, 그날이 오기까지는 API 문서를 잘 써놓고 메서드 이름도 널리 알려진 규약을 따라 짓는 식으로 문제를 완화해줘야 한다.

다음은 정적 팩터리 메서드에 흔히 사용하는 명명 방식들이다.

- `from` <i class="user-fa-action-trending-neutral" aria-hidden="true"></i> 매개변수를 하나 받아서 해당 타입의 인스턴스를 반환하는 형변환 매서드
<i class="user-fa-action-done" aria-hidden="true"></i> Date d = Date.from(instant);
<br>
- `of` <i class="user-fa-action-trending-neutral" aria-hidden="true"></i> 여러 매개변수를 받아 적합한 타입의 인스턴스를 반환하는 집계 메서드
<i class="user-fa-action-done" aria-hidden="true"></i> Set<Rank> faceCards = EnumSet.of(JACK, QUEEN, KING);
<br>
- `valueOf` <i class="user-fa-action-trending-neutral" aria-hidden="true"></i> _`from`_ 과 _`of`_ 의 더 자세한 버전
<i class="user-fa-action-done" aria-hidden="true"></i> BigInteger prime = BigInteger.valueOf(Integer.MAX_VALUE);
<br>
- `instance` 혹은 `getInstance` <i class="user-fa-action-trending-neutral" aria-hidden="true"></i> (매개변수를 받는다면) 매개변수로 명시한 인스턴스를 반환하지만, 같은 인스턴스임을 보장하지 않는다.
<i class="user-fa-action-done" aria-hidden="true"></i> StackWalker luke = StackWalker.getInstance(options);
<br>
- `create` 혹은 `newInstance` <i class="user-fa-action-trending-neutral" aria-hidden="true"></i> _`instance`_ 혹은 _`getInstance`_ 와 같지만, 매번 새로운 인스턴스를 생성해 반환함을 보장한다.
<i class="user-fa-action-done" aria-hidden="true"></i> Object newArray = Array.newInstance(classObject, arrayLen);
<br>
- `getType` <i class="user-fa-action-trending-neutral" aria-hidden="true"></i> _`getInstance`_ 와 같으나, 생성할 클래스가 아닌 다른 클래스에 팩터리 메서드를 정의할 때 쓴다. _"Type"_ 은 팩터리 메서드가 반환할 객체의 타입이다.
<i class="user-fa-action-done" aria-hidden="true"></i> FileStore fs = Files.getFileStore(path);
<br>
- `newType` <i class="user-fa-action-trending-neutral" aria-hidden="true"></i> _`newInstance`_ 와 같으나, 생성할 클래스가 아닌 다른 클래스에 팩터리 메서드를 정의할 때 쓴다. _"Type"_ 은 팩터리 메서드가 반환할 객체의 타입이다.
<i class="user-fa-action-done" aria-hidden="true"></i> BufferedReader br = Files.newBufferedReader(path);
<br>
- `type` <i class="user-fa-action-trending-neutral" aria-hidden="true"></i> _`getType`_ 과 _`newType`_ 의 간결한 버전
<i class="user-fa-action-done" aria-hidden="true"></i> List<Complaint> litany = Collections.list(legacyLitany);
<br>
<br>

## <i class="user-fa-av-new-releases" aria-hidden="true"></i> 핵심정리

정적 팩터리 메서드와 `public` 생성자는 각자의 쓰임새가 있으니 상대적인 장단점을 이해하고 사용하는 것이 좋다. 그렇다고 하더라도 정적 팩터리를 사용하는 게 유리한 경우가 더 많으므로 무작정 `public` 생성자를 제공하던 습관이 있다면 고치자.
<br>
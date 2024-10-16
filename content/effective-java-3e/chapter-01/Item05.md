---
title: "[아이템 5] 자원을 직접 명시하지 말고 의존객체를 주입을 사용하라"
date: 2020-06-19T17:15:21+09:00
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
대부분의 클래스는 **하나 이상의 리소스**에 의존합니다. 이를 처리하는 방식에 따라 코드의 **유연성**과 **테스트 가능성**이 크게 달라집니다. 이번 포스트에서는 이러한 의존성 처리의 잘못된 방식과 올바른 방식을 비교하고, **의존성 주입**을 통한 해결 방법을 소개합니다.
<br>

## {{< font color-var="main-color" text="부적절" >}}한 구현

### 📌 정적 유틸리티를 잘못 사용한 예

``` java
public class SpellChecker {

    private static final Lexicon dictionary = ...;

    private SpellChecker() {} // 객체 생성 방지

    public static boolean isValid(String word) { ... }
    public static List<String> suggestions(String typo) { ... }

}
```
<i class="user-fa-alert-warning" aria-hidden="true"></i> _유연하지 않고 테스트할 수 없다._

#### **문제점**
- **유연성 부족**: `Lexicon` 객체가 고정되어 있기 때문에 다른 사전을 사용하려면 클래스를 수정해야 합니다.
- **테스트 어려움**: 테스트 시 다양한 사전(`Lexicon`)을 사용해보려면 추가적인 설정이 필요합니다.
<br>
<br>

### 📌 싱글턴 패턴을 사용한 잘못된 예

``` java
public class SpellChecker {

    private final Lexicon dictionary = ...;

    private SpellChecker(...) { }
    public static SpellChecker INSTANCE = new SpellChecker(...);

    public static boolean isValid(String word) { ... }
    public static List<String> suggestions(String typo) { ... }

}
```
<i class="user-fa-alert-warning" aria-hidden="true"></i> _유연하지 않고 테스트하기 어렵다._

#### **문제점**

- **유연성 부족**: 싱글턴 인스턴스가 고정된 Lexicon 객체를 사용하기 때문에 변경이 어렵습니다.
- **테스트 어려움**: 다양한 테스트 시나리오에서 여러 Lexicon 구현체를 사용하는 것이 쉽지 않습니다.

이 두 가지 방식은 클래스의 유연성을 떨어뜨리고, 테스트가 어렵다는 단점이 있습니다.
<br>
<br>

## {{< font color-var="main-color" text="적절" >}}한 구현

### 📌 의존 객체 주입을 사용한 올바른 예

``` java
public class SpellChecker {

  private final Lexicon dictionary;

  public SpellChecker(Lexicon dictionary) {
    this.dictionary = Objects.requireNonNull(dictionary);
  }

  public static boolean isValid(String word) { ... }
  public static List<String> suggestions(String typo) { ... }

}
```

#### **장점**
- **유연성**: 생성자를 통해 `Lexicon` 객체를 주입받으므로 다양한 `Lexicon` 구현체를 사용할 수 있습니다.
- **테스트 용이성**: 테스트 환경에서 모의 객체(Mock)를 사용하거나 다양한 `Lexicon` 구현체를 주입하여 쉽게 테스트할 수 있습니다.
- **불변성**: `final` 키워드를 사용해 한 번 주입된 `dictionary`가 변경되지 않도록 보장합니다.
<br>

#### **의존 객체 주입의 주요 장점**
- **유연성 향상**: 리소스를 직접 명시하지 않고 외부에서 주입받기 때문에 클래스의 행위를 다양하게 설정할 수 있습니다.
- **테스트 용이성**: 의존하는 객체를 쉽게 교체할 수 있어 다양한 시나리오에 대한 테스트가 가능합니다.
- **재사용성**: 같은 클래스라도 주입되는 객체에 따라 다른 동작을 하도록 재사용할 수 있습니다.
<br>

#### **의존성 주입의 단점 및 해결책**
- **코드의 장황함**: 의존성이 많아질 경우 생성자에 많은 매개변수를 전달해야 하므로 코드가 복잡해질 수 있습니다.
- **프레임워크 사용**: 스프링(Spring)과 같은 프레임워크를 사용하면 의존성 주입을 간편하게 관리할 수 있습니다. 예를 들어, 스프링은 **IoC(Inversion of Control)** 컨테이너를 통해 자동으로 의존성을 주입합니다.
<br>
<br>

## <i class="user-fa-action-done" aria-hidden="true"></i> 결론
클래스가 의존하는 리소스에 따라 동작이 달라지는 경우, **싱글턴**이나 **정적 유틸리티 클래스**보다는 **생성자 주입**을 통한 의존성 주입 방식이 훨씬 적합합니다. 의존성 주입을 사용하면 **유연성**과 **테스트 용이성**이 크게 향상되며, 다양한 구현체를 손쉽게 교체할 수 있습니다. 이 방식은 클래스 설계를 더 명확하게 하고, 변경에 강한 코드를 작성하는 데 도움이 됩니다.
<br>
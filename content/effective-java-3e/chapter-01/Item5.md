---
title: "[아이템 5] 자원을 직접 명시하지 말고 의존객체를 주입을 사용하라"
date: 2020-06-19T17:15:21+09:00
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
대부분의 클래스는 하나 이상의 리소스에 의존합니다. 이번 예제 코드는 `SpellChecker`가 `Lexicon`을 의존하고 있는 모습입니다.
<br>

## 부적절한 구현

### 📌 정적 유틸리티를 잘못 사용한 예 - 유연하지 않고 테스트할 수 없다

``` java
public class SpellChecker {

    private static final Lexicon dictionary = ...;

    private SpellChecker() {} // 객체 생성 방지

    public static boolean isValid(String word) { ... }
    public static List<String> suggestions(String typo) { ... }

}
```
<br>

### 📌 싱글턴을 잘못 사용한 예 - 유연하지 않고 테스트하기 어렵다

``` java
public class SpellChecker {

    private final Lexicon dictionary = ...;

    private SpellChecker(...) { }
    public static SpellChecker INSTANCE = new SpellChecker(...);

    public static boolean isValid(String word) { ... }
    public static List<String> suggestions(String typo) { ... }

}
```
여기서 말하는 유연함이란 구현체를 변경하는 용이성을 말합니다.

사용하는 리소스에 따라 행동을 다르게 해야하는 클래스는 위에 말한 두 방식을 사용하는 것은 부적절합니다. 이러한 불편 사항들을 해결하기 위해서는 인스턴스를 생성할 때 생성자에 자원을 넘겨주는 방식이 있습니다.
<br>
<br>

## 적절한 구현

### 📌 의존 객체 주입은 유연성과 테스트 용이성을 높입니다.

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
흔히 생성자 주입 방식이라고 부르고 이러한 방식은 불변을 보장하며 원하면 하위 타입 인스턴스의 다양한 구현체를 주입할 수 있습니다.

위와 같이 의존성을 주입하는 방식은 유연함과 테스트 용이함을 크게 향상시켜 주지만, 의존성이 많아질 경우 코드가 장황해질 수 있습니다. 하지만 이 점은 스프링 같은 프레임워크로 해결할 수 있습니다.
<br>

## <i class="user-fa-av-new-releases" aria-hidden="true"></i> 정리
요약하자면 의존하는 리소스에 따라 행동을 달리하는 클래스를 사용 할 때는 싱글턴이나 스태틱 유틸리티 클래스를 사용하지 말고 리소스를 생성자를 통해 의존성을 주입받는 걸 추천합니다.

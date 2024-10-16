---
title: "[아이템 2] 생성자에 매개변수가 많다면 빌더를 고려하라"
date: 2020-06-18T17:21:20+09:00
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
매개변수가 많은 객체를 생성할 때, 생성자나 정적 팩토리 메서드 방식은 사용하기 불편해질 수 있습니다. 특히 매개변수의 순서나 타입이 비슷한 경우, 실수를 유발하거나 코드 가독성이 떨어지기 때문에 대안으로 **빌더 패턴(builder pattern)** 을 고려할 수 있습니다.
<br>

## {{< font color-var="main-color" text="첫" >}} 번째 대안, 생성자를 이용할 경우

```java
Nutritionfact cocaCola = new Nutritionfact(240, 8, 100, 0, 35);
```

생성자를 통해 객체를 생성할 때 매개변수가 많으면, 어떤 값이 어떤 속성에 해당하는지 파악하기 어렵습니다. 특히 매개변수 타입이 같다면, 잘못된 순서로 입력해도 컴파일러가 오류를 잡지 못하고, 런타임에서 예상치 못한 동작을 초래할 수 있습니다.
<br>
<br>

## {{< font color-var="main-color" text="두" >}} 번째 대안, 자바빈

```java
Nutritionfact cocaCola = new Nutritionfact();
cocaCola.setServingSize(240);
cocaCola.setServings(8);
cocaCola.setCalories(100);
..
반복
```

**자바빈(JavaBeans)** 패턴은 기본 생성자와 `setter` 메서드를 이용해 객체의 속성을 설정하는 방식입니다. 이 방식은 가독성이 좋지만, 객체가 완전히 초기화되기 전에는 일관성을 보장할 수 없고, **불변성(immutability)** 을 유지하기도 어렵습니다. 추가로 **쓰레드 안전성**도 문제가 될 수 있습니다.
<br>
<br>

## {{< font color-var="main-color" text="세" >}} 번째 대안, 빌더
빌더 패턴은 **매개변수의 수가 많거나, 유연한 객체 생성**이 필요할 때 사용하는 최적의 대안입니다. 빌더 패턴은 필수 매개변수만으로 생성자(혹은 정적 팩토리 메서드)를 호출한 뒤, **선택적인 매개변수를 체인 방식**으로 설정할 수 있습니다.

``` java
// 예제에서 사용한 Builder패턴
public class NutritionFacts {

    private final int servingSize;
    private final int servings;
    private final int calories;
    private final int fat;
    private final int sodium;

    public static class Builder {
        // 필수 매개변수
        private final int servingSize;
        private final int servings;

        // 선택 매개변수 - 기본값으로 초기화 한다.
        private int calories = 0;
        private int fat = 0;
        private int sodium = 0;

        public Builder(int servingSize, int servings) {
            this.servingSize = servingSize;
            this.servings = servings;
        }

        public Builder calories(int val) {
            calories = val;
            return this;
        }

        public Builder fat(int val) {
            fat = val;
            return this;
        }

        public Builder carbohydrate(int val) {
            sodium = val;
            return this;
        }

        public NutritionFacts build() {
            return new NutritionFacts(this);
        }
    }

    private NutritionFacts(Builder builder) {
        this.servingSize = builder.servingSize;
        this.servings = builder.servings;
        this.calories = builder.calories;
        this.fat = builder.fat;
        this.sodium = builder.sodium;
    }

}
```
<br>
빌더 패턴을 사용하면, 다음과 같은 형태로 객체를 생성할 수 있습니다.

``` java
NutritionFacts cocaCola = new NutritionFacts.Builder(240, 8)
                                            .calories(100)
                                            .sodium(35)
                                            .carbohydrate(27)
                                            .build();
```

위 코드에서 볼 수 있듯이, 빌더 패턴을 사용하면 매개변수 설정이 훨씬 직관적이고 가독성도 높아집니다. 또한, `NutritionFacts` 클래스는 **불변(immutable)** 으로 만들 수 있어 안전성이 높아집니다.
<br>
<br>

## 계층적 클래스와 빌더 패턴


빌더 패턴은 **계층적으로 설계된 클래스**와도 잘 어울립니다. 추상 클래스는 추상 빌더를, 구체 클래스는 구체 빌더를 사용합니다.
``` java
public abstract class Pizza {

    public enum Topping { HAM, MUSHROOM, ONION, PEPPER, SAUSAGE }
    final Set<Topping> toppings;

    abstract static class Builder<T extends Builder<T>> {
        EnumSet<Topping> toppings = EnumSet.noneOf(Topping.class);
        public T addTopping(Topping topping) {
            toppings.add(Objects.requireNonNull(topping));
            return self();
        }

        // Pizza를 상속한 인스턴스를 반환하기만 하면 된다.
        abstract Pizza build();

        // 하위 클래스는 이 메서드를 재정의 하여
        // "this"를 반환하도록 해야 한다.
        protected abstract T self();
    }

    default Pizza(Builder<?> builder) {
        toppings = builder.toppings.clone();
    }

}
```
<br>

``` java
public class NyPizza extends Pizza {

    public enum Size { SMALL, MEDIUM, LARGE }
    private final Size size;

    public static class Builder extends Pizza.Builder<Builder> {
        private final Size size;

        public Builder(Size size) {
            this.size = Objects.requireNonNull(size);
        }

        @Override
        public NyPizza build() {
            return new NyPizza(this);
        }

        @Override
        protected Builder self() {
            return this;
        }

    }

    private NyPizza(Builder builder) {
        super(builder);
        size = builder.size;
    }

}
```
<br>

``` java
public class Calzone extends Pizza {

    private final boolean sauceInside;

    public static class Builder extends Pizza.Builder<Builder> {
        private boolean sauceInside = false;

        public Builder sauceInside() {
            sauceInside = true;
            return this;
        }

        @Override
        public Calzone build() {
            return new Calzone(this);
        }

        @Override
        protected Builder self() {
            return this;
        }
    }

    private Calzone(Builder builder) {
        super(builder);
        sauceInside = builder.sauceInside;
    }

}
````

`build` 메서드는 해당하는 구체 하위 클래스를 반환하도록 재정의합니다. 하위 메서드가 상위 클래스의 메서드가 정의한 반환 타입이 아닌, 그 하위 타입을 반환하는 기능을 **공변 반환 타이핑(covariant return typing)** 이라 합니다.

위 예시에서 볼 수 있듯이, 빌더 패턴을 사용하면 **유연한 계층 구조**를 유지하면서도 객체를 쉽게 생성할 수 있습니다. 구체적인 빌더는 자신에게 맞는 객체를 반환하도록 설계되어 있어, 다양한 하위 클래스에 적용 가능합니다.
<br>

``` java
NyPizza pizza = new NyPizza.Builder(SMALL)
                           .addTopping(SAUSAGE)
                           .addTopping(ONION)
                           .build();

Calzone calzone = new Calzone.Builder()
                             .addTopping(HAM)
                             .sauceInside()
                             .build();
```
<br>
<br>

## <i class="user-fa-action-done" aria-hidden="true"></i> 정리

빌더 패턴은 복잡한 객체를 유연하게 생성할 수 있으며, 특히 **매개변수가 많은 경우**나 **계층적 클래스 구조**에서 유용합니다. 다만 빌더 객체를 생성해야 하는 비용이 추가되기 때문에 **성능이 중요한 상황**에서는 신중히 고려해야 합니다. 또한 코드가 다소 길어질 수 있으므로, 매개변수의 복잡도와 필요에 따라 적절히 사용해야 합니다.
<br>
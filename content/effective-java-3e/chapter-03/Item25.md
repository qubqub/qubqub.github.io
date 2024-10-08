---
title: "[아이템 25] 톱레벨 클래스는 한 파일에만 담으라"
date: 2020-07-05T13:12:41+09:00
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
``` java
public class Main {
    public static void main(String[] args) {
        System.out.println(Utensil.NAME + Dessert.NAME);
    }
}
```

위 코드의 코드는 `Main` 클래스 하나를 담고 있고, `Main`클래스는 다른 톱레벨 클래스 2개(`Utensil`, `Dessert`)를 참조합니다.
<br>
<br>

`Utensil`와 `Dessert` 클래스가 `Utensil.java`라는 한 파일에 정의되어 있다고 가정해봅시다.

``` java
class Utensil {
    static final String NAME = "pan";
}

class Dessert {
    static final String NAME = "cake";
}
```

`Main`을 실행하면 "pancake"가 출력됩니다.
<br>
<br>

이제 두 클래스를 담은 `Dessert.java`라는 파일을 만들었다고 가정해봅시다.

``` java
class Utensil {
    static final String NAME = "pot";
}

class Dessert {
    static final String NAME = "pie";
}
```

컴파일러는 가장 먼저 `Main.java`를 컴파일하고, 그 안에서 (`Dessert` 참조보다 먼저 나오는) `Utensil` 참조를 만나면 `Utensil.java` 파일을 살펴 `Utensil`과 `Dessert`를 모두 찾아낼 것입니다. 그런 다음 컴파일러가 두 번째 명령줄 인수로 넘어온 `Dessert.java`를 처리하려 할 때 같은 클래스의 정의가 이미 있음을 알게 됩니다.

한편 `javac Main.java`나 `javac Main.java Utensil.java`명령으로 컴파일하면 `Dessert.java`파일을 작성하기 전처럼 "pancake"를 출력합니다. 그러나 `javac Dessert.java Main.java`명령으로 컴파일하면 "potpie"를 출력합니다.

이처럼 컴파일러에 어느 소스 파일을 먼저 건네느냐에 따라 동작이 달라지므로 바로 잡아야할 문제입니다.

다행히 해결책은 간단합니다. 단순히 톱레벨 클래스들을 서로 다른 소스 파일로 분리하면 그만입니다.

굳이 여러 톱레벨 클래스를 한 파일에 담고 싶다면 정적 멤버 클래스를 사용하는 방법을 고민해볼 수 있습니다.
<br>

``` java
public class Test {
    public static void main(String[] args) {
        System.out.println(Utensil.NAME + Dessert.NAME);
    }

    private static class Utensil {
        static final String NAME = "pan";
    }

    private static class Dessert {
        static final String NAME = "cake";
    }
}
```

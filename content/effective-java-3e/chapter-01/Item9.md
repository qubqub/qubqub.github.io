---
title: "[아이템 9] try-finally보다는 try-with-resources를 사용하라"
date: 2020-06-20T17:12:16+09:00
tags: ["Java", "Effective Java 3E"]
categories: ["Effective Java 3E"]
series: ["Effective Java 3E"]
chapter: ["Effective Java 3E Chapter 1"]
author: ["Qutrits"]
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
자바 라이브러리에는 `InputStream`, `OutputStream`, `java.sql.Connection`과 같이 직접 `close`를 해야 하는 자원들이 있습니다.

클라이언트는 실수로 자원을 닫아주지 않는 경우 예상치 못한 성능 문제로 이어질 수 있습니다.
<br>

## 📌 실수를 유발할 수 있는 기존 코드

``` java
static String firstLineOfFile(String path) throws IOException {
    BufferedReader br = new BufferedReader(new FileReader(path));
        try {
            return br.readLine();
        } finally {
            br.close();
        }
    }
}
```
나쁘진 않지만 자원을 더 사용하게 되면 실수가 나올 가능성이 큽니다.

위 예제 같은 경우 `try` 블록과 `finally` 블록 모두에서 발생할 수 있는데, 예컨데 기기에 물리적 문제가 생긴다면 `firstLineOfFile` 메서드 안의 `readLine` 메서드가 예외를 던지고, 같은 이유로 `close` 메서드도 실패합니다. 이런 상황이라면 두 번째 예외가 첫 번째 예외를 완전히 집어삼키게 됩니다. (첫 번째 예외는 정보가 남지 않게 됩니다.)
<br>
<br>

## 📌 자원을 회수하는 최선책

이러한 문제점들을 고안해서 `JAVA 7`부터는 `try-with-resources`으로 해결할 수 있습니다. 이 구조를 사용하려면 해당 자원이 `AutoCloseable` 인터페이스를 구현해야 합니다.

자바 라이브러리와 서드파티 라이브러리들의 수많은 클래스와 인터페이스가 이미 `Autocloseable`을 구현하거나 확정했습니다.
<br>

``` java
static String firstLineOfFile(String path) throws IOException {
    try (BufferedReader br = new BufferedReader(new FileReader(path))) {
        return br.readLine();
    }
}
```
`try-with-resources`를 사용한 코드
<br>

`try-with-resources`에서도 `catch` 절을 사용할 수 있습니다.
``` java
static String firstLineOfFile(String path) {
    try (BufferedReader br = new BufferedReader(new FileReader(path))) {
        return br.readLine();
    } catch (IOException e) {
        return defaultVal;
    }
}
```
<br>
<br>

## <i class="user-fa-av-new-releases" aria-hidden="true"></i> 정리
꼭 회수해야 하는 자원을 다룰 때는 `try-finally`가 아닌, `try-with-resources`를 사용합시다. 예외는 없습니다. 코드는 더 짧고 분명해지고, 만들어지는 예외 정보도 훨씬 유용합니다. `try-finally`로 작성하면 실용적이지 못할 만큼 코드가 지저분해지는 경우라도, `try-with-resources`로는 정확하고 쉽게 자원을 회수할 수 있습니다.
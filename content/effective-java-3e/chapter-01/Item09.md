---
title: "[아이템 9] try-finally보다는 try-with-resources를 사용하라"
date: 2020-06-20T17:12:16+09:00
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
자바에는 `InputStream`, `OutputStream`, `java.sql.Connection`과 같은 **직접 닫아줘야 하는 자원**들이 존재합니다. 이 자원들을 제대로 닫지 않으면 **메모리 누수**와 같은 심각한 문제를 초래할 수 있습니다.
<br>

## 📌 실수를 유발할 수 있는 기존 코드

자바에서는 자원을 사용한 후 반드시 해제해야 하므로, 이전에는 `try-finally`를 사용하여 자원을 해제하는 방식이 흔했습니다. 하지만 이 방식은 **복잡하고 오류를 유발할 가능성**이 있습니다.
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
이 코드 자체는 문제없이 동작할 수 있지만, 자원을 더 많이 사용하게 될 경우, **실수가 발생할 가능성**이 커집니다. 예컨데 기기에 물리적 문제가 생긴다면 `firstLineOfFile` 메서드 안의 `readLine` 메서드가 예외를 던지고, 같은 이유로 `close` 메서드도 실패합니다. 이런 상황이라면 **두 번째 예외가 첫 번째 예외를 완전히 집어삼키게 됩니다**. 그러면 스택 추적 내역에 첫 번째 예외에 관한 정보는 남지 않게 되어, 실제 시스템에서의 디버깅을 몹시 어렵게 만듭니다.
<br>
<br>

## 📌 자원을 회수하는 최선책

이러한 문제를 해결하기 위해, **자바 7**부터 `try-with-resources` 구문이 도입되었습니다. 이 구문을 사용하려면 해당 자원이 `AutoCloseable` 인터페이스를 구현해야 합니다. 구현한 자원은 **자동으로 닫히며**, 코드가 훨씬 간결하고 안전하게 작성됩니다.

자바 라이브러리와 서드파티 라이브러리들의 수많은 클래스와 인터페이스가 이미 `Autocloseable`을 구현하거나 확정했습니다.
<br>

`try-with-resources`를 사용한 코드
``` java
static String firstLineOfFile(String path) throws IOException {
    try (BufferedReader br = new BufferedReader(new FileReader(path))) {
        return br.readLine();
    }
}
```
이 방식은 자원을 사용한 후 **자동으로 자원을 닫아주므로**, 더 이상 `finally` **블록에서 수동으로 자원을 해제**할 필요가 없습니다.

<br>

`try-with-resources`에서 `catch` 절 사용 예시
``` java
static String firstLineOfFile(String path) {
    try (BufferedReader br = new BufferedReader(new FileReader(path))) {
        return br.readLine();
    } catch (IOException e) {
        return defaultVal;
    }
}
```
`try-with-resources` 구문에서도 `catch` **절**을 추가하여 예외 처리를 할 수 있습니다.

<br>
<br>

## <i class="user-fa-action-done" aria-hidden="true"></i> 정리
꼭 회수해야 하는 자원을 다룰 때는 `try-finally`가 아닌, `try-with-resources`를 사용합시다. 예외는 없습니다. 코드는 더 짧고 분명해지고, 만들어지는 예외 정보도 훨씬 유용합니다. `try-finally`로 작성하면 실용적이지 못할 만큼 코드가 지저분해지는 경우라도, `try-with-resources`로는 정확하고 쉽게 자원을 회수할 수 있습니다.
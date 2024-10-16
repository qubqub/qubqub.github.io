---
title: "[아이템 8] finalizer와 cleaner 사용을 피하라"
date: 2020-06-20T15:12:33+09:00
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
## 1. finalizer와 cleaner란?

자바에서는 객체 소멸 시 특정 작업을 수행하는 두 가지 방법, `finalizer`와 `cleaner`를 제공합니다. `finalizer`는 **Java 9**부터 **deprecated**로 지정되었으며, `cleaner`는 그 대안으로 제공되지만 **여전히 예측 불가능**하고 **성능 문제**가 있습니다.
<br>
<br>

## 2. finalizer와 cleaner의 문제점
### 2.1 언제 실행될지 알 수 없다
`finalizer`와 `cleaner`는 **즉시 실행**된다는 보장이 없습니다. 이들은 **가비지 컬렉션**이 수행될 때 동작하지만, 그 시점을 **예측할 수 없기 때문에** 시간에 민감한 작업을 이들에 의존할 수 없습니다.
<br>

### 2.2 finalizer의 느린 실행
`finalizer`는 **lazy**하게 실행됩니다. 즉, **인스턴스 자원의 회수가 지연**될 수 있으며, `finalizer` 스레드는 **우선순위가 낮아서** 실행될 기회를 얻지 못할 수 있습니다. 그 결과, 객체가 메모리에서 해제되기까지 불필요하게 긴 시간이 소요될 수 있습니다.
<br>

### 2.3 수행 여부가 보장되지 않는다
자바 명세는 `finalizer`와 `cleaner`의 **실행 시점**뿐만 아니라, 실행 여부 자체를 보장하지 않습니다. 따라서, 상태를 수정하거나 자원을 해제하는 작업에 이들을 의존해서는 **안 됩니다**.
<br>

### 2.4 예외가 무시된다
`finalizer`가 동작 중에 **예외가 발생**해도 해당 예외는 **무시**됩니다. 예외 처리 없이 그대로 종료되어 **남은 작업을 처리하지 않고 중단**될 수 있으며, 이는 **디버깅을 어렵게 만듭니다**.
<br>

### 2.5 성능 문제
`finalizer`와 `cleaner`를 사용하는 것은 **성능 저하**를 유발할 수 있습니다. 예를 들어, `AutoCloseable` 객체의 자원을 해제하는 데는 **12ns**가 걸리는 반면, `finalizer`를 사용하면 **550ns**가 소요됩니다. 이는 **가비지 컬렉터의 효율을 떨어뜨리기 때문**입니다.
<br>
<br>

## 3. 안전한 대안 `AutoCloseable`
자바에서는 `finalizer`와 `cleaner` 대신, `AutoCloseable` 인터페이스를 사용하는 것이 더 안전하고 효율적입니다. **명시적으로** `close()` **메서드를 호출하**여 자원을 해제하는 방식으로, **try-with-resources** 구문과 함께 사용할 수 있습니다. 이는 **자원의 명확한 해제**를 보장하며, **성능 저하**나 **불확실성** 문제를 방지할 수 있습니다.
<br>
<br>

## 4. 정리
`finalizer`와 `cleaner`는 **예측 불가능**하고, **성능 저하**와 같은 문제를 일으킬 수 있기 때문에 사용을 피해야 합니다. 이들은 네이티브 자원 회수처럼 꼭 필요할 때만 안전망으로 사용하는 것이 좋으며, **명확한 자원 해제**를 위해서는 `AutoCloseable`과 **try-with-resources** **구문을 사용하는 것이 권장**됩니다.
- `finalizer`와 `cleaner`는 성능 저하와 예측 불가능한 동작으로 인해 사용을 피해야 합니다.
- **중요한 자원 해제**는 `AutoCloseable` 인터페이스와 **try-with-resources** **구문을 사용하는 것이 더 안전하고 효율적**입니다.
- `finalizer`와 `cleaner`는 **안전망 역할로만 사용하되, 불확실성과 성능 저하에 주의**해야 합니다.

이와 같이 **명시적인 자원 관리**를 통해 **메모리 누수**와 **성능 문제**를 최소화할 수 있습니다.
<br>
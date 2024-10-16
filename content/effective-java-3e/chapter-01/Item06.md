---
title: "[아이템 6] 불필요한 객체 생성을 피하라"
date: 2020-06-19T18:33:20+09:00
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
객체를 생성할 때 기능이 동일한 객체를 매번 새로 생성하기보다는 **객체를 재사용**하는 것이 성능과 메모리 효율성 측면에서 더욱 적절합니다. 특히 **불변 객체(immutable objects)**는 항상 재사용이 가능하므로 이를 적극 활용해야 합니다.
<br>

## 📌 문자열 생성 방법

### 객체 생성 방식 - 피해야 되는 예시

``` java
String str = new String("hello");
```

이 방식은 매번 **새로운 객체**를 생성합니다. 같은 문자열을 사용하더라도 매번 새로운 인스턴스가 만들어져 낭비가 발생합니다.
<br>

### **리터럴 방식**
``` java
String str = "hello";
```
이 방식은 **리터럴**을 사용하여 JVM이 동일한 문자열을 캐싱하므로, 이미 같은 문자열이 있다면 이를 **재사용**합니다. 이 방식은 객체 생성을 줄여 **성능을 최적화**합니다.
<br>
<br>

## 📌 생성 비용이 비싼 객체
비싼 객체를 매번 생성하는 대신 **재사용**할 수 있는 방법을 찾아야 합니다. 특히, 복잡한 계산이나 초기화가 필요한 객체는 **캐싱**해서 재사용하는 것이 좋습니다.
<br>

### 불필요한 객체 생성
``` java
static boolean isRomanNumeral(String s) {
    return s.matches("^(?=.)M*(C[MD]|D?C{0,3})"
            + "(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})$");
}
```
이 코드는 정규표현식을 사용해 문자열이 로마 숫자인지 확인합니다. `String.matches`는 내부에서 **매번 새로운 Pattern 객체**를 생성하므로, 이 방법은 **비효율적**입니다. 특히, **정규표현식**의 경우 **생성 비용**이 크기 때문에 자주 호출된다면 **성능에 문제가 발생**할 수 있습니다.
<br>

#### 해결책
``` java
public class RomanNumber {

    private static final Pattern ROMAN = Pattern.compile(
                "^(?=.)M*(C[MD]|D?C{0,3})"
                + "(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})$");

    static boolean isRomanNumeral(String s) {
        return ROMAN.matcher(s).matches();
    }

}
```
이 코드는 **정규표현식 패턴을 캐싱**해서 재사용합니다. Pattern 객체를 **클래스 초기화 시 한 번만 생성**하고, 이후로는 **재사용**합니다. 이를 통해 여러 번 호출되는 경우에도 **성능을 크게 개선**할 수 있습니다.
<br>

### 어댑터 패턴을 활용한 객체 재사용
**어댑터(Adapter)** 패턴은 하나의 인터페이스를 다른 인터페이스로 변환하여 호환성을 제공하는 패턴입니다. 이를 통해 여러 번 생성할 필요 없이 동일한 객체를 재사용할 수 있습니다.

대표적인 예로, `Map` 인터페이스의 `keySet()` 메서드를 들 수 있습니다. 이 메서드는 호출될 때마다 새로운 `Set` 객체를 생성하는 대신, 내부적으로 동일한 객체를 반환하여 메모리 낭비를 방지합니다.
``` java
Map<String, String> map = new HashMap<>();
map.put("key1", "value1");
map.put("key2", "value2");

Set<String> keys = map.keySet();  // 같은 Set 객체를 반환
```
`keySet()`은 새로운 객체를 반환하지 않고 같은 객체를 반환하므로, 이 `Set`을 통해 `Map`을 수정하면 원본 `Map`도 함께 수정됩니다.
<br>
<br>

## <i class="user-fa-action-done" aria-hidden="true"></i> 결론
**객체를 재사용**하면 성능 최적화와 메모리 절약에 큰 도움이 됩니다. 특히 **불변 객체**나 **비싼 객체**의 경우, **캐싱을 통해 재사용**하면 불필요한 객체 생성을 줄일 수 있습니다. 또한, 어댑터 패턴을 사용할 때는 **중복된 객체 생성**을 피하고 **같은 객체를 재사용**하는 방식이 더 효율적입니다.
<br>
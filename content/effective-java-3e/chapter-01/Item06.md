---
title: "[아이템 6] 불필요한 객체를 생성을 피하라"
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
기능이 똑같은 객체를 매번 생성하기 보다는 객체를 재사용하는 것이 적절합니다. 특히 {{< font color-var="main-color" weight="600" text="불변 객체는 항상 재사용할 수 있습니다." >}}
<br>

## 📌 문자열 생성 방법

### 객체 생성 방식 - 피해야 되는 예시

``` java
String str = new String("hello");
```

이 방식을 이용하면 똑같은 문자열을 생성하더라도 항상 새로운 객체를 생성하므로 낭비가 됩니다.
<br>

### **리터럴 방식**
``` java
String str = "hello";
```
{{< font color-var="main-color" weight="600" text="리터럴" >}} 방식을 사용하면 {{< font color-var="main-color" weight="600" text="JVM" >}}에서 동일한 문자열이 존재한다면 그 리터럴을 재사용합니다.
<br>
<br>

## 📌 생성 비용이 비싼 객체
생성 비용이 비싼 객체들 같은 경우 캐싱해서 재사용할 수 있는 방법을 고려해보는 게 좋습니다.
<br>

### 불필요한 객체 생성
``` java
static boolean isRomanNumeral(String s) {
    return s.matches("^(?=.)M*(C[MD]|D?C{0,3})"
            + "(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})$");
}
```
정규표현식의 예제로 문자열이 로마 숫자인지 확인하는 코드입니다.
`String.matches`는 내부에서 만드는 `Pattern`객체를 만들어서 사용하는데, 이 메서드에서는 한 번 쓰고 버려져서 곧바로 가비지 컬렉션 대상이 됩니다. 입력받은 정규표현식에 해당하는 {{< font color-var="main-color" weight="600" text="유한 상태 머신" >}}을 만들기 때문에 생성 비용이 비쌉니다.
<br>

### 해결책
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
성능을 개선한 수정된 코드입니다. `Pattern`인스턴스 클래스 초기화 과정에서 직접 생성하고 캐싱해두었다가 해당 `isRomanNumeral` 가 호출될 때마다 인스턴스를 재사용합니다. `isRomanNumeral` 가 여러 번 호출되는 상황에서 성능을 상당히 끌어올릴 수 있습니다.
<br>

### 어댑터
어댑터는 인터페이스를 통해서 다른 객체와 연결해주는 객체라 여러개 만들 필요가 없습니다.
대표적으로 `Map` 인터페이스에 있는 `keySet` 메서드는 호출 될 때마다 새로운 객체가 나오는 게 아니라 같은 객체를 반환하기 때문에 리턴받은 `Set` 타입의 객체를 변경하면, 결국 그 뒤에 있는 `Map` 인터페이스도 변경되는 것입니다.

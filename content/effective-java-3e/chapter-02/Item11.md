---
title: "[아이템 11] equals를 재정의하려거든 hashCode도 재정의하라"
date: 2020-06-27T13:18:21+09:00
tags: ["Java", "Effective Java 3E"]
categories: ["Effective Java 3E"]
series: ["Effective Java 3E"]
chapter: ["Effective Java 3E Chapter 02"]
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
## 1. 왜 hashCode도 재정의해야 할까?
자바의 `HashMap`, `HashSet` 같은 해시 기반 컬렉션은 객체의 고유한 해시값을 사용하여 저장, 검색, 비교를 수행합니다. 따라서 `equals`를 재정의하고도 `hashCode`를 재정의하지 않으면, 두 객체가 논리적으로는 같아도 해시값이 다를 수 있어 중복이 발생하거나 의도치 않게 검색에 실패할 수 있습니다.

`equals`와 `hasoCode`를 재정의 하지 않으면 `HashMap`이나 `HashSet`에서 같은 원소를 사용할 때 문제가 발생합니다.

`Object` 명세에서 정의한 `hashCode` 규약
>- **일관성**: `equals`로 비교되는 정보가 변하지 않는 한, 애플리케이션 실행 동안 여러 번 `hashCode`를 호출해도 일관된 값을 반환해야 합니다.
>- **동치성**: 두 객체가 `equals`로 같다면, `hashCode`도 반드시 같아야 합니다.
>- **비교 가능성**: 두 객체가 `equals`로 다르더라도 `hashCode`는 다를 필요는 없지만, **다른 객체**에 대해 다른 값을 반환하면 해시 테이블의 성능이 향상됩니다.

<br>
<br>

## 2. 논리적으로 같은 객체는 같은 해시코드를 반환해야 한다

객체가 다르더라도 해시값이 같을 수는 있지만, 논리적으로 동등한 객체는 **반드시** 같은 해시값을 가져야 합니다. 그러나 해시코드 값이 32비트 int 범위로 제한되기 때문에 **비둘기 집의 원리**에 따라 충돌이 발생할 수 있습니다. 충돌을 최소화하고 성능을 향상시키려면, 해시코드 구현이 중요합니다.
<br>
<br>

### hashCode를 작성하는 요령

{{< font family="cascadiacode" size="1.1" color-var="main-color" weight="600" text="1." >}} `int` 변수 `result`를 선언한 후 값 `c`로 초기화 합니다. 이때 `c`는 해당 객체의 첫번째 해시 필드를 `2.a` 방식으로 계산한 해시코드입니다.
<br>
{{< font family="cascadiacode" size="1.1" color-var="main-color" weight="600" text="2." >}} 나머지 개개의 필드 `f` 각각에 대해서 다음 작업을 수행합니다.
    　{{< font family="cascadiacode" size="1.1" color-var="main-color" weight="600" text="a." >}} 해당 필드의 해시코드 `c`를 계산합니다.
        <div style="display: inline-flex; padding-inline-start: 2rem; margin-top: 0.5rem;">　<span>**_{{< font family="youtube sans" size="1.1" color-var="main-color" weight="600" text="i ." >}}_**　　</span> <span>기본 타입 필드라면, `Type.hashCode(f)`를 수행합니다. 여기서 `Type`은 해당 기본 타입의 박싱 클래스입니다.</span></div>
        <div style="display: inline-flex; padding-inline-start: 2rem; margin-top: 0.5rem; margin-bottom: 0.5rem;">　<span>**_{{< font family="youtube sans" size="1.1" color-var="main-color" weight="600" text="ii ." >}}_**　　</span> <span>참조 타입 필드면서 이 클래스의 `equals` 메서드가 이 필드의 `equals`를 재귀적으로 호출해 비교한다면, 이 필드의 `hashCode`를 재귀적으로 호출합니다.</span></div>
        <div style="display: inline-flex; padding-inline-start: 2rem; margin-bottom: 1.5rem;">　<span>**_{{< font family="youtube sans" size="1.1" color-var="main-color" weight="600" text="iii ." >}}_**　　</span> <span>필드가 배열이라면, 원소 각각을 별도 필드처럼 다룹니다. 이상의 규칙을 재귀적으로 적용해 각 핵심 원소의 해시코드를 계산한 다음, `2.b`방식으로 갱신합니다. 배열에 핵심 원소가 하나도 없다면 단순 상수를 사용하고 모든 원소가 핵심 원소라면 `Arrays.hashCode`를 사용합니다.</span></div>
    　{{< font family="cascadiacode" size="1.1" color-var="main-color" weight="600" text="b." >}} `2.a`에서 계산한 해시코드 `c`로 `result`를 갱신합니다. `result = 31 * result + c;`
<br>
{{< font family="cascadiacode" size="1.1" color-var="main-color" weight="600" text="3." >}} `result`를 반환합니다.
<br>

`equals` 비교에서 사용되지 않는 필드는 **반드시** 제외해야 합니다. 그렇지 않으면 맨 처음에 언급했던 두 번째 규약을 어기게됩니다.
<br>
숫자를 곱하는 이유는 만약 곱셈 없는 `hahCode`를 구현하게 되면 모든 아나그램의 해시코드가 같아집니다. `31`을 선택한 이유는 `홀수`이면서 `소수`이기 때문입니다. 소수는 곱할 때 결과 값이 더 고르게 분포되게 만들며, 홀수이기 때문에 숫자를 곱한 뒤 정보를 잃지 않습니다. 또한, 31은 비트 연산으로 곱셈을 최적화할 수 있습니다. 31 * i는 (i << 5) - i로 계산되어 효율적입니다.

``` java
@Override
public int hashCode() {
    int result = Short.hashCode(areaCode);
    result = 31 * result + Short.hashCode(prefix);
    result = 31 * result + Short.hashCode(lineNum);
    return result;
}
```
<i class="user-fa-action-info-outline" aria-hidden="true"></i> _전형적인 `hashCode` 메서드_
<br>

``` java
@Override
public int hashCode(){
    return Objects.hash(lineNum, prefix, areaCode);
}
```
<i class="user-fa-action-info-outline" aria-hidden="true"></i> _한 줄짜리 `hashCode` 메서드 - 성능이 살짝 아쉽다_
<br>

``` java
private int hashCode; // 자동으로 0으로 초기화된다.

@Override public int hashCode() {
    int result = hashCode;
    if (result == 0) {
        result = Short.hashCode(areaCode);
        result = 31 * result + Short.hashCode(prefix);
        result = 31 * result + Short.hashCode(lineNum);
        hashCode = result;
    }
    return result;
}
```
<i class="user-fa-action-info-outline" aria-hidden="true"></i> _해시코드를 지연 초기화하는 `hashCode` 메서드 - 스레드 안정성까지 고려해야 한다_
<br>
<br>

## 3. 정리
- `equals`를 재정의할 때는 반드시 `hashCode`도 재정의해야 합니다. 그렇지 않으면 해시 기반 컬렉션에서 객체를 제대로 인식하지 못하게 됩니다.
- 두 객체가 논리적으로 같다면 반드시 같은 해시코드를 가져야 하며, 서로 다른 객체는 가능하면 다른 해시코드를 가지도록 해야 해시 테이블의 성능을 극대화할 수 있습니다.
- 복잡한 해시코드 계산이 필요한 경우, 지연 초기화를 고려할 수 있지만 스레드 안전성을 염두에 두어야 합니다.

`equals`와 `hashCode`를 제대로 재정의하지 않으면 컬렉션에서 예기치 않은 동작이 발생할 수 있으므로, 이 두 메서드의 일관성 있는 재정의는 필수적입니다.
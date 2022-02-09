---
title: "[아이템 11] equals를 재정의하려거든 hashCode도 재정의하라"
date: 2020-06-27T13:18:21+09:00
tags: ["Java", "Effective Java 3E"]
categories: ["Effective Java 3E"]
series: ["Effective Java 3E"]
chapter: ["Effective Java 3E Chapter 2"]
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
`equals`와 `hasoCode`를 재정의 하지 않으면 `HashMap`이나 `HashSet`에서 같은 원소를 사용할 때 문제가 발생합니다.

다음은 Object 명세에서 발췌한 규약입니다.

- `equals` 비교에 사용되는 정보가 변경되지 않는다면, 애플리케이션이 실행되는 동안 객체의 `hashCode`메서드는 여러번 호출해도 일관된 값을 반환해야 합니다.
- `equals`가 두 객체를 같다고 판단하면 `hashCode` 또한 같은 값을 반환해야 합니다.
- `equals`가 두 객체를 다르다고 판단해도, 두 객체의 `hashCode`가 서로 다른 값을 반환할 필요는 없습니다. 단, 다른 객체에 대해서는 다른 값을 반환해야 해시테이블의 성능이 좋아집니다.
<br>
<br>

## 논리적으로 같은 객체는 같은 해시코드를 반환해야 합니다.

서로 다른 인스턴스에 대해서 모두 다른 해시코드를 반환하면 좋겠지만 `hashCode`는 `int`형이므로 `2^32`만큼의 경우의 수로 제한되어 있기 때문에 {{< font family="Roboto" size="1" color-var="main-color" weight="600" text="비둘기 집의 원리" >}}로 예외가 생길 수 있습니다.
<br>
<br>

### <i class="user-fa-action-info-outline" aria-hidden="true"></i> 다음은 hashCode를 작성하는 요령입니다.

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
<br>

숫자를 곱하는 이유는 만약 곱셈 없는 `hahCode`를 구현하게 되면 모든 아나그램의 해시코드가 같아집니다. 그리고 `31`을 선택한 이유는 `홀수`이면서 `소수`이기 때문입니다.

``` java
@Override
public int hashCode() {
    int result = Short.hashCode(areaCode);
    result = 31 * result + Short.hashCode(prefix);
    result = 31 * result + Short.hashCode(lineNum);
    return result;
}
```
<i class="user-fa-action-info-outline" aria-hidden="true"></i> _전형적인 hashCode 메서드_
<br>

``` java
@Override 
public int hashCode(){
    return Objects.hash(lineNum, prefix, areaCode);
}
```
<i class="user-fa-action-info-outline" aria-hidden="true"></i> _한 줄짜리 hasoCode 메서드 - 성능이 살짝 아쉽습니다._
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
<i class="user-fa-action-info-outline" aria-hidden="true"></i> _해시코드를 지연 초기화하는 hashCode 메서드 - 스레드 안정성까지 고려해야 한다._
<br>
<br>

## <i class="user-fa-av-new-releases" aria-hidden="true"></i> 정리
`equals`를 재정의 할 때는 `hashCdoe`도 재정의해야 합니다. 그렇지 않으면 프로그램이 제대로 동작하지 않을 수 있습니다. 서로 다른 인스턴스라면 되도록 해시코드도 서로 다르게 구현해야 합니다.

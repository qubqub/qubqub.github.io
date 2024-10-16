---
title: "[아이템 4] 인스턴스를 막으려거든 private 생성자를 사용하라"
date: 2020-06-19T15:51:43+09:00
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
## 개요
`java.lang.Math`나 `java.util.Arrays`와 같은 **유틸리티 클래스**는 **정적(static) 메서드**와 **정적 필드**만을 포함하고 있어, 굳이 인스턴스를 생성할 필요가 없습니다. 그러나 **기본 생성자**를 명시적으로 막지 않으면, **클라이언트 코드**가 실수로 인스턴스를 생성할 수 있습니다.

자바에서는 매개변수가 없는 생성자를 명시하지 않으면 기본 생성자가 자동으로 만들어지므로, 이를 방지하기 위해 **private 생성자**를 정의해야 합니다.
<br>

### 인스턴스화 방지 방법

``` java
public class UtilityClass {
    // 인스턴스화 방지용 private 생성자
    private UtilityClass() {
        throw new AssertionError();  // 인스턴스 생성 시도 시 예외 발생
    }
}
```
### 이 코드의 동작 방식
- private 생성자를 선언하여 외부에서 이 클래스를 인스턴스화하는 것을 막습니다.
- 만약 생성자를 호출하려고 하면 AssertionError 예외가 발생하여 인스턴스화 시도 자체를 차단합니다.
<br>
### 장점
- **클래스 의도 명확화**: 유틸리티 클래스는 인스턴스를 생성하는 용도가 아니라는 의도를 명확히 나타낼 수 있습니다.
- **클라이언트 실수 방지**: 클라이언트가 실수로 인스턴스를 생성하는 것을 방지할 수 있습니다.
- **상속 불가**: private 생성자로 인해 이 클래스를 상속하려는 시도 역시 막을 수 있습니다. 유틸리티 클래스는 상속할 필요가 없는 것이 일반적이기 때문에 상속 방지가 유효합니다.
<br>
### 유틸리티 클래스에서 인스턴스화를 막는 이유
- **메모리 낭비 방지**: 유틸리티 클래스는 상태를 가지지 않기 때문에, 불필요한 인스턴스를 만들면 메모리 낭비가 발생할 수 있습니다.
- **오용 방지**: 인스턴스를 생성하려는 시도는 클래스의 본래 의도와 맞지 않으며, 혼란을 초래할 수 있습니다.
<br>
## <i class="user-fa-action-done" aria-hidden="true"></i> 요약 및 결론
유틸리티 클래스는 **정적 메서드와 필드**를 제공하는 데 목적이 있으므로, **인스턴스화**는 불필요하고 오히려 의도를 왜곡할 수 있습니다. **private 생성자**를 사용하여 이러한 클래스를 인스턴스화하지 못하도록 막고, 필요에 따라 **AssertionError**로 실수 발생 시 예외를 던지도록 구현할 수 있습니다. 이를 통해 클래스를 **안전하게 설계**하고, **명확한 의도**를 표현할 수 있습니다.
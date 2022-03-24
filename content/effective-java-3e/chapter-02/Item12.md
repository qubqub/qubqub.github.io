---
title: "[아이템 12] toString을 항상 재정의하라"
date: 2020-06-27T14:31:22+09:00
tags: ["Java", "Effective Java 3E"]
categories: ["Effective Java 3E"]
series: ["Effective Java 3E"]
chapter: ["Effective Java 3E Chapter 2"]
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
`toString`을 오버라이딩 하지 않으면 기본적으로 **클래스_이름@16진수로_표현한_해시코드**를 반환합니다.

이렇게 되면 객체의 특성을 알아볼 수 있으므로 `toString`을 재정의 할 필요가 있습니다.
<br>

``` java
Student student = new Student("kim", 16);
System.out.println(student);
```

위 코드를 실행하면 `Student@abcd`같은 형태로 콘솔에 출력되므로 객체의 특성을 파악하기가 힘듭니다.
<br>
<br>

## <i class="user-fa-action-info-outline" aria-hidden="true"></i> toString을 재정의하는 좋은 방법
- 객체가 가진 가진 **주요 정보를 모두 반환**하는 게 좋습니다.
- `toString`을 구현하면 반환값의 포맷을 문서화할지 정해야 합니다.
  - 규칙이 명확해지는 장점이 있지만, 한번 명시하면 그 포맷에 얽매이게 됩니다.
  - 이러한 문제는 롬복으로 해결할 수 있습니다.
- 포맷을 명시하든 아니든 여러분의 **의도**는 명확하게 밝혀져야 합니다.
- `toString`이 반환한 값에 포함된 정보를 얻어올 수 있는 API를 제공합시다.
<br>
<br>

## <i class="user-fa-av-new-releases" aria-hidden="true"></i> 정리
객체의 정보를 출력할 일이 있으면 `toString`을 재정의 합시다. `toString`을 재정의하면 사용자가 보기 편하고 디버깅을 쉽게 해줍니다. `toString`은 객체에 관해 명확하고 정보를 읽기 좋은 형태로 반환해야 합니다.
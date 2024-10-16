---
title: "[아이템 12] toString을 항상 재정의하라"
date: 2020-06-27T14:31:22+09:00
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
## 1. 기본 `toString`의 한계
기본적으로 자바 객체는 `toString` 메서드를 재정의하지 않으면 `클래스 이름@해시코드(16진수)` 형태로 문자열을 반환합니다. 이는 객체의 고유한 정보나 상태를 파악하는 데 적합하지 않습니다. 예를 들어, 다음과 같은 코드가 있다고 가정해봅시다.
``` java
Student student = new Student("kim", 16);
System.out.println(student);
```
위 코드를 실행하면 `Student@abcd` 같은 형태로 출력됩니다. 이는 객체의 중요한 정보인 `name`과 `age`에 대한 내용을 알 수 없으므로, 객체의 상태를 파악하는 데 불편함을 줍니다.
<br>
<br>

## 2. `toString`을 재정의하는 좋은 방법
### 1) 객체의 주요 정보를 모두 포함하라
객체의 상태를 잘 표현할 수 있는 **주요 필드나 속성**을 `toString` 메서드에 포함해야 합니다. 이렇게 하면 출력된 정보를 통해 객체의 특성을 쉽게 파악할 수 있습니다. 예를 들어, `Student` 클래스라면 이름과 나이와 같은 필드가 포함되어야 합니다.
``` java
@Override
public String toString() {
    return "Student{name='" + name + "', age=" + age + "}";
}
```
<br>

### 2) 반환값의 포맷을 문서화할지 결정하라
`toString`의 반환값에 대해 **명확한 포맷**을 정하는 것은 일관성을 줄 수 있는 장점이 있습니다. 그러나 한 번 포맷을 명시하면, 그 포맷을 변경할 때 호환성 문제에 얽매이게 될 수 있습니다.
- 명확한 포맷을 정해놓으면, 객체를 문자열로 표현할 때 예측 가능하고 안정적인 형태로 출력됩니다.
- 하지만 포맷이 변경되면 기존에 `toString`을 사용하던 코드가 예상치 못한 방식으로 동작할 수 있습니다.
<br>

### 3) 롬복 같은 도구 활용
`toString` 메서드를 수동으로 작성하지 않고, **롬복(Lombok)** 같은 도구를 활용해 쉽게 구현할 수도 있습니다. 롬복의 **@ToString** 어노테이션을 사용하면 자동으로 필드 정보를 포함한 **toString**을 생성할 수 있어, 코드의 유지보수성을 높일 수 있습니다.
``` java
@ToString
public class Student {
    private String name;
    private int age;
}
```
<br>

### 4) 포맷을 명시하든 명시하지 않든, 의도를 명확하게 밝혀라
`toString` 메서드를 작성할 때 반환하는 문자열에 포함할 정보와 그 이유를 명확하게 해야 합니다. 포맷을 명시하지 않더라도 **객체의 상태나 특성을 설명**하는 방식이어야 합니다.
<br>

### 5) `toString` 값에 포함된 정보를 제공하는 API도 함께 구현하라
`toString`을 통해 제공되는 정보는 API나 메서드로도 제공되어야 합니다. 객체 상태를 확인할 수 있는 API가 없으면 `toString`에 의존해 객체의 상태를 확인하는 경우가 발생할 수 있습니다. 이를 방지하기 위해 해당 정보를 반환하는 별도의 메서드를 제공해야 합니다.
``` java
public String getName() {
    return name;
}

public int getAge() {
    return age;
}
```
<br>
<br>

## 3. `toString` 메서드 예시
다음은 `Student` 클래스에서 `toString`을 재정의한 예입니다. 객체의 주요 속성을 보기 쉽게 표현했습니다.
``` java
public class Student {
    private String name;
    private int age;

    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "Student{name='" + name + "', age=" + age + "}";
    }
}
```
이 코드를 실행하면 `Student{name='kim', age=16}`처럼 객체의 상태를 명확하게 표현한 문자열을 얻을 수 있습니다.
<br>
<br>

## 4. 정리
- `toString`을 재정의 할 때는 객체가 가진 가진 **주요 정보를 모두 반환**하는 게 좋습니다.
- `toString`을 구현하면 반환값의 포맷을 문서화할지 정해야 합니다.
  - 규칙이 명확해지는 장점이 있지만, 한번 명시하면 그 포맷에 얽매이게 됩니다.
  - 이러한 문제는 롬복으로 해결할 수 있습니다.
- 포맷을 명시하든 아니든 여러분의 **의도**는 명확하게 밝혀져야 합니다.
- `toString`이 반환한 값에 포함된 정보를 얻어올 수 있는 API를 제공합시다.
<br>
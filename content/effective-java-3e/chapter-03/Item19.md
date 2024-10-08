---
title: "[아이템 19] 상속을 고려해 설계하고 문서화하라. 그렇지 않았다면 상속을 금지하라"
date: 2020-07-03T13:57:41+09:00
tags: ["Java", "Effective Java 3E"]
categories: ["Effective Java 3E"]
series: ["Effective Java 3E"]
chapter: ["Effective Java 3E Chapter 03"]
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
여기서 말하는 **외부**란 프로그래머의 통제권 밖에 있어서 언제 어떤식으로 변경될지 모른다는 뜻입니다.

## **상속을 고려한 문서화**

1. 상속용 클래스는 재정의할 수 있는 메서드들은 내부적으로 어떻게 이용하는지 문서로 남겨야 합니다.
2. 클래스의 내부 동작 과정 중간에 끼어들 수 있는 훅(hook)을 잘 선별하여 `protected`메서드 형태로 공개하는 것도 고려해보는 것도 좋습니다. (한편으로 너무 적게 노출해서 상속으로 얻는 이점을 없애지 않도록 주의해야 합니다.)
3. 상속용으로 설계한 클래스는 배포 전에 반드시 하위 클래스를 만들어 **검증** 해야 합니다.
<br>
<br>

## 상속을 허용하는 클래스가 지켜야 할 제약

**상속용 클래스의 생성자는 직접적으로든 간접적으로든 재정의 가능 메서드를 호출해서는 안 됩니다**.
상위 클래스의생성자가 하위 클래스의 생성자보다 먼저 실행되므로 하위 클래스에서 재정의한 메서드가 하위 클래스의 생성자보다 먼저 호출됩니다.
상속을 금지하는 방법에는 두 가지 방법이 있습니다. 첫 번째는 클래스를 `final`으로 선언하는 것과 두번째는 모든 생성자를 `private`나 `package-private`로 선언하고 `public` 정적 팩터리를 만들어주는 방법입니다.
<br>
<br>

## <i class="user-fa-av-new-releases" aria-hidden="true"></i> 정리

- 상속을 하려면 문서화를 해야 하며, 문서화 한 것은 반드시 지켜야 합니다.
- 클래스를 확장해야 할 명확한 이유가 없다면 [`아이템17`](/effective-java-3e/chapter-03/item17/)에서 다뤘던 방식으로 상속을 금지합시다.


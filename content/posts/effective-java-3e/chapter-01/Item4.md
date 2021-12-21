---
title: "[아이템 4] 인스턴스를 막으려거든 private 생성자를 사용하라"
date: 2020-06-19T15:51:43+09:00
tags: ["Java", "Effective Java 3E"]
categories: ["Effective Java 3E"]
series: ["Effective Java 3E"]
chapter: ["Effective Java 3E Chapter 1"]
author: ["Kyungchul Shin"]
showToc: true
showAsideToc: true
TocOpen: false
ShowTocAside: true
draft: false
hidemeta: false
comments: true
ShowReadingTime: true
ShowPostNavLinks: false
ShowCodeCopyButtons: true
ShowBreadCrumbs: true
showContentProgressbar: true
# cover:
#   hidden: true
#   image: "/logo/logo-effective-java-3e.png"
---
## [아이템 4] 인스턴스를 막으려거든 private 생성자를 사용하라

java.lang.Math와 java.util.Arrays와 같이 static 메서드와 static 필드만을 담을 클래스는 인스턴스화를 하는 건 낭비가 됩니다.
   
매개변수 없는 생성자를 만들지 않으면 기본생성자가 생성이 되는데 이것을 방치하면 클라이언트 입장에서는 정적 멤버만 담은 유틸리티 클래스인지 알 수 없으므로 인스턴스화를 시킬 가능성이 있습니다. 이를 방지하기 위해 private 생성자를 만들어서 인스턴스화를 막을 수 있습니다.
   
``` java
public class UtilityClass {

  private UtilityClass() { }
  
}
```
private 생성자이므로 상속을 시도하려는 클래스에서는 생성자를 호출할 수 없기 때문에 상속도 불가능 합니다.
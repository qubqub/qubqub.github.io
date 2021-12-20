---
title: "GarbageCollection: 가비지 컬렉션"
date: 2021-12-07T20:21:53+09:00
tags: ["unity","GC","GarbageCollection"]
categories: ["csharp","unity"]
author: [""]
ShowReadingTime: true
ShowBreadCrumbs: false
ShowPostNavLinks: true
ShowCodeCopyButtons: true
ShowCreativeCommons: true
showToc: true
TocOpen: true
comments: true
disableShare: false
searchHidden: false

draft: false

cover:
  hidden: true
  image: "/logo/logo-unity-01.png"
  alt: "unity"
---
## {{< color color="#FFD400" text="가비지 컬렉션" >}}가 뭐야? 🧐

게임이 실행이 될 때, 메모리를 데이터를 저장하기 위해 사용을 한다. 메모리엔 코드(실행할코드), 데이터(전역변수, 정적변수), `스택메모리(값타입/지역변수)`와 `힙메모리(사용자동적할당역역/레퍼런스타입)`가 있는데, 가비지 컬렉터는 힙메모리를 청소하는 역할이다.

<br>

그렇다면 왜 스택메모리를 청소해주는 것은 없을까? 필요없기 때문이다. 스택메모리에 저장되는 데이터들은 스코프를 벗어나면 메모리가 즉시 해제가된다. 이와 반면에 힙메모리는 스코프를 벗어나도 즉시 메모리 해제가 이루어지지않는다. 힙메모리에서 사용하지않는, 불필요한 메모리들을 정리해 다시 사용이 가능하도록 작업하는 것이 바로 `가비지 컬렉션`이다.

## {{< color color="#FFD400" text="힙 변수" >}}생성할 때 무슨 일이 일어날까? 🧐

1. 힙공간에 사용가능한 메모리가 있는지, 변수를 할당할 수 있을 지 확인한다.
2. 만약 없다면, 유니티는 가비지 컬렉터 작동을 시켜 메모리가 생기면 변수를 할당한다.
3. 가비지 컬렉터 실행 후에도 메모리가 없을 경우에는 힙공간을 늘린 후 변수를 할당한다.

## {{< color color="#FFD400" text="가비지 컬렉션" >}}이 진행될 때 무슨 일이 일어날까? 🧐
1. 힙메모리에 있는 모든 오브젝트들을 조사.
2. 모든 오브젝트들의 레퍼런스를 조사하여 현재 힙메모리에 있는 오브젝트가 스코프에 남아있는지 확인한다.
3. 더 이상 스코프 안에 있지 않은 오브젝트들을 마크한다.
4. 마크된 오브젝트를 메모리해제하여 메모리를 다시 사용할 수 있는 상태로 만든다.


**가비지 컬렉터가 작동해야하는 상황, 유니티가 힙공간을 늘려야하는 상황 모두 성능의 저하를 가져온다.**

## {{< color color="#FFD400" text="가비지 컬렉션" >}}는 언제 작동할까? 🧐
1. 힙메모리 할당을 요청 받았을 때, 할당이 불가능한 경우.(메모리 자체의 부족 또는 메모리 단편화 상태)
2. 가비지 컬렉터는 자동적으로 작동을 한다.(플랫폼에 따라 작동 횟수는 다양함)
3. 강제로도 작동시킬 수 있지만 권장하지 않는다.(비용이 많이 든다!)

## {{< color color="#FFD400" text="가비지 컬렉션" >}}의 문제점은? 🧐
1. 비용이 많이 든다.(어떤 메모리를 청소해야할지 찾는 데에 시간이 듬)
2. 어떠한 타이밍에 실행될지 모른다.(ex. cpu가 게임에서 중요한 부분을 작업하는데 가비지 컬렉션이 일어나면 아무리 작은 추가 오버헤드일지라도 프레임 드랍을 일으킬 수 있다.)
3. 메모리 단편화 문제!

## {{< color color="#FFD400" text="가비지" >}}를 줄이려면? 🧐
1. `캐싱`: 반복적으로 호출하여 할당하지만 그 결과가 버려지는 오브젝트들을 캐싱해두고 다시 사용하자. 
2. 자주 사용되는 함수에서 힙 할당을 자제하자.(update 같은 함수)
3. Collection사용시 Clear()해서 재사용하기.(캐싱해서 사용해라~ new로 새로 만들지 말고!) 
4. 런타임에 많은 오브젝트들을 생성하고 파괴하기 보다는 `오브젝트 풀링` 이용.
5. `string` 사용에 주의하자! immutable, reference type 이기 때문에 string으로 조작할 때마다 이전 string은 가비지가 됨.
6. `Debug.Log()` 는 디버깅할 상황이 끝나면 바로바로 지워주자!
7. GameObject.name, GameObject.tag 같은 경우는 새로운 string을 만들어 return 해주기 때문에 GameObject.CompareTag()같은 함수를 대신 적극 이용하는 것이 좋다.
8. `코루틴`을 사용할때도 유의해야한다. yield return 시 new 키워드를 반복사용해야한다면 캐싱해놓고 사용하자. 

이외에도 더 많은 줄일 수 있는 방법들이 있다.
[참고 링크](https://learn.unity.com/tutorial/fixing-performance-problems?&_gl=1*1p7zlyv*_gcl_aw*R0NMLjE2Mzg3NjQyOTIuQ2owS0NRaUE0N0dOQmhEckFSSXNBS2ZaMnJCOUVOcUtnM1RqT3h2ZFEwcHFHVEljeW16bjI4LWYwS1p4dVI3VHQ5UEZJWjhkVTVPZG9ub2FBanBRRUFMd193Y0I.*_gcl_dc*R0NMLjE2Mzg3NjQyOTIuQ2owS0NRaUE0N0dOQmhEckFSSXNBS2ZaMnJCOUVOcUtnM1RqT3h2ZFEwcHFHVEljeW16bjI4LWYwS1p4dVI3VHQ5UEZJWjhkVTVPZG9ub2FBanBRRUFMd193Y0I.&_ga=2.133675598.1336283719.1638694535-922476657.1625742166#5c7f8528edbc2a002053b595)